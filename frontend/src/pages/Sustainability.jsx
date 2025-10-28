import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Recycle, Sprout, TrendingUp, Target } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard';
import ProgressBar from '../components/ui/ProgressBar';

const Sustainability = () => {
  const metrics = [
    {
      icon: Droplets,
      title: 'Water Usage',
      value: '45,000L',
      target: '40,000L',
      efficiency: 85,
      trend: 'down',
      description: 'Water consumption this month'
    },
    {
      icon: Recycle,
      title: 'Carbon Footprint',
      value: '2.3t',
      target: '2.0t',
      efficiency: 78,
      trend: 'up',
      description: 'CO2 emissions reduced'
    },
    {
      icon: Sprout,
      title: 'Soil Health',
      value: '85%',
      target: '90%',
      efficiency: 92,
      trend: 'up',
      description: 'Soil quality index'
    },
    {
      icon: Leaf,
      title: 'Biodiversity',
      value: '78%',
      target: '85%',
      efficiency: 88,
      trend: 'up',
      description: 'Crop diversity score'
    }
  ];

  const recommendations = [
    {
      title: 'Implement Drip Irrigation',
      impact: 'High',
      savings: 'Save up to 30% water',
      description: 'Switch from flood irrigation to drip system for better water efficiency'
    },
    {
      title: 'Use Organic Fertilizers',
      impact: 'Medium',
      savings: 'Reduce chemical usage by 40%',
      description: 'Replace synthetic fertilizers with compost and manure'
    },
    {
      title: 'Crop Rotation',
      impact: 'High',
      savings: 'Improve soil health by 25%',
      description: 'Rotate legumes with cereals to maintain soil fertility'
    },
    {
      title: 'Rainwater Harvesting',
      impact: 'Medium',
      savings: 'Collect 20,000L annually',
      description: 'Install rainwater collection system for dry seasons'
    }
  ];

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '↗' : '↘';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-agri-green-800 font-display">Sustainability Dashboard</h1>
        <p className="text-agri-green-600">Monitor and improve your farm's environmental impact</p>
      </div>

      {/* Sustainability Score */}
      <AnimatedCard className="p-6 bg-gradient-to-r from-agri-green-500 to-agri-green-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Sustainability Score</h2>
            <p className="text-agri-green-100">Your farm is performing better than 75% of similar farms</p>
          </div>
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="text-5xl font-bold mb-2">82%</div>
            <div className="text-agri-green-100">Excellent</div>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-4 w-full bg-white/20 rounded-full h-3"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <motion.div
            className="bg-agri-gold h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '82%' }}
            transition={{ delay: 1, duration: 1.5 }}
          />
        </motion.div>
      </AnimatedCard>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <AnimatedCard key={metric.title} delay={index * 0.1} className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-agri-green-100 rounded-lg">
                <metric.icon className="w-6 h-6 text-agri-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-agri-green-800">{metric.title}</h3>
                <p className="text-sm text-agri-green-600">{metric.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-agri-green-800">{metric.value}</span>
                <span className={`text-sm font-semibold ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)} {metric.efficiency}%
                </span>
              </div>
              
              <ProgressBar 
                percentage={metric.efficiency} 
                label={`Target: ${metric.target}`}
              />
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Recommendations */}
      <AnimatedCard delay={0.4} className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-agri-green-500" />
          <h2 className="text-xl font-bold text-agri-green-800">Sustainability Recommendations</h2>
        </div>

        <div className="grid gap-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="p-4 bg-agri-green-50 rounded-lg border border-agri-green-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-agri-green-800">{rec.title}</h3>
                  <p className="text-sm text-agri-green-600 mt-1">{rec.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.impact === 'High' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {rec.impact} Impact
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-agri-green-700 font-semibold">{rec.savings}</span>
                <motion.button
                  className="text-agri-green-500 hover:text-agri-green-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Implement →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.5} className="p-6">
          <h3 className="text-lg font-bold text-agri-green-800 mb-4">Water Conservation</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Current Usage</span>
                <span>45,000L/month</span>
              </div>
              <ProgressBar percentage={75} color="agri-sky" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency Target</span>
                <span>40,000L/month</span>
              </div>
              <ProgressBar percentage={85} color="agri-green" />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6} className="p-6">
          <h3 className="text-lg font-bold text-agri-green-800 mb-4">Carbon Reduction</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Current Footprint</span>
                <span>2.3t CO2</span>
              </div>
              <ProgressBar percentage={65} color="agri-gold" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reduction Goal</span>
                <span>1.8t CO2</span>
              </div>
              <ProgressBar percentage={78} color="agri-green" />
            </div>
          </div>
        </AnimatedCard>
      </div>
    </motion.div>
  );
};

export default Sustainability;