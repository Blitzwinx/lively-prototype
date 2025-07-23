const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Apply authentication to all user routes
router.use(authenticateToken);

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only access their own profile
    if (id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        sex: data.sex,
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        date_of_birth: data.date_of_birth,
        blood_type: data.blood_type,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        emergency_contact_relationship: data.emergency_contact_relationship,
        picture_url: data.picture_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    });

  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.patch('/:id', [
  body('name').optional().notEmpty(),
  body('sex').optional().isIn(['male', 'female', 'other']),
  body('height_cm').optional().isInt({ min: 1, max: 300 }),
  body('weight_kg').optional().isFloat({ min: 1, max: 1000 }),
  body('date_of_birth').optional().isISO8601(),
  body('picture_url').optional().isURL(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only update their own profile
    if (id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { name, sex, height_cm, weight_kg, date_of_birth, picture_url } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (sex !== undefined) updateData.sex = sex;
    if (height_cm !== undefined) updateData.height_cm = parseInt(height_cm);
    if (weight_kg !== undefined) updateData.weight_kg = parseFloat(weight_kg);
    if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth;
    if (picture_url !== undefined) updateData.picture_url = picture_url;

    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update user profile'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        sex: data.sex,
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        date_of_birth: data.date_of_birth,
        picture_url: data.picture_url,
        updated_at: data.updated_at
      }
    });

  } catch (error) {
    console.error('User update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user dashboard summary
router.get('/:id/dashboard', async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only access their own dashboard
    if (id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get recent health metrics
    const { data: recentMetrics } = await supabaseAdmin
      .from('health_metrics')
      .select('*')
      .eq('user_id', id)
      .order('recorded_at', { ascending: false })
      .limit(10);

    // Get recent activities
    const { data: recentActivities } = await supabaseAdmin
      .from('activities')
      .select('*')
      .eq('user_id', id)
      .order('started_at', { ascending: false })
      .limit(5);

    // Get latest sleep session
    const { data: latestSleep } = await supabaseAdmin
      .from('sleep_sessions')
      .select('*')
      .eq('user_id', id)
      .order('bedtime', { ascending: false })
      .limit(1);

    // Get active goals
    const { data: activeGoals } = await supabaseAdmin
      .from('goals')
      .select('*')
      .eq('user_id', id)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Get today's water intake
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const { data: todayWater } = await supabaseAdmin
      .from('water_intake')
      .select('amount_ml')
      .eq('user_id', id)
      .gte('consumed_at', startOfDay.toISOString())
      .lt('consumed_at', endOfDay.toISOString());

    const totalWaterToday = todayWater?.reduce((sum, entry) => sum + entry.amount_ml, 0) || 0;

    // Get today's nutrition
    const { data: todayNutrition } = await supabaseAdmin
      .from('nutrition_entries')
      .select('calories, protein_g, carbs_g, fat_g')
      .eq('user_id', id)
      .gte('consumed_at', startOfDay.toISOString())
      .lt('consumed_at', endOfDay.toISOString());

    const nutritionSummary = todayNutrition?.reduce((sum, entry) => ({
      calories: sum.calories + (entry.calories || 0),
      protein: sum.protein + (entry.protein_g || 0),
      carbs: sum.carbs + (entry.carbs_g || 0),
      fat: sum.fat + (entry.fat_g || 0)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

    res.json({
      success: true,
      data: {
        recentMetrics: recentMetrics || [],
        recentActivities: recentActivities || [],
        latestSleep: latestSleep?.[0] || null,
        activeGoals: activeGoals || [],
        todayWaterIntake: totalWaterToday,
        todayNutrition: nutritionSummary
      }
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;