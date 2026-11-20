import { auth } from '../config/firebase.config';
import { 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';

/**
 * Auth Service
 * Handles all authentication-related operations
 */

class AuthService {
  /**
   * Sign in anonymously for quick access
   * @returns {Promise<User>} Authenticated user
   */
  async signInAnonymous() {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  }

  /**
   * Sign in with Google account
   * @returns {Promise<User>} Authenticated user
   */
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  /**
   * Sign out current user
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  /**
   * Listen to authentication state changes
   * @param {Function} callback - Function to call when auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Get current authenticated user
   * @returns {User|null} Current user or null if not authenticated
   */
  getCurrentUser() {
    return auth.currentUser;
  }
}

export default new AuthService();
