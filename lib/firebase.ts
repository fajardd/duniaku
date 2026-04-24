import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTOWwqxnpmdBYSLQPwaWMFX8oDkbMiWVw",
  authDomain: "clara-25042026.firebaseapp.com",
  projectId: "clara-25042026",
  storageBucket: "clara-25042026.firebasestorage.app",
  messagingSenderId: "392737208426",
  appId: "1:392737208426:web:2fec2cd7261e1f59007213",
  measurementId: "G-RXD9VNTKFD",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
