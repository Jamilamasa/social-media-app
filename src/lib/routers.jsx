import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Components/Auth/Login";
// import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Root from "../Components/Dashboard/Root";
import Layout from "../Components/Layout/Layout";
import Comments from "../components/Comments/Comments";
import Profile from "../Components/Profile/Profile";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Navigate to="/login" />,
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      { path: DASHBOARD, element: <Root /> },
      { path: USERS, element: "Users" },
      { path: PROFILE, element: <Profile/> },
      {
        path: COMMENTS,
        element: <Comments />,
      },
    ],
  },
]);
