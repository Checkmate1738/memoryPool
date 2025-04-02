import Home from "@src/content/home/home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ForgotPassword from "./auth/forgotPassword";
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
import { useContext } from "react";
import { STATE } from "@src/App";

function checkAuth() {
  let isAuthenticated = false;
  let isAuthorized = false;
  const {credentials} = useContext(STATE)

  if (
    credentials.access_token != null &&
    credentials.token_hash != null
  ) {
    isAuthenticated = true;
  }

  if (credentials.token_type == "bearer") {
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
        {
          path: "/auth/forgot-password",
          Component: ForgotPassword,
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
