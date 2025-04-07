import { useNavigate, Link as Route } from "react-router-dom";
import { useState } from "react";
import { isSmallDevice, SmallDeviceNav, NavHeader } from "@src/App";
import {
  Box,
  Field,
  HStack,
  Input,
  InputGroup,
  Link,
  Text,
  VStack,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function ProfileLink() {
  const small = isSmallDevice();
  const navigate = useNavigate();

  return small ? (
    <SmallDeviceNav
      data={[
        <Box
          width={"100%"}
          onClick={() => {
            navigate("/dashboard");
          }}
          display={"flex"}
          padding={2}
          alignItems={"center"}
        >
          Home
        </Box>,
        <Box
          width={"100%"}
          onClick={() => {
            navigate("/dashboard/tasks");
          }}
          display={"flex"}
          padding={2}
          alignItems={"center"}
        >
          Tasks
        </Box>,
        <Box
          width={"100%"}
          onClick={() => {
            navigate("/dashboard/notes");
          }}
          display={"flex"}
          padding={2}
          alignItems={"center"}
        >
          Notes
        </Box>,
      ]}
    />
  ) : (
    <HStack>
      <Link as={Route} to="/dashboard/notes">
        Notes
      </Link>
      <Link as={Route} to="/dashboard/tasks">
        Tasks
      </Link>
      <Link as={Route} to={"/dashboard"}>
        Home
      </Link>
    </HStack>
  );
}

function EditProfile({ trigger, profile, setProfile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let showPass = false

  return (
    <form onSubmit={handleSubmit((e) => (console.log(e)))}>
      <Dialog.Root placement={"center"}>
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <Dialog.Header>
                <Dialog.Title>Edit Profile</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {Object.entries(profile).map(([name, values]) => {
                  
                  if (name === "tasks" || name === "notes") {
                    return (
                      <Field.Root key={name}>
                        <InputGroup startAddon={name}>
                          <Input value={values} readOnly />
                        </InputGroup>
                        <Field.ErrorText>{errors.name}</Field.ErrorText>
                      </Field.Root>
                    );
                  }

                  return (
                  <Field.Root key={name}>
                    <InputGroup startAddon={name} >
                      <Input type={name === "password" || showPass? "password" : "text"} defaultValue={values} {...register(name)} />
                    </InputGroup>
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                  </Field.Root>)
                })}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger>
                  <Input
                    value={"Submit"}
                    type={"submit"}
                    width={28}
                    cursor={"pointer"}
                    bgColor={"green.700"}
                    _active={{backgroundColor:"green.600"}}
                    textAlign={"center"}
                  />
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </form>
  );
}

function ProfileModel() {
  const [profileData, setProfileData] = useState({
    fullname: "John Doe",
    username: "Doe123",
    email: "johndoe@example.com",
    password: "aki brayoo",
    tasks: 5,
    notes: 2,
  });

  return (
    <VStack width={72}>
      {Object.entries(profileData).map(([key, value]) => {
        if (key === "tasks" || key === "notes") {
          return (
            <Field.Root key={key}>
              <InputGroup startAddon={key}>
                <Input textAlign={"center"} value={value} readOnly />
              </InputGroup>
            </Field.Root>
          );
        }
        return (
          <Field.Root key={key}>
            <InputGroup startAddon={key}>
              <Input value={value} readOnly textAlign={"center"} />
            </InputGroup>
          </Field.Root>
        );
      })}
      <HStack width={"inherit"}>
        <EditProfile
          trigger={
            <Input
              value={"Edit"}
              type={"button"}
              cursor={"pointer"}
              width={36}
              textAlign={"center"}
            />
          }
          profile={profileData}
          setProfile={setProfileData}
        />
        <Input
          type="button"
          textAlign={"center"}
          cursor={"pointer"}
          value={"Log out"}
          bgColor={"red.700"}
          _active={{backgroundColor:"red.600"}}
          onClick={() => {
            console.log("logged out");
          }}
        />
      </HStack>
    </VStack>
  );
}

export default function Profile() {
  return (
    <>
      <NavHeader nav={<ProfileLink />} />
      <Box
        minHeight={"100vh"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ProfileModel />
      </Box>
    </>
  );
}
