import { Box, Card, HStack, Stack, Text, Badge, Button } from "@chakra-ui/react";

type ServiceType = "eviction" | "shelter" | "transitional" | "substance";
type StatusType = "unopened" | "accepted" | "denied" | "pending";

interface Service {
  type: ServiceType;
  label: string;
}

interface ReferralCardProps {
  organization: string;
  status: StatusType;
  statusText: string;
  service: Service;
  receivedDate: string;
  referredBy: string;
  lastUpdated: string;
  showAddButton?: boolean;
  onAdd?: () => void;
  isAdded?: boolean;
}

const statusColors: Record<StatusType, string> = {
  unopened: "gray.500",
  accepted: "green.500",
  denied: "red.500",
  pending: "yellow.500",
};

const serviceColors: Record<ServiceType, string> = {
  eviction: "blue.100",
  shelter: "purple.100",
  transitional: "orange.100",
  substance: "pink.100",
};

export function ReferralCard({
  organization,
  status,
  statusText,
  service,
  receivedDate,
  referredBy,
  lastUpdated,
  showAddButton = false,
  onAdd,
  isAdded = false,
}: ReferralCardProps) {
  return (
    <Card.Root
      borderWidth="1px"
      borderColor="border"
      p="6"
      bg="bg"
      _hover={{ borderColor: "border.emphasized" }}
    >
      <Stack gap="4">
        <HStack justify="space-between" align="center">
          <HStack gap="3" align="center" flex="1">
            <Text fontSize="lg" fontWeight="semibold" color="fg">
              {organization}
            </Text>
            <HStack gap="2" align="center">
              <Box
                w="8px"
                h="8px"
                rounded="full"
                bg={statusColors[status]}
              />
              <Text fontSize="sm" color="fg.muted">
                {statusText}
              </Text>
            </HStack>
          </HStack>
          {showAddButton && !isAdded && (
            <Button size="sm" variant="outline" onClick={onAdd}>
              Add
            </Button>
          )}
        </HStack>

        <Stack gap="2" fontSize="sm" color="fg.muted">
          <HStack>
            <Text fontWeight="medium">Service:</Text>
            <Badge
              bg={serviceColors[service.type]}
              color="black"
              borderWidth="0"
              px="2"
              py="1"
            >
              {service.label}
            </Badge>
          </HStack>
          <HStack>
            <Text fontWeight="medium">Received:</Text>
            <Text>{receivedDate}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium">Referred by:</Text>
            <Text>{isAdded ? `${referredBy}, Your Org` : referredBy}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium">Last Updated:</Text>
            <Text>{lastUpdated}</Text>
          </HStack>
        </Stack>
      </Stack>
    </Card.Root>
  );
}

