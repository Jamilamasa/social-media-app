import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/Firebase";
import { DASHBOARD, LOGIN } from "../lib/routers";
import isUsernameExist from "../utils/isUserNameExist";

export const useAuth = () => {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);

      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    };
    if (!authLoading) {
      if (authUser) {
        fetchData()
      } else setLoading(false);
    }
  }, [authLoading]);

  return { user, isLoading, error };
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

// Register hook
export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const register = async ({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) => {
    setLoading(true);

    const usernameExists = await isUsernameExist(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const docReference = doc(db, "users", res.user.uid);
        await setDoc(docReference, {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return { register, isLoading };
};

// Logout Hook
export const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const toast = useToast();

  const logout = async () => {
    if (await signOut()) {
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
