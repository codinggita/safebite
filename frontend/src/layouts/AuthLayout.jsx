import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';

const trustPoints = [
  { icon: '🔬', text: '1,200+ Kitchens Verified' },
  { icon: '🛡️', text: '99.2% Safety Accuracy' },
  { icon: '🌱', text: 'Health-First Delivery' },
];

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex dark:bg-background-dark bg-gray-50 transition-colors duration-300 overflow-hidden">
      
      {/* ── Left Panel: Branding ── */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-primary via-emerald-600 to-teal-800 flex-col justify-between p-12 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-300/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />

        {/* Logo */}
        <Link to={APP_ROUTES.HOME} className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
            <span className="text-2xl">🥗</span>
          </div>
          <span className="font-display font-black text-3xl text-white tracking-tight">
            Safe<span className="text-emerald-200">Bite</span>
          </span>
        </Link>

        {/* Main copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-display font-black text-white leading-tight mb-6">
              Every Meal.
              <br />
              <span className="text-emerald-200">Verified Safe.</span>
            </h2>
            <p className="text-white/75 text-xl leading-relaxed mb-12 max-w-sm">
              Join 50,000+ people who eat with total confidence — knowing exactly how safe their food is.
            </p>

            <div className="space-y-4">
              {trustPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-white font-semibold">{p.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom attribution */}
        <div className="relative z-10 text-white/50 text-sm">
          © {new Date().getFullYear()} SafeBite · Designed for your health
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 relative">
        {/* Background ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl" />
        </div>

        {/* Mobile logo */}
        <Link to={APP_ROUTES.HOME} className="lg:hidden flex items-center gap-3 mb-10 z-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">🥗</span>
          </div>
          <span className="font-display font-black text-2xl text-gray-900 dark:text-white">
            Safe<span className="text-primary">Bite</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md z-10"
        >
          <div className="bg-white dark:bg-surface-dark rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 p-8 sm:p-10">
            <Outlet />
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default AuthLayout;
