import { Container, Heading, Text, Box } from "@chakra-ui/react";

export default function PartnerDashboardPage() {
  return (
    <Container maxW="container.lg" py="12">
      <Heading size="lg" mb="6">
        Partner Dashboard
      </Heading>
      <Box borderWidth="1px" rounded="md" p="6" bg="bg" borderColor="border">
        <Text color="fg.muted">Dashboard content coming soon.</Text>
      </Box>
    </Container>
  );
}
