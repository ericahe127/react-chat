// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRIP5cDTpZXEVOBCHVYKmMRrquPSxWnBU",
  authDomain: "react-chat-aacb7.firebaseapp.com",
  projectId: "react-chat-aacb7",
  storageBucket: "react-chat-aacb7.appspot.com",
  messagingSenderId: "42022782649",
  appId: "1:42022782649:web:da71a14c25557d7596fd68",
  measurementId: "G-M03L892CM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()

// Create a root reference
export const storage = getStorage();
export const db = getFirestore();

