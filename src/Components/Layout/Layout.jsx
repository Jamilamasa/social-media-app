import React from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routers";
import { useAuth } from "../../hooks/Auth";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);
  if (isLoading) {
    return "Loading...";
  }
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default Layout;
