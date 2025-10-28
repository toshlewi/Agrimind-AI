import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Filter, Search, Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard';

const FarmRecords = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const records = [
    {
      id: 1,
      type: 'planting',
      crop: 'Maize',
      variety: 'DH04',
      date: '2024-03-15',
      location: 'Field A',
      area: '2 acres',
      status: 'completed',
      yield: '4.2 tons',
      cost: 25000,
      revenue: 85000
    },
    {
      id: 2,
      type: 'planting',
      crop: 'Beans',
      variety: 'Rosecoco',
      date: '2024-02-10',
      location: 'Field B',
      area: '1 acre',
      status: 'completed',
      yield: '1.8 tons',
      cost: 15000,
      revenue: 45000
    },
    {
      id: 3,
      type: 'harvest',
      crop: 'Tomatoes',
      variety: 'Roma',
      date: '2024-04-01',
      location: 'Greenhouse',
      area: '0.5 acres',
      status: 'completed',
      yield: '8 tons',
      cost: 40000,
      revenue: 120000
    },
    {
      id: 4,
      type: 'fertilizer',
      crop: 'Maize',
      variety: 'DH04',
      date: '2024-03-25',
      location: 'Field A',
      area: '2 acres',
      status: 'completed',
      fertilizer: 'NPK 23:23:0',
      quantity: '100kg'
    },
    {
      id: 5,
      type: 'irrigation',
      crop: 'All',
      date: '2024-03-28',
      location: 'All Fields',
      status: 'pending',
      waterUsed: '5000L',
      duration: '4 hours'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Records' },
    { key: 'planting', label: 'Planting' },
    { key: 'harvest', label: 'Harvest' },
    { key: 'fertilizer', label: 'Fertilizer' },
    { key: 'irrigation', label: 'Irrigation' }
  ];

  const filteredRecords = activeFilter === 'all' 
    ? records 
    : records.filter(record => record.type === activeFilter);

  const getTypeColor = (type) => {
    const colors = {
      planting: 'bg-green-100 text-green-800',
      harvest: 'bg-yellow-100 text-yellow-800',
      fertilizer: 'bg-blue-100 text-blue-800',
      irrigation: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getProfit = (record) => {
    if (record.revenue && record.cost) {
      return record.revenue - record.cost;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-agri-green-800 font-display">Farm Records</h1>
          <p className="text-agri-green-600">Track and manage all your farming activities</p>
        </div>
        <motion.button
          className="agri-button flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </motion.button>
      </div>

      {/* Filters */}
      <AnimatedCard className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-agri-green-50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-agri-green-600" />
            <input
              type="text"
              placeholder="Search records..."
              className="bg-transparent outline-none text-agri-green-800 placeholder-agri-green-600"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-agri-green-600" />
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-agri-green-500 text-white'
                    : 'bg-agri-green-100 text-agri-green-700 hover:bg-agri-green-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Records Grid */}
      <div className="grid gap-6">
        {filteredRecords.map((record, index) => (
          <AnimatedCard key={record.id} delay={index * 0.1} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(record.type)}`}>
                  {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-agri-green-800">
                    {record.crop} {record.variety && `- ${record.variety}`}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-agri-green-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{record.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{record.location} • {record.area}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-agri-green-100 rounded-lg hover:bg-agri-green-200 transition-colors"
                >
                  <Edit className="w-4 h-4 text-agri-green-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-700" />
                </motion.button>
              </div>
            </div>

            {/* Record Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {record.yield && (
                <div>
                  <p className="text-agri-green-600">Yield</p>
                  <p className="font-semibold text-agri-green-800">{record.yield}</p>
                </div>
              )}
              
              {record.cost && (
                <div>
                  <p className="text-agri-green-600">Cost</p>
                  <p className="font-semibold text-agri-green-800">KSh {record.cost.toLocaleString()}</p>
                </div>
              )}
              
              {record.revenue && (
                <div>
                  <p className="text-agri-green-600">Revenue</p>
                  <p className="font-semibold text-agri-green-800">KSh {record.revenue.toLocaleString()}</p>
                </div>
              )}
              
              {getProfit(record) !== null && (
                <div>
                  <p className="text-agri-green-600">Profit</p>
                  <p className={`font-semibold ${
                    getProfit(record) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    KSh {getProfit(record).toLocaleString()}
                  </p>
                </div>
              )}
              
              {record.fertilizer && (
                <div>
                  <p className="text-agri-green-600">Fertilizer</p>
                  <p className="font-semibold text-agri-green-800">{record.fertilizer}</p>
                </div>
              )}
              
              {record.quantity && (
                <div>
                  <p className="text-agri-green-600">Quantity</p>
                  <p className="font-semibold text-agri-green-800">{record.quantity}</p>
                </div>
              )}
              
              {record.waterUsed && (
                <div>
                  <p className="text-agri-green-600">Water Used</p>
                  <p className="font-semibold text-agri-green-800">{record.waterUsed}</p>
                </div>
              )}
              
              {record.duration && (
                <div>
                  <p className="text-agri-green-600">Duration</p>
                  <p className="font-semibold text-agri-green-800">{record.duration}</p>
                </div>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <AnimatedCard className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-agri-green-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-agri-green-800 mb-2">No records found</h3>
          <p className="text-agri-green-600 mb-4">
            {activeFilter === 'all' 
              ? "You haven't added any farm records yet." 
              : `No ${activeFilter} records found.`
            }
          </p>
          <motion.button
            className="agri-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Record
          </motion.button>
        </AnimatedCard>
      )}
    </motion.div>
  );
};

export default FarmRecords;