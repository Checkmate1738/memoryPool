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
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as Route } from "react-router-dom";
//import {}
import { useColorModeValue } from "./components/ui/color-mode";
import { redirect } from "react-router-dom";
import { LuAlignJustify } from "react-icons/lu";

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
            onClick={() => {
              return redirect("/");
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

export function isSmallDevice(){
  const [isSmall,setIsSmall] = useState(false)

  useEffect(()=>{
    console.log(window.innerWidth)
    if (window.innerWidth < 1000){
      setIsSmall(true)
    }else{
      setIsSmall(false)
    }
  },[])

  return isSmall;
}

/*
<Link margin={2} border={"1px solid green"} padding={4} as={Route} key={index} to={item.path}>
                    {item.name}
                  </Link>
*/

export function SmallDeviceNav({data}) {
  const navs = data;

  return (
    <>
      <Drawer.Root size={"xs"}>
        <Drawer.Trigger asChild>
          <Button>
            <LuAlignJustify />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding={4}>
            <Drawer.Content rounded="md">
              <Drawer.Header></Drawer.Header>
              <Drawer.Body overflowY={"scroll"}>
                {navs.map((item, index) => (
                  <Box margin={2} borderBottom={"1px solid silver"} padding={4} key={index}>
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
    </>
  );
}

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
