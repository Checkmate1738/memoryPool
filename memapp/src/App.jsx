import { createContext } from "react";
import Index from "@src/content/Index";
import {
  Box,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";

export const STATE = createContext();

export const NavHeader = ({nav}) => {
  return (
    <>
      <HStack display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Heading as="h2">{"Memory Pool"}</Heading>
          <Text as="p">{"store tasks and notes"}</Text>
        </Box>
        <Box>
          {nav}
        </Box>
      </HStack>
    </>
  );
};

function App() {
  const title = "MEMPOOL";
  const values = { title };

  return (
    <>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
