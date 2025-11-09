import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import MessageList from "@/components/chat/MessageList";
import Composer from "@/components/chat/Composer";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import ApplicationDraftModal from "@/components/chat/ApplicationDraftModal";
import type {
  ApplicationDraft as UIApplicationDraft,
  BackendApplicationDraft,
} from "@/types/chatTypes";

export default function ChatLayout() {
  const { messages, error, sendMessage, sending } = useChatContext();
  const [selectedOrgIds, setSelectedOrgIds] = useState<number[]>([]);

  const hasSelection = selectedOrgIds.length > 0;

  const onToggleOrg = (id: number) => {
    setSelectedOrgIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onApply = async () => {
    if (!hasSelection || sending) return;
    await sendMessage("Help me apply to these orgs", {
      clickedOrgIds: selectedOrgIds,
    });
    setSelectedOrgIds([]);
  };
  const { open, onOpen, onClose } = useDisclosure();
  const [uiDraft, setUiDraft] = useState<UIApplicationDraft | null>(null);
  // Open modal when server-sent draft arrives
  useEffect(() => {
    const lastAssistant = [...messages]
      .reverse()
      .find(
        (m) => (m as any).role === "assistant" && (m as any).applicationDraft
      ) as any;
    const backendDraft = lastAssistant?.applicationDraft;
    if (backendDraft) {
      const mapped: UIApplicationDraft = {
        name: backendDraft.name || "",
        phone: backendDraft.phone || "",
        summary: backendDraft.summary || "",
        orgs: backendDraft.organizations || [],
      };
      setUiDraft(mapped);
      onOpen();
    }
  }, [messages, onOpen]);
  return (
    <Flex direction="column" minH="70vh">
      <Flex direction="column" flex="1" align="center">
        <Box
          flex="1"
          w="full"
          maxW="3xl"
          overflowY="auto"
          px={{ base: 0, md: 2 }}
          py="3"
          pb="36"
          minH="40vh"
          position="relative"
        >
          <Box
            position="sticky"
            top="0"
            h="6"
            bgGradient="linear(to-b, bg, transparent)"
            zIndex="1"
            pointerEvents="none"
          />
          {messages.length === 0 ? (
            <Flex justify="center" align="center" minH="50vh">
              <Text fontSize="3xl" fontWeight="bold">
                What's going on? Here to help.
              </Text>
            </Flex>
          ) : (
            <MessageList
              messages={messages}
              selectedOrgIds={selectedOrgIds}
              onToggleOrg={onToggleOrg}
            />
          )}
          {error ? (
            <Text color="red.500" fontSize="sm" mt="3">
              {error}
            </Text>
          ) : null}
          <Box
            position="sticky"
            bottom="0"
            h="10"
            bgGradient="linear(to-t, bg, transparent)"
            zIndex="1"
            pointerEvents="none"
          />
        </Box>
        {uiDraft ? (
          <ApplicationDraftModal
            isOpen={open}
            onClose={() => {
              setUiDraft(null);
              onClose();
            }}
            draft={uiDraft}
            onSubmit={async (draft) => {
              // Transform frontend ApplicationDraft to backend BackendApplicationDraft format
              const backendDraft: BackendApplicationDraft = {
                name: draft.name,
                phone: draft.phone || undefined,
                email: undefined, // Frontend doesn't collect email currently
                summary: draft.summary,
                organizations: draft.orgs, // Backend expects 'organizations' not 'orgs'
              };

              // Extract organization IDs for doApply
              const orgIds = draft.orgs.map((org) => org.id);

              // Send message with application draft and doApply flag
              await sendMessage("I'm ready to submit my application", {
                applicationDraft: backendDraft,
                doApply: orgIds,
              });

              setUiDraft(null);
              onClose();
            }}
            submitting={sending}
          />
        ) : null}
        <Box
          position="fixed"
          left="0"
          right="0"
          bottom="0"
          bg="bg"
          zIndex="1000"
        >
          <Box w="full" maxW="3xl" mx="auto" px={{ base: 2, md: 2 }} pt="2">
            <Composer
              mode={hasSelection ? "apply" : "chat"}
              onApply={onApply}
              disabled={sending || !hasSelection}
              applyLabel="Help me apply to these orgs"
            />
            <Text
              color="fg.muted"
              fontSize="xs"
              mt="2"
              textAlign="center"
              pb="6"
            >
              Headlamp uses AI to help you find resources and apply to
              organizations. For emergency support, please call 911.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
