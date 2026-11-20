import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui';

/**
 * CodeBlock Component
 * Displays formatted code with syntax highlighting and copy functionality
 * 
 * @param {string} code - The code to display
 * @param {string} language - Programming language (e.g., 'javascript', 'python')
 * @param {string} id - Unique identifier for the code block
 * @param {Function} onCopy - Callback when copy button is clicked
 * @param {boolean} isCopied - Whether this block was recently copied
 */
const CodeBlock = ({ code, language = 'javascript', id, onCopy, isCopied = false }) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(code, id);
    }
  };

  return (
    <div className="my-4">
      <div className="bg-gray-50 rounded-lg border">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg border-b">
          <span className="text-sm font-medium text-gray-600">{language}</span>
          <Button
            variant="primary"
            size="sm"
            icon={isCopied ? Check : Copy}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        
        {/* Code Content */}
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-gray-800">{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
