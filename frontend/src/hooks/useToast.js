import toast from 'react-hot-toast';

/**
 * Wrapper hook around react-hot-toast for standardized notification calls
 */
export const useToast = () => {
  return {
    success: (message, options) => toast.success(message, options),
    error: (message, options) => toast.error(message, options),
    warning: (message, options) => toast(message, { icon: '⚠️', ...options }),
    info: (message, options) => toast(message, { icon: 'ℹ️', ...options }),
    dismiss: (toastId) => toast.dismiss(toastId),
    dismissAll: () => toast.dismiss(),
  };
};
