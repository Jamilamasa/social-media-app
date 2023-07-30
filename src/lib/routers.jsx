import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Auth/login";
import Register from "../Components/Auth/Register";
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const router = createBrowserRouter([
  {
    path: ROOT,
    element: 'PUBLIC ROOT',
  },
  {
    path: LOGIN,
    element: <Login/>,
  },
  {
    path: REGISTER,
    element: <Register/>,
  },
]);
