import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util"; 
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/Firebase";

export const useAddPost = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async (post) => {
    setLoading(true);
    const id = uuidv4();
    const docRef = doc(db, "posts", id)
    await setDoc(docRef, {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  };

  return { addPost, isLoading };
};
