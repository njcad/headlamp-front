import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
          minH="40vh"
        >
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
        </Box>
        <Box w="full" maxW="3xl" position="sticky" bottom="0" bg="bg" pt="2">
          <Stack align="center" mb="2">
            <Button
              variant="solid"
              bg="orange.400"
              color="white"
              _hover={{ bg: "orange.500" }}
              _active={{ bg: "orange.600" }}
              disabled={!hasSelection || sending}
              onClick={onApply}
              size="sm"
              rounded="full"
            >
              Help me apply to these orgs
            </Button>
          </Stack>
          <Composer />
          <Text color="fg.muted" fontSize="xs" mt="2" textAlign="center">
            This is a demo. Chat functionality coming soon.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
