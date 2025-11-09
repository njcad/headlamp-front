import { Badge } from "@chakra-ui/react";

type ServiceType =
  | "eviction"
  | "shelter"
  | "transitional"
  | "substance"
  | "food";

interface ServiceBadgeProps {
  service: ServiceType;
  label: string;
}

const serviceColors: Record<ServiceType, string> = {
  eviction: "blue.100",
  shelter: "purple.100",
  transitional: "orange.100",
  substance: "pink.100",
  food: "purple.200",
};

export function ServiceBadge({ service, label }: ServiceBadgeProps) {
  return (
    <Badge
      bg={serviceColors[service]}
      color="black"
      borderWidth="0"
      px="2"
      py="1"
    >
      {label}
    </Badge>
  );
}

