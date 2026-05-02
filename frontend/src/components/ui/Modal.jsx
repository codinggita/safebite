import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-surface-dark rounded-t-2xl sm:rounded-2xl shadow-xl z-50 flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-[#151A18] rounded-b-2xl border-t border-gray-200 dark:border-gray-800">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
