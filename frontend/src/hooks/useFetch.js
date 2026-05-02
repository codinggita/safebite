import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook for making API calls with localized loading and error states
 * @param {Function} apiFunc - The API service function to call
 * @param {Object} options - { onSuccess, onError, showSuccessToast, showErrorToast }
 */
export const useFetch = (apiFunc, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    showSuccessToast = null,
    showErrorToast = true,
  } = options;

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunc(...args);
        setData(result);
        if (showSuccessToast && typeof showSuccessToast === 'string') {
          toast.success(showSuccessToast);
        }
        if (onSuccess) onSuccess(result);
        return { data: result, error: null };
      } catch (err) {
        setError(err.message || 'An error occurred');
        if (showErrorToast && err.message) {
          toast.error(err.message);
        }
        if (onError) onError(err);
        return { data: null, error: err };
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, onSuccess, onError, showSuccessToast, showErrorToast]
  );

  return { data, loading, error, execute, setData };
};
