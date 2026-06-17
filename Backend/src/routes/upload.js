const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadImage, getUploadAuth } = require('../controllers/uploadController');

const router = express.Router();

// Store files in memory buffer for ImageKit upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

router.post('/', protect, upload.single('image'), uploadImage);
router.get('/auth', protect, getUploadAuth);

module.exports = router;
