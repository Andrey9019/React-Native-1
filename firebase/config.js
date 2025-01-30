import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxUE0feU-U2SSAhJ5mQO5xmb_U1UPpp7Y",
  authDomain: "react-native-1-854f1.firebaseapp.com",
  projectId: "react-native-1-854f1",
  storageBucket: "react-native-1-854f1.firebasestorage.app",
  messagingSenderId: "491028352343",
  appId: "1:491028352343:web:83885bdc10a6ec15828212",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
