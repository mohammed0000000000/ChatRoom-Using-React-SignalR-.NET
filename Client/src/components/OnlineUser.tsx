import { selectName, selectOnlineUsers } from "@/app/features/userSlice";
import { Heading, List, Box, ListItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const OnlineUser = () => {
  const users: string[] = useSelector(selectOnlineUsers);
  const name = useSelector(selectName);
  return (
    <Box>
      <Heading
        textAlign="center"
        pb="1rem"
        color="blue.600"
        fontSize="xl"
        textDecoration={"underline"}
      >
        Online Users
      </Heading>
      <List.Root listStyleType="none" m={0} p={0}>
        {users.map((user, idx) =>
          user != name ? (
            <ListItem
              key={idx}
              bg="gray.100"
              color="gray.700"
              fontWeight={"semibold"}
              textAlign="center"
              p="0.75rem"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ bg: "blue.50", color: "blue.600" }}
              marginBottom={".3rem"}
            >
              {user}
            </ListItem>
          ) : null
        )}
      </List.Root>
    </Box>
  );
};

export default OnlineUser;
