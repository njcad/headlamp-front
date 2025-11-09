import { Box, HStack, Text } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

export default function ConsentCheckbox(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const { checked, onChange } = props;

  return (
    <HStack
      gap="3"
      align="start"
      p="4"
      rounded="lg"
      borderWidth="1px"
      borderColor={checked ? "fg" : "border"}
      bg="bg.subtle"
      cursor="pointer"
      onClick={() => onChange(!checked)}
      transition="all 0.2s"
      _hover={{
        borderColor: "border.emphasized",
      }}
    >
      <Box
        as="button"
        aria-label={checked ? "Revoke consent" : "Give consent"}
        role="checkbox"
        aria-checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
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
        borderColor={checked ? "fg" : "border"}
        bg={checked ? "fg" : "transparent"}
        mt="0.5"
        _hover={{
          borderColor: "fg",
        }}
        _active={{ transform: "scale(0.96)" }}
      >
        {checked ? <LuCheck size={12} color="white" /> : null}
      </Box>
      <Text fontSize="sm" lineHeight="1.6" color="fg.muted">
        I consent to sharing this application with the selected organizations. I
        understand that these organizations may contact me and may refer me to
        other partner organizations that can help with my needs.
      </Text>
    </HStack>
  );
}
