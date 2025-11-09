import { Box, Card, HStack, Stack, Text } from "@chakra-ui/react";
import type { ChatMessage } from "@/context/ChatContext";

export default function MessageList(props: { messages: ChatMessage[] }) {
  const { messages } = props;
  return (
    <Stack gap="3">
      {messages.map((m) => (
        <Stack key={m.id} gap="2" align={m.role === "user" ? "end" : "start"}>
          <Box
            maxW="80%"
            px="3"
            py="2"
            rounded="lg"
            bg={m.role === "user" ? "gray.3" : "bg"}
            borderWidth={m.role === "user" ? "0" : "1px"}
            borderColor="border"
          >
            <Text whiteSpace="pre-wrap">{m.content}</Text>
          </Box>
          {m.orgs && m.orgs.length > 0 ? (
            <HStack wrap="wrap" gap="2">
              {m.orgs.map((o) => (
                <Card.Root
                  key={o.id}
                  borderColor="border"
                  borderWidth="1px"
                  p="3"
                >
                  <Card.Title>{o.name}</Card.Title>
                  <Card.Description>{o.description}</Card.Description>
                </Card.Root>
              ))}
            </HStack>
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
}
