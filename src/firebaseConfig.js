import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlcRKaAbxJYhJ_6ZhzOd0dg06lK6FwYcA",
  authDomain: "earnest-sight-473304-b3.firebaseapp.com",
  projectId: "earnest-sight-473304-b3",
  storageBucket: "earnest-sight-473304-b3.firebasestorage.app",
  messagingSenderId: "910568889927",
  appId: "1:910568889927:web:8b9f08704543cdaa0e5b62",
  measurementId: "G-GT0GMFRGQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);
