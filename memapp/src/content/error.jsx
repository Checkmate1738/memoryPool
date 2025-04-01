import { Box, Heading, Text } from "@chakra-ui/react";

export function Error() {
  return (
    <Box>
      <Heading as="h2">{"404 Not Found"}</Heading>
      <Text as="p">{"page not found"}</Text>
    </Box>
  );
}
