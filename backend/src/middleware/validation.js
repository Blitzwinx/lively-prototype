const { body, param, query, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Health metrics validation
const validateHealthMetric = [
  body('metric_type')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Metric type must be a string between 1-50 characters'),
  body('value')
    .isNumeric()
    .withMessage('Value must be a number'),
  body('unit')
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit must be a string between 1-20 characters'),
  body('secondary_value')
    .optional()
    .isNumeric()
    .withMessage('Secondary value must be a number'),
  body('measured_at')
    .optional()
    .isISO8601()
    .withMessage('Measured at must be a valid ISO date'),
  handleValidationErrors
];

// Activity validation
const validateActivity = [
  body('activity_type')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Activity type must be a string between 1-50 characters'),
  body('duration_minutes')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Duration must be between 1-1440 minutes'),
  body('distance_km')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Distance must be a positive number'),
  body('calories_burned')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('Calories burned must be between 0-10000'),
  body('intensity')
    .optional()
    .isIn(['low', 'moderate', 'high'])
    .withMessage('Intensity must be low, moderate, or high'),
  body('started_at')
    .isISO8601()
    .withMessage('Started at must be a valid ISO date'),
  handleValidationErrors
];

// Sleep session validation
const validateSleepSession = [
  body('bedtime')
    .isISO8601()
    .withMessage('Bedtime must be a valid ISO date'),
  body('wake_time')
    .isISO8601()
    .withMessage('Wake time must be a valid ISO date'),
  body('sleep_quality_score')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Sleep quality score must be between 0-100'),
  body('deep_sleep_minutes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Deep sleep minutes must be a positive integer'),
  body('light_sleep_minutes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Light sleep minutes must be a positive integer'),
  body('rem_sleep_minutes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('REM sleep minutes must be a positive integer'),
  handleValidationErrors
];

// Nutrition entry validation
const validateNutritionEntry = [
  body('meal_type')
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Meal type must be breakfast, lunch, dinner, or snack'),
  body('food_name')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Food name must be a string between 1-100 characters'),
  body('calories')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Calories must be between 0-10000'),
  body('protein_g')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Protein must be a positive number'),
  body('carbs_g')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Carbs must be a positive number'),
  body('fat_g')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Fat must be a positive number'),
  handleValidationErrors
];

// Goal validation
const validateGoal = [
  body('category')
    .isIn(['activity', 'nutrition', 'sleep', 'wellness'])
    .withMessage('Category must be activity, nutrition, sleep, or wellness'),
  body('title')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be a string between 1-100 characters'),
  body('target_value')
    .isFloat({ min: 0 })
    .withMessage('Target value must be a positive number'),
  body('unit')
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit must be a string between 1-20 characters'),
  body('start_date')
    .isDate()
    .withMessage('Start date must be a valid date'),
  body('end_date')
    .isDate()
    .withMessage('End date must be a valid date'),
  handleValidationErrors
];

// Query parameter validation
const validateDateRange = [
  query('start_date')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO date'),
  query('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO date'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Limit must be between 1-1000'),
  handleValidationErrors
];

// ID parameter validation
const validateId = [
  param('id')
    .isUUID()
    .withMessage('ID must be a valid UUID'),
  handleValidationErrors
];

module.exports = {
  validateHealthMetric,
  validateActivity,
  validateSleepSession,
  validateNutritionEntry,
  validateGoal,
  validateDateRange,
  validateId,
  handleValidationErrors
};