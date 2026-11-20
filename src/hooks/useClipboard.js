import { useState } from 'react';
import { copyToClipboard } from '../utils/helpers.utils';

/**
 * Custom hook for clipboard operations
 * @returns {Object} Clipboard state and methods
 */
export const useClipboard = () => {
  const [copiedId, setCopiedId] = useState(null);

  const copy = async (text, id) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
    return success;
  };

  const isCopied = (id) => copiedId === id;

  return {
    copy,
    isCopied,
    copiedId
  };
};
