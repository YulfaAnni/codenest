import { useState, useEffect, useCallback } from 'react';
import tutorialService from '../services/tutorial.service';

/**
 * Custom hook for managing tutorials
 * @returns {Object} Tutorials state and methods
 */
export const useTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTutorials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tutorialService.fetchTutorials();
      setTutorials(data || []);
    } catch (err) {
      console.error('Error fetching tutorials:', err);
      setError(err.message);
      setTutorials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tutorials on mount
  useEffect(() => {
    fetchTutorials();
  }, []); // Empty dependency array - only run once on mount

  const addTutorial = async (tutorialData) => {
    try {
      setError(null);
      const newTutorial = await tutorialService.addTutorial(tutorialData);
      setTutorials(prev => [newTutorial, ...prev]);
      return newTutorial;
    } catch (err) {
      console.error('Error adding tutorial:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateTutorial = async (id, updates) => {
    try {
      setError(null);
      await tutorialService.updateTutorial(id, updates);
      setTutorials(prev => 
        prev.map(tutorial => 
          tutorial.id === id ? { ...tutorial, ...updates } : tutorial
        )
      );
    } catch (err) {
      console.error('Error updating tutorial:', err);
      setError(err.message);
      throw err;
    }
  };

  const deleteTutorial = async (id) => {
    try {
      setError(null);
      await tutorialService.deleteTutorial(id);
      setTutorials(prev => prev.filter(tutorial => tutorial.id !== id));
    } catch (err) {
      console.error('Error deleting tutorial:', err);
      setError(err.message);
      throw err;
    }
  };

  const refreshTutorials = () => {
    return fetchTutorials();
  };

  return {
    tutorials,
    loading,
    error,
    addTutorial,
    updateTutorial,
    deleteTutorial,
    refreshTutorials
  };
};
