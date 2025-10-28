import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

const WeatherIcon = ({ condition, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className={`${sizeClasses[size]} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${sizeClasses[size]} text-gray-400`} />;
      case 'rainy':
        return <CloudRain className={`${sizeClasses[size]} text-blue-400`} />;
      case 'snowy':
        return <CloudSnow className={`${sizeClasses[size]} text-blue-200`} />;
      default:
        return <Sun className={`${sizeClasses[size]} text-yellow-500`} />;
    }
  };

  return (
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: condition === 'sunny' ? [0, 5, 0] : 0
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {getIcon()}
    </motion.div>
  );
};

export default WeatherIcon;