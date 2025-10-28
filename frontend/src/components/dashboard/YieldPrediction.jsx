import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Package } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import ProgressBar from '../ui/ProgressBar';

const YieldPrediction = () => {
  const predictions = [
    { month: 'Jan', yield: 2.1, profit: 45000 },
    { month: 'Feb', yield: 2.8, profit: 60000 },
    { month: 'Mar', yield: 3.5, profit: 75000 },
    { month: 'Apr', yield: 4.2, profit: 90000 },
    { month: 'May', yield: 3.8, profit: 82000 },
    { month: 'Jun', yield: 3.2, profit: 68000 },
  ];

  const currentPrediction = predictions[3]; // April

  return (
    <AnimatedCard delay={0.3} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TrendingUp className="w-6 h-6 text-agri-green-500" />
        </motion.div>
        <h2 className="text-xl font-bold text-agri-green-800">Yield Prediction</h2>
      </div>

      {/* Current Prediction */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-agri-green-500 to-agri-green-600 rounded-xl p-4 text-white mb-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-agri-green-100 text-sm">Predicted Yield</p>
            <h3 className="text-2xl font-bold">{currentPrediction.yield} tons/acre</h3>
            <p className="text-agri-green-100 text-sm">April Harvest</p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Package className="w-8 h-8 text-agri-gold" />
          </motion.div>
        </div>
      </motion.div>

      {/* Profit Prediction */}
      <div className="bg-agri-gold/10 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-agri-gold" />
          <div>
            <p className="text-sm text-agri-green-700">Estimated Profit</p>
            <p className="text-lg font-bold text-agri-green-800">KSh {currentPrediction.profit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-agri-green-600" />
          <h3 className="font-semibold text-agri-green-800">Monthly Forecast</h3>
        </div>
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <motion.div
              key={pred.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-agri-green-700 w-12">{pred.month}</span>
              <div className="flex-1 mx-3">
                <div className="w-full bg-agri-green-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(pred.yield / 5) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="bg-agri-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-agri-green-800">{pred.yield}t</span>
                <span className="text-xs text-agri-green-600 block">KSh {(pred.profit / 1000).toFixed(0)}K</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Probability */}
      <div className="pt-4 border-t border-agri-green-200">
        <ProgressBar 
          percentage={85} 
          label="Success Probability" 
          color="agri-green"
        />
      </div>

      <motion.button
        className="agri-button-secondary w-full mt-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Detailed Report
      </motion.button>
    </AnimatedCard>
  );
};

export default YieldPrediction;