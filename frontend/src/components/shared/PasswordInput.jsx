import React, { useState } from 'react';
import { useField } from 'formik';
import { motion } from 'framer-motion';

const PasswordInput = ({ label = 'Password', className, ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isFilled = field.value && field.value.length > 0;
  const showError = meta.touched && meta.error;

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`
        relative border rounded-lg transition-colors flex items-center bg-white dark:bg-surface-dark/50
        ${showError ? 'border-risk-orange' : isFocused ? 'border-primary dark:border-primary-dark shadow-[0_0_0_2px_rgba(15,118,110,0.2)]' : 'border-gray-300 dark:border-gray-700'}
      `}>
        <div className="relative flex-1">
          <motion.label
            initial={false}
            animate={{
              y: isFocused || isFilled ? -24 : 0,
              scale: isFocused || isFilled ? 0.85 : 1,
              opacity: isFocused || isFilled ? 1 : 0.6,
            }}
            className={`absolute left-2 top-3 pointer-events-none origin-left px-1 bg-white dark:bg-surface-dark rounded ${showError ? 'text-risk-orange' : isFocused ? 'text-primary' : 'text-gray-500'}`}
          >
            {label}
          </motion.label>
          
          <input
            {...field}
            {...props}
            type={show ? 'text' : 'password'}
            className={`w-full bg-transparent px-3 pb-2 pt-6 outline-none text-gray-900 dark:text-gray-100 ${label ? 'placeholder-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-600' : 'placeholder-gray-400 dark:placeholder-gray-600'}`}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur(e);
            }}
          />
        </div>

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow(!show)}
          className="mr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm mt-1 ml-1 text-risk-orange"
        >
          {meta.error}
        </motion.p>
      )}
    </div>
  );
};

export default PasswordInput;
