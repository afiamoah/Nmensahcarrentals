// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyYCMn0bvZyREJTwBMSteR8XrxzpRw1LE",
  authDomain: "car-rentals-ccb33.firebaseapp.com",
  projectId: "car-rentals-ccb33",
  storageBucket: "car-rentals-ccb33.appspot.com",
  messagingSenderId: "312698337102",
  appId: "1:312698337102:web:e3c86a7db5fb187160501f",
  measurementId: "G-PJW2ZN0GXG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)
export const storage=getStorage()