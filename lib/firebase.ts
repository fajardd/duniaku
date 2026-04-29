import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBou0J-W9PdcLYSWhJxEMVd4y1NhsxTngk",
  authDomain: "clara-claurita-salindri.firebaseapp.com",
  projectId: "clara-claurita-salindri",
  storageBucket: "clara-claurita-salindri.firebasestorage.app",
  messagingSenderId: "1026801504331",
  appId: "1:1026801504331:web:c12ff4841b912198787dce",
  measurementId: "G-27VMS9SYE9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
