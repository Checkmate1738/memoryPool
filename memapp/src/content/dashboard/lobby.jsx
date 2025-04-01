import { Link as Route } from "react-router-dom";
import { HStack, Link } from "@chakra-ui/react";

function Dashboard() {
  return (
    <HStack>
      <Link as={Route} to="/dashboard/notes">
        Notes
      </Link>
      <Link as={Route} to="/dashboard/tasks">
        Tasks
      </Link>
    </HStack>
  );
}

export default function Lobby() {
  return (
    <>
      <p>Dashboard</p>
      <Dashboard />
    </>
  );
}
