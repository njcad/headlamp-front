import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import MessageList from "@/components/chat/MessageList";
import Composer from "@/components/chat/Composer";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useMemo, useState } from "react";
import ApplicationDraftModal from "@/components/chat/ApplicationDraftModal";
import type { ApplicationDraft } from "@/types/chatTypes";

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
  const { open, onOpen, onClose } = useDisclosure({ defaultOpen: true });
  const mockDraft: ApplicationDraft = useMemo(
    () => ({
      name: "John Doe",
      phone: "(555) 123-4567",
      summary:
        "I need help with food assistance and housing support for my family. I recently lost my job and am struggling to make ends meet.",
      orgs: [
        {
          id: 1,
          name: "City Food Bank",
          description:
            "Provides emergency food assistance to families in need.",
        },
        {
          id: 2,
          name: "Housing First Coalition",
          description:
            "Offers temporary housing and rental assistance programs.",
        },
        {
          id: 3,
          name: "Family Support Services",
          description:
            "Comprehensive support including counseling and job placement.",
        },
      ],
    }),
    []
  );
  useEffect(() => {
    if (messages.length === 0) onOpen();
  }, [messages.length, onOpen]);
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
            <Flex justify="center" align="center" minH="30vh">
              <Button onClick={onOpen} colorPalette="orange" size="md">
                Review application draft
              </Button>
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
        <ApplicationDraftModal
          isOpen={open}
          onClose={onClose}
          draft={mockDraft}
          onSubmit={(draft) => {
            console.log("Submit ApplicationDraft:", draft);
            alert("Mock submitted. Check console for payload.");
            onClose();
          }}
        />
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
              pb="2"
            >
              This is a demo. Chat functionality coming soon.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
