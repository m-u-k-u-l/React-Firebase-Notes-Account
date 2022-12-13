import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

import "firebase/compat/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCakD1xKmohYfzV13ljaw2z4Y3s1wNofBw",
    authDomain: "react-firebase-book-f3295.firebaseapp.com",
    projectId: "react-firebase-book-f3295",
    storageBucket: "react-firebase-book-f3295.appspot.com",
    messagingSenderId: "803952575355",
    appId: "1:803952575355:web:cb17c7e229036963ab33de",
    measurementId: "G-0L5BXRHBJ3"
  };
  
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);
