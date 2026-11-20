import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Modal, Input, Button } from '../ui';

/**
 * TutorialForm Component
 * Modal form for adding/editing tutorials
 * 
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Handler to close the modal
 * @param {Function} onSubmit - Handler when form is submitted
 * @param {Object} initialData - Initial form data (for editing)
 */
const TutorialForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
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
    }
  );
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    // Reset form
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📝 Add New Tutorial"
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            🔖 Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter tutorial title..."
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            🏷️ Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tag and press Enter..."
            />
            <Button type="button" onClick={addTag} variant="outline">
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Project Link */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            🔗 Project Link (Optional)
          </label>
          <Input
            type="url"
            value={formData.projectLink}
            onChange={(e) => setFormData(prev => ({ ...prev, projectLink: e.target.value }))}
            placeholder="https://github.com/username/project"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            📄 Summary
          </label>
          <Input
            as="textarea"
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder="Brief description of the tutorial..."
            rows={3}
          />
        </div>

        {/* Content */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            📝 Content (Markdown)
          </label>
          <Input
            as="textarea"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write your tutorial content in markdown..."
            rows={12}
            className="font-mono text-sm"
          />
          <p className="mt-2 text-xs text-gray-500">
            Supports markdown: # Headers, **bold**, *italic*, and code blocks with ```
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success" icon={Check}>
            Save Tutorial
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TutorialForm;
