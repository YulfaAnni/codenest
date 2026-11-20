import { useState, useEffect } from 'react';
import authService from '../services/auth.service';

/**
 * Custom hook for managing authentication state
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[useAuth] Setting up auth listener...');
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('[useAuth] Timeout reached, forcing loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout
    
    const unsubscribe = authService.onAuthChange((currentUser) => {
      console.log('[useAuth] Auth state changed:', currentUser ? 'User logged in' : 'No user');
      clearTimeout(timeout);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log('[useAuth] Cleaning up auth listener');
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signInAnonymous = async () => {
    try {
      setError(null);
      const user = await authService.signInAnonymous();
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const user = await authService.signInWithGoogle();
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signInAnonymous,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
    isAnonymous: user?.isAnonymous || false
  };
};
