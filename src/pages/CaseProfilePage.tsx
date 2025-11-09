import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  Tabs,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuArrowLeft, LuPlus } from "react-icons/lu";
import { ServiceBadge } from "@/components/ServiceBadge";
import { ReferralCard } from "@/components/ReferralCard";

// Mock data - in a real app, this would come from a database
const mockCaseData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Jordan Smith",
    firstName: "Jordan",
    lastName: "Smith",
    preferredName: "Jordy",
    age: 19,
    dateOfBirth: "10-10-2006",
    email: "ng@gmail.com",
    phone: "(888) 100 - 1000",
    contactMethod: "Email or phone",
    contactNotes: "Do not text or leave voicemail",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    keywords: [
      { type: "eviction" as const, label: "Eviction Assistance" },
      { type: "shelter" as const, label: "Shelter" },
    ],
    caseSummary:
      "Jordy is currently experiencing housing instability and is seeking assistance with securing safe shelter and preventing an eviction. They have expressed concern about losing their current place to stay and are interested in emergency shelter options, rental support resources, and guidance regarding the eviction process. The client is open to receiving support and is looking for next steps to stabilize their housing situation.",
    referrals: [
      {
        id: 1,
        organization: "Bill Wilson Center",
        status: "accepted" as const,
        statusText: "Accepted",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
      {
        id: 2,
        organization: "California Youth Homeless Project",
        status: "unopened" as const,
        statusText: "Unopened",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
      {
        id: 3,
        organization: "Hope Solutions",
        status: "unopened" as const,
        statusText: "Unopened",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
      {
        id: 4,
        organization: "Hope Solutions",
        status: "unopened" as const,
        statusText: "Unopened",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
      {
        id: 5,
        organization: "Union Rescue Mission",
        status: "unopened" as const,
        statusText: "Unopened",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
      {
        id: 6,
        organization: "Union Rescue Mission",
        status: "unopened" as const,
        statusText: "Unopened",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "11/1/25 at 12:01 PM",
        referredBy: "Headlamp",
        lastUpdated: "11/7/25 at 3:21 PM",
      },
    ],
  },
  "2": {
    id: 2,
    name: "Nate Cadicamo",
    firstName: "Nate",
    lastName: "Cadicamo",
    preferredName: "Nate",
    age: 26,
    dateOfBirth: "05-15-1999",
    email: "ncadicamo@email.com",
    phone: "(888) 200 - 2000",
    contactMethod: "Email preferred",
    contactNotes: "Available weekdays after 2pm",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    keywords: [{ type: "transitional" as const, label: "Transitional Housing" }],
    caseSummary:
      "Nate is working with Union Mission Rescue on transitional housing options. He has been accepted into their program and is currently in the intake process. He is looking for stable housing while working on employment opportunities.",
    referrals: [
      {
        id: 1,
        organization: "Union Mission Rescue",
        status: "accepted" as const,
        statusText: "Accepted",
        service: {
          type: "transitional" as const,
          label: "Transitional Housing",
        },
        receivedDate: "10/15/25 at 10:30 AM",
        referredBy: "Headlamp",
        lastUpdated: "11/5/25 at 2:15 PM",
      },
    ],
  },
};

export default function CaseProfilePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const caseData = mockCaseData[caseId || "1"];

  if (!caseData) {
    return (
      <Box minH="100vh" bg="bg">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py="12">
          <Heading size="2xl" mb="4">
            Case Not Found
          </Heading>
          <Button onClick={() => navigate("/partner/dashboard")}>
            Back to Dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="bg" position="relative">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py="12">
        <Button
          variant="ghost"
          mb="6"
          onClick={() => navigate("/partner/dashboard")}
        >
          <LuArrowLeft style={{ marginRight: "8px" }} />
          Back to Dashboard
        </Button>

        <Heading size="2xl" fontWeight="semibold" color="fg" mb="8">
          {caseData.name}
        </Heading>

        <Tabs.Root defaultValue="profile">
          <HStack justify="space-between" mb="8" align="center">
            <Tabs.List bg="bg.muted" p="1" rounded="md">
              <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
              <Tabs.Trigger value="referrals">Referrals</Tabs.Trigger>
            </Tabs.List>

            <Button variant="ghost" colorPalette="orange">
              <LuPlus style={{ marginRight: "8px" }} />
              New referral
            </Button>
          </HStack>

          <Tabs.Content value="profile">
            <Stack gap="6">
              {/* Personal Information */}
              <Box
                bg="bg"
                borderWidth="1px"
                borderColor="border"
                rounded="xl"
                p="8"
              >
                <Heading size="lg" mb="6">
                  Personal Information
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 5 }} gap="6" mb="6" templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      First Name
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.firstName}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Last Name
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.lastName}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Preferred Name
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.preferredName}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Age
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.age}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Date of Birth
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.dateOfBirth}
                    </Text>
                  </Box>
                </SimpleGrid>

                <SimpleGrid 
                  columns={{ base: 1, md: 3 }} 
                  gap="8" 
                  mb="6" 
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  justifyContent="space-between"
                >
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Email
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.email}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Phone Number
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.phone}
                    </Text>
                  </Box>
                  <Box w="100%">
                    <Text fontSize="sm" color="fg.muted" mb="1">
                      Preferred Contact Method
                    </Text>
                    <Text fontSize="base" fontWeight="medium">
                      {caseData.contactMethod}
                    </Text>
                    {caseData.contactNotes && (
                      <Text fontSize="sm" color="fg" mt="1">
                        {caseData.contactNotes}
                      </Text>
                    )}
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text fontSize="sm" color="fg.muted" mb="3">
                    Keywords
                  </Text>
                  <HStack wrap="wrap" gap="2">
                    {caseData.keywords.map((keyword: any, index: number) => (
                      <ServiceBadge
                        key={index}
                        service={keyword.type}
                        label={keyword.label}
                      />
                    ))}
                  </HStack>
                </Box>
              </Box>

              {/* Case Summary */}
              <Box
                bg="bg"
                borderWidth="1px"
                borderColor="border"
                rounded="xl"
                p="8"
              >
                <Heading size="lg" mb="4">
                  Case Summary
                </Heading>
                <Text fontSize="base" color="fg" lineHeight="relaxed">
                  {caseData.caseSummary}
                </Text>
              </Box>
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="referrals">
            <Box position="relative" minH="400px">
              <Stack gap="4">
                {caseData.referrals && caseData.referrals.length > 0 ? (
                  caseData.referrals.map((referral: any) => (
                    <ReferralCard
                      key={referral.id}
                      organization={referral.organization}
                      status={referral.status}
                      statusText={referral.statusText}
                      service={referral.service}
                      receivedDate={referral.receivedDate}
                      referredBy={referral.referredBy}
                      lastUpdated={referral.lastUpdated}
                      showAddButton={referral.status === "unopened"}
                    />
                  ))
                ) : (
                  <Box
                    bg="bg"
                    borderWidth="1px"
                    borderColor="border"
                    rounded="xl"
                    p="8"
                  >
                    <Text color="fg.muted">No referrals yet.</Text>
                  </Box>
                )}
              </Stack>

              <Box
                position="absolute"
                bottom="0"
                right="0"
                fontSize="sm"
                color="fg.muted"
              >
                <Text fontStyle="italic">Last updated {caseData.lastUpdated}</Text>
              </Box>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Container>

      <Box
        position="absolute"
        bottom="6"
        right="6"
        fontSize="sm"
        color="fg.muted"
      >
        <Text fontStyle="italic">Last updated {caseData.lastUpdated}</Text>
      </Box>
    </Box>
  );
}
