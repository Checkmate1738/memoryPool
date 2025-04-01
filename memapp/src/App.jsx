import { createContext } from "react";
import Index from "@src/content/Index";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

export const STATE = createContext();

export const NavHeader = ({ nav, bColor }) => {
  return (
    <>
      <Box position={"fixed"} width={"100%"}>
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={4}
          borderBottom={`2px solid ${bColor}`}
        >
          <Box justifySelf={"flex-start"}>
            <Heading as="h2">{"Memory App"}</Heading>
            <Text as="p">{"store tasks and notes"}</Text>
          </Box>
          <Box alignSelf={"center"}>{nav}</Box>
        </HStack>
      </Box>
    </>
  );
};

function App() {
  const title = "MEMPOOL";
  const navBorderColor = useColorModeValue("black", "silver");
  const bg_color = useColorModeValue("silver", "purple");
  const values = { title, navBorderColor, bg_color };

  return (
    <>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
