import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
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

// Initialize Firestore with settings to avoid real-time listener issues
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  ignoreUndefinedProperties: true,
});

export const auth = getAuth(app);

// Initialize Analytics only if supported (avoids IndexedDB errors)
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(() => {
  // Analytics not supported, silently fail
});

export { analytics };

export default app;
