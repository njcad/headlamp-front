import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  Field,
  Heading,
  HStack,
  Input,
  Menu,
  Stack,
  Text,
  Tabs,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuChevronDown, LuX, LuPlus } from "react-icons/lu";
import { CaseCard } from "@/components/CaseCard";
import { ServiceBadge } from "@/components/ServiceBadge";
import { ReferralCard } from "@/components/ReferralCard";

type CaseStatus = "unopened" | "accepted" | "denied" | "pending";

const statusColors: Record<CaseStatus, string> = {
  unopened: "gray.500",
  accepted: "green.500",
  denied: "red.500",
  pending: "yellow.500",
};

const statusLabelMap: Record<CaseStatus, string> = {
  unopened: "Unopened",
  accepted: "Accepted",
  denied: "Denied",
  pending: "Pending",
};

const statusOptions: CaseStatus[] = ["unopened", "accepted", "denied", "pending"];

type CaseServiceType =
  | "eviction"
  | "shelter"
  | "transitional"
  | "substance"
  | "food";

type CaseService = {
  type: CaseServiceType;
  label: string;
};

type CaseOverview = {
  id: number;
  name: string;
  status: CaseStatus;
  statusText: string;
  receivedDate: string;
  lastUpdated: string;
  services: CaseService[];
};

const mockCases: CaseOverview[] = [
  {
    id: 1,
    name: "Jordan Smith",
    status: "unopened",
    statusText: "Unopened",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "food", label: "Food Assistance" },
      { type: "shelter", label: "Shelter" },
    ] satisfies CaseService[],
  },
  {
    id: 2,
    name: "Nate Cadicamo",
    status: "accepted",
    statusText: "Accepted at Mission Rescue Union",
    receivedDate: "10/31/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "transitional", label: "Transitional Housing" },
    ] satisfies CaseService[],
  },
  {
    id: 3,
    name: "Skye Hathaway",
    status: "denied",
    statusText: "Denied",
    receivedDate: "10/28/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "shelter", label: "Shelter" },
      { type: "substance", label: "Substance-Free Housing" },
    ] satisfies CaseService[],
  },
  {
    id: 4,
    name: "Hamed Hekmat",
    status: "pending",
    statusText: "Pending at CHYP",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "eviction", label: "Eviction Assistance" },
      { type: "transitional", label: "Transitional Housing" },
    ] satisfies CaseService[],
  },
  {
    id: 5,
    name: "Grace Buzzell",
    status: "accepted",
    statusText: "Accepted at Bill Wilson Center",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    services: [
      { type: "substance", label: "Substance-Free Housing" },
    ] satisfies CaseService[],
  },
];

// Helper function to parse date string "11/1/25 at 12:01 PM" to Date object
const parseDate = (dateString: string): Date => {
  // Extract date part (before " at ")
  const datePart = dateString.split(" at ")[0];
  const [month, day, year] = datePart.split("/");
  // Convert 2-digit year to 4-digit (assuming 20xx)
  const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
  return new Date(fullYear, parseInt(month) - 1, parseInt(day));
};

