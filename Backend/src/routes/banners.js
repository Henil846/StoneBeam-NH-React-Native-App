const express = require('express');
const { getBanners } = require('../controllers/bannerController');

const router = express.Router();

// Public — no auth needed for banners
router.get('/', getBanners);

module.exports = router;
