"use client";
import { Flex, Input, Stack, Button, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignalRHub from "@/services/SignalRHub";
import { setMessages, setOnlineUsers, setUser } from "@/app/features/userSlice";
const JoinCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  // * State
  const [data, setData] = useState<{ name: string; chatRoom: string }>({
    name: "",
    chatRoom: "",
  });
  const [errors, setErrors] = useState<{ name: string; chatRoom: string }>({
    name: "",
    chatRoom: "",
  });
  const navigate = useNavigate();
  // * Handlers
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const validateInput = (): boolean => {
    const newErrors: { name?: string; chatRoom?: string } = {};
    if (data.name.length === 0) {
      newErrors["name"] = "* Name is required";
    } else if (data.name.length < 2) {
      newErrors.name = "* Name must be at least 2 characters";
    }
    if (data.chatRoom.length === 0) {
      newErrors.chatRoom = "* Chat Room is required";
    }
    if (data.chatRoom.length < 2) {
      newErrors.chatRoom = "* Chat Room must be at least 2 characters";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length == 0;
  };
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInput()) return;
    try {
      // Connect to SignalR Hub
      await SignalRHub.startConnection();

      await SignalRHub.onUsersInRoom((users) =>
        dispatch(setOnlineUsers(users))
      );
      await SignalRHub.onReceiveMessage((user: string, message: string) => {
        dispatch(
          setMessages({
            content: message,
            user: user,
          })
        );
      });
      dispatch(setUser({ name: data.name, chatRoom: data.chatRoom }));
      // invoke Join the room
      await SignalRHub.joinRoom(data.name, data.chatRoom);

      // Navigate to chat page
      navigate("/room");
    } catch (err) {
      console.error("Error joining room", err);
    }
  };
  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue(
        "linear-gradient(to bottom, #e2e8f0, #edf2f7)",
        "linear-gradient(to bottom, #2D3748, #1A202C)"
      )}
      height="100vh"
      p={4}
    >
      <Stack
        mx="auto"
        maxW="lg"
        w="full"
        py={12}
        px={6}
        gap={8}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="2xl"
        rounded="lg"
      >
        <Stack align={"center"}>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            textAlign="center"
          >
            Join to your ChatRoom
          </Heading>
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={useColorModeValue("gray.600", "gray.300")}
            textAlign="center"
          >
            to enjoy all of our cool{" "}
            <Text as="span" color="blue.400">
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <form
          style={{
            borderRadius: "0.5rem",
            background: useColorModeValue("white", "gray.700"),
            boxShadow: "2xl",
            padding: "2rem",
          }}
          onSubmit={onSubmitHandler}
        >
          <Stack gap={"1.5rem"}>
            <FormControl id="name">
              <FormLabel fontWeight="bold">UserName</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={onChangeHandler}
                bg={useColorModeValue("gray.100", "gray.800")}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                _hover={{ borderColor: "blue.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.name && (
                <FormHelperText color="red" fontSize={"small"} py={"2px"}>
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="ChatRoom">
              <FormLabel fontWeight="bold">ChatRoom</FormLabel>
              <Input
                type="text"
                name="chatRoom"
                placeholder="Enter ChatRoom Name"
                onChange={onChangeHandler}
                bg={useColorModeValue("gray.100", "gray.800")}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                _hover={{ borderColor: "blue.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
              {errors.chatRoom && (
                <FormHelperText color="red" fontSize={"small"} py={"2px"}>
                  {errors.chatRoom}
                </FormHelperText>
              )}
            </FormControl>
            <Stack>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                fontWeight="bold"
                _hover={{
                  bg: "blue.500",
                  transform: "scale(1.05)",
                }}
                _active={{
                  bg: "blue.600",
                  transform: "scale(0.95)",
                }}
                transition="all 0.2s ease-in-out"
              >
                Join
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default JoinCard;
