import { supabase } from '../utils/supabase.js';

export const getCurrentWeather = async (req, res) => {
  try {
    const { location } = req.query;
    const userId = req.user.id;

    // Mock weather data (replace with actual weather API)
    const mockWeather = {
      location: location || 'Nairobi',
      temperature: 28 + (Math.random() * 4 - 2), // 26-30°C
      rainfall: Math.random() * 10, // 0-10mm
      humidity: 60 + (Math.random() * 20 - 10), // 50-70%
      wind_speed: 5 + (Math.random() * 10), // 5-15 km/h
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)],
      forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 27, condition: 'Partly Cloudy' },
        { day: 'In 2 days', temp: 26, condition: 'Rainy' },
        { day: 'In 3 days', temp: 28, condition: 'Sunny' },
        { day: 'In 4 days', temp: 29, condition: 'Sunny' }
      ]
    };

    // Save to database
    await supabase
      .from('weather_data')
      .insert([
        {
          location: mockWeather.location,
          temperature: mockWeather.temperature,
          rainfall: mockWeather.rainfall,
          humidity: mockWeather.humidity,
          wind_speed: mockWeather.wind_speed
        }
      ]);

    res.status(200).json({
      status: 'success',
      data: {
        weather: mockWeather
      }
    });

  } catch (error) {
    console.error('Weather data error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch weather data'
    });
  }
};

export const getWeatherHistory = async (req, res) => {
  try {
    const { location, days = 7 } = req.query;

    const { data: weatherHistory, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('location', location || 'Nairobi')
      .order('date', { ascending: false })
      .limit(parseInt(days));

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      data: {
        weather_history: weatherHistory
      }
    });

  } catch (error) {
    console.error('Weather history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch weather history'
    });
  }
};