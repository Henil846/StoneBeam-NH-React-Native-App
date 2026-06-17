const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { createTicket, getTickets } = require('../controllers/supportController');

const router = express.Router();

router.post(
  '/ticket',
  protect,
  [
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validate,
  createTicket
);

router.get('/tickets', protect, getTickets);

module.exports = router;
