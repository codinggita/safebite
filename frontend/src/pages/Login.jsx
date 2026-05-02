import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';
import { loginSchema } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import { FormInput, FormCheckbox, PasswordInput } from '../components/shared';
import SEO from '../components/shared/SEO';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || APP_ROUTES.DASHBOARD;

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await login({ email: values.email, password: values.password }, values.rememberMe);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setStatus({ error: res.error || 'Login failed. Please check your credentials.' });
      }
    } catch (err) {
      setStatus({ error: 'An unexpected error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Login"
        description="Sign in to your SafeBite account and continue ordering from safety-verified restaurants."
        url="https://safebite.app/login"
      />
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full text-xs font-bold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Secure Login
        </div>
        <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white">Welcome Back 👋</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Sign in to your SafeBite account to continue.
        </p>
      </div>

      <Formik
        initialValues={{ email: '', password: '', rememberMe: true }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-5">
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

            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
            />

            <PasswordInput name="password" label="Password" />

            <div className="flex items-center justify-between pt-1">
              <FormCheckbox name="rememberMe">Remember me</FormCheckbox>
              <a href="#" className="text-sm font-semibold text-primary hover:text-emerald-600 dark:text-primary-dark transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10">
                {loading || isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In →'
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Form>
        )}
      </Formik>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white dark:bg-surface-dark text-gray-400 font-medium">New to SafeBite?</span>
        </div>
      </div>

      <Link to={APP_ROUTES.SIGNUP} className="block w-full py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-center text-gray-700 dark:text-gray-300 font-bold hover:border-primary hover:text-primary dark:hover:text-primary-dark transition-colors">
        Create a Free Account
      </Link>
    </div>
  );
};

export default Login;
