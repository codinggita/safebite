import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated SVG Circular Gauge for Safety Score (1-100)
 */
const SafetyScoreBadge = ({ score, size = 64, showLabel = true, className = '' }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (Math.max(0, Math.min(100, score || 0)) / 100) * circumference;
  const strokeDashoffset = circumference - fillPercentage;

  // Determine color based on score
  let colorClass = 'text-gray-300';
  if (score >= 80) colorClass = 'text-safe-green';
  else if (score >= 60) colorClass = 'text-warning-yellow';
  else if (score > 0) colorClass = 'text-risk-orange';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={size * 0.1}
            className="text-gray-100 dark:text-gray-800"
          />
          {/* Animated Fill Circle */}
          {score !== null && (
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={size * 0.1}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={colorClass}
              strokeLinecap="round"
            />
          )}
        </svg>
        {/* Inside Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-gray-900 dark:text-white" style={{ fontSize: size * 0.3 }}>
            {score !== null ? Math.round(score) : '-'}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-1">
          Safety Score
        </span>
      )}
    </div>
  );
};

export default SafetyScoreBadge;
