import { NavHeader, isSmallDevice, SmallDeviceNav } from "@src/App";
import { Link as Route, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Link,
  VStack,
  Field,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useColorModeValue } from "@src/components/ui/color-mode";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { BsUnlock } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { LuChevronLeft } from "react-icons/lu";
import axios from "axios";

function RegisterHeader() {
  const backBg = useColorModeValue("blue.200", "blue.400");
  const backColor = useColorModeValue("blue.500", "blue.800");
  const navigate = useNavigate();
  const small = isSmallDevice();

  const back = () => {
    navigate(-1);
  };

  return small ? (
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
    <HStack>
      <Button
        type="button"
        variant={"subtle"}
        borderRadius={12}
        size={"lg"}
        onClick={back}
        bgColor={backBg}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        color={backColor}
      >
        <LuChevronLeft />
        Back
      </Button>
    </HStack>
  );
}

function RegisterModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords don't match");
    }
    delete data.confirmPassword;
    data["role"] = "member";
    data["sender"] = "browser";
    console.log(data);
    const url = "http://192.168.100.56:3560/auth/register";
    const header = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const feedback = await axios.post(url,data,{headers: header});
      console.log(feedback.data)
      if (feedback.data.message === "success") {
        navigate("/auth/login")
      }
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <VStack width={"max-content"}>
      <form
        onSubmit={handleSubmit((e) => {
          submit(e);
        })}
      >
        <VStack gapY={2} width={72}>
          <Field.Root required invalid={!!errors.fullname}>
            <InputGroup startElement={<FiEdit3 />}>
              <Input
                type={"text"}
                {...register("fullName", { require: true })}
                placeholder="John Doe"
              />
            </InputGroup>
            <Field.ErrorText>{errors.fullname}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.username}>
            <InputGroup startElement={<CiUser />}>
              <Input
                type={"text"}
                {...register("userName", { require: true })}
                placeholder="Doe123"
              />
            </InputGroup>
            <Field.ErrorText>{errors.username}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.email}>
            <InputGroup startElement={<MdOutlineMail />}>
              <Input
                type={"email"}
                {...register("email", { require: true })}
                placeholder="johndoe@example.com"
              />
            </InputGroup>
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.password}>
            <InputGroup startElement={<BsUnlock/>}>
              <Input
                type="password"
                {...register("password", { require: true })}
                placeholder="password"
                width={"100%"}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.confirmPassword}>
            <InputGroup startElement={<BsUnlock/>}>
              <Input
                type="password"
                {...register("confirmPassword", { require: true })}
                placeholder="confirmPassword"
              />
            </InputGroup>
            <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
          </Field.Root>
          <Input
            type="submit"
            bgColor={"colorPalette.700"}
            borderRadius={12}
            textAlign={"center"}
            value={"REGISTER"}
          />
        </VStack>
      </form>
      <Link as={Route} to="/auth/login">
        Already have an account
      </Link>
    </VStack>
  );
}

export default function Register() {
  return (
    <>
      <NavHeader nav={<RegisterHeader />} />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100vw"}
      >
        <RegisterModel />
      </Box>
    </>
  );
}
