import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import SignupForm from '../components/forms/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 to-agri-green-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-farm-pattern opacity-5"></div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-28 h-28 bg-agri-green-200 rounded-full opacity-10"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-agri-green-600 hover:text-agri-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-agri-green-500 to-agri-green-600 rounded-full flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient font-display">AgriMind AI</h1>
                <p className="text-agri-green-600">Smart Climate Farming</p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-agri-green-800 mb-6 font-display leading-tight"
            >
              Join the{' '}
              <span className="text-gradient bg-gradient-to-r from-agri-green-500 to-agri-green-700">
                Farming Revolution
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-agri-green-600 mb-8 leading-relaxed"
            >
              Create your account and start leveraging artificial intelligence 
              to optimize your farming operations and maximize your harvest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: '🤖', text: 'AI-Powered Insights' },
                { icon: '📈', text: 'Increase Yields' },
                { icon: '💧', text: 'Save Water' },
                { icon: '🌱', text: 'Grow Sustainably' }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-agri-green-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <div className="flex justify-center lg:justify-end">
            <SignupForm onSwitchToLogin={() => window.location.href = '/login'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;