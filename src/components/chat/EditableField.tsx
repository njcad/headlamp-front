import { Box, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState, type KeyboardEvent } from "react";

export default function EditableField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const {
    label,
    value,
    onChange,
    multiline = false,
    placeholder,
    required,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const singleLineHeight = "10"; // consistent 40px
  const multiLineMinH = "28"; // consistent min height for textarea

  const handleBlur = () => {
    setIsEditing(false);
    onChange(localValue);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !multiline) {
      handleBlur();
    }
    if (e.key === "Escape") {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  return (
    <Stack gap="2">
      <Text fontSize="sm" fontWeight="medium" color="fg.muted">
        {label}
        {required && (
          <Text as="span" color="orange.500" ml="1">
            *
          </Text>
        )}
      </Text>
      {isEditing ? (
        multiline ? (
          <Textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            rows={4}
            size="md"
            minH={multiLineMinH}
            borderColor="orange.400"
            _focus={{
              borderColor: "orange.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
            }}
          />
        ) : (
          <Input
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            size="md"
            h={singleLineHeight}
            borderColor="orange.400"
            _focus={{
              borderColor: "orange.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-orange-500)",
            }}
          />
        )
      ) : (
        <Box
          px="3"
          py="2"
          rounded="md"
          borderWidth="1px"
          borderColor="border"
          bg="bg.muted"
          cursor="pointer"
          onClick={() => setIsEditing(true)}
          transition="all 0.2s"
          display="flex"
          alignItems="center"
          minH={multiline ? multiLineMinH : singleLineHeight}
          _hover={{
            borderColor: "orange.300",
            bg: "bg",
          }}
          position="relative"
        >
          <Text color={value ? "fg" : "fg.muted"}>
            {value || placeholder || "Click to edit"}
          </Text>
          <Box
            position="absolute"
            top="3"
            right="3"
            color="fg.muted"
            opacity="0.5"
            _groupHover={{ opacity: 1 }}
          >
            <Text as="span" fontSize="xs" aria-hidden="true">
              ✎
            </Text>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
