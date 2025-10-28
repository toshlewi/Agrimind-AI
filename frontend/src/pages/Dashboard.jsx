import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  CloudRain, 
  Thermometer, 
  MapPin, 
  Calendar,
  TrendingUp,
  Droplets,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnimatedCard from '../components/ui/AnimatedCard';
import ProgressBar from '../components/ui/ProgressBar';

const Dashboard = () => {
  const { user, API_BASE } = useAuth();
  const [farmData, setFarmData] = useState({
    soil_type: '',
    farm_size: '',
    altitude: '',
    location: user?.location || '',
    current_crops: []
  });
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const soilTypes = [
    'Loamy', 'Sandy', 'Clay', 'Sandy Loam', 'Clay Loam', 
    'Silty', 'Peaty', 'Chalky', 'Volcanic', 'Well-drained'
  ];

  const commonCrops = [
    'Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Cabbage', 
    'Coffee', 'Tea', 'Wheat', 'Rice', 'Sorghum'
  ];

  useEffect(() => {
    if (user?.location) {
      fetchWeatherData();
    }
  }, [user?.location]);

  const fetchWeatherData = async () => {
    try {
      const token = localStorage.getItem('agrimind_token');
      const response = await fetch(
        `${API_BASE}/weather/current?location=${user.location}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.status === 'success') {
        setWeather(data.data.weather);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  const handleFarmDataSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('agrimind_token');
      const response = await fetch(`${API_BASE}/crops/ai-recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...farmData,
          temperature: weather?.current?.temp || 25,
          rainfall: weather?.current?.rainfall || 600
        })
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setRecommendations(data.data);
      }
    } catch (error) {
      console.error('Recommendation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-agri-green-500 to-agri-green-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 font-display">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-agri-green-100 text-lg">
          Let's optimize your farm {user?.farmName ? `- ${user.farmName}` : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Farm Data Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Farm Data Form */}
          <AnimatedCard className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Sprout className="w-6 h-6 text-agri-green-500" />
              <h2 className="text-xl font-bold text-agri-green-800">Farm Profile Setup</h2>
            </div>

            <form onSubmit={handleFarmDataSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-agri-green-700 mb-2">
                    Soil Type *
                  </label>
                  <select
                    value={farmData.soil_type}
                    onChange={(e) => setFarmData(prev => ({ ...prev, soil_type: e.target.value }))}
                    className="w-full p-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-agri-green-700 mb-2">
                    Farm Size (acres) *
                  </label>
                  <input
                    type="number"
                    value={farmData.farm_size}
                    onChange={(e) => setFarmData(prev => ({ ...prev, farm_size: e.target.value }))}
                    className="w-full p-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent"
                    placeholder="e.g., 5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-agri-green-700 mb-2">
                    Altitude (meters)
                  </label>
                  <input
                    type="number"
                    value={farmData.altitude}
                    onChange={(e) => setFarmData(prev => ({ ...prev, altitude: e.target.value }))}
                    className="w-full p-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent"
                    placeholder="e.g., 1500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-agri-green-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={farmData.location}
                    onChange={(e) => setFarmData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-agri-green-200 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent"
                    placeholder="e.g., Nairobi, Kenya"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-agri-green-700 mb-2">
                  Current Crops (if any)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonCrops.map(crop => (
                    <label key={crop} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={farmData.current_crops.includes(crop)}
                        onChange={(e) => {
                          const updatedCrops = e.target.checked
                            ? [...farmData.current_crops, crop]
                            : farmData.current_crops.filter(c => c !== crop);
                          setFarmData(prev => ({ ...prev, current_crops: updatedCrops }));
                        }}
                        className="rounded border-agri-green-300 text-agri-green-600 focus:ring-agri-green-500"
                      />
                      <span className="text-sm text-agri-green-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full agri-button disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Get AI Recommendations'}
              </motion.button>
            </form>
          </AnimatedCard>

          {/* AI Recommendations */}
          {recommendations && (
            <AnimatedCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-agri-green-500" />
                <h2 className="text-xl font-bold text-agri-green-800">AI Crop Recommendations</h2>
              </div>

              <div className="space-y-4">
                {recommendations.recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.crop}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-agri-green-200 rounded-xl bg-agri-green-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-agri-green-800">{rec.crop}</h3>
                      <span className="text-agri-green-600 font-bold">{rec.score}% Match</span>
                    </div>
                    <ProgressBar percentage={rec.score} />
                    <ul className="mt-2 space-y-1 text-sm text-agri-green-600">
                      {rec.reasons.map((reason, i) => (
                        <li key={i}>• {reason}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Analysis Summary */}
              {recommendations.analysis && (
                <div className="mt-6 p-4 bg-agri-green-100 rounded-xl">
                  <h4 className="font-bold text-agri-green-800 mb-3">Farm Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Best Planting Season:</strong>
                      <p className="text-agri-green-600">{recommendations.analysis.best_season}</p>
                    </div>
                    <div>
                      <strong>Expected Yield:</strong>
                      <p className="text-agri-green-600">{recommendations.analysis.expected_yield} tons</p>
                    </div>
                    {recommendations.analysis.risk_factors.length > 0 && (
                      <div className="md:col-span-2">
                        <strong>Risk Factors:</strong>
                        <ul className="text-agri-green-600">
                          {recommendations.analysis.risk_factors.map((risk, i) => (
                            <li key={i}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AnimatedCard>
          )}
        </div>

        {/* Right Column - Weather & Quick Actions */}
        <div className="space-y-6">
          {/* Weather Card */}
          <AnimatedCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CloudRain className="w-6 h-6 text-agri-green-500" />
              <h3 className="font-bold text-agri-green-800">Weather Today</h3>
            </div>
            
            {weather ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">{weather.current.temp}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">{weather.current.humidity}%</span>
                  </div>
                </div>
                <p className="text-sm text-agri-green-600 capitalize">
                  {weather.current.weather[0]?.description}
                </p>
                
                {/* 3-day forecast */}
                <div className="pt-3 border-t border-agri-green-200">
                  <h4 className="text-sm font-semibold text-agri-green-700 mb-2">3-Day Forecast</h4>
                  <div className="space-y-2">
                    {weather.daily?.slice(0, 3).map((day, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'In 2 days'}</span>
                        <span className="text-agri-green-600">
                          {day.temp.day}°C • {day.weather[0]?.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-agri-green-600">Loading weather data...</p>
            )}
          </AnimatedCard>

          {/* Quick Actions */}
          <AnimatedCard className="p-6">
            <h3 className="font-bold text-agri-green-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-agri-green-100 text-agri-green-700 rounded-xl hover:bg-agri-green-200 transition-colors text-left flex items-center space-x-3"
              >
                <Calendar className="w-5 h-5" />
                <span>Add Farm Record</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-agri-green-100 text-agri-green-700 rounded-xl hover:bg-agri-green-200 transition-colors text-left flex items-center space-x-3"
              >
                <Droplets className="w-5 h-5" />
                <span>Water Schedule</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-agri-green-100 text-agri-green-700 rounded-xl hover:bg-agri-green-200 transition-colors text-left flex items-center space-x-3"
              >
                <Shield className="w-5 h-5" />
                <span>Pest Alerts</span>
              </motion.button>
            </div>
          </AnimatedCard>

          {/* Farm Summary */}
          <AnimatedCard className="p-6">
            <h3 className="font-bold text-agri-green-800 mb-4">Farm Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-agri-green-600">Farm Size</span>
                <span className="font-semibold">{farmData.farm_size || 'Not set'} acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-green-600">Soil Type</span>
                <span className="font-semibold">{farmData.soil_type || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-green-600">Active Crops</span>
                <span className="font-semibold">{farmData.current_crops.length}</span>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;