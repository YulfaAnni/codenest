import React, { useState } from 'react';
import { Header } from './components/layout';
import { TutorialCard, TutorialForm, TutorialDetail } from './components/features';
import { useAuth, useTutorials, useClipboard } from './hooks';
import './App.css';

/**
 * Main App Component
 * Manages the main application state and views
 */
function App() {
  console.log('[App] Component rendering...');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'detail'
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  
  console.log('[App] State initialized');
  
  // Custom hooks for state management
  const { 
    user, 
    loading: authLoading,
    signInAnonymous, 
    signInWithGoogle, 
    signOut 
  } = useAuth();
  
  const { 
    tutorials, 
    loading: tutorialsLoading,
    error: tutorialsError,
    addTutorial,
    refreshTutorials
  } = useTutorials();

  const { copy, isCopied, copiedId } = useClipboard();

  // Handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleAddClick = () => {
    if (!user) {
      alert('Please sign in to add tutorials');
      return;
    }
    setShowAddModal(true);
  };

  const handleTutorialSubmit = async (formData) => {
    try {
      await addTutorial(formData);
      await refreshTutorials();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding tutorial:', error);
      alert('Failed to add tutorial. Please try again.');
    }
  };

  const handleTutorialClick = (tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('home');
    setSelectedTutorial(null);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter tutorials based on search and tags
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tutorial.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => tutorial.tags && tutorial.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Get all unique tags
  const allTags = [...new Set(tutorials.flatMap(t => t.tags || []))];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      <Header
        user={user}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={handleAddClick}
        onSignInAnonymous={signInAnonymous}
        onSignInWithGoogle={signInWithGoogle}
        onSignOut={signOut}
      />

      {/* Tutorial Form Modal */}
      <TutorialForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleTutorialSubmit}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'detail' && selectedTutorial ? (
          // Tutorial Detail View
          <TutorialDetail
            tutorial={selectedTutorial}
            onBack={handleBackToList}
            onCopy={copy}
            copiedBlockId={copiedId}
          />
        ) : (
          // Tutorials List View
          <>
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to CodeNest
              </h1>
              <p className="text-xl text-gray-600">
                A cozy place for your code & notes
              </p>
            </div>

            {!user ? (
              // Not signed in state
              <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto text-center">
                <p className="text-gray-600 mb-4">
                  Please sign in to access your tutorials
                </p>
              </div>
            ) : (
              // Signed in state
              <>
                {/* Firestore Error Message */}
                {tutorialsError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Firestore Setup Required</h3>
                    <p className="text-red-700 mb-3">
                      Unable to connect to Firestore. Please enable Firestore in your Firebase Console.
                    </p>
                    <a
                      href="https://console.firebase.google.com/project/earnest-sight-473304-b3/firestore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Open Firebase Console
                    </a>
                    <p className="text-sm text-red-600 mt-3">
                      See <code className="bg-red-100 px-2 py-1 rounded">FIRESTORE_SETUP.md</code> for detailed instructions.
                    </p>
                  </div>
                )}

                {/* Tags Filter */}
                {allTags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600 self-center">Filter by tags:</span>
                    {allTags.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}

                {/* Tutorials Grid */}
                {tutorialsLoading ? (
                  <div className="text-center py-12">
                    <div className="text-lg text-gray-600">Loading tutorials...</div>
                  </div>
                ) : filteredTutorials.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto text-center">
                    <p className="text-gray-600 mb-4">
                      {tutorials.length === 0
                        ? 'No tutorials yet. Click "Add" to create your first tutorial!'
                        : 'No tutorials match your search or filters.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTutorials.map((tutorial, idx) => (
                      <TutorialCard
                        key={tutorial.id || idx}
                        tutorial={tutorial}
                        onClick={() => handleTutorialClick(tutorial)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
