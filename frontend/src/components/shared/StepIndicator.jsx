import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center w-full max-w-sm justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary dark:bg-primary-dark rounded-full z-0"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Step Nodes */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? 'var(--safe-green)' : '#E5E7EB',
                  scale: isActive ? 1.2 : 1,
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  isCompleted || isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:bg-gray-800'
                }`}
                style={{
                  backgroundColor: isCompleted || isActive ? '#10B981' : undefined
                }}
              >
                {isCompleted ? '✓' : stepNumber}
              </motion.div>
              <span className={`absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary dark:text-primary-dark' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
