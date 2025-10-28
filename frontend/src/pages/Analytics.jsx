import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  
  const yieldData = [
    { month: 'Jan', maize: 3.2, beans: 1.5, tomatoes: 8.1 },
    { month: 'Feb', maize: 3.8, beans: 1.7, tomatoes: 9.2 },
    { month: 'Mar', maize: 4.2, beans: 1.8, tomatoes: 10.5 },
    { month: 'Apr', maize: 4.5, beans: 1.9, tomatoes: 11.8 },
    { month: 'May', maize: 4.1, beans: 1.6, tomatoes: 9.9 },
    { month: 'Jun', maize: 3.9, beans: 1.4, tomatoes: 8.7 },
  ];

  const profitData = [
    { month: 'Jan', revenue: 68000, cost: 32000, profit: 36000 },
    { month: 'Feb', revenue: 75000, cost: 35000, profit: 40000 },
    { month: 'Mar', revenue: 85000, cost: 38000, profit: 47000 },
    { month: 'Apr', revenue: 92000, cost: 40000, profit: 52000 },
    { month: 'May', revenue: 81000, cost: 37000, profit: 44000 },
    { month: 'Jun', revenue: 72000, cost: 34000, profit: 38000 },
  ];

  const kpis = [
    {
      title: 'Average Yield',
      value: '4.1 t/acre',
      change: '+12%',
      trend: 'up',
      description: 'Compared to last period'
    },
    {
      title: 'Profit Margin',
      value: '52%',
      change: '+8%',
      trend: 'up',
      description: 'Increased efficiency'
    },
    {
      title: 'Water Efficiency',
      value: '78%',
      change: '+15%',
      trend: 'up',
      description: 'Better usage'
    },
    {
      title: 'Crop Success Rate',
      value: '92%',
      change: '+5%',
      trend: 'up',
      description: 'Healthy crops'
    }
  ];

  const timeRanges = [
    { key: '1m', label: '1 Month' },
    { key: '3m', label: '3 Months' },
    { key: '6m', label: '6 Months' },
    { key: '1y', label: '1 Year' }
  ];

  const getMaxValue = (data, key) => {
    return Math.max(...data.map(item => item[key]));
  };

  const getBarHeight = (value, maxValue) => {
    return (value / maxValue) * 100;
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
          <h1 className="text-3xl font-bold text-agri-green-800 font-display">Farm Analytics</h1>
          <p className="text-agri-green-600">Deep insights into your farm's performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-agri-green-200 px-3 py-2">
            <Calendar className="w-4 h-4 text-agri-green-600" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent outline-none text-agri-green-800"
            >
              {timeRanges.map(range => (
                <option key={range.key} value={range.key}>{range.label}</option>
              ))}
            </select>
          </div>
          <motion.button
            className="agri-button flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <AnimatedCard key={kpi.title} delay={index * 0.1} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-agri-green-800">{kpi.title}</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-agri-green-800">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-500 font-semibold">{kpi.change}</span>
                <span className="text-agri-green-600">{kpi.description}</span>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Yield Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.4} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-agri-green-800">Yield Comparison</h2>
            <BarChart3 className="w-5 h-5 text-agri-green-600" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-agri-green-600">
              <span>Crop</span>
              <span>Tons per Acre</span>
            </div>
            
            <div className="space-y-3">
              {yieldData.map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-agri-green-800">
                    <span>{month.month}</span>
                    <span>Max: {Math.max(month.maize, month.beans, month.tomatoes).toFixed(1)}t</span>
                  </div>
                  
                  <div className="flex space-x-1 h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getBarHeight(month.maize, 12)}%` }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                      className="bg-agri-green-500 rounded-full"
                      title={`Maize: ${month.maize}t`}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getBarHeight(month.beans, 12)}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 1 }}
                      className="bg-agri-gold rounded-full"
                      title={`Beans: ${month.beans}t`}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getBarHeight(month.tomatoes, 12)}%` }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 1 }}
                      className="bg-red-400 rounded-full"
                      title={`Tomatoes: ${month.tomatoes}t`}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-agri-green-600">
                    <span>🌽 {month.maize}t</span>
                    <span>🫘 {month.beans}t</span>
                    <span>🍅 {month.tomatoes}t</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Profit Analysis */}
        <AnimatedCard delay={0.5} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-agri-green-800">Profit Analysis</h2>
            <TrendingUp className="w-5 h-5 text-agri-green-600" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-agri-green-600">
              <span>Month</span>
              <span>Amount (KSh)</span>
            </div>
            
            <div className="space-y-4">
              {profitData.map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-agri-green-800">
                    <span>{month.month}</span>
                    <span>Profit: KSh {month.profit.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-agri-green-600">
                      <span>Revenue</span>
                      <span>KSh {month.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-agri-green-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarHeight(month.revenue, 100000)}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        className="bg-green-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-agri-green-600">
                      <span>Cost</span>
                      <span>KSh {month.cost.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-agri-green-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarHeight(month.cost, 50000)}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 1 }}
                        className="bg-red-400 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-agri-green-600">
                      <span>Profit</span>
                      <span className="font-semibold text-green-600">
                        KSh {month.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-agri-green-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarHeight(month.profit, 60000)}%` }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 1 }}
                        className="bg-agri-gold h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard delay={0.6} className="p-6">
          <h3 className="font-semibold text-agri-green-800 mb-4">Crop Distribution</h3>
          <div className="space-y-3">
            {[
              { crop: 'Maize', area: '45%', color: 'bg-agri-green-500' },
              { crop: 'Beans', area: '25%', color: 'bg-agri-gold' },
              { crop: 'Tomatoes', area: '20%', color: 'bg-red-400' },
              { crop: 'Other', area: '10%', color: 'bg-agri-green-300' }
            ].map((item, index) => (
              <div key={item.crop} className="flex items-center justify-between">
                <span className="text-sm text-agri-green-700">{item.crop}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-agri-green-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.area }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 1 }}
                      className={`h-2 rounded-full ${item.color}`}
                    />
                  </div>
                  <span className="text-sm font-semibold text-agri-green-800 w-8">{item.area}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.7} className="p-6">
          <h3 className="font-semibold text-agri-green-800 mb-4">Resource Efficiency</h3>
          <div className="space-y-4">
            {[
              { resource: 'Water', efficiency: 78 },
              { resource: 'Fertilizer', efficiency: 85 },
              { resource: 'Labor', efficiency: 72 },
              { resource: 'Energy', efficiency: 68 }
            ].map((item, index) => (
              <div key={item.resource}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-agri-green-700">{item.resource}</span>
                  <span className="font-semibold text-agri-green-800">{item.efficiency}%</span>
                </div>
                <ProgressBar 
                  percentage={item.efficiency} 
                  color={item.efficiency > 75 ? 'agri-green' : 'agri-gold'}
                />
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.8} className="p-6">
          <h3 className="font-semibold text-agri-green-800 mb-4">Seasonal Trends</h3>
          <div className="space-y-3 text-sm">
            {[
              { season: 'Long Rains', yield: '+15%', profit: '+22%' },
              { season: 'Short Rains', yield: '+8%', profit: '+12%' },
              { season: 'Dry Season', yield: '-5%', profit: '-8%' }
            ].map((trend, index) => (
              <motion.div
                key={trend.season}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.9 }}
                className="flex justify-between p-3 bg-agri-green-50 rounded-lg"
              >
                <span className="text-agri-green-700">{trend.season}</span>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">{trend.yield} yield</div>
                  <div className="text-agri-green-600">{trend.profit} profit</div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </motion.div>
  );
};

export default Analytics;