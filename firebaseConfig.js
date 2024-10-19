// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage



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

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Database
const database = getDatabase(app);

export { auth, database };
