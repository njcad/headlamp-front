import { Container } from "@chakra-ui/react";
import ChatLayout from "@/components/chat/ChatLayout";

export default function ClientChatPage() {
  return (
    <Container maxW="container.lg" py="4">
      <ChatLayout />
    </Container>
  );
}
