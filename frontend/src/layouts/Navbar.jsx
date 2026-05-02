import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { Button, Badge } from '../components/ui';

const navLinks = [
  { label: 'Home', path: APP_ROUTES.HOME },
  { label: 'Restaurants', path: APP_ROUTES.RESTAURANTS },
  { label: 'Compare', path: APP_ROUTES.COMPARE },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-4 z-50 mx-4 lg:mx-auto max-w-7xl rounded-full glass-card border border-white/40 dark:border-white/10 shadow-2xl transition-all duration-300 bg-white/70 dark:bg-[#1A1F1D]/80 mb-8 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to={APP_ROUTES.HOME} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                <span className="text-white text-lg leading-none pt-0.5">🥗</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                Safe<span className="text-primary dark:text-primary-dark">Bite</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:ml-6 md:flex items-center space-x-2 bg-gray-50/50 dark:bg-black/20 p-1.5 rounded-full border border-gray-200/50 dark:border-white/5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors z-10
                    ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}
                  `}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 rounded-full -z-10" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Context Actions (Theme, Cart, Auth) */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center bg-gray-50/50 dark:bg-black/20 p-1 rounded-full border border-gray-200/50 dark:border-white/5">
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center justify-center w-10 h-10 hover:bg-white dark:hover:bg-surface-dark shadow-sm"
                  aria-label="Toggle theme"
                >
                  {isDark ? '☀️' : '🌙'}
                </button>

                {/* Cart Icon */}
                {isAuthenticated && (
                  <Link to={APP_ROUTES.CART} className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center justify-center w-10 h-10 hover:bg-white dark:hover:bg-surface-dark shadow-sm ml-1">
                    <span className="text-xl leading-none">🛒</span>
                    {itemCount > 0 && (
                      <Badge variant="danger" size="sm" className="absolute -top-1 -right-1 px-1.5 min-w-[20px] text-[10px] items-center justify-center border-2 border-white dark:border-[#1A1F1D]">
                        {itemCount}
                      </Badge>
                    )}
                  </Link>
                )}
            </div>

            {/* Auth Block */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-2">
                <Link to={APP_ROUTES.DASHBOARD} className="flex items-center space-x-2 group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center font-bold text-base shadow-md group-hover:shadow-lg transition-all transform group-hover:scale-105 border-2 border-white dark:border-[#1A1F1D]">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link to={APP_ROUTES.LOGIN}>
                  <Button variant="ghost" className="rounded-full px-5 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Log In</Button>
                </Link>
                <Link to={APP_ROUTES.SIGNUP}>
                  <Button variant="primary" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button onClick={toggleTheme} className="p-2 text-gray-500">
               {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path 
                      ? 'text-primary bg-primary/10 dark:bg-primary-dark/10' 
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to={APP_ROUTES.CART}
                  className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <span>Cart</span>
                  {itemCount > 0 && <Badge variant="danger">{itemCount}</Badge>}
                </Link>
              )}
            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4">
                  <Link to={APP_ROUTES.DASHBOARD}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={logout}>Log Out</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link to={APP_ROUTES.LOGIN}>
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link to={APP_ROUTES.SIGNUP}>
                    <Button variant="primary" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
