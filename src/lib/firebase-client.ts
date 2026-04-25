// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCz2MdCmJWh3UGv7WUeeXEl3oDEJvZyO_U",
  authDomain:
    import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "fir-project-66397.firebaseapp.com",
  projectId: import.meta.env.FIREBASE_PROJECT_ID || "fir-project-66397",
  storageBucket:
    import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "fir-project-66397.firebasestorage.app",
  messagingSenderId:
    import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1075650924441",
  appId:
    import.meta.env.PUBLIC_FIREBASE_APP_ID ||
    "1:1075650924441:web:a38481a2b12d38a6294d08",
  measurementId:
    import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HTWZM44WYK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

console.log("API KEY:", import.meta.env.PUBLIC_FIREBASE_API_KEY);
