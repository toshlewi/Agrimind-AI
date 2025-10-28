import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  Sun, 
  CloudRain, 
  Bell, 
  LogOut, 
  User, 
  Settings,
  ChevronDown,
  Search
} from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setIsUserDropdownOpen(false);
  };

  const notifications = [
    {
      id: 1,
      type: 'weather',
      title: 'Rain Alert',
      message: 'Heavy rainfall expected tomorrow',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'crop',
      title: 'Crop Health',
      message: 'Maize plants showing good growth',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'market',
      title: 'Price Update',
      message: 'Tomato prices increased by 15%',
      time: '2 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      }}
      className="glass-effect rounded-2xl m-4 p-6"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-agri-green-400 to-agri-green-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sprout className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-agri-gold rounded-full border-2 border-white"
            />
          </div>
          <div>
            <motion.h1 
              className="text-2xl font-bold text-gradient font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AgriMind AI
            </motion.h1>
            <motion.p 
              className="text-agri-green-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Smart Climate Farming
            </motion.p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search crops, weather, analytics..."
              className="w-full pl-10 pr-4 py-2 bg-agri-green-50 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300 placeholder-agri-green-400"
            />
          </div>
        </motion.div>

        {/* Right Section - Weather, Notifications, User */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Weather Quick Info */}
          <div className="hidden sm:flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2 text-agri-green-700 bg-agri-green-50 px-3 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sun className="w-4 h-4 text-yellow-500" />
              </motion.div>
              <span className="font-semibold">28°C</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 text-agri-green-700 bg-agri-green-50 px-3 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">65%</span>
            </motion.div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 bg-agri-green-100 rounded-full hover:bg-agri-green-200 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-agri-green-700" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </motion.div>
              )}
            </motion.button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-agri-green-100 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-agri-green-100">
                    <h3 className="font-semibold text-agri-green-800">Notifications</h3>
                    <p className="text-sm text-agri-green-600">{unreadCount} unread</p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border-b border-agri-green-50 hover:bg-agri-green-50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-agri-green-800 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                          )}
                        </div>
                        <p className="text-agri-green-600 text-sm mb-1">
                          {notification.message}
                        </p>
                        <p className="text-agri-green-400 text-xs">
                          {notification.time}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-agri-green-50">
                    <button className="w-full text-center text-agri-green-600 hover:text-agri-green-700 text-sm font-medium transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-3 p-2 bg-agri-green-100 rounded-xl hover:bg-agri-green-200 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-agri-green-500 to-agri-green-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-agri-green-800">
                  {user?.name || 'Farmer'}
                </p>
                <p className="text-xs text-agri-green-600">
                  {user?.farmName || 'My Farm'}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isUserDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-agri-green-600" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-agri-green-100 z-50 overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-agri-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-agri-green-500 to-agri-green-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-agri-green-800">
                          {user?.name || 'Farmer User'}
                        </h3>
                        <p className="text-sm text-agri-green-600">
                          {user?.email || 'farmer@example.com'}
                        </p>
                        <p className="text-xs text-agri-green-500">
                          {user?.farmName || 'Family Farm'} • {user?.location || 'Kenya'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center space-x-3 p-3 text-agri-green-700 hover:bg-agri-green-50 rounded-xl transition-colors text-left"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center space-x-3 p-3 text-agri-green-700 hover:bg-agri-green-50 rounded-xl transition-colors text-left"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </motion.button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-agri-green-100">
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mobile Search Bar */}
      <motion.div 
        className="md:hidden mt-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 0.7 }}
      >
        <div className="relative">
          <Search className="w-4 h-4 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crops, weather, analytics..."
            className="w-full pl-10 pr-4 py-2 bg-agri-green-50 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent transition-all duration-300 placeholder-agri-green-400"
          />
        </div>
      </motion.div>

      {/* Mobile Weather Info */}
      <motion.div 
        className="md:hidden flex items-center justify-between mt-4 pt-4 border-t border-agri-green-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-2 text-agri-green-700">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">28°C</span>
        </div>
        <div className="flex items-center space-x-2 text-agri-green-700">
          <CloudRain className="w-4 h-4 text-blue-400" />
          <span className="font-semibold">65% Humidity</span>
        </div>
        <div className="text-agri-green-600 text-sm">
          🌤️ Partly Cloudy
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;