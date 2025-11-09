import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg="bg"
      borderBottomWidth="1px"
      borderColor="border"
      backdropFilter="saturate(180%) blur(10px)"
    >
      <Container maxW="container.xl" px="4">
        <HStack h="16" gap="4">
          <Link to="/">
            <HStack
              gap="3"
            >
              <Box w="8" h="8" rounded="full" bg="orange.400" />
              <Heading size="md">Headlamp</Heading>
              <Badge
                display={{ base: "none", md: "inline-flex" }}
                colorScheme="purple"
                variant="subtle"
                rounded="full"
              >
                beta
              </Badge>
            </HStack>
          </Link>

          <Spacer />

          <HStack gap="2" display={{ base: "none", md: "flex" }}>
            <Link to="/chat">
              <Button size="sm" variant="ghost">
                Get help
              </Button>
            </Link>
            <Link to="/partner/login">
              <Button size="sm" colorScheme="purple">
                Partner login
              </Button>
            </Link>
          </HStack>

          <ColorModeButton />
        </HStack>
      </Container>
    </Box>
  );
}
