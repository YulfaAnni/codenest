import React from 'react';

/**
 * Reusable Modal component
 */
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  maxWidth = '4xl'
}) => {
  if (!isOpen) return null;
  
  const maxWidths = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    'full': 'max-w-full'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg w-full ${maxWidths[maxWidth]} max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          {title && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
