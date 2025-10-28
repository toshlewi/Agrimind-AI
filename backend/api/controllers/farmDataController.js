import { supabase } from '../utils/supabase.js';
import axios from 'axios';

// Get weather data from OpenWeatherMap
export const getWeatherForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      // Mock weather data if no API key
      const mockWeather = {
        location: { lat: parseFloat(lat) || -1.2921, lon: parseFloat(lon) || 36.8219 },
        current: {
          temp: 25,
          humidity: 65,
          pressure: 1013,
          wind_speed: 3.5,
          weather: [{ description: 'scattered clouds', icon: '03d' }]
        },
        daily: [
          { dt: Date.now()/1000, temp: { day: 26 }, weather: [{ description: 'light rain' }] },
          { dt: Date.now()/1000 + 86400, temp: { day: 24 }, weather: [{ description: 'moderate rain' }] },
          { dt: Date.now()/1000 + 172800, temp: { day: 23 }, weather: [{ description: 'heavy rain' }] }
        ]
      };
      return res.json({ status: 'success', data: mockWeather });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`
    );

    res.json({ status: 'success', data: response.data });
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch weather data' });
  }
};

// AI Crop Recommendation based on real data
export const getAICropRecommendation = async (req, res) => {
  try {
    const { soil_type, rainfall, temperature, altitude, location, farm_size } = req.body;
    const userId = req.user.id;

    // Simple AI logic - expand with ML model
    const crops = {
      'Potatoes': { min_temp: 15, max_temp: 25, min_rainfall: 500, max_rainfall: 900, soil: ['loamy', 'sandy loam'] },
      'Maize': { min_temp: 18, max_temp: 30, min_rainfall: 600, max_rainfall: 1200, soil: ['well-drained', 'loamy'] },
      'Beans': { min_temp: 20, max_temp: 28, min_rainfall: 500, max_rainfall: 800, soil: ['well-drained', 'clay loam'] },
      'Tomatoes': { min_temp: 21, max_temp: 29, min_rainfall: 600, max_rainfall: 900, soil: ['sandy loam', 'loamy'] },
      'Cabbage': { min_temp: 15, max_temp: 20, min_rainfall: 350, max_rainfall: 500, soil: ['clay', 'clay loam'] },
      'Coffee': { min_temp: 15, max_temp: 24, min_rainfall: 1500, max_rainfall: 2500, soil: ['volcanic', 'well-drained'] },
      'Tea': { min_temp: 10, max_temp: 30, min_rainfall: 1500, max_rainfall: 5000, soil: ['acidic', 'well-drained'] }
    };

    const recommendations = Object.entries(crops).map(([crop, requirements]) => {
      let score = 0;
      
      // Temperature suitability
      if (temperature >= requirements.min_temp && temperature <= requirements.max_temp) {
        score += 30;
      }
      
      // Rainfall suitability
      if (rainfall >= requirements.min_rainfall && rainfall <= requirements.max_rainfall) {
        score += 30;
      }
      
      // Soil suitability
      if (requirements.soil.includes(soil_type)) {
        score += 40;
      }
      
      // Adjust score based on altitude for certain crops
      if ((crop === 'Coffee' || crop === 'Tea') && altitude > 1000) {
        score += 10;
      }

      return {
        crop,
        score: Math.min(100, score),
        reasons: [
          `Temperature: ${requirements.min_temp}°C - ${requirements.max_temp}°C`,
          `Rainfall: ${requirements.min_rainfall}mm - ${requirements.max_rainfall}mm`,
          `Soil: ${requirements.soil.join(', ')}`
        ]
      };
    }).filter(rec => rec.score > 50).sort((a, b) => b.score - a.score);

    // Save recommendation
    await supabase
      .from('crop_recommendations')
      .insert(
        recommendations.slice(0, 3).map(rec => ({
          user_id: userId,
          recommended_crop: rec.crop,
          confidence_score: rec.score / 100,
          reason: rec.reasons.join('; ')
        }))
      );

    res.json({
      status: 'success',
      data: {
        recommendations: recommendations.slice(0, 5),
        analysis: {
          best_season: getBestSeason(temperature, rainfall),
          risk_factors: assessRisks(temperature, rainfall),
          expected_yield: calculateExpectedYield(recommendations[0]?.crop, farm_size)
        }
      }
    });

  } catch (error) {
    console.error('AI recommendation error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to generate recommendations' });
  }
};

// Helper functions
function getBestSeason(temperature, rainfall) {
  if (rainfall > 800 && temperature > 20) return 'Long Rains (March-May)';
  if (rainfall > 400 && temperature > 18) return 'Short Rains (October-December)';
  return 'Irrigation recommended';
}

function assessRisks(temperature, rainfall) {
  const risks = [];
  if (rainfall < 300) risks.push('Drought risk - irrigation needed');
  if (rainfall > 1200) risks.push('Flooding risk - drainage important');
  if (temperature > 35) risks.push('Heat stress possible');
  return risks;
}

function calculateExpectedYield(crop, farmSize) {
  const baseYields = {
    'Potatoes': 10, // tons per hectare
    'Maize': 4,
    'Beans': 1.5,
    'Tomatoes': 25,
    'Cabbage': 20,
    'Coffee': 2, // tons per hectare (green coffee)
    'Tea': 3 // tons per hectare (made tea)
  };
  return (baseYields[crop] || 3) * farmSize;
}