import React from 'react';
import { Book, Calendar, Tag, Link as LinkIcon, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';

/**
 * TutorialCard Component
 * Displays a tutorial preview in a card format
 * 
 * @param {Object} tutorial - Tutorial data object
 * @param {Function} onClick - Handler when card is clicked
 */
const TutorialCard = ({ tutorial, onClick }) => {
  // Defensive fallback for missing fields
  const title = tutorial.title || 'Untitled';
  const summary = tutorial.summary || '';
  const tags = Array.isArray(tutorial.tags) ? tutorial.tags : [];
  const date = tutorial.date || '';
  const projectLink = tutorial.projectLink || '';
  const isFavorite = !!tutorial.isFavorite;

  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            <Book size={20} className="text-blue-500" />
            {title}
          </CardTitle>
          {isFavorite && (
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        {summary && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {summary}
          </p>
        )}
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {date}
            </div>
          )}
          {projectLink && (
            <div className="flex items-center gap-1">
              <LinkIcon size={14} />
              Project Link
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialCard;
