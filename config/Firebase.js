import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

export { auth };