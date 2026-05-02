import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * Layout for authenticated dashboard pages containing Sidebar
 */
const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      
      <div className="flex-grow flex w-full max-w-7xl mx-auto md:py-6 md:px-6">
        <Sidebar />
        
        <main className="flex-1 w-full bg-white dark:bg-surface-dark md:rounded-2xl md:ml-6 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
