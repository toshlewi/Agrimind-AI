import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 to-agri-green-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-farm-pattern opacity-5"></div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-agri-green-200 rounded-full opacity-10"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 bg-agri-gold rounded-full opacity-10"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
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
              Welcome to the Future of{' '}
              <span className="text-gradient bg-gradient-to-r from-agri-green-500 to-agri-green-700">
                Farming
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-agri-green-600 mb-8 leading-relaxed"
            >
              Sign in to access AI-powered crop recommendations, yield predictions, 
              and sustainable farming insights tailored to your farm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-4"
            >
              {[
                '🌱 AI-Powered Crop Recommendations',
                '📊 Accurate Yield Predictions',
                '💧 Smart Water Management',
                '🌍 Sustainability Tracking'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3 text-agri-green-700"
                >
                  <div className="w-2 h-2 bg-agri-green-500 rounded-full"></div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <LoginForm onSwitchToSignup={() => window.location.href = '/signup'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;