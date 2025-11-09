import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEST_EMAIL = "partner@test.com";
const TEST_PASSWORD = "password123";

export default function PartnerLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // naive hardcoded auth
    setTimeout(() => {
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        navigate("/partner/dashboard");
      } else {
        setError("Invalid credentials. Try partner@test.com / password123.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4">
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.org"
            required
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </Field.Root>
        {error ? (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        ) : null}
        <Button type="submit" loading={loading}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
