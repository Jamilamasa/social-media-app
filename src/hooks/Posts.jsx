import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/Firebase";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export const useAddPost = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async (post) => {
    setLoading(true);
    const id = uuidv4();
    const docRef = doc(db, "posts", id);
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

export const useToggleLike = ({ id, isLiked, uid }) => {
  const [isLoading, setLoading] = useState(false);

  const toggleLike = async () => {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  };

  return { toggleLike, isLoading };
};

export const useDeletePost = (id) => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const deletePost = async () => {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }
  };

  return { deletePost, isLoading };
};

export const usePost = (id) => {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
};

export const usePosts = (uid = null) => {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));

  const [posts, isLoading, error] = useCollectionData(q);

  const likes = posts?.reduce((currNumber, post) => {
    return currNumber + post.likes.length;
  }, 0);

  if (error) throw error;
  return { posts, isLoading, likes };
};
