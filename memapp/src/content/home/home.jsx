import { Box, Text, Heading, HStack } from "@chakra-ui/react";
import { Link as MainLink } from "react-router-dom";
import { Link as LinkStyle } from "@chakra-ui/react";
import { useContext } from "react";
import { NavHeader, STATE, isSmallDevice, SmallDeviceNav } from "@src/App";

function Auth() {
  const small = isSmallDevice();
  return small ? (
    <SmallDeviceNav
      data={[
        <LinkStyle
          as={MainLink}
          variant={"plain"}
          to="/auth/login"
          padding={2}
          width={"100%"}
        >
          Login
        </LinkStyle>,
        <LinkStyle
          as={MainLink}
          variant={"plain"}
          to="/auth/register"
          padding={2}
          width={"100%"}
        >
          Register
        </LinkStyle>,
      ]}
    />
  ) : (
    <HStack spaceX={"1px"}>
      <LinkStyle as={MainLink} variant={"plain"} to="/auth/login">
        Login
      </LinkStyle>
      <p>/</p>
      <LinkStyle as={MainLink} variant={"plain"} to="/auth/register">
        Register
      </LinkStyle>
    </HStack>
  );
}

export default function Home() {
  const { bg_color } = useContext(STATE);
  return (
    <Box colorPalette={"cyan"}>
      <NavHeader nav={<Auth />} />
      <Box
        position={"absolute"}
        top={24}
        minHeight={"100vh"}
        bgColor={"colorPalette.900"}
        width={"100vw"}
      >
        <p>Home</p>
      </Box>
    </Box>
  );
}
