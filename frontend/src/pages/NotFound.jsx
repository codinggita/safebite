import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../constants/routes';
import { Button } from '../components/ui';
import SEO from '../components/shared/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col items-center justify-center px-4">
      <SEO title="404 - Not Found" description="The page you are looking for does not exist. Back to safety on SafeBite." url="https://safebite.app/404" />
      <div className="text-center">
        <h1 className="text-9xl font-display font-black text-gray-200 dark:text-gray-800">404</h1>
        <h2 className="text-3xl font-bold mt-4 text-gray-900 dark:text-white pb-2">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to={APP_ROUTES.HOME}>
          <Button size="lg">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
