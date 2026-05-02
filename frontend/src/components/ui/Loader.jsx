import React from 'react';

const Loader = ({ fullPage = false, className = '' }) => {
  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* SafeBite Pulse Logo Loader */}
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 dark:bg-primary-dark/20 rounded-full animate-ping"></div>
        <div className="relative z-10 w-12 h-12 bg-primary dark:bg-primary-dark rounded-full shadow-lg flex flex-col items-center justify-center content-center pt-1.5">
           {/* Salad emoji as simple inline logo */}
           <span className="text-2xl pt-0 leading-none">🥗</span>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
