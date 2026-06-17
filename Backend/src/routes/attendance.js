const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getAttendance,
  checkIn,
  checkOut,
  getAttendanceSummary,
} = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', protect, getAttendance);
router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/summary', protect, getAttendanceSummary);

module.exports = router;
