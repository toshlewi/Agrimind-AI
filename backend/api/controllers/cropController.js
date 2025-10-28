import { supabase } from '../utils/supabase.js';

// Mock AI model for crop recommendations (replace with actual ML model)
const getCropRecommendation = (location, soilType, farmSize, season) => {
  // This is a simplified mock - replace with actual ML model integration
  const crops = [
    { name: 'Maize', confidence: 0.92, reason: 'Ideal for your soil type and climate' },
    { name: 'Beans', confidence: 0.88, reason: 'Good nitrogen fixation for soil health' },
    { name: 'Tomatoes', confidence: 0.85, reason: 'High market demand and good yield potential' },
    { name: 'Potatoes', confidence: 0.78, reason: 'Suitable for your farm size and soil' },
    { name: 'Cabbage', confidence: 0.75, reason: 'Good for crop rotation and soil improvement' }
  ];

  // Simple scoring based on parameters
  const scoredCrops = crops.map(crop => ({
    ...crop,
    confidence: Math.min(0.95, crop.confidence + (Math.random() * 0.1 - 0.05))
  }));

  return scoredCrops.sort((a, b) => b.confidence - a.confidence);
};

export const getCropRecommendations = async (req, res) => {
  try {
    const { location, soil_type, farm_size, season } = req.body;
    const userId = req.user.id;

    // Get AI recommendations
    const recommendations = getCropRecommendation(location, soil_type, farm_size, season);

    // Save recommendations to database
    for (const rec of recommendations.slice(0, 3)) {
      await supabase
        .from('crop_recommendations')
        .insert([
          {
            user_id: userId,
            recommended_crop: rec.name,
            confidence_score: rec.confidence,
            reason: rec.reason
          }
        ]);
    }

    res.status(200).json({
      status: 'success',
      data: {
        recommendations: recommendations.slice(0, 5), // Return top 5
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Crop recommendation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate crop recommendations'
    });
  }
};

export const getYieldPrediction = async (req, res) => {
  try {
    const { crop, location, farm_size, season } = req.body;
    const userId = req.user.id;

    // Mock yield prediction (replace with actual ML model)
    const baseYields = {
      'Maize': { min: 2.5, max: 4.5 },
      'Beans': { min: 1.2, max: 2.0 },
      'Tomatoes': { min: 8.0, max: 15.0 },
      'Potatoes': { min: 10.0, max: 20.0 },
      'Cabbage': { min: 15.0, max: 25.0 }
    };

    const base = baseYields[crop] || { min: 3.0, max: 6.0 };
    const expectedYield = (base.min + (Math.random() * (base.max - base.min))).toFixed(1);
    
    // Mock profit calculation
    const pricePerTon = {
      'Maize': 25000,
      'Beans': 28000,
      'Tomatoes': 35000,
      'Potatoes': 20000,
      'Cabbage': 18000
    };

    const estimatedProfit = Math.round(expectedYield * (pricePerTon[crop] || 25000) * 0.7); // 70% of revenue as profit

    // Save prediction to database
    const { data: prediction } = await supabase
      .from('yield_predictions')
      .insert([
        {
          user_id: userId,
          crop,
          expected_yield: parseFloat(expectedYield),
          estimated_profit: estimatedProfit,
          season
        }
      ])
      .select()
      .single();

    res.status(200).json({
      status: 'success',
      data: {
        prediction: {
          crop,
          expected_yield: parseFloat(expectedYield),
          estimated_profit: estimatedProfit,
          season,
          confidence: 0.85, // Mock confidence score
          generated_at: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Yield prediction error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate yield prediction'
    });
  }
};

export const getCropHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: recommendations, error } = await supabase
      .from('crop_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      data: {
        recommendations
      }
    });

  } catch (error) {
    console.error('Get crop history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch crop history'
    });
  }
};