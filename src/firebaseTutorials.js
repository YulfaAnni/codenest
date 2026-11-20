import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';

// Save a new tutorial to Firebase Firestore
export async function addTutorial({ title, content }) {
  try {
    const docRef = await addDoc(collection(db, 'tutorials'), {
      title,
      content,
      created_at: serverTimestamp()
    });
    return { id: docRef.id, title, content };
  } catch (error) {
    console.error('Error adding tutorial:', error);
    throw error;
  }
}

// Fetch all tutorials from Firebase Firestore
export async function fetchTutorials() {
  try {
    const tutorialsQuery = query(
      collection(db, 'tutorials'),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(tutorialsQuery);
    const tutorials = [];
    querySnapshot.forEach((doc) => {
      tutorials.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return tutorials;
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    throw error;
  }
}