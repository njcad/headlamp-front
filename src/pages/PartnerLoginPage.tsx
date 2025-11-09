import { Container, Heading, Box } from "@chakra-ui/react";
import PartnerLoginForm from "@/components/forms/PartnerLoginForm";

export default function PartnerLoginPage() {
  return (
    <Container maxW="container.sm" py="12">
      <Heading size="lg" mb="6">
        Partner Login
      </Heading>
      <Box borderWidth="1px" rounded="md" p="6" bg="bg" borderColor="border">
        <PartnerLoginForm />
      </Box>
    </Container>
  );
}
