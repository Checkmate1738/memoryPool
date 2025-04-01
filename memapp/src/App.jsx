import { createContext } from "react";
import Index from "@src/content/Index";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

export const STATE = createContext();

export const NavHeader = ({ nav }) => {
  return (
    <>
      <Box
        position={"fixed"}
        width={"100%"}
        colorPalette={"blue"}
        zIndex={100}
        marginBottom={"1px"}
      >
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={4}
          bgColor={"colorPalette.700"}
        >
          <Box
            justifySelf={"flex-start"}
            bgColor={"colorPalette.300"}
            borderRadius={12}
            paddingX={4}
            paddingY={1}
            cursor={"pointer"}
          >
            <Heading as="h2" fontSize={"xx-large"} color={"colorPalette.600"}>
              {"Memory App"}
            </Heading>
            <Text as="p" color={"colorPalette.100"}>
              {"store tasks and notes"}
            </Text>
          </Box>
          <Box alignSelf={"center"}>{nav}</Box>
        </HStack>
      </Box>
    </>
  );
};

function App() {
  const title = "MEMPOOL";
  const bg_color = useColorModeValue("silver", "purple");
  const values = { title, bg_color };

  return (
    <>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
