import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Wind, Droplets, Calendar } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import WeatherIcon from '../ui/WeatherIcon';

const WeatherCard = () => {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 45,
    windSpeed: 12,
    condition: 'Partly Cloudy'
  };

  const forecast = [
    { day: 'Mon', temp: 29, condition: 'sunny' },
    { day: 'Tue', temp: 27, condition: 'cloudy' },
    { day: 'Wed', temp: 26, condition: 'rainy' },
    { day: 'Thu', temp: 28, condition: 'sunny' },
    { day: 'Fri', temp: 30, condition: 'sunny' },
  ];

  return (
    <AnimatedCard delay={0.1} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-agri-green-800">Weather Today</h2>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <WeatherIcon condition="sunny" size="large" />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="flex items-center space-x-3 p-3 bg-agri-green-50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Sun className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-sm text-agri-green-600">Temperature</p>
            <p className="font-bold text-agri-green-800">{weatherData.temperature}°C</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3 p-3 bg-agri-green-50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-agri-green-600">Humidity</p>
            <p className="font-bold text-agri-green-800">{weatherData.humidity}%</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3 p-3 bg-agri-green-50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <CloudRain className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm text-agri-green-600">Rainfall</p>
            <p className="font-bold text-agri-green-800">{weatherData.rainfall}mm</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3 p-3 bg-agri-green-50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Wind className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-agri-green-600">Wind Speed</p>
            <p className="font-bold text-agri-green-800">{weatherData.windSpeed} km/h</p>
          </div>
        </motion.div>
      </div>
      
      {/* Weather Forecast */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-agri-green-600" />
          <h3 className="font-semibold text-agri-green-800">5-Day Forecast</h3>
        </div>
        <div className="flex justify-between">
          {forecast.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-agri-green-600">{day.day}</p>
              <WeatherIcon condition={day.condition} size="small" />
              <p className="text-sm font-semibold text-agri-green-800">{day.temp}°</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="p-3 bg-gradient-to-r from-agri-green-500 to-agri-green-600 rounded-lg text-white text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <p className="font-semibold">🌤️ Good planting conditions today!</p>
      </motion.div>
    </AnimatedCard>
  );
};

export default WeatherCard;