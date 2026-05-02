import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './routes';
// import { trackPageView } from './utils/analytics'; // Will implement analytics next

function App() {
  const location = useLocation();

  useEffect(() => {
    // Simple page view tracking hook
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen font-sans">
      <AppRouter />
    </div>
  );
}

export default App;
