import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Progress Bar for Health Ratings
 */
const HealthRatingGauge = ({ rating, max = 10, label = 'Health Rating', className = '' }) => {
  const percentage = (Math.max(0, Math.min(max, rating || 0)) / max) * 100;
  
  let color = 'bg-gray-300';
  if (rating >= 8) color = 'bg-health-blue';
  else if (rating >= 5) color = 'bg-primary dark:bg-primary-dark';
  else if (rating > 0) color = 'bg-warning-yellow';

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-bold font-display text-gray-900 dark:text-white">
          {rating ? `${rating}/${max}` : 'N/A'}
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        {rating !== null && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className={`h-full rounded-full ${color}`}
          />
        )}
      </div>
    </div>
  );
};

export default HealthRatingGauge;
