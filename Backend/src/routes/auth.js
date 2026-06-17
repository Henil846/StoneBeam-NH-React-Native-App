const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  deleteMe,
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
      .isIn(['builder', 'contractor', 'client', 'labourer', 'skilled_labour', 'dealer'])
      .withMessage('Valid role is required'),
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('identifier').notEmpty().withMessage('Email or phone is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.post(
  '/forgot-password',
  [body('identifier').notEmpty().withMessage('Email or phone is required')],
  validate,
  forgotPassword
);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.delete('/me', protect, deleteMe);

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  validate,
  changePassword
);

module.exports = router;
