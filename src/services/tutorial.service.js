import { db } from '../config/firebase.config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy, 
  query, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Tutorial Service
 * Handles all tutorial-related database operations
 */

const COLLECTION_NAME = 'tutorials';

class TutorialService {
  /**
   * Add a new tutorial to Firestore
   * @param {Object} tutorialData - Tutorial data
   * @param {string} tutorialData.title - Tutorial title
   * @param {string} tutorialData.content - Tutorial content
   * @param {Array} tutorialData.tags - Tutorial tags
   * @param {string} tutorialData.summary - Tutorial summary
   * @param {string} tutorialData.projectLink - Project link
   * @param {string} tutorialData.date - Creation date
   * @returns {Promise<Object>} Created tutorial with ID
   */
  async addTutorial(tutorialData) {
    try {
      const { title, content, tags = [], summary = '', projectLink = '', date } = tutorialData;
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        title,
        content,
        tags,
        summary,
        projectLink,
        date: date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
      
      return { 
        id: docRef.id, 
        title, 
        content,
        tags,
        summary,
        projectLink,
        date: date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        created_at: new Date(),
        updated_at: new Date()
      };
    } catch (error) {
      console.error('Error adding tutorial:', error);
      throw error;
    }
  }

  /**
   * Fetch all tutorials from Firestore
   * @returns {Promise<Array>} Array of tutorials
   */
  async fetchTutorials() {
    try {
      // Try with ordering first
      try {
        const tutorialsQuery = query(
          collection(db, COLLECTION_NAME),
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
      } catch (orderError) {
        // If ordering fails (missing index), fetch without ordering
        console.warn('Fetching without ordering (index may be missing):', orderError);
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const tutorials = [];
        
        querySnapshot.forEach((doc) => {
          tutorials.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        return tutorials;
      }
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      // Return empty array instead of throwing
      return [];
    }
  }

  /**
   * Get a single tutorial by ID
   * @param {string} id - Tutorial ID
   * @returns {Promise<Object>} Tutorial data
   */
  async getTutorial(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error('Tutorial not found');
      }
    } catch (error) {
      console.error('Error getting tutorial:', error);
      throw error;
    }
  }

  /**
   * Update an existing tutorial
   * @param {string} id - Tutorial ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<void>}
   */
  async updateTutorial(id, updates) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating tutorial:', error);
      throw error;
    }
  }

  /**
   * Delete a tutorial
   * @param {string} id - Tutorial ID
   * @returns {Promise<void>}
   */
  async deleteTutorial(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      throw error;
    }
  }
}

export default new TutorialService();
