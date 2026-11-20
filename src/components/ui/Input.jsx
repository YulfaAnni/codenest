import React from 'react';

/**
 * Reusable Input component
 */
export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  className = '',
  as = 'input',
  rows = 4,
  ...props
}) => {
  const baseStyles = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const iconStyles = icon ? 'pl-10' : '';
  
  if (as === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${baseStyles} resize-vertical ${className}`}
        {...props}
      />
    );
  }
  
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${iconStyles} ${className}`}
        {...props}
      />
    </div>
  );
};

/**
 * Reusable Textarea component
 */
export const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical';
  
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
};
