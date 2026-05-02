import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary dark:bg-primary-dark text-white hover:bg-teal-800 dark:hover:bg-teal-400',
  secondary: 'bg-accent dark:bg-accent-dark text-white hover:bg-orange-600 dark:hover:bg-orange-400',
  danger: 'bg-danger-red text-white hover:bg-red-700',
  outline: 'border-2 border-primary text-primary hover:bg-primary/5 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/10',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-surface-dark/80',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg font-medium',
};

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-lg font-sans transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <motion.button
      ref={ref}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="mr-2 h-5 w-5" />
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
