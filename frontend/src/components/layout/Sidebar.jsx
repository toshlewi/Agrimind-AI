import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  BarChart3, 
  Leaf, 
  Settings,
  BookOpen,
  TrendingUp 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Sprout, label: 'Crop Advisor', path: '/crops' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Leaf, label: 'Sustainability', path: '/sustainability' },
    { icon: BookOpen, label: 'Farm Records', path: '/records' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-white rounded-2xl shadow-lg m-4 p-6"
    >
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-agri-green-500 text-white shadow-lg transform scale-105'
                    : 'text-agri-green-700 hover:bg-agri-green-50 hover:transform hover:scale-105'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Farm Status Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-gradient-to-br from-agri-green-400 to-agri-green-600 rounded-xl text-white"
      >
        <h3 className="font-bold mb-2">Farm Status</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Active Crops</span>
            <span className="font-bold">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Yield Forecast</span>
            <span className="font-bold text-agri-gold">+12%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Soil Health</span>
            <span className="font-bold">85%</span>
          </div>
        </div>
        
        <motion.div
          className="mt-4 p-2 bg-white/20 rounded-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Optimal Conditions</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;