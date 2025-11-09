import { Box, Button, Flex, Heading, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function ChatLayout() {
  return (
    <Flex direction="column" minH="70vh" borderWidth="1px" rounded="md" bg="bg" borderColor="border">
      <HStack p="3" borderBottomWidth="1px">
        <Heading size="md">Chat</Heading>
        <Box flex="1" />
        <ColorModeButton />
      </HStack>
      <Flex flex="1" overflow="hidden">
        <Box display={{ base: "none", md: "block" }} w="64" borderRightWidth="1px" p="3">
          <Text color="fg.muted">Conversations</Text>
          {/* Placeholder for sidebar list */}
        </Box>
        <VStack align="stretch" flex="1" p="3" spacing="3">
          <Box flex="1" overflowY="auto" borderWidth="1px" rounded="md" p="3" minH="40vh">
            <Stack gap="3">
              <Text color="fg.muted">Your conversation will appear here.</Text>
            </Stack>
          </Box>
          <HStack>
            <Input placeholder="Type your message..." />
            <Button>Send</Button>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}


