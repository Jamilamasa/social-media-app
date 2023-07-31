// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCH_vGJNYTp_6jtAwXu0spTyIEqTKVIG1Y",
  authDomain: "socialmedia-2a0c7.firebaseapp.com",
  projectId: "socialmedia-2a0c7",
  storageBucket: "socialmedia-2a0c7.appspot.com",
  messagingSenderId: "984962945315",
  appId: "1:984962945315:web:52ae0716d354982b8a3c96",
  measurementId: "G-P07QBJSH8B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

