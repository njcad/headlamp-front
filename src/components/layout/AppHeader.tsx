import { HStack, Heading, Spacer } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <HStack
      as="header"
      p="4"
      borderBottomWidth="1px"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="bg"
      zIndex="1000"
    >
      <Heading size="md">
        <Link to="/">Headlamp</Link>
      </Heading>
      <Spacer />
      <ColorModeButton />
    </HStack>
  );
}
