const asyncHandler = require('express-async-handler');
const SupportTicket = require('../models/SupportTicket');

// @desc    Create a support ticket
// @route   POST /api/support/ticket
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  const ticket = await SupportTicket.create({
    user: req.user._id,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Support ticket created successfully. We will get back to you soon.',
    data: ticket,
  });
});

// @desc    Get user's support tickets
// @route   GET /api/support/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: tickets,
  });
});

module.exports = { createTicket, getTickets };
