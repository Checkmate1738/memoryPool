import { createContext, useEffect, useState } from "react";
import Index from "@src/content/Index";
import {
  Box,
  Heading,
  Text,
  HStack,
  CloseButton,
  Drawer,
  Portal,
  Button,
} from "@chakra-ui/react";
import { Link as Route } from "react-router-dom";
//import {}
import { useColorModeValue, useColorMode } from "./components/ui/color-mode";
import { redirect } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";

export const STATE = createContext();

export const NavHeader = ({ nav }) => {
  const { toggleColorMode } = useColorMode();
  const titleColor = useColorModeValue("colorPalette.300", "colorPalette.400");
  const small = isSmallDevice();
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
            bgColor={titleColor}
            borderRadius={12}
            paddingX={4}
            paddingY={1}
            cursor={"pointer"}
            onClick={() => {
              toggleColorMode();
            }}
          >
            <Heading
              as="h2"
              display={"flex"}
              fontSize={"xx-large"}
              color={"colorPalette.600"}
              flexWrap={"nowrap"}
            >
              {"Memory"}
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

export function isSmallDevice() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }

    if (screen.orientation.type == "portrait") {
      screen.orientation
        .lock("portrait") // or "landscape"
        .then(() => {alert("Orientation locked"); alert(screen.orientation.type)})
        .catch((err) => {alert("Error locking orientation: ", err); alert(screen.orientation.type)});
    }
  }, []);

  return isSmall;
}

/*
<Link margin={2} border={"1px solid green"} padding={4} as={Route} key={index} to={item.path}>
                    {item.name}
                  </Link>
*/

export function SmallDeviceNav({ data }) {
  const navs = data;
  const bg_drawer = useColorModeValue("colorPalette.500", "colorPalette.900");

  return (
    <>
      <Box>
        <Drawer.Root colorPalette={"blue"} size={"xs"} trapFocus={false}>
          <Drawer.Trigger asChild>
            <Button>
              <LuAlignJustify />
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header></Drawer.Header>
                <Drawer.Body overflowY={"scroll"}>
                  {navs.map((item, index) => (
                    <Box
                      bgColor={bg_drawer}
                      fontSize={24}
                      padding={2}
                      key={index}
                      marginTop={2}
                      borderRadius={8}
                    >
                      {item}
                    </Box>
                  ))}
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>
    </>
  );
}

function App() {
  const title = "MEMPOOL";
  const bg_color = useColorModeValue("silver", "purple");
  const [credentials,setCredentials] = useState({})
  const values = { title, bg_color,credentials,setCredentials };

  return (
    <>
      <STATE.Provider value={values}>
        <Index />
      </STATE.Provider>
    </>
  );
}

export default App;
