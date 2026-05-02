import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    success: 'bg-green-100 text-safe-green dark:bg-green-900/30 dark:text-safe-green',
    warning: 'bg-yellow-100 text-warning-yellow dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-danger-red dark:bg-red-900/30 dark:text-red-400',
    primary: 'bg-teal-100 text-primary dark:bg-teal-900/30 dark:text-primary-dark',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
