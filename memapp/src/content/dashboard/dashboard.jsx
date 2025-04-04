import { Link as Route, useNavigate } from "react-router-dom";
import { Box, HStack, Link } from "@chakra-ui/react";
import { isSmallDevice, SmallDeviceNav, NavHeader } from "@src/App";

function DashLink() {
  const small = isSmallDevice();
  const navigate = useNavigate();

  return small ? (
    <SmallDeviceNav
      data={[
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
      <Link as={Route} to="/dashboard/tasks">
        Tasks
      </Link>
      <Link as={Route} to="/dashboard/profile">
        Profile
      </Link>
    </HStack>
  );
}

export default function Dashboard() {
  return (
    <>
      <NavHeader nav={<DashLink />} />
    </>
  );
}
