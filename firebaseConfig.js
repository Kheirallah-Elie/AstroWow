// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc-Buw-fEXcCTF2h_KTSs1UcE4zFJ-lLA",
  authDomain: "mobile2astrowow.firebaseapp.com",
  projectId: "mobile2astrowow",
  storageBucket: "mobile2astrowow.appspot.com",
  messagingSenderId: "470463052023",
  appId: "1:470463052023:web:83fc15b50e89f617f53bf2",
  measurementId: "G-36MMQEECXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth

export { auth }; // Export the auth object
