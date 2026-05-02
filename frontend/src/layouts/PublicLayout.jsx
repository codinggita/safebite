import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Standard layout for public-facing pages
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
