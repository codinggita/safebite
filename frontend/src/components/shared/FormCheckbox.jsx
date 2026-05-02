import React from 'react';
import { useField } from 'formik';

const FormCheckbox = ({ children, className = '', ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex h-5 items-center">
        <input
          {...field}
          {...props}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={props.id || props.name} className="font-medium text-gray-700 dark:text-gray-300">
          {children}
        </label>
        {meta.touched && meta.error ? (
          <p className="text-risk-orange mt-1">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default FormCheckbox;
