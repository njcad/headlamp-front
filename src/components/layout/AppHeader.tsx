import { HStack, Heading, Spacer } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <HStack as="header" p="4" borderBottomWidth="1px">
      <Heading size="md">
        <Link to="/">Headlamp</Link>
      </Heading>
      <Spacer />
      <ColorModeButton />
    </HStack>
  );
}
