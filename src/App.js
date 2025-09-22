import React, { useState, useEffect } from 'react';
import logo from './assets/codenest-logo.png';
import { Search, Plus, ChevronLeft, Copy, Check, X, Tag, Calendar, Link, Home, Star, Folder, Book } from 'lucide-react';

const CodeNest = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [copiedBlock, setCopiedBlock] = useState(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleTutorials = [
      {
        id: 1,
        title: "Supabase Auth Setup",
        tags: ["Supabase", "Auth", "React"],
        date: "Sept 21, 2025",
        summary: "Step-by-step guide to setting up Supabase authentication in React. Includes signup, login, and session handling.",
        content: `# Supabase Auth Setup

Step-by-step guide to setting up Supabase authentication in React.

## Installation

First, install the Supabase client:

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## Configuration

Create your Supabase client:

\`\`\`javascript
// Install first: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
\`\`\`

## Sign Up Function

\`\`\`javascript
const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) console.error('Error:', error);
  return { user, error };
};
\`\`\`

## Login Function

\`\`\`javascript
const login = async (email, password) => {
  const { session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) console.error('Error:', error);
  return { session, error };
};
\`\`\``,
        projectLink: "https://github.com/example/supabase-auth",
        favorite: true
      },
      {
        id: 2,
        title: "React Hooks Best Practices",
        tags: ["React", "Hooks", "JavaScript"],
        date: "Sept 20, 2025",
        summary: "Essential patterns and best practices for using React hooks effectively in your applications.",
        content: `# React Hooks Best Practices

Learn the essential patterns for effective hook usage.

## useState Best Practices

\`\`\`javascript
// ✅ Good: Single responsibility
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// ❌ Avoid: Complex objects when not needed
const [user, setUser] = useState({ name: '', email: '' });
\`\`\`

## useEffect Dependencies

\`\`\`javascript
// ✅ Good: Include all dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []); // userId missing!
\`\`\``,
        projectLink: null,
        favorite: false
      }
    ];
    setTutorials(sampleTutorials);
  }, []);

  // Copy to clipboard function
  const copyToClipboard = async (text, blockId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlock(blockId);
      setTimeout(() => setCopiedBlock(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Extract code blocks from markdown content
  const extractCodeBlocks = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks = [];
    let match;
    let blockId = 0;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      blocks.push({
        id: blockId++,
        language: match[1] || 'javascript',
        code: match[2].trim()
      });
    }
    return blocks;
  };

  // Render markdown content with syntax highlighting
  const renderMarkdown = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);
    const elements = [];
    
    for (let i = 0; i < parts.length; i += 3) {
      // Regular text
      if (parts[i]) {
        const text = parts[i]
          .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-gray-800">$1</h1>')
          .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 text-gray-700">$1</h2>')
          .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 text-gray-600">$1</h3>')
          .replace(/\n/g, '<br>');
        
        elements.push(
          <div key={`text-${i}`} dangerouslySetInnerHTML={{ __html: text }} />
        );
      }
      
      // Code block
      if (parts[i + 1] !== undefined && parts[i + 2]) {
        const language = parts[i + 1] || 'javascript';
        const code = parts[i + 2].trim();
        const blockId = `block-${i}`;
        
        elements.push(
          <div key={`code-${i}`} className="my-4">
            <div className="bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg border-b">
                <span className="text-sm font-medium text-gray-600">{language}</span>
                <button
                  onClick={() => copyToClipboard(code, blockId)}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {copiedBlock === blockId ? <Check size={14} /> : <Copy size={14} />}
                  {copiedBlock === blockId ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-gray-800">{code}</code>
              </pre>
            </div>
          </div>
        );
      }
    }
    
    return elements;
  };

  // Filter tutorials based on search and tags
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => tutorial.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Get all unique tags
  const allTags = [...new Set(tutorials.flatMap(t => t.tags))];

  // Add Tutorial Modal Component
  const AddTutorialModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      tags: [],
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      projectLink: '',
      summary: '',
      content: ''
    });
    const [newTag, setNewTag] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.title.trim()) return;
      
      const newTutorial = {
        id: Date.now(),
        ...formData,
        favorite: false
      };
      
      setTutorials(prev => [...prev, newTutorial]);
      setShowAddModal(false);
      setFormData({
        title: '',
        tags: [],
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        projectLink: '',
        summary: '',
        content: ''
      });
    };

    const addTag = () => {
      if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
        setNewTag('');
      }
    };

    const removeTag = (tagToRemove) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              📝 Add New Tutorial
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                  🔖 Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tutorial title..."
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                  🏷️ Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Date and Project Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                    📅 Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                    📎 Related Project Link
                  </label>
                  <input
                    type="url"
                    value={formData.projectLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectLink: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                  📝 Summary
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write a short intro or description..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                  📄 Tutorial Content (Markdown)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="# Your Tutorial Title

Write your tutorial content here using Markdown...

## Code Example

```javascript
const example = () => {
  console.log('Hello CodeNest!');
};
```"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Check size={16} />
                  Save Tutorial
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                            <img src={logo} alt="CodeNest Logo" className="h-14 w-14" />
              <h1 className="text-2xl font-bold text-gray-800">CodeNest</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to CodeNest – a cozy place for your code & notes
        </h2>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrentView('tutorials')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Book size={16} />
            Explore Tutorials
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Add Snippet
          </button>
          <button
            onClick={() => setCurrentView('tutorials')}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <Folder size={16} />
            View Projects
          </button>
        </div>
      </div>

      {/* Recent Tutorials Preview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Recent Tutorials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.slice(0, 3).map(tutorial => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h4 className="font-semibold text-lg mb-2">{tutorial.title}</h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {tutorial.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">{tutorial.summary}</p>
              <button
                onClick={() => {
                  setSelectedTutorial(tutorial);
                  setCurrentView('tutorial-view');
                }}
                className="text-blue-500 hover:text-blue-700 font-medium text-sm"
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Tutorials Grid Component
  const TutorialsGrid = () => (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
                        <img src={logo} alt="CodeNest Logo" className="h-12 w-12" />
            <h1 className="text-xl font-bold text-gray-800">CodeNest</h1>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentView('home')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home size={16} />
              Back to Home
            </button>
            <button
              onClick={() => setCurrentView('tutorials')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 bg-blue-50 text-blue-700 rounded-lg"
            >
              <Book size={16} />
              All Tutorials
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Tag size={16} />
              Tags
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Star size={16} />
              Favorites
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Folder size={16} />
              Categories
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📘 Tutorials</h2>
          
          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              Add Tutorial
            </button>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTutorials.map(tutorial => {
            const codeBlocks = extractCodeBlocks(tutorial.content);
            return (
              <div key={tutorial.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 flex-1">
                      🔖 {tutorial.title}
                    </h3>
                    {tutorial.favorite && (
                      <Star size={16} className="text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tutorial.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        🏷️ #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                    <Calendar size={14} />
                    📅 {tutorial.date}
                  </p>
                  
                  {tutorial.projectLink && (
                    <p className="text-blue-500 text-sm mb-4 flex items-center gap-1">
                      <Link size={14} />
                      📎 <a href={tutorial.projectLink} target="_blank" rel="noopener noreferrer" className="hover:underline">View Related Project</a>
                    </p>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4">
                    📝 {tutorial.summary}
                  </p>
                  
                  {codeBlocks.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">💻 Code Preview:</p>
                      <div className="bg-gray-50 rounded-lg p-3 border">
                        <pre className="text-xs font-mono text-gray-800 overflow-x-auto">
                          <code>{codeBlocks[0].code.slice(0, 100)}...</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(codeBlocks[0].code, `preview-${tutorial.id}`)}
                          className="mt-2 flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          {copiedBlock === `preview-${tutorial.id}` ? <Check size={12} /> : <Copy size={12} />}
                          📋 {copiedBlock === `preview-${tutorial.id}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedTutorial(tutorial);
                      setCurrentView('tutorial-view');
                    }}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Read Full Tutorial
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No tutorials found</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Tutorial
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Tutorial View Component
  const TutorialView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
            onClick={() => setCurrentView('tutorials')}
            className="p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
            <div className="flex items-center gap-3">
                          <img src={logo} alt="CodeNest Logo" className="h-12 w-12" />
              <h1 className="text-xl font-bold text-gray-800">CodeNest</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Tutorial Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Tutorial Header */}
          <div className="mb-8 pb-6 border-b">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🔖 {selectedTutorial?.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTutorial?.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  🏷️ #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                📅 {selectedTutorial?.date}
              </span>
              {selectedTutorial?.projectLink && (
                <a 
                  href={selectedTutorial.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <Link size={16} />
                  📎 View Project
                </a>
              )}
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="prose max-w-none">
            {selectedTutorial && renderMarkdown(selectedTutorial.content)}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'home') {
    return (
      <>
        <HomePage />
        {showAddModal && <AddTutorialModal />}
      </>
    );
  }

  if (currentView === 'tutorials') {
    return (
      <>
        <TutorialsGrid />
        {showAddModal && <AddTutorialModal />}
      </>
    );
  }

  if (currentView === 'tutorial-view' && selectedTutorial) {
    return <TutorialView />;
  }

  return <HomePage />;
};

function App() {
  return (
    <div className="App">
      <CodeNest />
    </div>
  );
}

export default App;