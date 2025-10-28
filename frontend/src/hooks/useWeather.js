import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const useWeather = (location = 'Nairobi') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual weather API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const mockWeather = {
          location,
          temperature: 28,
          humidity: 65,
          rainfall: 45,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          forecast: [
            { day: 'Mon', temp: 29, condition: 'sunny' },
            { day: 'Tue', temp: 27, condition: 'cloudy' },
            { day: 'Wed', temp: 26, condition: 'rainy' },
            { day: 'Thu', temp: 28, condition: 'sunny' },
            { day: 'Fri', temp: 30, condition: 'sunny' },
          ]
        };
        
        setWeather(mockWeather);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        toast.error('Failed to load weather information');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, loading, error };
};

export default useWeather;