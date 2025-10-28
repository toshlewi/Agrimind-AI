import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, MapPin, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmName: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      farmName: formData.farmName,
      location: formData.location
    };

    const result = await signup(userData);
    
    if (result.success) {
      toast.success('Account created successfully!');
    } else {
      toast.error(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-agri-green-100">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-br from-agri-green-500 to-agri-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-agri-green-800">Join AgriMind AI</h2>
          <p className="text-agri-green-600 mt-2">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-agri-green-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                placeholder="John Farmer"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-agri-green-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                placeholder="farmer@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-agri-green-700 mb-2">
                Farm Name
              </label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Green Valley Farm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-agri-green-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nairobi, Kenya"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-agri-green-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-agri-green-400 hover:text-agri-green-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-agri-green-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-agri-green-400 hover:text-agri-green-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full agri-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <UserPlus className="w-5 h-5" />
            )}
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-agri-green-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-agri-green-500 hover:text-agri-green-700 font-semibold transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;