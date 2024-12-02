import { Box, Text } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Text fontSize="xl" color="gray.500">
          Select a chat to start messaging.
        </Text>
      )}
    </Box>
  );
};

export default Chatbox;
