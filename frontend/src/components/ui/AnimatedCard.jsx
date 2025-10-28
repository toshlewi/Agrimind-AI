import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay 
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`agri-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;