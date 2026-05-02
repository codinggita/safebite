import React from 'react';

const SkeletonLoader = ({ variant = 'card', count = 1, className = '' }) => {
  const skeletons = Array(count).fill(0);

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden glass-card p-4 h-[320px] flex flex-col">
            <div className="skeleton w-full h-[160px] rounded-xl mb-4"></div>
            <div className="skeleton w-3/4 h-6 rounded mb-2"></div>
            <div className="skeleton w-1/2 h-4 rounded mb-4"></div>
            <div className="mt-auto flex justify-between items-center">
              <div className="skeleton w-16 h-8 rounded-full"></div>
              <div className="skeleton w-24 h-6 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list-item') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="skeleton w-16 h-16 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton w-1/3 h-5 rounded"></div>
              <div className="skeleton w-1/4 h-4 rounded"></div>
            </div>
            <div className="skeleton w-20 h-10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className="skeleton w-32 h-32 rounded-full"></div>
        <div className="skeleton w-48 h-8 rounded"></div>
        <div className="skeleton w-32 h-4 rounded"></div>
      </div>
    );
  }

  // default 'text' block
  return (
    <div className={`space-y-3 ${className}`}>
      {skeletons.map((_, i) => (
        <React.Fragment key={i}>
          <div className="skeleton w-full h-4 rounded"></div>
          <div className="skeleton w-[90%] h-4 rounded"></div>
          <div className="skeleton w-[80%] h-4 rounded"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonLoader;
