import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ percentage, color = 'agri-green', label }) => {
  const colorClasses = {
    'agri-green': 'bg-agri-green-500',
    'agri-gold': 'bg-agri-gold',
    'agri-sky': 'bg-agri-sky',
    'red': 'bg-red-500'
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-agri-green-700">{label}</span>
          <span className="font-semibold text-agri-green-800">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-agri-green-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;