import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import MessageList from "@/components/chat/MessageList";
import Composer from "@/components/chat/Composer";
import { useChatContext } from "@/context/ChatContext";
import { useState } from "react";

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
  return (
    <Flex direction="column" minH="70vh">
      <Stack align="center" textAlign="center" mb="4" px="2">
        <Heading size="lg">How can we help today?</Heading>
        <Text color="fg.muted" fontSize="sm">
          Ask a question or describe what you need.
        </Text>
      </Stack>
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
            <Stack gap="3">
              <Text color="fg.muted">Your conversation will appear here.</Text>
            </Stack>
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
