import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverable = false, onClick, ...props }) => {
  const hoverProps = hoverable
    ? {
        whileHover: { y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <motion.div
      className={`glass-card rounded-2xl overflow-hidden ${hoverable ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
