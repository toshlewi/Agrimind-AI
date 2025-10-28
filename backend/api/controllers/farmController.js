import { supabase } from '../utils/supabase.js';

export const createFarmRecord = async (req, res) => {
  try {
    const { crop, planting_date, harvest_date, yield_obtained, revenue, notes } = req.body;
    const userId = req.user.id;

    const { data: record, error } = await supabase
      .from('farm_records')
      .insert([
        {
          user_id: userId,
          crop,
          planting_date,
          harvest_date,
          yield_obtained,
          revenue,
          notes
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      status: 'success',
      message: 'Farm record created successfully',
      data: {
        record
      }
    });

  } catch (error) {
    console.error('Create farm record error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create farm record'
    });
  }
};

export const getFarmRecords = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: records, error, count } = await supabase
      .from('farm_records')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      data: {
        records,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get farm records error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch farm records'
    });
  }
};

export const updateFarmRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { crop, planting_date, harvest_date, yield_obtained, revenue, notes } = req.body;
    const userId = req.user.id;

    // Verify record belongs to user
    const { data: existingRecord, error: checkError } = await supabase
      .from('farm_records')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (checkError || !existingRecord) {
      return res.status(404).json({
        status: 'error',
        message: 'Farm record not found'
      });
    }

    const { data: record, error } = await supabase
      .from('farm_records')
      .update({
        crop,
        planting_date,
        harvest_date,
        yield_obtained,
        revenue,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      message: 'Farm record updated successfully',
      data: {
        record
      }
    });

  } catch (error) {
    console.error('Update farm record error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update farm record'
    });
  }
};

export const deleteFarmRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify record belongs to user
    const { data: existingRecord, error: checkError } = await supabase
      .from('farm_records')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (checkError || !existingRecord) {
      return res.status(404).json({
        status: 'error',
        message: 'Farm record not found'
      });
    }

    const { error } = await supabase
      .from('farm_records')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      message: 'Farm record deleted successfully'
    });

  } catch (error) {
    console.error('Delete farm record error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete farm record'
    });
  }
};

export const getFarmAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get farm records for analytics
    const { data: records, error } = await supabase
      .from('farm_records')
      .select('*')
      .eq('user_id', userId)
      .order('planting_date', { ascending: false });

    if (error) throw error;

    // Calculate analytics
    const analytics = {
      total_yield: records.reduce((sum, record) => sum + (record.yield_obtained || 0), 0),
      total_revenue: records.reduce((sum, record) => sum + (record.revenue || 0), 0),
      crop_distribution: {},
      monthly_yield: {},
      success_rate: records.length > 0 ? (records.filter(r => r.yield_obtained > 0).length / records.length) * 100 : 0
    };

    // Calculate crop distribution
    records.forEach(record => {
      analytics.crop_distribution[record.crop] = (analytics.crop_distribution[record.crop] || 0) + 1;
    });

    // Calculate monthly yield
    records.forEach(record => {
      if (record.harvest_date) {
        const month = new Date(record.harvest_date).toLocaleString('default', { month: 'short', year: 'numeric' });
        analytics.monthly_yield[month] = (analytics.monthly_yield[month] || 0) + (record.yield_obtained || 0);
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        analytics
      }
    });

  } catch (error) {
    console.error('Get farm analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch farm analytics'
    });
  }
};