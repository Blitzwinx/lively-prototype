const express = require('express');
const { supabaseAdmin } = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Apply authentication to all health routes
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

// Health Metrics Routes
router.get('/metrics', async (req, res) => {
  try {
    const { metric_type, limit = 50 } = req.query;
    
    console.log('Fetching health metrics for user:', req.user.id);
    
    let query = supabaseAdmin
      .from('health_metrics')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (metric_type) {
      query = query.eq('metric_type', metric_type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching health metrics:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch health metrics'
      });
    }

    console.log(`Found ${data?.length || 0} health metrics for user ${req.user.id}`);

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Health metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/metrics', [
  body('metric_type').isIn(['heart_rate', 'blood_pressure_systolic', 'blood_pressure_diastolic', 'weight', 'body_fat_percentage', 'muscle_mass', 'steps', 'calories_burned']),
  body('value').isNumeric(),
  body('unit').notEmpty(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { metric_type, value, unit, notes, measured_at } = req.body;

    const { data, error } = await supabaseAdmin
      .from('health_metrics')
      .insert([{
        user_id: req.user.id,
        metric_type,
        value: parseFloat(value),
        unit,
        notes,
        measured_at: measured_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating health metric:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create health metric'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Health metric recorded successfully',
      data
    });

  } catch (error) {
    console.error('Health metrics creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Activities Routes
router.get('/activities', async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const { data, error } = await supabaseAdmin
      .from('activities')
      .select('*')
      .eq('user_id', req.user.id)
      .order('started_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      console.error('Error fetching activities:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch activities'
      });
    }

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/activities', [
  body('activity_type').notEmpty(),
  body('name').notEmpty(),
  body('duration_minutes').isInt({ min: 1 }),
  body('started_at').isISO8601(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { activity_type, name, duration_minutes, calories_burned, distance_km, intensity, notes, started_at } = req.body;

    const { data, error } = await supabaseAdmin
      .from('activities')
      .insert([{
        user_id: req.user.id,
        activity_type,
        name,
        duration_minutes: parseInt(duration_minutes),
        calories_burned: calories_burned ? parseInt(calories_burned) : 0,
        distance_km: distance_km ? parseFloat(distance_km) : null,
        intensity,
        notes,
        started_at
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating activity:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create activity'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Activity recorded successfully',
      data
    });

  } catch (error) {
    console.error('Activity creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Sleep Sessions Routes
router.get('/sleep', async (req, res) => {
  try {
    const { limit = 30 } = req.query;

    const { data, error } = await supabaseAdmin
      .from('sleep_sessions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('bedtime', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      console.error('Error fetching sleep sessions:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch sleep sessions'
      });
    }

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Sleep sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/sleep', [
  body('bedtime').isISO8601(),
  body('wake_time').isISO8601(),
  body('duration_hours').isNumeric(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { bedtime, wake_time, duration_hours, quality_score, deep_sleep_minutes, light_sleep_minutes, rem_sleep_minutes, awake_minutes, notes } = req.body;

    const { data, error } = await supabaseAdmin
      .from('sleep_sessions')
      .insert([{
        user_id: req.user.id,
        bedtime,
        wake_time,
        duration_hours: parseFloat(duration_hours),
        quality_score: quality_score ? parseInt(quality_score) : null,
        deep_sleep_minutes: deep_sleep_minutes ? parseInt(deep_sleep_minutes) : 0,
        light_sleep_minutes: light_sleep_minutes ? parseInt(light_sleep_minutes) : 0,
        rem_sleep_minutes: rem_sleep_minutes ? parseInt(rem_sleep_minutes) : 0,
        awake_minutes: awake_minutes ? parseInt(awake_minutes) : 0,
        notes
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating sleep session:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create sleep session'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Sleep session recorded successfully',
      data
    });

  } catch (error) {
    console.error('Sleep session creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Nutrition Routes
router.get('/nutrition', async (req, res) => {
  try {
    const { meal_type, date, limit = 100 } = req.query;

    let query = supabaseAdmin
      .from('nutrition_entries')
      .select('*')
      .eq('user_id', req.user.id)
      .order('consumed_at', { ascending: false })
      .limit(parseInt(limit));

    if (meal_type) {
      query = query.eq('meal_type', meal_type);
    }

if (date) {
  let startDate;
  
  // Handle relative date formats like "1d", "2d", etc.
  if (typeof date === 'string' && date.match(/^\d+d$/)) {
    const days = parseInt(date.replace('d', ''));
    startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0); // Set to start of day
  }
  // Handle absolute dates like "2025-07-22"
  else if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    startDate = new Date(date + 'T00:00:00.000Z');
  }
  // Handle other date formats
  else {
    startDate = new Date(date);
  }
  
  // Check if the date is valid
  if (isNaN(startDate.getTime())) {
    console.error('Invalid date provided:', date);
    return res.status(400).json({ 
      error: 'Invalid date format. Use YYYY-MM-DD or relative format like "1d", "7d"' 
    });
  }
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);
  
  query = query
    .gte('consumed_at', startDate.toISOString())
    .lt('consumed_at', endDate.toISOString());
}

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching nutrition entries:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch nutrition entries'
      });
    }

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Nutrition entries error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/nutrition', [
  body('meal_type').isIn(['breakfast', 'lunch', 'dinner', 'snack']),
  body('food_name').notEmpty(),
  body('quantity').isNumeric(),
  body('calories').isNumeric(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { meal_type, food_name, quantity, unit, calories, protein_g, carbs_g, fat_g, fiber_g, sugar_g, sodium_mg, consumed_at } = req.body;

    const { data, error } = await supabaseAdmin
      .from('nutrition_entries')
      .insert([{
        user_id: req.user.id,
        meal_type,
        food_name,
        quantity: parseFloat(quantity),
        unit: unit || 'grams',
        calories: parseFloat(calories),
        protein_g: protein_g ? parseFloat(protein_g) : 0,
        carbs_g: carbs_g ? parseFloat(carbs_g) : 0,
        fat_g: fat_g ? parseFloat(fat_g) : 0,
        fiber_g: fiber_g ? parseFloat(fiber_g) : 0,
        sugar_g: sugar_g ? parseFloat(sugar_g) : 0,
        sodium_mg: sodium_mg ? parseFloat(sodium_mg) : 0,
        consumed_at: consumed_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating nutrition entry:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create nutrition entry'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Nutrition entry recorded successfully',
      data
    });

  } catch (error) {
    console.error('Nutrition entry creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Water Intake Routes
router.get('/water', async (req, res) => {
  try {
    const { date, limit = 50 } = req.query;

    let query = supabaseAdmin
      .from('water_intake')
      .select('*')
      .eq('user_id', req.user.id)
      .order('consumed_at', { ascending: false })
      .limit(parseInt(limit));

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query = query
        .gte('consumed_at', startDate.toISOString())
        .lt('consumed_at', endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching water intake:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch water intake'
      });
    }

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Water intake error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/water', [
  body('amount_ml').isInt({ min: 1 }),
  handleValidationErrors
], async (req, res) => {
  try {
    const { amount_ml, consumed_at } = req.body;

    const { data, error } = await supabaseAdmin
      .from('water_intake')
      .insert([{
        user_id: req.user.id,
        amount_ml: parseInt(amount_ml),
        consumed_at: consumed_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating water intake:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to record water intake'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Water intake recorded successfully',
      data
    });

  } catch (error) {
    console.error('Water intake creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Goals Routes
router.get('/goals', async (req, res) => {
  try {
    const { status, category } = req.query;

    let query = supabaseAdmin
      .from('goals')
      .select(`
        *,
        goal_milestones (*)
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching goals:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch goals'
      });
    }

    res.json({
      success: true,
      data: data || []
    });

  } catch (error) {
    console.error('Goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/goals', [
  body('title').notEmpty(),
  body('category').isIn(['weight_loss', 'weight_gain', 'fitness', 'nutrition', 'sleep', 'activity', 'health_metric']),
  body('target_value').isNumeric(),
  body('unit').notEmpty(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { title, description, category, target_value, unit, target_date } = req.body;

    const { data, error } = await supabaseAdmin
      .from('goals')
      .insert([{
        user_id: req.user.id,
        title,
        description,
        category,
        target_value: parseFloat(target_value),
        unit,
        target_date: target_date || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create goal'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Goal created successfully',
      data
    });

  } catch (error) {
    console.error('Goal creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.patch('/goals/:id/progress', [
  body('current_value').isNumeric(),
  handleValidationErrors
], async (req, res) => {
  try {
    const { id } = req.params;
    const { current_value } = req.body;

    // Verify goal belongs to user
    const { data: goal, error: goalError } = await supabaseAdmin
      .from('goals')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (goalError || !goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Update goal progress
    const { data, error } = await supabaseAdmin
      .from('goals')
      .update({
        current_value: parseFloat(current_value),
        status: parseFloat(current_value) >= goal.target_value ? 'completed' : 'active'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating goal progress:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update goal progress'
      });
    }

    res.json({
      success: true,
      message: 'Goal progress updated successfully',
      data
    });

  } catch (error) {
    console.error('Goal progress update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;