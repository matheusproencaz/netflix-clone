// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const API_KEY = process.env.FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: "AIzaSyAK2KXvxGakAjgL6uXQSZDkIpcw-0yq2KA",
  authDomain: "netflix-clone-yt-ef638.firebaseapp.com",
  projectId: "netflix-clone-yt-ef638",
  storageBucket: "netflix-clone-yt-ef638.appspot.com",
  messagingSenderId: "276666598355",
  appId: "1:276666598355:web:323cb534182a5e34cc2526"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app
export { auth, db }

