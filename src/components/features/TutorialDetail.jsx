import React from 'react';
import { ChevronLeft, Calendar, Tag, Link as LinkIcon, Star } from 'lucide-react';
import { Button, Card, CardContent } from '../ui';
import { CardHeader } from '../ui';
import CodeBlock from './CodeBlock';
import { renderMarkdown } from '../../utils';

/**
 * TutorialDetail Component
 * Displays full tutorial content with navigation
 * 
 * @param {Object} tutorial - Tutorial data object
 * @param {Function} onBack - Handler to go back to list
 * @param {Function} onCopy - Handler for copying code blocks
 * @param {string} copiedBlockId - ID of currently copied block
 */
const TutorialDetail = ({ tutorial, onBack, onCopy, copiedBlockId }) => {
  if (!tutorial) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tutorial not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ChevronLeft size={20} /> Back
        </Button>
      </div>
    );
  }

  // Defensive fallback for missing fields
  const title = tutorial.title || 'Untitled';
  const content = tutorial.content || '';
  const date = tutorial.date || '';
  const projectLink = tutorial.projectLink || '';
  const isFavorite = !!tutorial.isFavorite;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
          {isFavorite && (
            <Star size={20} className="text-yellow-500 fill-yellow-500 ml-2" />
          )}
        </div>
        <div className="flex items-center gap-4">
          {date && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar size={16} />
              {date}
            </div>
          )}
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <LinkIcon size={16} />
              Project Link
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 prose max-w-none">
        {renderMarkdown(content).map((element) => {
          const blockId = `block-${element.key}`;
          if (element.type === 'code') {
            return (
              <CodeBlock
                key={element.key}
                code={element.code}
                language={element.language}
                id={blockId}
                onCopy={onCopy}
                isCopied={copiedBlockId === blockId}
              />
            );
          } else if (element.type === 'h1') {
            return <h1 key={element.key} className="text-2xl font-bold mb-4 text-gray-800">{element.content}</h1>;
          } else if (element.type === 'h2') {
            return <h2 key={element.key} className="text-xl font-semibold mb-3 text-gray-700">{element.content}</h2>;
          } else if (element.type === 'h3') {
            return <h3 key={element.key} className="text-lg font-medium mb-2 text-gray-600">{element.content}</h3>;
          } else if (element.type === 'text') {
            return <div key={element.key} className="mb-2">{element.content}</div>;
          }
          return null;
        })}
      </CardContent>
    </Card>
  );
}
export default TutorialDetail;
