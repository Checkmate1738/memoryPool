import { useNavigate,Link as Route } from "react-router-dom";
import { isSmallDevice,SmallDeviceNav,NavHeader } from "@src/App";
import { Box,HStack,Link } from "@chakra-ui/react";

function TasksLink () {
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
            navigate("/dashboard/notes");
          }}
          display={"flex"}
          padding={2}
          alignItems={"center"}
        >
          Notes
        </Box>,
        <Box
          width={"100%"}
          onClick={() => {
            navigate("/dashboard/profile");
          }}
          display={"flex"}
          padding={2}
          alignItems={"center"}
        >
          Profile
        </Box>,
      ]}
    />
  ) : (
    <HStack>
      <Link as={Route} to="/dashboard/notes">
        Notes
      </Link>
      <Link as={Route} to="/dashboard/profile">
        Profile
      </Link>
      <Link as={Route} to={"/dashboard"}>
        Home
      </Link>
    </HStack>
  );
}

export default function Tasks() {

  return (
    <>
      <NavHeader nav={<TasksLink/>}/>
    </>
  );
}
