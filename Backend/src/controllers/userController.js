const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get users by role (Find Builder/Contractor/Client/Dealer/etc.)
// @route   GET /api/users?role=builder&city=Mumbai&search=John&page=1&limit=20
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const { role, city, search, page = 1, limit = 20 } = req.query;

  const query = {};

  // Exclude current user
  query._id = { $ne: req.user._id };

  if (role) {
    query.role = role;
  }

  if (city && city !== 'All') {
    query.city = { $regex: city, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { city: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('-notificationSettings -language')
    .sort({ rating: -1, reviewCount: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-notificationSettings -language');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    data: user,
  });
});

module.exports = { getUsers, getUserById };
