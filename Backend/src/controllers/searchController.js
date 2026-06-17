const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const User = require('../models/User');
const Order = require('../models/Order');

// @desc    Global search across projects, users, and orders
// @route   GET /api/search?q=term
// @access  Private
const globalSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    res.status(400);
    throw new Error('Search query must be at least 2 characters');
  }

  const regex = new RegExp(q, 'i');

  // Search projects
  const projects = await Project.find({
    $or: [
      { title: regex },
      { description: regex },
      { location: regex },
    ],
  })
    .populate('postedBy', 'name role')
    .limit(10)
    .select('title type location status');

  // Search users
  const users = await User.find({
    $or: [
      { name: regex },
      { company: regex },
      { city: regex },
    ],
  })
    .limit(10)
    .select('name role city company avatar rating');

  // Search orders
  const orders = await Order.find({
    $or: [
      { itemName: regex },
      { orderId: regex },
    ],
    $and: [
      { $or: [{ buyer: req.user._id }, { supplier: req.user._id }] },
    ],
  })
    .limit(10)
    .select('orderId itemName status total');

  res.json({
    success: true,
    data: {
      projects,
      users,
      orders,
      totalResults: projects.length + users.length + orders.length,
    },
  });
});

module.exports = { globalSearch };
