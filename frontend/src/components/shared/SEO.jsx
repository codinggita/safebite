import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component — Sets dynamic page title, description, and OG tags per page.
 * Wraps react-helmet-async's Helmet for consistent usage across the app.
 */
const SEO = ({
  title,
  description = 'Discover and order food from safety-verified restaurants. Every kitchen is hygiene-rated so you eat smart, safe, and healthy — every time.',
  image = 'https://safebite.app/og-preview.png',
  url = 'https://safebite.app',
}) => {
  const fullTitle = title ? `${title} | SafeBite` : 'SafeBite — Eat Smart. Eat Safe. Every Time.';

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
