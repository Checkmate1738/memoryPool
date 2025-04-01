import Home from "@src/content/home/home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Lobby from "./dashboard/lobby";
import Tasks from "./dashboard/tasks";
import Notes from "./dashboard/notes";
import Profile from "./dashboard/profile";
import { Error } from "@src/content/error";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

function checkAuth() {
  let isAuthenticated = false;
  let isAuthorized = false;

  if (
    sessionStorage.getItem("userId") != null &&
    sessionStorage.getItem("token") != null
  ) {
    isAuthenticated = true;
  }

  if (sessionStorage.getItem("role") == "member") {
    isAuthorized = true;
  }

  if (!isAuthenticated) {
    return redirect("/auth/login");
  }

  if (!isAuthorized) {
    throw new Response("Forbidden", { status: 403 });
  }

  return null;
}

export default function Index() {
  const paths = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      errorElement: Error,
    },
    {
      path: "/auth",
      children: [
        {
          path: "/auth/register",
          Component: Register,
        },
        {
          path: "/auth/login",
          Component: Login,
        },
      ],
    },
    {
      path: "/dashboard",
      loader: checkAuth,
      children: [
        {
          path: "/dashboard/",
          Component: Lobby,
        },
        {
          path: "/dashboard/notes",
          Component: Notes,
        },
        {
          path: "/dashboard/tasks",
          Component: Tasks,
        },
        {
          path: "/dashboard/profile",
          Component: Profile,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={paths} />
    </>
  );
}
