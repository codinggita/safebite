import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { APP_ROUTES } from '../constants/routes';
import { registerSchema } from '../utils/validators';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { FormInput, PasswordInput } from '../components/shared';
import SEO from '../components/shared/SEO';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await authService.register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      toast.success('Account created! Welcome to SafeBite 🎉');
      const loginRes = await login({ email: values.email, password: values.password });
      if (loginRes.success) {
        navigate(APP_ROUTES.DASHBOARD, { replace: true });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      setStatus({ error: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Create Account"
        description="Join SafeBite for free and start ordering food from hygiene-verified restaurants near you."
        url="https://safebite.app/signup"
      />
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800">
          <span className="text-base">🌱</span>
          Free to Join
        </div>
        <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white">Create Your Account</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Start eating with confidence. Your health deserves it.
        </p>
      </div>

      <Formik
        initialValues={{ fullName: '', email: '', phone: '', password: '', confirmPassword: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status?.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3"
              >
                <span className="text-xl">⚠️</span>
                {status.error}
              </motion.div>
            )}

            <FormInput name="fullName" type="text" label="Full Name" placeholder="John Doe" />
            <FormInput name="email" type="email" label="Email Address" placeholder="you@example.com" />
            <FormInput name="phone" type="tel" label="Phone Number" placeholder="9876543210" />
            <PasswordInput name="password" label="Password" />
            <PasswordInput name="confirmPassword" label="Confirm Password" />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    'Create My SafeBite Account →'
                  )}
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary underline-offset-2 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-primary underline-offset-2 hover:underline">Privacy Policy</a>.
            </p>
          </Form>
        )}
      </Formik>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white dark:bg-surface-dark text-gray-400 font-medium">Already a member?</span>
        </div>
      </div>

      <Link to={APP_ROUTES.LOGIN} className="block w-full py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 font-bold hover:border-primary hover:text-primary dark:hover:text-primary-dark transition-colors">
        Sign In Instead
      </Link>
    </div>
  );
};

export default Signup;
