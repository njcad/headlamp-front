import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Menu,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CaseCard } from "@/components/CaseCard";

const mockCases = [
  {
    id: 1,
    name: "Nissrin Gehawi",
    status: "unopened" as const,
    statusText: "Unopened",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "eviction" as const, label: "Eviction Assistance" },
      { type: "shelter" as const, label: "Shelter" },
    ],
  },
  {
    id: 2,
    name: "Nate Cadicamo",
    status: "accepted" as const,
    statusText: "Accepted at Mission Rescue Union",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "transitional" as const, label: "Transitional Housing" },
    ],
  },
  {
    id: 3,
    name: "Skye Hathaway",
    status: "denied" as const,
    statusText: "Denied",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "shelter" as const, label: "Shelter" },
      { type: "substance" as const, label: "Substance-Free Housing" },
    ],
  },
  {
    id: 4,
    name: "Hamed Hekmat",
    status: "pending" as const,
    statusText: "Pending at CHYP",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "eviction" as const, label: "Eviction Assistance" },
      { type: "transitional" as const, label: "Transitional Housing" },
    ],
  },
  {
    id: 5,
    name: "Grace Buzzell",
    status: "accepted" as const,
    statusText: "Accepted at Bill Wilson Center",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "substance" as const, label: "Substance-Free Housing" },
    ],
  },
];

export default function PartnerDashboardPage() {
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  const handleCaseClick = (caseId: number) => {
    navigate(`/partner/case/${caseId}`);
  };

  return (
    <Box minH="100vh" bg="bg">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py="12">
        <Heading size="2xl" fontWeight="semibold" color="fg" mb="8">
          My Organization Dashboard
        </Heading>

        <HStack gap="3" mb="6" align="center">
          <Text color="fg.muted">Sort by</Text>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                width="180px"
                bg="bg.muted"
                borderColor="border"
                justifyContent="space-between"
                fontWeight="normal"
              >
                {sortBy}
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content bg="bg.popover" borderWidth="1px" borderColor="border">
                <Menu.Item value="newest" onClick={() => setSortBy("newest")}>
                  newest
                </Menu.Item>
                <Menu.Item value="oldest" onClick={() => setSortBy("oldest")}>
                  oldest
                </Menu.Item>
                <Menu.Item value="name" onClick={() => setSortBy("name")}>
                  name
                </Menu.Item>
                <Menu.Item value="status" onClick={() => setSortBy("status")}>
                  status
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </HStack>

        <Stack gap="4">
          {mockCases.map((caseItem) => (
            <Box
              key={caseItem.id}
              cursor={caseItem.id === 1 ? "pointer" : "default"}
              onClick={caseItem.id === 1 ? () => handleCaseClick(caseItem.id) : undefined}
              _hover={caseItem.id === 1 ? { opacity: 0.8 } : {}}
              transition="opacity 0.2s"
            >
              <CaseCard {...caseItem} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
