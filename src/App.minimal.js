import React, { useState } from 'react';
import './App.css';

/**
 * Main App Component - Minimal Test Version
 */
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          CodeNest
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Testing basic render...
        </p>
        <div className="text-sm text-gray-500">
          If you see this, React is working!
        </div>
      </div>
    </div>
  );
}

export default App;
