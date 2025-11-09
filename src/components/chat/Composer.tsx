import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { LuArrowUp } from "react-icons/lu";

export default function Composer(props: {
  mode?: "chat" | "apply";
  onApply?: () => void | Promise<void>;
  disabled?: boolean;
  applyLabel?: string;
}) {
  const {
    mode = "chat",
    onApply,
    disabled,
    applyLabel = "Help me apply to these orgs",
  } = props;
  const { sendMessage, sending } = useChatContext();
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    const text = value.trim();
    if (!text || sending) return;
    setValue("");
    await sendMessage(text);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <HStack
      borderWidth="1px"
      rounded="full"
      p="1.5"
      px="3"
      bg="bg"
      borderColor="border"
      overflow="hidden"
      gap="0"
      alignItems="stretch"
    >
      {/* Chat (input + send) wrapper: collapses when mode === 'apply' */}
      <HStack
        flexBasis={mode === "apply" ? "0%" : "100%"}
        opacity={mode === "apply" ? 0 : 1}
        transition="flex-basis 280ms ease, opacity 180ms ease"
        overflow="hidden"
        aria-hidden={mode === "apply" ? "true" : "false"}
        pointerEvents={mode === "apply" ? "none" : "auto"}
        flexShrink={0}
        gap="2"
        minW="0"
      >
        <Input
          variant="flushed"
          border="0"
          bg="transparent"
          _focus={{ boxShadow: "none" }}
          placeholder="Message Headlamp..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={sending}
          pl="2"
          minW="0"
        />
        <Button
          size="sm"
          rounded="full"
          aria-label="Send message"
          onClick={onSubmit}
          disabled={sending}
        >
          <LuArrowUp />
        </Button>
      </HStack>

      {/* Apply button wrapper: grows leftwards (anchored to right) */}
      <HStack
        flexBasis={mode === "apply" ? "100%" : "0%"}
        opacity={mode === "apply" ? 1 : 0}
        transition="flex-basis 300ms ease, opacity 180ms ease"
        overflow="hidden"
        aria-hidden={mode === "apply" ? "false" : "true"}
        pointerEvents={mode === "apply" ? "auto" : "none"}
        flexShrink={0}
        gap="0"
        minW="0"
      >
        <Button
          size="md"
          rounded="full"
          w="full"
          bg="orange.400"
          color="white"
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.600" }}
          aria-label={applyLabel}
          onClick={onApply}
          disabled={disabled || sending}
        >
          {applyLabel}
        </Button>
      </HStack>
    </HStack>
  );
}
