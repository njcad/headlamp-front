import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { LuArrowUp } from "react-icons/lu";

export default function Composer() {
  const { sendMessage, sending } = useChatContext();
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    const text = value.trim();
    if (!text || sending) return;
    await sendMessage(text);
    setValue("");
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
      pr="3"
      pl="5"
      bg="bg"
      borderColor="border"
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
      />
      <Button
        size="sm"
        rounded="full"
        aria-label="Send message"
        onClick={onSubmit}
        loading={sending}
      >
        <LuArrowUp />
      </Button>
    </HStack>
  );
}
