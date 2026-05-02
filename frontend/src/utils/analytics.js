/**
 * Google Analytics 4 Wrapper
 * Replace G-XXXXXXXX with actual measurement ID in index.html
 */

export const trackPageView = (path, title) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { 
      page_path: path, 
      page_title: title 
    });
  }
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};
