import { NavHeader, STATE, SmallDeviceNav, isSmallDevice } from "@src/App";
import { Link as Route, useNavigate, redirect } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Link,
  Avatar,
  Input,
  Field,
  InputGroup,
  VStack,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuChevronLeft } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import userCircle from "@src/assets/userIcon.png";
import { useColorModeValue } from "@src/components/ui/color-mode";
import axios from "axios";
import { config } from "dotenv";
import { useContext, useState } from "react";

function LoginHeader() {
  const backBg = useColorModeValue("blue.200", "blue.400");
  const backColor = useColorModeValue("blue.400", "blue.600");
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
        <Button
          type="button"
          variant={"subtle"}
          borderRadius={12}
          size={"lg"}
          onClick={back}
          bgColor={backBg}
          display={"flex"}
          alignItems={"center"}
          color={backColor}
        >
          <LuChevronLeft />
          Back
        </Button>
      )}
    </>
  );
}

function LoginModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {setCredentials} = useContext(STATE)
  const navigate = useNavigate();

  const submit = async (data) => {
    data["grant_type"] = "password";
    data["scope"] = "";
    data["client_id"] = "";
    data["client_secret"] = null;
    console.log(data);
    try {
      const res = await axios.post(
        "http://192.168.100.56:3560/auth/login",
        new URLSearchParams({
          grant_type: data.grant_type,
          username: data.username,
          password: data.password,
          scope: data.scope,
          client_id: data.client_id,
          client_secret: data.client_secret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );
      setCredentials(res.data)//localStorage.setItem("credentials",res.data);
      console.log(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
    }
    reset();
  };

  return (
    <VStack
      width={"max-content"}
      display={"flex"}
      gapY={4}
      padding={4}
      justifyContent={"center"}
      borderLeftRadius={24}
      borderRightRadius={24}
    >
      <Image
        src={userCircle}
        width={32}
        bgColor={"blue.800"}
        borderRadius={100}
      />
      <form
        onSubmit={handleSubmit((e) => {
          submit(e);
        })}
      >
        <VStack gapY={2}>
          <Field.Root required invalid={!!errors.username}>
            <InputGroup startElement={<CiUser />}>
              <Input
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </InputGroup>
            <Field.ErrorText>{errors.username}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.password}>
            <InputGroup startElement={<TbLockPassword />}>
              <Input
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>
          <Input
            textAlign={"center"}
            marginTop={4}
            borderRadius={8}
            bgColor={"colorPalette.700"}
            type="submit"
            value={"LOGIN"}
          />
          <HStack paddingTop={4} flexDirection={"row-reverse"} gapX={4}>
            <Link as={Route} to={"/auth/forgot-password"}>
              Forgot your password
            </Link>
            <Checkbox.Root>
              {/*...register("rememberMe")*/}
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Remember Me</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
}

export default function Login() {
  return (
    <>
      <NavHeader nav={<LoginHeader />} />
      <Box
        position={"absolute"}
        top={24}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100vw"}
      >
        <LoginModel />
      </Box>
    </>
  );
}
