const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/helpers');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, city, company, experience, skills } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    res.status(400);
    throw new Error('A user with this email or phone already exists');
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    city: city || '',
    company: company || '',
    experience: experience || 0,
    skills: skills || [],
  });

  console.log(`✅ New user registered: ${user.name} (${user.email}) → saved to MongoDB with ID: ${user._id}`);

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    res.status(400);
    throw new Error('Please provide email/phone and password');
  }

  // Find by email or phone
  const user = await User.findOne({
    $or: [{ email: identifier.toLowerCase() }, { phone: identifier }],
  }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const allowedFields = [
    'name', 'city', 'company', 'experience', 'skills',
    'bio', 'avatar', 'notificationSettings', 'language',
  ];

  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    data: user,
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Password updated successfully',
    data: { token },
  });
});

// @desc    Forgot password (send OTP placeholder)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { identifier } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier?.toLowerCase() }, { phone: identifier }],
  });

  if (!user) {
    res.status(404);
    throw new Error('No account found with that email or phone');
  }

  // In production, send OTP via SMS/email here
  res.json({
    success: true,
    message: 'OTP sent to your registered email/phone',
  });
});

// @desc    Delete current user account
// @route   DELETE /api/auth/me
// @access  Private
const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.json({
    success: true,
    message: 'Account deleted successfully',
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  deleteMe,
};
