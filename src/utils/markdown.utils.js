/**
 * Markdown utility functions
 */

/**
 * Parse markdown and render as React elements
 * @param {string} content - Markdown content
 * @returns {Array} Array of React elements
 */
export const renderMarkdown = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;
  const codeBlockMarker = String.fromCharCode(96, 96, 96);
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Check for code blocks
    if (line.startsWith(codeBlockMarker)) {
      const language = line.replace(codeBlockMarker, '') || 'javascript';
      const codeLines = [];
      i++;
      
      while (i < lines.length && !lines[i].startsWith(codeBlockMarker)) {
        codeLines.push(lines[i]);
        i++;
      }
      
      const code = codeLines.join('\n');
      elements.push({
        type: 'code',
        language,
        code,
        key: `code-${key++}`
      });
      i++;
    } else if (line.startsWith('### ')) {
      elements.push({
        type: 'h3',
        content: line.replace('### ', ''),
        key: `h3-${key++}`
      });
      i++;
    } else if (line.startsWith('## ')) {
      elements.push({
        type: 'h2',
        content: line.replace('## ', ''),
        key: `h2-${key++}`
      });
      i++;
    } else if (line.startsWith('# ')) {
      elements.push({
        type: 'h1',
        content: line.replace('# ', ''),
        key: `h1-${key++}`
      });
      i++;
    } else if (line.trim() !== '') {
      elements.push({
        type: 'text',
        content: line,
        key: `text-${key++}`
      });
      i++;
    } else {
      i++;
    }
  }
  
  return elements;
};

/**
 * Extract code blocks from markdown content
 * @param {string} content - Markdown content
 * @returns {Array} Array of code block objects
 */
export const extractCodeBlocks = (content) => {
  const codeBlockMarker = String.fromCharCode(96, 96, 96);
  const lines = content.split('\n');
  const blocks = [];
  let blockId = 0;
  let i = 0;
  
  while (i < lines.length) {
    if (lines[i].startsWith(codeBlockMarker)) {
      const language = lines[i].replace(codeBlockMarker, '') || 'javascript';
      const codeLines = [];
      i++;
      
      while (i < lines.length && !lines[i].startsWith(codeBlockMarker)) {
        codeLines.push(lines[i]);
        i++;
      }
      
      blocks.push({
        id: blockId++,
        language: language,
        code: codeLines.join('\n')
      });
      i++;
    } else {
      i++;
    }
  }
  
  return blocks;
};
