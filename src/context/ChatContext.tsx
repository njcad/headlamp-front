import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { sendChatMessage } from "@/api/chat";
import type { AgentMessageResponse, OrgType } from "@/types/chatTypes";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  orgs?: OrgType[];
};

type ChatContextValue = {
  messages: ChatMessage[];
  sending: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clear: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider(props: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("headlamp_user_id");
    } catch {
      return null;
    }
  });

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      setError(null);
      const userMessage: ChatMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMessage]);
      setSending(true);
      try {
        const res: AgentMessageResponse = await sendChatMessage(
          userId ? { user_id: userId, message: trimmed } : { message: trimmed }
        );
        if (!userId && res.user_id) {
          try {
            localStorage.setItem("headlamp_user_id", res.user_id);
          } catch {}
          setUserId(res.user_id);
        }
        const assistantMessage: ChatMessage = {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: res.message,
          orgs: res.orgs,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (e) {
        setError("Failed to send message. Please try again.");
      } finally {
        setSending(false);
      }
    },
    [sending, userId]
  );

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      sending,
      error,
      sendMessage,
      clear,
    }),
    [messages, sending, error, sendMessage, clear]
  );

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return ctx;
}
