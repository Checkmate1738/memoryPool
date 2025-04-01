import { createContext } from "react";
import Index from "@src/content/Index";
import {
  Box,
  Heading,
  Text,
  HStack,
  Link as LinkStyle,
} from "@chakra-ui/react";

export const STATE = createContext();

function App() {
  const title = "MEMPOOL"
  const values = {title};

  return (
    <>
      <Box>
        <Heading as="h2">{"Memory Pool"}</Heading>
        <Text as="p">{"store tasks and notes"}</Text>
      </Box>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
