// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz2MdCmJWh3UGv7WUeeXEl3oDEJvZyO_U",
  authDomain: "fir-project-66397.firebaseapp.com",
  projectId: "fir-project-66397",
  storageBucket: "fir-project-66397.firebasestorage.app",
  messagingSenderId: "1075650924441",
  appId: "1:1075650924441:web:a38481a2b12d38a6294d08",
  measurementId: "G-HTWZM44WYK",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = app ? getAuth(app) : null;
export const provider = new GoogleAuthProvider();
