import { Box, Stack, Text } from "@chakra-ui/react";
import type { ChatMessage } from "@/context/ChatContext";
import { useChatContext } from "@/context/ChatContext";
import { keyframes } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import OrgCard from "@/components/chat/OrgCard";

function TypewriterText(props: {
  text: string;
  active: boolean;
  speedMs?: number;
  onDone?: () => void;
}) {
  const { text, active, speedMs = 16, onDone } = props;
  const [visibleCount, setVisibleCount] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) {
      setVisibleCount(text.length);
      return;
    }
    setVisibleCount(0);
    if (text.length === 0) return;
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);
          onDone?.();
          return c;
        }
        return c + 1;
      });
    }, speedMs);
    return () => clearInterval(interval);
  }, [text, active, speedMs]);

  const visibleText = useMemo(
    () => text.slice(0, visibleCount),
    [text, visibleCount]
  );
  return <Text whiteSpace="pre-wrap">{visibleText}</Text>;
}

export default function MessageList(props: {
  messages: ChatMessage[];
  selectedOrgIds: number[];
  onToggleOrg: (orgId: number) => void;
}) {
  const { messages, selectedOrgIds, onToggleOrg } = props;
  const { sending } = useChatContext();

  const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  `;

  const lastIsUser = messages[messages.length - 1]?.role === "user";
  const typedIdsRef = useRef<Set<string>>(new Set());
  const [, forceRerender] = useState(0);

  const selectedSet = useMemo(() => new Set(selectedOrgIds), [selectedOrgIds]);

  return (
    <Stack gap="3">
      {messages.map((m, idx) => {
        const isNewestAssistant =
          m.role === "assistant" && idx === messages.length - 1;
        const shouldType = isNewestAssistant && !typedIdsRef.current.has(m.id);
        return (
          <Stack key={m.id} gap="2" align={m.role === "user" ? "end" : "start"}>
            <Box
              w={m.role === "assistant" ? "full" : "auto"}
              maxW={m.role === "assistant" ? "full" : "80%"}
              px={m.role === "assistant" ? "0" : "3"}
              py={m.role === "assistant" ? "0" : "2"}
              rounded={m.role === "assistant" ? undefined : "lg"}
              bg={m.role === "assistant" ? "transparent" : "bg"}
              borderWidth={m.role === "assistant" ? "0" : "1px"}
              borderColor={m.role === "assistant" ? "transparent" : "border"}
            >
              {m.role === "assistant" ? (
                shouldType ? (
                  <TypewriterText
                    text={m.content}
                    active
                    onDone={() => {
                      typedIdsRef.current.add(m.id);
                      forceRerender((v) => v + 1);
                    }}
                  />
                ) : (
                  <Text whiteSpace="pre-wrap">{m.content}</Text>
                )
              ) : (
                <Text whiteSpace="pre-wrap">{m.content}</Text>
              )}
            </Box>
            {m.orgs &&
            m.orgs.length > 0 &&
            (!shouldType || m.role !== "assistant") ? (
              <Stack gap="2" w="full" align="stretch" mt="3">
                {m.orgs.map((o, i) => (
                  <OrgCard
                    key={o.id}
                    org={o}
                    selected={selectedSet.has(o.id)}
                    onToggle={() => onToggleOrg(o.id)}
                    delayMs={i * 120}
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>
        );
      })}
      {sending && lastIsUser ? (
        <Stack gap="2" align="start">
          <Box
            w="10px"
            h="10px"
            rounded="full"
            bg="orange.400"
            animation={`${pulse} 1.2s ease-in-out infinite`}
          />
        </Stack>
      ) : null}
    </Stack>
  );
}
