const asyncHandler = require('express-async-handler');
const Banner = require('../models/Banner');

// @desc    Get active banners
// @route   GET /api/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true })
    .sort({ order: 1 })
    .limit(10);

  res.json({
    success: true,
    data: banners,
  });
});

module.exports = { getBanners };
