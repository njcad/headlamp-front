import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  getUserApplications,
  type ClientApplication,
} from "@/api/applications";
import { useNavigate } from "react-router-dom";

function formatDate(dt?: string | null): string {
  if (!dt) return "-";
  const d = new Date(dt);
  if (isNaN(d.getTime())) return dt;
  return d.toLocaleString();
}

function computeStatus(app: ClientApplication): {
  label: string;
  color: string;
} {
  if (app.accepted_at) return { label: "Accepted", color: "green.500" };
  if (app.denied_at) return { label: "Denied", color: "red.500" };
  if (app.opened_at) return { label: "Opened", color: "yellow.600" };
  return { label: "Submitted", color: "gray.500" };
}

export default function ClientApplicationsPage() {
  const navigate = useNavigate();
  const [apps, setApps] = useState<ClientApplication[] | null>(null);
  const [, setError] = useState<string | null>(null);
  const userId = useMemo(() => {
    try {
      return localStorage.getItem("headlamp_user_id");
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!userId) {
        setApps([]);
        return;
      }
      try {
        const data = await getUserApplications(userId);
        if (mounted) setApps(data);
      } catch (e) {
        // Gracefully degrade: treat errors (incl. 404) as "no applications"
        setError(null);
        setApps([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userId]);

  return (
    <Box minH="100vh" bg="bg">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py="12">
        <HStack justify="space-between" mb="8">
          <Heading size="2xl" fontWeight="semibold" color="fg">
            My Applications
          </Heading>
          <Button variant="ghost" onClick={() => navigate("/chat")}>
            Back to chat
          </Button>
        </HStack>

        {!userId ? (
          <Box
            bg="bg"
            borderWidth="1px"
            borderColor="border"
            rounded="xl"
            p="8"
          >
            <Text color="fg.muted">
              No user found. Start a conversation to create your first
              application.
            </Text>
            <Button mt="4" onClick={() => navigate("/chat")}>
              Go to chat
            </Button>
          </Box>
        ) : apps === null ? (
          <Text color="fg.muted">Loading...</Text>
        ) : apps.length === 0 ? (
          <Box
            bg="bg"
            borderWidth="1px"
            borderColor="border"
            rounded="xl"
            p="8"
          >
            <Text color="fg.muted">
              You haven’t submitted any applications yet.
            </Text>
          </Box>
        ) : (
          <Stack gap="4">
            {apps.map((app) => {
              const status = computeStatus(app);
              return (
                <Box
                  key={app.id}
                  bg="bg"
                  borderWidth="1px"
                  borderColor="border"
                  rounded="xl"
                  p="6"
                >
                  <HStack justify="space-between" align="start">
                    <Stack gap="1">
                      <Text fontSize="sm" color="fg.muted">
                        Organization ID
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        {app.organization_id}
                      </Text>
                    </Stack>
                    <Stack gap="1" align="end">
                      <Text fontSize="sm" color="fg.muted">
                        Status
                      </Text>
                      <Text fontWeight="semibold" color={status.color}>
                        {status.label}
                      </Text>
                    </Stack>
                  </HStack>
                  <HStack gap="8" mt="4" wrap="wrap">
                    <Stack gap="1">
                      <Text fontSize="sm" color="fg.muted">
                        Submitted
                      </Text>
                      <Text>{formatDate(app.submitted_at)}</Text>
                    </Stack>
                    <Stack gap="1">
                      <Text fontSize="sm" color="fg.muted">
                        Opened
                      </Text>
                      <Text>{formatDate(app.opened_at)}</Text>
                    </Stack>
                    <Stack gap="1">
                      <Text fontSize="sm" color="fg.muted">
                        Accepted
                      </Text>
                      <Text>{formatDate(app.accepted_at)}</Text>
                    </Stack>
                    <Stack gap="1">
                      <Text fontSize="sm" color="fg.muted">
                        Denied
                      </Text>
                      <Text>{formatDate(app.denied_at)}</Text>
                    </Stack>
                  </HStack>
                  {app.urgent ? (
                    <Text mt="3" color="orange.600" fontWeight="medium">
                      Marked urgent
                    </Text>
                  ) : null}
                </Box>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
