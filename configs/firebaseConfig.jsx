// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-b3ebc.firebaseapp.com",
  projectId: "ai-course-generator-b3ebc",
  storageBucket: "ai-course-generator-b3ebc.appspot.com",
  messagingSenderId: "541574523522",
  appId: "1:541574523522:web:9e2723f44099cef77a629b",
  measurementId: "G-SC8YKE9DZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app)