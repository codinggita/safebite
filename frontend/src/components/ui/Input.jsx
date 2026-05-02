import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = (props.value !== undefined && props.value !== null && props.value !== '') || 
                   (props.defaultValue !== undefined && props.defaultValue !== null && props.defaultValue !== '');

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`
        relative border rounded-lg transition-colors flex items-center bg-white dark:bg-surface-dark/50
        ${error ? 'border-risk-orange' : isFocused ? 'border-primary dark:border-primary-dark shadow-[0_0_0_2px_rgba(15,118,110,0.2)]' : 'border-gray-300 dark:border-gray-700'}
      `}>
        {LeftIcon && <LeftIcon className="ml-3 text-gray-500 w-5 h-5 flex-shrink-0" />}
        
        <div className="relative flex-1">
          <motion.label
            initial={false}
            animate={{
              y: isFocused || isFilled ? -24 : 0,
              scale: isFocused || isFilled ? 0.85 : 1,
              opacity: isFocused || isFilled ? 1 : 0.6,
            }}
            className={`absolute left-2 top-3 pointer-events-none origin-left px-1 bg-white dark:bg-surface-dark rounded ${error ? 'text-risk-orange' : isFocused ? 'text-primary' : 'text-gray-500'}`}
          >
            {label}
          </motion.label>
          
          <input
            ref={ref}
            className={`w-full bg-transparent px-3 pb-2 pt-6 outline-none text-gray-900 dark:text-gray-100 disabled:opacity-50 ${label ? 'placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-600' : 'placeholder-gray-400 dark:placeholder-gray-600'}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>

        {RightIcon && <RightIcon className="mr-3 text-gray-500 w-5 h-5 flex-shrink-0" />}
      </div>

      {(error || helperText) && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm mt-1 ml-1 ${error ? 'text-risk-orange' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {error || helperText}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
