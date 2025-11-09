import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import type { OrgType } from "@/types/chatTypes";
import { keyframes } from "@emotion/react";

export default function OrgCard(props: {
  org: OrgType;
  selected: boolean;
  onToggle: () => void;
  delayMs?: number;
}) {
  const { org, selected, onToggle, delayMs = 0 } = props;

  const fadeDown = keyframes`
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  return (
    <Box
      w="full"
      borderWidth="1px"
      borderColor={selected ? "orange.400" : "border"}
      rounded="lg"
      p="4"
      bg="bg"
      transition="border-color 0.2s, box-shadow 0.2s, transform 0.05s"
      _hover={{ borderColor: selected ? "orange.400" : "border.muted" }}
      _active={{ transform: "scale(0.998)" }}
      position="relative"
      cursor="pointer"
      onClick={onToggle}
      role="button"
      aria-pressed={selected}
      animation={`${fadeDown} 380ms ease-out both`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <HStack justify="space-between" align="start" w="full">
        <Stack gap="1" pr="10">
          <Text fontWeight="semibold">{org.name}</Text>
          <Text color="fg.muted" fontSize="sm">
            {org.description}
          </Text>
        </Stack>
        <Box
          as="button"
          aria-label={
            selected ? "Deselect organization" : "Select organization"
          }
          role="checkbox"
          aria-checked={selected}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          w="5"
          h="5"
          minW="5"
          minH="5"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          rounded="sm"
          borderWidth="2px"
          borderColor={selected ? "orange.400" : "border"}
          bg={selected ? "orange.400" : "transparent"}
          _hover={{
            borderColor: "orange.400",
          }}
          _active={{ transform: "scale(0.96)" }}
        >
          {selected ? <LuCheck size={14} color="white" /> : null}
        </Box>
      </HStack>
    </Box>
  );
}
