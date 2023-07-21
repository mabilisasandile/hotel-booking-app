// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { ref } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBZPJH1Pds21kNhyqVu1M_QOX2G1ZXBWw4",
  authDomain: "hotel-bookings-app.firebaseapp.com",
  projectId: "hotel-bookings-app",
  storageBucket: "hotel-bookings-app.appspot.com",
  messagingSenderId: "609698293390",
  appId: "1:609698293390:web:f125d60ceaf6759ac68bdf",
  measurementId: "G-BQ0GQ7PQK5"
};

// Initialize and export
// export const firebase = firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);

export default app;
