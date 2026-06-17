const asyncHandler = require('express-async-handler');
const imagekit = require('../config/imagekit');

// @desc    Upload image to ImageKit
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const result = await imagekit.upload({
    file: req.file.buffer.toString('base64'),
    fileName: `${Date.now()}_${req.file.originalname}`,
    folder: '/stonebeam',
    tags: [req.user.role, req.user._id.toString()],
  });

  res.json({
    success: true,
    data: {
      url: result.url,
      fileId: result.fileId,
      thumbnailUrl: result.thumbnailUrl,
      name: result.name,
    },
  });
});

// @desc    Get ImageKit auth parameters (for client-side upload)
// @route   GET /api/upload/auth
// @access  Private
const getUploadAuth = asyncHandler(async (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();

  res.json({
    success: true,
    data: authParams,
  });
});

module.exports = { uploadImage, getUploadAuth };
