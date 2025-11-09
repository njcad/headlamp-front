import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py="12" textAlign="center">
      <Stack gap="4" align="center">
        <Heading size="xl">Headlamp</Heading>
        <Text color="fg.muted">
          A 2-sided portal for nonprofit partners and clients.
        </Text>
        <Stack direction={{ base: "column", md: "row" }} gap="3" mt="4">
          <Button onClick={() => navigate("/chat")} size="lg" variant="solid">
            Looking for some help
          </Button>
          <Button
            onClick={() => navigate("/partner/login")}
            size="lg"
            variant="outline"
          >
            Partner login
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
