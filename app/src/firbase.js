// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCh6l-2IboR32WrAd05a5Rg67R2Cia-DrI",
    authDomain: "chat-c9f87.firebaseapp.com",
    projectId: "chat-c9f87",
    storageBucket: "chat-c9f87.appspot.com",
    messagingSenderId: "737773810992",
    appId: "1:737773810992:web:ffeabf5cdad262127984f5"
  };
  
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db =getFirestore()
