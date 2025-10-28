import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, TrendingUp, Clock, Shield, ChevronDown } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import ProgressBar from '../ui/ProgressBar';

const CropRecommendation = () => {
  const [selectedCrop, setSelectedCrop] = useState(1);

  const recommendations = [
    {
      id: 1,
      name: 'Maize',
      suitability: 92,
      season: 'Long Rains',
      duration: '120 days',
      yield: '4.2 tons/acre',
      profit: 'KSh 85,000',
      risk: 'Low',
      image: '🌽',
      description: 'Ideal for your soil type and upcoming weather patterns',
      water: 'Medium',
      fertilizer: 'High'
    },
    {
      id: 2,
      name: 'Beans',
      suitability: 88,
      season: 'Short Rains',
      duration: '75 days',
      yield: '1.8 tons/acre',
      profit: 'KSh 45,000',
      risk: 'Very Low',
      image: '🫘',
      description: 'Good for soil nitrogen fixation and quick returns',
      water: 'Low',
      fertilizer: 'Medium'
    },
    {
      id: 3,
      name: 'Tomatoes',
      suitability: 85,
      season: 'All Year',
      duration: '90 days',
      yield: '15 tons/acre',
      profit: 'KSh 120,000',
      risk: 'Medium',
      image: '🍅',
      description: 'High-value crop with good market demand',
      water: 'High',
      fertilizer: 'High'
    }
  ];

  return (
    <AnimatedCard delay={0.2} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sprout className="w-6 h-6 text-agri-green-500" />
        </motion.div>
        <h2 className="text-xl font-bold text-agri-green-800">AI Crop Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedCrop === crop.id
                ? 'border-agri-green-500 bg-agri-green-50 transform scale-105'
                : 'border-agri-green-100 hover:border-agri-green-300'
            }`}
            onClick={() => setSelectedCrop(crop.id)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.span 
                  className="text-3xl"
                  whileHover={{ scale: 1.2 }}
                >
                  {crop.image}
                </motion.span>
                <div>
                  <h3 className="font-bold text-agri-green-800">{crop.name}</h3>
                  <p className="text-sm text-agri-green-600">{crop.season}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-24 bg-agri-green-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.suitability}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className="bg-agri-green-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="font-bold text-agri-green-700">{crop.suitability}%</span>
                </div>
                <p className="text-sm text-agri-green-600">Suitability</p>
              </div>
            </div>

            <AnimatePresence>
              {selectedCrop === crop.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-3"
                >
                  <p className="text-sm text-agri-green-700">{crop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-agri-green-500" />
                      <span>Duration: {crop.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-agri-green-500" />
                      <span>Yield: {crop.yield}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-agri-green-500" />
                      <span>Risk: {crop.risk}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-agri-gold">💰</span>
                      <span>Profit: {crop.profit}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-agri-green-600 mb-1">Water Needs</p>
                      <ProgressBar 
                        percentage={crop.water === 'High' ? 80 : crop.water === 'Medium' ? 60 : 40} 
                        color="agri-sky"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-agri-green-600 mb-1">Fertilizer</p>
                      <ProgressBar 
                        percentage={crop.fertilizer === 'High' ? 75 : crop.fertilizer === 'Medium' ? 50 : 25} 
                        color="agri-gold"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="agri-button w-full mt-6 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Detailed Analysis</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </AnimatedCard>
  );
};

export default CropRecommendation;