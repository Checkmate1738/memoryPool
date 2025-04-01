import { NavHeader, SmallDeviceNav, isSmallDevice } from "@src/App";
import { Link as Route, useNavigate } from "react-router-dom";
import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useColorModeValue } from "@src/components/ui/color-mode";

function LoginHeader() {
  const backBg = useColorModeValue("blue.200","blue.400")
  const navigate = useNavigate();
  const isSmall = isSmallDevice();

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      {isSmall ? (
        <SmallDeviceNav
          data={[
            <Box
              width={"100%"}
              onClick={back}
              display={"flex"}
              padding={2}
              alignItems={"center"}
            >
                <LuChevronLeft />
                Back
            </Box>,
          ]}
        />
      ) : (
        <Button type="button" variant={"outline"} onClick={back} bgColor={backBg} display={"flex"} alignItems={"center"}>
          <LuChevronLeft/>
          Back
        </Button>
      )}
    </>
  );
}

export default function Login() {
  return (
    <>
      <NavHeader nav={<LoginHeader />} />
      <Box position={"absolute"} top={24} width={"100vw"}>
        {"Login"}
      </Box>
    </>
  );
}
