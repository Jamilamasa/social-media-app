import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/Firebase";
import { DASHBOARD } from "../lib/routers";

export const useAuth = () => {
  const [authUser, isLoading, error] = useAuthState(auth);
  return { user: authUser, isLoading, error };
};

export const useLogin = () => {
  // Loading state
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()

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
      navigate(redirectTo)
    } catch (error) {
      toast({
        title: 'Logging In Failed',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000
      })
      return false //Return false if login failed
    }
    setLoading(false);
    return true;
  };
  return { login, isLoading };
};