// Mock case data - same as in CaseProfilePage
const mockCaseData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Jordan Smith",
    firstName: "Jordan",
    lastName: "Smith",
    preferredName: "Jordy",
    age: 18,
    dateOfBirth: "10-10-2007",
    email: "js@gmail.com",
    phone: "(888) 100 - 1000",
    contactMethod: "Email or phone",
    contactNotes: "Do not text or leave voicemail",
    receivedDate: "11/1/25 at 12:01 PM",
    lastUpdated: "11/7/25 at 3:21 PM",
    keywords: [
      { type: "food" as const, label: "Food Assistance" },
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
      "Nate is working with Mission Rescue Union on transitional housing options. He has been accepted into their program and is currently in the intake process. He is looking for stable housing while working on employment opportunities.",
    referrals: [
      {
        id: 1,
        organization: "Mission Rescue Union",
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

export default function PartnerDashboardPage() {
  const [sortBy, setSortBy] = useState("newest");
  const [cases, setCases] = useState<CaseOverview[]>(mockCases);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [addedReferrals, setAddedReferrals] = useState<Set<string>>(new Set());
  const [noteModalOpen, setNoteModalOpen] = useState<{
    caseId: number;
    referralId: number;
    organization?: string;
  } | null>(null);
  const [noteText, setNoteText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newReferralModalOpen, setNewReferralModalOpen] = useState(false);
  const [organizationSearchQuery, setOrganizationSearchQuery] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

  const handleCaseClick = (caseId: number) => {
    setSelectedCaseId(caseId);
  };

  const handleAddReferral = (caseId: number, referralId: number) => {
    setNoteModalOpen({ caseId, referralId });
    setNoteText("");
    setSelectedFiles([]);
  };

  const handleNewReferralSend = () => {
    if (selectedOrganization && selectedCaseId) {
      setNoteModalOpen({ 
        caseId: selectedCaseId, 
        referralId: -1, // Use -1 to indicate new referral
        organization: selectedOrganization 
      });
      setNewReferralModalOpen(false);
      setOrganizationSearchQuery("");
      setSelectedOrganization(null);
      setNoteText("");
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNoteSubmit = () => {
    if (noteModalOpen) {
      // For new referrals (referralId === -1), we still track them
      // For existing referrals, add to the addedReferrals set
      if (noteModalOpen.referralId !== -1) {
        const key = `${noteModalOpen.caseId}-${noteModalOpen.referralId}`;
        setAddedReferrals((prev) => {
          const newSet = new Set(prev);
          newSet.add(key);
          return newSet;
        });
      }
      // Note: For new referrals, you could add logic here to actually create the referral
      // For now, we just close the modal
      setNoteModalOpen(null);
      setNoteText("");
      setSelectedFiles([]);
    }
  };

  const caseData = selectedCaseId ? mockCaseData[selectedCaseId.toString()] : null;

  // Extract all unique organizations from mockCaseData
  const allOrganizations = useMemo(() => {
    const orgs = new Set<string>();
    Object.values(mockCaseData).forEach((caseData: any) => {
      if (caseData.referrals) {
        caseData.referrals.forEach((referral: any) => {
          orgs.add(referral.organization);
        });
      }
    });
    return Array.from(orgs).sort();
  }, []);

  // Filter organizations based on search query
  const filteredOrganizations = useMemo(() => {
    if (!organizationSearchQuery.trim()) {
      return allOrganizations;
    }
    const query = organizationSearchQuery.toLowerCase();
    return allOrganizations.filter((org) =>
      org.toLowerCase().includes(query)
    );
  }, [allOrganizations, organizationSearchQuery]);

  const sortedCases = useMemo(() => {
    const sorted = [...cases];

    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => {
          const dateA = parseDate(a.receivedDate);
          const dateB = parseDate(b.receivedDate);
          return dateB.getTime() - dateA.getTime(); // Descending (newest first)
        });
      case "oldest":
        return sorted.sort((a, b) => {
          const dateA = parseDate(a.receivedDate);
          const dateB = parseDate(b.receivedDate);
          return dateA.getTime() - dateB.getTime(); // Ascending (oldest first)
        });
      case "needs":
        return sorted.sort((a, b) => {
          const needsA = a.services.length > 0 ? a.services[0].label : "";
          const needsB = b.services.length > 0 ? b.services[0].label : "";
          return needsA.localeCompare(needsB);
        });
      case "status":
        return sorted.sort((a, b) => a.statusText.localeCompare(b.statusText));
      default:
        return sorted;
    }
  }, [cases, sortBy]);

  const handleStatusChange = (caseId: number, nextStatus: CaseStatus) => {
    setCases((prev) =>
      prev.map((caseItem) => {
        if (caseItem.id !== caseId) return caseItem;
        const customText = caseItem.statusText;
        const defaultText = statusLabelMap[nextStatus];
        const nextText =
          caseItem.status === nextStatus && customText
            ? customText
            : defaultText;
        return {
          ...caseItem,
          status: nextStatus,
          statusText: nextText,
        };
      })
    );
  };

  return (
    <Box minH="100vh" bg="bg">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py="12">
        <Heading size="2xl" fontWeight="semibold" color="fg" mb="8">
          California Youth Homeless Project's Dashboard
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
                <LuChevronDown />
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
                <Menu.Item value="needs" onClick={() => setSortBy("needs")}>
                  needs
                </Menu.Item>
                <Menu.Item value="status" onClick={() => setSortBy("status")}>
                  status
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </HStack>

        <Stack gap="4">
          {sortedCases.map((caseItem) => (
            <Box
              key={caseItem.id}
              cursor="pointer"
              onClick={() => handleCaseClick(caseItem.id)}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <CaseCard {...caseItem} />
            </Box>
          ))}
        </Stack>
      </Container>

      {caseData && (
        <Dialog.Root
          open={selectedCaseId !== null}
          onOpenChange={(e) => {
            if (!e.open) setSelectedCaseId(null);
          }}
        >
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="7xl" maxH="90vh" overflowY="auto">
              <Dialog.Header>
                <HStack justify="space-between" align="center" w="full">
                  <HStack align="center" gap="4">
                    <Heading size="2xl" fontWeight="semibold" color="fg">
                      {caseData.name}
                    </Heading>
                    {(() => {
                      const activeCase = cases.find(
                        (caseItem) => caseItem.id === caseData.id
                      );
                      if (!activeCase) return null;
                      const statusColor = statusColors[activeCase.status];
                      const statusLabel = activeCase.statusText;
                      return (
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              rounded="full"
                              fontWeight="medium"
                              px="3"
                              py="1.5"
                            >
                              <HStack gap="2" align="center">
                                <Box
                                  w="8px"
                                  h="8px"
                                  rounded="full"
                                  bg={statusColor}
                                />
                                <Text fontSize="sm" color="fg.muted">
                                  {statusLabel}
                                </Text>
                                <LuChevronDown size={14} />
                              </HStack>
                            </Button>
                          </Menu.Trigger>
                          <Menu.Positioner>
                            <Menu.Content>
                              {statusOptions.map((option) => (
                                <Menu.Item
                                  key={option}
                                  value={option}
                                  onClick={() => handleStatusChange(caseData.id, option)}
                                >
                                  {statusLabelMap[option]}
                                </Menu.Item>
                              ))}
                            </Menu.Content>
                          </Menu.Positioner>
                        </Menu.Root>
                      );
                    })()}
                  </HStack>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <LuX />
                    </Button>
                  </Dialog.CloseTrigger>
                </HStack>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Root defaultValue="profile">
                  <HStack justify="space-between" mb="8" align="center">
                    <Tabs.List bg="bg.muted" p="1" rounded="md">
                      <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                      <Tabs.Trigger value="referrals">Referrals</Tabs.Trigger>
                    </Tabs.List>

                    <Button
                      variant="ghost"
                      colorPalette="orange"
                      onClick={() => {
                        setNewReferralModalOpen(true);
                        setOrganizationSearchQuery("");
                        setSelectedOrganization(null);
                      }}
                    >
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
                        borderColor="orange.400"
                        rounded="xl"
                        p="8"
                      >
      <Heading size="lg" mb="6">
                          Personal Information
                        </Heading>

                        <SimpleGrid
                          columns={{ base: 1, md: 5 }}
                          gap="6"
                          mb="6"
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(5, minmax(0, 1fr))",
                          }}
                          w="100%"
                        >
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

                        <Box mb="6">
                          <Text fontSize="sm" color="fg.muted" mb="1">
                            Contact
                          </Text>
                          <Text fontSize="base" fontWeight="medium">
                            {caseData.email}
                          </Text>
                          <Text fontSize="base" fontWeight="medium">
                            {caseData.phone}
                          </Text>
                        </Box>

                        <Box mb="6">
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

                        <Box>
                          <Text fontSize="sm" color="fg.muted" mb="3">
                            Keywords
                          </Text>
                          <HStack wrap="wrap" gap="2">
                            {caseData.keywords.map(
                              (keyword: any, index: number) => (
                                <ServiceBadge
                                  key={index}
                                  service={keyword.type}
                                  label={keyword.label}
                                />
                              )
                            )}
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
                    {caseData.referrals && caseData.referrals.length > 0 ? (
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        gap="4"
                        templateColumns={{
                          base: "1fr",
                          md: "repeat(2, 1fr)",
                        }}
                      >
                        {caseData.referrals.map((referral: any) => {
                          const referralKey = `${selectedCaseId}-${referral.id}`;
                          const isAdded = addedReferrals.has(referralKey);
                          return (
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
                              onAdd={() => handleAddReferral(selectedCaseId!, referral.id)}
                              isAdded={isAdded}
                            />
                          );
                        })}
                      </SimpleGrid>
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
                  </Tabs.Content>
                </Tabs.Root>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}

      {/* Note Modal */}
      {noteModalOpen && (
        <Dialog.Root
          open={noteModalOpen !== null}
          onOpenChange={(e) => {
            if (!e.open) {
              setNoteModalOpen(null);
              setNoteText("");
              setSelectedFiles([]);
            }
          }}
        >
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="md">
              <Dialog.Header>
                <Heading size="lg">Add a note</Heading>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Note</Field.Label>
                    <Input
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Enter your note..."
                    />
                  </Field.Root>

                  <Box>
                    <Field.Root>
                      <Field.Label>Files</Field.Label>
                      <Button
                        as="label"
                        variant="outline"
                        cursor="pointer"
                        size="sm"
                      >
                        Add file
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={handleFileSelect}
                        />
                      </Button>
                    </Field.Root>
                    {selectedFiles.length > 0 && (
                      <Stack gap="2" mt="3">
                        {selectedFiles.map((file, index) => (
                          <HStack
                            key={index}
                            justify="space-between"
                            p="2"
                            bg="bg.muted"
                            rounded="md"
                          >
                            <Text fontSize="sm" truncate maxW="200px">
                              {file.name}
                            </Text>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => handleRemoveFile(index)}
                            >
                              Remove
                            </Button>
                          </HStack>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <HStack gap="2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setNoteModalOpen(null);
                      setNoteText("");
                      setSelectedFiles([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleNoteSubmit}>Send</Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}

      {/* New Referral Modal */}
      <Dialog.Root
        open={newReferralModalOpen}
        onOpenChange={(e) => {
          if (!e.open) {
            setNewReferralModalOpen(false);
            setOrganizationSearchQuery("");
            setSelectedOrganization(null);
          }
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="lg">
            <Dialog.Header>
              <Heading size="lg">New Referral</Heading>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Search organizations</Field.Label>
                  <Input
                    value={organizationSearchQuery}
                    onChange={(e) => setOrganizationSearchQuery(e.target.value)}
                    placeholder="Type to search..."
                  />
                </Field.Root>

                <Box
                  maxH="400px"
                  overflowY="auto"
                  borderWidth="1px"
                  borderColor="border"
                  rounded="md"
                  p="2"
                >
                  {filteredOrganizations.length > 0 ? (
                    <Stack gap="1">
                      {filteredOrganizations.map((org, index) => (
                        <Button
                          key={index}
                          variant={selectedOrganization === org ? "solid" : "ghost"}
                          colorPalette={selectedOrganization === org ? "blue" : undefined}
                          justifyContent="flex-start"
                          onClick={() => {
                            setSelectedOrganization(org);
                          }}
                        >
                          {org}
                        </Button>
                      ))}
                    </Stack>
                  ) : (
                    <Box p="4" textAlign="center">
                      <Text color="fg.muted">
                        No organizations found matching "{organizationSearchQuery}"
                      </Text>
                    </Box>
                  )}
                </Box>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <HStack gap="2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setNewReferralModalOpen(false);
                    setOrganizationSearchQuery("");
                    setSelectedOrganization(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNewReferralSend}
                  disabled={!selectedOrganization}
                >
                  Next
                </Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      </Box>
  );
}
