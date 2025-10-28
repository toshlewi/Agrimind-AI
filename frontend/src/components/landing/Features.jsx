import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Droplets, Leaf, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent crop recommendations based on soil data, weather patterns, and market trends.',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Yield Prediction',
      description: 'Accurate yield forecasts using machine learning models trained on historical data.',
      color: 'text-blue-600'
    },
    {
      icon: Droplets,
      title: 'Water Management',
      description: 'Optimize irrigation with smart water usage recommendations and drought predictions.',
      color: 'text-cyan-600'
    },
    {
      icon: Leaf,
      title: 'Sustainability Tracking',
      description: 'Monitor and improve your environmental impact with carbon footprint analysis.',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Disease Detection',
      description: 'Early detection of plant diseases using computer vision and weather data.',
      color: 'text-red-600'
    },
    {
      icon: Zap,
      title: 'Real-time Alerts',
      description: 'Get instant notifications about weather changes, pest outbreaks, and market opportunities.',
      color: 'text-yellow-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-agri-green-800 mb-4 font-display">
            Smart Farming Features
          </h2>
          <p className="text-xl text-agri-green-600 max-w-3xl mx-auto">
            Everything you need to transform your farming operations with artificial intelligence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-agri-green-50 rounded-2xl p-8 border border-agri-green-100 hover:border-agri-green-300 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-shadow"
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </motion.div>
              
              <h3 className="text-xl font-bold text-agri-green-800 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-agri-green-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;