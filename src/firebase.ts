import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeEhCdpopoab_E0YZ-On-ZC0W-p0CryoA",
  authDomain: "auth01-de896.firebaseapp.com",
  projectId: "auth01-de896",
  storageBucket: "auth01-de896.appspot.com",
  messagingSenderId: "553631288741",
  appId: "1:553631288741:web:f63d83086b9bac683c6c4c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
