import { Box, Text, Heading, HStack } from "@chakra-ui/react";
import { Link as MainLink, Outlet } from "react-router-dom";
import { Link as LinkStyle } from "@chakra-ui/react";
import { NavHeader } from "@src/App";

function Auth() {
  return (
    <HStack spaceX={4}>
      <LinkStyle as={MainLink} to="/auth/register">
        Register
      </LinkStyle>
      <p>/</p>
      <LinkStyle as={MainLink} to="/auth/login">
        Login
      </LinkStyle>
    </HStack>
  );
}

export default function Home() {
  return (
    <>
      <NavHeader nav={<Auth/>} />
    </>
  );
}
