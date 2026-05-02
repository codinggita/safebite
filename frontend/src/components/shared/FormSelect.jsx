import React from 'react';
import { useField } from 'formik';

const FormSelect = ({ label, options, className = '', ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={`w-full appearance-none bg-white dark:bg-surface-dark/50 border rounded-lg px-3 py-2 outline-none text-gray-900 dark:text-gray-100 transition-colors
          ${showError ? 'border-risk-orange' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:shadow-[0_0_0_2px_rgba(15,118,110,0.2)]'}`
        }
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      {/* Down arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 top-6 text-gray-500">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>

      {showError && (
        <p className="text-sm mt-1 ml-1 text-risk-orange">{meta.error}</p>
      )}
    </div>
  );
};

export default FormSelect;
