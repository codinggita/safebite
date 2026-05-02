import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a rapidly changing value (e.g. search input)
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in ms
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
