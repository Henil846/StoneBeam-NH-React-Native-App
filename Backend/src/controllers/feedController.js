const asyncHandler = require('express-async-handler');
const Feed = require('../models/Feed');
const { timeAgo } = require('../utils/helpers');

// @desc    Get activity feed for current user
// @route   GET /api/feed?page=1&limit=20
// @access  Private
const getFeed = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const total = await Feed.countDocuments({ user: req.user._id });
  const feeds = await Feed.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  // Add timeAgo to each feed item
  const feedsWithTime = feeds.map((f) => {
    const obj = f.toJSON();
    obj.timeAgo = timeAgo(f.createdAt);
    return obj;
  });

  res.json({
    success: true,
    data: feedsWithTime,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = { getFeed };
