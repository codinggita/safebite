import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  title = 'No results found', 
  description = "We couldn't find what you're looking for.", 
  icon: Icon,
  action 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 dark:bg-surface-dark flex items-center justify-center text-gray-400 dark:text-gray-600">
        {Icon ? <Icon className="w-12 h-12" /> : <span className="text-4xl leading-none">🔍</span>}
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
