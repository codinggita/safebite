import React from 'react';
import { useField } from 'formik';
import { Input } from '../ui';

const FormInput = ({ label, leftIcon, rightIcon, className, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      <Input
        label={label}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        error={showError ? meta.error : null}
        {...field}
        {...props}
      />
    </div>
  );
};

export default FormInput;
