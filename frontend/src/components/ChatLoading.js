import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  const skeletons = Array.from({ length: 12 }); // Creates an array of 12 items

  return (
    <Stack spacing={4}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height="45px" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
