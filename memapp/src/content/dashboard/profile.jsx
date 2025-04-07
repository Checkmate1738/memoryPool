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
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit((e) => console.log(e))}>
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
              <Dialog.Body></Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger>
                  <Input
                    value={"Submit"}
                    type={"submit"}
                    cursor={"pointer"}
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
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit } = useForm();
  const [profileData, setProfileData] = useState({
    fullname: "John Doe",
    username: "Doe123",
    email: "johndoe@example.com",
    password: "*******",
    tasks: 5,
    notes: 2,
  });

  return (
    <form
      onSubmit={handleSubmit((e) => {
        console.log(e);
        setProfileData(e);
        setIsDisabled(true);
        setIsEdit(false);
      })}
    >
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
                {isDisabled ? (
                  <Input value={value} readOnly textAlign={"center"} />
                ) : (
                  <Input
                    placeholder={value}
                    {...register(key, { required: true })}
                  />
                )}
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
            bgColor={"colorpallette.800"}
            onClick={() => {
              console.log("logged out");
            }}
          />
        </HStack>
      </VStack>
    </form>
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
