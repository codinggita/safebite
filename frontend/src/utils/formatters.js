/**
 * Currency Formatter
 * Formats a number to standard INR currency format
 */
export const formatCurrency = (amount, locale = 'en-IN', currency = 'INR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Date Formatter
 * Formats standard ISO strings to readable dates
 */
export const formatDate = (dateString, options = { year: 'numeric', month: 'short', day: 'numeric' }) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
};

/**
 * Time Formatter
 * Example: 18:30:00 -> 6:30 PM
 */
export const formatTime = (dateString) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
};

/**
 * Distance Formatter
 * Returns km string and formats to 1 decimal point
 */
export const formatDistance = (meters) => {
  if (!meters) return '0 km';
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
};

/**
 * Ensures safety score is visual-friendly
 */
export const formatSafetyScore = (score) => {
  if (score == null) return 'N/A';
  return `${Math.round(score)}/100`;
};
