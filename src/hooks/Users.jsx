import { collection, doc, query } from "firebase/firestore";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../lib/Firebase";

export const useUser = (id) => {
    const q = query(doc(db, "users", id));
    const [user, isLoading] = useDocumentData(q);
    return { user, isLoading };
};
