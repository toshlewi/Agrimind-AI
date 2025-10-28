import { supabase } from '../utils/supabase.js';

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get counts from different tables
    const [
      { count: farmRecordsCount },
      { count: cropRecommendationsCount },
      { count: yieldPredictionsCount }
    ] = await Promise.all([
      supabase.from('farm_records').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('crop_recommendations').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('yield_predictions').select('*', { count: 'exact', head: true }).eq('user_id', userId)
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          farm_records: farmRecordsCount || 0,
          crop_recommendations: cropRecommendationsCount || 0,
          yield_predictions: yieldPredictionsCount || 0,
          joined_date: req.user.created_at
        }
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user statistics'
    });
  }
};