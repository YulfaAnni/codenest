import React from 'react';

/**
 * Reusable Card component
 */
export const Card = ({ 
  children, 
  className = '',
  hover = false,
  onClick 
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6';
  const hoverStyles = hover || onClick ? 'hover:shadow-lg transition-shadow cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Title component
 */
export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h3>
  );
};

/**
 * Card Content component
 */
export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};
