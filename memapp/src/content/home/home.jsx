import { Box, Text, Heading, HStack } from "@chakra-ui/react";
import { Link as MainLink, Outlet } from "react-router-dom";
import { Link as LinkStyle } from "@chakra-ui/react";

function Auth() {
  return (
    <HStack spaceX={20}>
      <LinkStyle as={MainLink} to="/auth/register">
        Register
      </LinkStyle>

      <LinkStyle as={MainLink} to="/auth/login">
        Login
      </LinkStyle>
    </HStack>
  );
}

export default function Home() {
  return (
    <>
      <p>Home</p>
    </>
  );
}
