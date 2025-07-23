const express = require('express');
const { register, login } = require('../controllers/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

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

// Register route
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim(),
  body('sex').optional().isIn(['male', 'female', 'other']),
  body('height_cm').optional().isInt({ min: 1, max: 300 }),
  body('weight_kg').optional().isFloat({ min: 1, max: 1000 }),
  body('date_of_birth').optional().isISO8601(),
  handleValidationErrors
], register);

// Login route
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidationErrors
], login);

module.exports = router;