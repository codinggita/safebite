import * as Yup from 'yup';

export const phoneRegex = /^[0-9]{10}$/;
export const pincodeRegex = /^[0-9]{6}$/;

/**
 * Shared Formik/Yup schemas
 */

export const emailSchema = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Requires at least one uppercase letter')
  .matches(/[0-9]/, 'Requires at least one number')
  .required('Password is required');

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required').min(2, 'Name too short'),
  email: emailSchema,
  phone: Yup.string().matches(phoneRegex, 'Phone number must be exactly 10 digits').required('Phone is required'),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const deliveryAddressSchema = Yup.object().shape({
  addressLine: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().matches(pincodeRegex, 'Invalid pincode').required('Pincode is required'),
  landmark: Yup.string(),
  instructions: Yup.string(),
});
