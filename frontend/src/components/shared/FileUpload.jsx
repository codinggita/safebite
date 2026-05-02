import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_SIZE_MB = 5;

const FileUpload = ({ onFileSelect, accept = 'image/jpeg, image/png, image/webp', circle = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcess = (file) => {
    setError(null);
    if (!file) return;

    // Type check
    const acceptedTypes = accept.split(',').map((t) => t.trim());
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WEBP allowed.');
      return;
    }

    // Size check
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    // Simulate upload progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Pass to parent
    if (onFileSelect) onFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  }, [accept, onFileSelect]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-colors cursor-pointer group bg-gray-50 hover:bg-gray-100 dark:bg-surface-dark dark:hover:bg-gray-800
          ${circle ? 'w-32 h-32 rounded-full' : 'w-full h-40 rounded-xl'}
          ${isDragging ? 'border-primary dark:border-primary-dark' : 'border-gray-300 dark:border-gray-700'}
          ${error ? 'border-risk-orange' : ''}
        `}
      >
        <input type="file" className="hidden" accept={accept} onChange={handleChange} />
        
        <AnimatePresence>
          {preview ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
              <span className="text-2xl mb-1">📷</span>
              {!circle && <span className="text-sm">Click or Drag Image</span>}
            </div>
          )}
        </AnimatePresence>

        {/* Hover overlay if preview exists */}
        {preview && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm font-medium">Change</span>
          </div>
        )}
      </label>

      {/* Error Message */}
      {error && <p className="mt-3 text-sm text-risk-orange">{error}</p>}

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && !error && (
        <div className="w-full max-w-[12rem] h-1.5 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            className="h-full bg-primary"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
