import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaJnnHjwasXg56HkFiac__ty8aRQ1fPo0",
  authDomain: "dine-ease-96b39.firebaseapp.com",
  projectId: "dine-ease-96b39",
  storageBucket: "dine-ease-96b39.firebasestorage.app",
  messagingSenderId: "799454724512",
  appId: "1:799454724512:web:dd9876f32f16eb73ffe4c5",
  measurementId: "G-R41DKND5GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally to avoid failures in restricted environments like iframes
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Firebase Analytics could not be initialized in this environment:", e);
}

export { analytics };
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Standard login procedures
export { signInWithPopup, signInWithRedirect, signInAnonymously };
