import { Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

interface IProp {
  onSendMessage: (message: string) => void;
}
const ChatInput = ({ onSendMessage }: IProp) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      await onSendMessage(message.trim());
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <Flex p={4} bg="gray.100" alignItems="center" gap={2}>
      <Input
        flex={1}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        bg="white"
        borderRadius="md"
        boxShadow="sm"
      />
      <Button
        colorScheme="blue"
        onClick={handleSendMessage}
        borderRadius="md"
        disabled={!message.trim()}
      >
        Send
      </Button>
    </Flex>
  );
};

export default ChatInput;
