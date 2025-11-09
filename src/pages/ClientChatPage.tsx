import { Container } from "@chakra-ui/react";
import ChatLayout from "@/components/chat/ChatLayout";
import { ChatProvider } from "@/context/ChatContext";

export default function ClientChatPage() {
  return (
    <ChatProvider>
      <Container maxW="container.lg" py="4">
        <ChatLayout />
      </Container>
    </ChatProvider>
  );
}
