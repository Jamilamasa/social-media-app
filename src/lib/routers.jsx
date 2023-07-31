import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Auth/Login";
// import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Layout from "../Components/Layout/Layout";
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const router = createBrowserRouter([
  {
    path: ROOT,
    element: "PUBLIC ROOT",
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
    element: <Layout/>,
    children: [{path: DASHBOARD, element: "Dashboard"}]
  },
]);
