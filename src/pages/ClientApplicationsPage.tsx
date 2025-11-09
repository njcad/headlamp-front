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
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const [apps, setApps] = useState<ClientApplication[] | null>(null);
  const [, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const userId = useMemo(() => {
    try {
      return localStorage.getItem("headlamp_user_id");
    } catch {
      return null;
    }
  }, []);

  // Detect if we should poll for a newly created application
  const shouldPoll = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const fromState = (location.state as any)?.pendingFromSubmission === true;
    return params.has("pending") || fromState;
  }, [location]);

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

  // Poll for new application for a short timeout window
  useEffect(() => {
    if (!userId || !shouldPoll) return;
    let cancelled = false;
    const start = Date.now();
    const timeoutMs = 8000;
    const intervalMs = 1200;
    setPolling(true);

    // Capture baseline IDs once per polling session
    let baselineIds: Set<string> | null = apps
      ? new Set(apps.map((a) => a.id))
      : null;

    const poll = async () => {
      if (cancelled) return;
      try {
        const data = await getUserApplications(userId);
        if (cancelled) return;
        // Initialize baseline if we didn't have one yet
        if (baselineIds === null) {
          baselineIds = new Set<string>(data.map((a) => a.id));
        } else {
          const hasNew = data.some((a) => !baselineIds!.has(a.id));
          if (hasNew) {
            setApps(data);
            setPolling(false);
            return;
          }
        }
        setApps(data);
      } catch {
        // ignore and continue polling until timeout
      }
      if (!cancelled && Date.now() - start < timeoutMs) {
        setTimeout(poll, intervalMs);
      } else {
        setPolling(false);
      }
    };

    // kick off immediately
    const kick = setTimeout(poll, 0);
    return () => {
      cancelled = true;
      clearTimeout(kick);
    };
  }, [userId, shouldPoll]);

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
        ) : apps === null || polling ? (
          <Text color="fg.muted">
            {polling ? "Looking for your new application..." : "Loading..."}
          </Text>
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
