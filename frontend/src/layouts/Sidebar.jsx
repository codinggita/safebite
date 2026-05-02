import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { path: APP_ROUTES.DASHBOARD, label: 'Overview', icon: '📊' },
  { path: APP_ROUTES.ORDERS, label: 'My Orders', icon: '🛍️' },
  { path: APP_ROUTES.PROFILE, label: 'Profile Settings', icon: '⚙️' },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark h-full min-h-[calc(100vh-4rem)] rounded-r-2xl hidden md:flex flex-col">
      <div className="p-6 pb-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Dashboard Menu
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === APP_ROUTES.DASHBOARD}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors relative
                ${isActive ? 'text-primary bg-primary/10 dark:bg-primary-dark/10' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="mr-3 text-lg leading-none">{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary dark:bg-primary-dark rounded-r-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 pt-2">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
        >
          <span className="mr-3 text-lg leading-none">🚪</span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
