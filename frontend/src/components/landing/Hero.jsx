import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, Shield, Users, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 to-agri-green-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-farm-pattern opacity-10"></div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-agri-green-200 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-agri-gold rounded-full opacity-30"
        animate={{
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 bg-agri-green-300 rounded-full opacity-25"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-agri-green-200 shadow-sm"
            >
              <div className="w-2 h-2 bg-agri-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-agri-green-700">
                AI-Powered Farming Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-agri-green-900 font-display leading-tight"
            >
              Grow Smarter{' '}
              <span className="text-gradient bg-gradient-to-r from-agri-green-500 to-agri-green-700">
                with AI
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-agri-green-700 leading-relaxed"
            >
              Harness the power of artificial intelligence to make data-driven farming decisions. 
              Increase your yields, reduce costs, and farm sustainably with our smart agriculture platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup" className="flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="agri-button text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login" className="flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="agri-button-secondary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { value: '+45%', label: 'Yield Increase' },
                { value: '-30%', label: 'Water Usage' },
                { value: '5000+', label: 'Farmers' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-agri-green-600">{stat.value}</div>
                  <div className="text-sm text-agri-green-700">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8 border-t border-agri-green-200"
            >
              <p className="text-sm text-agri-green-600 mb-3">Trusted by farmers across Africa</p>
              <div className="flex items-center space-x-6 opacity-60">
                {['🌱', '🇰🇪', '🇺🇬', '🇹🇿', '🇳🇬', '🇿🇦'].map((flag, index) => (
                  <motion.span
                    key={flag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="text-2xl"
                  >
                    {flag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sprout className="w-6 h-6 text-agri-green-500" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-agri-green-800">AI Crop Advisor</h3>
                  <p className="text-sm text-agri-green-600">Real-time Recommendations</p>
                </div>
              </div>

              {/* Crop Recommendation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-gradient-to-r from-agri-green-500 to-agri-green-600 rounded-2xl p-6 text-white mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌽</span>
                    <div>
                      <div className="font-bold text-lg">Maize</div>
                      <div className="text-agri-green-100 text-sm">92% Match</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-agri-gold rounded-full"
                  />
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="bg-agri-gold h-2 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-agri-green-100">
                  <span>Low Suitability</span>
                  <span>Perfect Match</span>
                </div>
              </motion.div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="bg-agri-green-50 rounded-xl p-4"
                >
                  <TrendingUp className="w-6 h-6 text-agri-green-600 mb-2" />
                  <div className="font-bold text-agri-green-800">4.2t/acre</div>
                  <div className="text-sm text-agri-green-600">Yield Prediction</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="bg-agri-green-50 rounded-xl p-4"
                >
                  <Shield className="w-6 h-6 text-agri-green-600 mb-2" />
                  <div className="font-bold text-agri-green-800">85%</div>
                  <div className="text-sm text-agri-green-600">Success Rate</div>
                </motion.div>
              </div>

              {/* Weather Alert */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="bg-agri-gold/10 border border-agri-gold/20 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2 text-agri-green-700">
                  <div className="w-2 h-2 bg-agri-gold rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Optimal planting conditions this week</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-agri-green-100 z-0"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-agri-green-500" />
                <div>
                  <div className="font-bold text-agri-green-800 text-sm">500+</div>
                  <div className="text-xs text-agri-green-600">Active Farms</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -top-6 -right-6 bg-agri-green-500 rounded-2xl p-4 shadow-lg text-white z-0"
            >
              <div className="text-center">
                <div className="font-bold text-lg">🌤️ 28°C</div>
                <div className="text-xs text-agri-green-100">Ideal for planting</div>
              </div>
            </motion.div>

            {/* Background Decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -z-10 -inset-4 bg-gradient-to-r from-agri-green-400/10 to-agri-green-600/10 rounded-3xl blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-agri-green-600"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-agri-green-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-agri-green-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;