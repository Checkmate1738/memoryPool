import Home from "@src/content/home/home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ForgotPassword from "./auth/forgotPassword";
import Dashboard from "./dashboard/dashboard";
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

function CheckAuth() {
  const { credentials } = useContext(STATE);
  console.log(credentials);

  const isAuthenticated =
    credentials?.access_token != null && credentials?.token_hash != null;
  const isAuthorized = credentials?.token_type === "bearer";

  if (!isAuthenticated) {
    throw redirect("/auth/login"); // Correct way to redirect
  }

  if (!isAuthorized) {
    throw new Response("Forbidden", { status: 403 });
  }

  return null; // Indicate successful authentication
}

export default function Index() {
  const paths = createBrowserRouter([
    {
      path: "/",
      Component: Home,
      errorElement: <Error />,
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
      //loader: CheckAuth,
      children: [
        {
          path: "/dashboard/",
          Component: Dashboard,
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
