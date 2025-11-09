import { Box, Card, HStack, Stack, Text, Badge } from "@chakra-ui/react";

type ServiceType =
  | "eviction"
  | "shelter"
  | "transitional"
  | "substance"
  | "food";
type StatusType = "unopened" | "accepted" | "denied" | "pending";

interface Service {
  type: ServiceType;
  label: string;
}

interface CaseCardProps {
  id: number;
  name: string;
  status: StatusType;
  statusText: string;
  receivedDate: string;
  lastUpdated: string;
  services: Service[];
  referredTo?: string[];
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
  food: "purple.200",
};

export function CaseCard({
  name,
  status,
  statusText,
  receivedDate,
  lastUpdated,
  services,
  referredTo = [],
}: CaseCardProps) {
  return (
    <Card.Root
      borderWidth="1px"
      borderColor={statusColors[status]}
      p="6"
      bg="bg"
      _hover={{ borderColor: statusColors[status] }}
      position="relative"
    >
      <Stack gap="1">
        <HStack justify="space-between" align="start">
          <HStack gap="3" align="center">
            <Text fontSize="lg" fontWeight="semibold" color="fg">
              {name}
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
          {services.length > 0 && (
            <HStack wrap="wrap" gap="2" justify="flex-end" maxW="60%">
              {services.map((service, index) => (
                <Badge
                  key={index}
                  bg={serviceColors[service.type]}
                  color="black"
                  borderWidth="0"
                  px="2"
                  py="1"
                >
                  {service.label}
                </Badge>
              ))}
            </HStack>
          )}
        </HStack>

        <Stack gap="2" fontSize="sm" color="fg.muted">
          <HStack>
            <Text fontWeight="medium">Received:</Text>
            <Text>{receivedDate}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium">Referred by:</Text>
            <Text>Headlamp</Text>
          </HStack>
          {referredTo.length > 0 && (
            <HStack align="start">
              <Text fontWeight="medium">Referred to:</Text>
              <Text>{referredTo.join(", ")}</Text>
            </HStack>
          )}
        </Stack>
      </Stack>

      <Box
        position="absolute"
        bottom="6"
        right="6"
        fontSize="sm"
        color="fg.muted"
      >
        <Text fontStyle="italic">Last updated {lastUpdated}</Text>
      </Box>
    </Card.Root>
  );
}

