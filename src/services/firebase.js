// Firebase v9 modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYjqqhFjtrqGT2pa30uu1oheKpJpnDChM",
  authDomain: "project-vitals-9ff00.firebaseapp.com",
  projectId: "project-vitals-9ff00",
  storageBucket: "project-vitals-9ff00.firebasestorage.app",
  messagingSenderId: "847564638861",
  appId: "1:847564638861:web:d1b4d13905646b3b0070c4",
  measurementId: "G-PZSJPGQLTX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
