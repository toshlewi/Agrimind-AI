import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Calendar, MapPin, CheckCircle } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';

const FarmRecords = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'planting',
      crop: 'Maize',
      date: '2024-03-15',
      location: 'Field A',
      status: 'completed',
      details: 'Planted 2 acres of hybrid maize'
    },
    {
      id: 2,
      type: 'fertilizer',
      crop: 'Maize',
      date: '2024-03-20',
      location: 'Field A',
      status: 'completed',
      details: 'Applied NPK fertilizer'
    },
    {
      id: 3,
      type: 'irrigation',
      crop: 'Maize',
      date: '2024-03-25',
      location: 'Field A',
      status: 'pending',
      details: 'Scheduled irrigation for tomorrow'
    },
    {
      id: 4,
      type: 'harvest',
      crop: 'Beans',
      date: '2024-04-10',
      location: 'Field B',
      status: 'upcoming',
      details: 'Expected harvest date'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50';
      case 'upcoming':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <AnimatedCard delay={0.4} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BookOpen className="w-6 h-6 text-agri-green-500" />
          </motion.div>
          <h2 className="text-xl font-bold text-agri-green-800">Farm Records</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-agri-green-500 text-white rounded-full hover:bg-agri-green-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="p-4 bg-agri-green-50 rounded-lg border border-agri-green-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-agri-green-800">{activity.crop}</h3>
                <p className="text-sm text-agri-green-600">{activity.details}</p>
              </div>
              <motion.div
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(activity.status)}`}
                whileHover={{ scale: 1.05 }}
              >
                {getStatusIcon(activity.status)}
                <span className="capitalize">{activity.status}</span>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-agri-green-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{activity.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="w-full mt-4 p-3 border-2 border-dashed border-agri-green-300 rounded-xl text-agri-green-600 hover:border-agri-green-400 hover:text-agri-green-700 transition-colors flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-4 h-4" />
        <span>Add New Activity</span>
      </motion.button>
    </AnimatedCard>
  );
};

export default FarmRecords;