import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwGs9Bj1eYfBjaMU1D_uL-N-B6UF2dYPQ",
  authDomain: "organizador-tcc.firebaseapp.com",
  projectId: "organizador-tcc",
  storageBucket: "organizador-tcc.firebasestorage.app",
  messagingSenderId: "732667169155",
  appId: "1:732667169155:web:9259183df76f22cb100eb6"
};

const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

export const db = getFirestore(app);