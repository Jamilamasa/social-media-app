import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/Firebase";
import { DASHBOARD, LOGIN } from "../lib/routers";

export const useAuth = () => {
  const [authUser, isLoading, error] = useAuthState(auth);
  return { user: authUser, isLoading, error };
};

export const useLogin = () => {
  // Loading state
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const login = async ({ email, password, redirectTo = DASHBOARD }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Logging In Failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false; //Return false if login failed
    }
    setLoading(false);
    return true;
  };
  return { login, isLoading };
};

// Logout Hook
export const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate()
  const toast = useToast()
 


  const logout = async () => {
    if(await signOut()){
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(LOGIN);
    }
  };
  return { logout, loading };
};
