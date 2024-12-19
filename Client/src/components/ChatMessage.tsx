import { selectMessages, selectName } from "@/app/features/userSlice";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const ChatMessages = () => {
  const messages = useSelector(selectMessages);
  const user = useSelector(selectName);
  return (
    <Box
      flex={1}
      bg="white"
      p={4}
      borderRadius="md"
      overflowY="auto"
      boxShadow="sm"
    >
      <VStack align="stretch">
        {messages &&
          messages.map((msg, idx) => (
            <Box
              key={idx}
              p={2}
              bg={msg.user == user ? "green.100" : "blue.50"}
              borderRadius="md"
              boxShadow="sm"
              alignSelf={msg.user == user ? "flex-end" : "flex-start"}
              minW={"100px"}
            >
              <Text fontSize="sm" color="red.500">
                {msg.user}
              </Text>
              <Text fontSize="md" color="gray.800">
                {msg.content}
              </Text>
            </Box>
          ))}
      </VStack>
    </Box>
  );
};

export default ChatMessages;
