const asyncHandler = require('express-async-handler');
const Attendance = require('../models/Attendance');

// @desc    Get attendance records for current user
// @route   GET /api/attendance?month=6&year=2025
// @access  Private
const getAttendance = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  const now = new Date();
  const m = month ? parseInt(month) - 1 : now.getMonth();
  const y = year ? parseInt(year) : now.getFullYear();

  const startDate = new Date(y, m, 1);
  const endDate = new Date(y, m + 1, 0, 23, 59, 59);

  const records = await Attendance.find({
    user: req.user._id,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: -1 });

  res.json({
    success: true,
    data: records,
  });
});

// @desc    Check in for today
// @route   POST /api/attendance/checkin
// @access  Private
const checkIn = asyncHandler(async (req, res) => {
  const { site, shift, contractor } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already checked in today
  let record = await Attendance.findOne({
    user: req.user._id,
    date: today,
  });

  if (record && record.checkIn) {
    res.status(400);
    throw new Error('Already checked in today');
  }

  const checkInTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (record) {
    record.checkIn = checkInTime;
    record.status = 'Present';
    record.site = site || record.site;
    record.shift = shift || record.shift;
    record.contractor = contractor || record.contractor;
    await record.save();
  } else {
    record = await Attendance.create({
      user: req.user._id,
      date: today,
      site: site || 'Unassigned',
      shift: shift || '8:00 AM - 5:00 PM',
      contractor: contractor || '',
      checkIn: checkInTime,
      status: 'Present',
    });
  }

  res.json({
    success: true,
    message: `Checked in at ${checkInTime}`,
    data: record,
  });
});

// @desc    Check out for today
// @route   POST /api/attendance/checkout
// @access  Private
const checkOut = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const record = await Attendance.findOne({
    user: req.user._id,
    date: today,
  });

  if (!record || !record.checkIn) {
    res.status(400);
    throw new Error('You have not checked in today');
  }

  if (record.checkOut) {
    res.status(400);
    throw new Error('Already checked out today');
  }

  const checkOutTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Calculate hours worked (rough estimate based on current time - 8am default)
  const now = new Date();
  const hoursWorked = Math.min(Math.max(now.getHours() - 8, 0), 10);

  record.checkOut = checkOutTime;
  record.hoursWorked = hoursWorked;
  record.status = hoursWorked >= 6 ? 'Present' : 'Half Day';

  await record.save();

  res.json({
    success: true,
    message: `Checked out at ${checkOutTime}. Hours worked: ${hoursWorked}`,
    data: record,
  });
});

// @desc    Get monthly attendance summary
// @route   GET /api/attendance/summary?month=6&year=2025
// @access  Private
const getAttendanceSummary = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  const now = new Date();
  const m = month ? parseInt(month) - 1 : now.getMonth();
  const y = year ? parseInt(year) : now.getFullYear();

  const startDate = new Date(y, m, 1);
  const endDate = new Date(y, m + 1, 0, 23, 59, 59);

  const records = await Attendance.find({
    user: req.user._id,
    date: { $gte: startDate, $lte: endDate },
  });

  const summary = {
    present: records.filter((r) => r.status === 'Present').length,
    absent: records.filter((r) => r.status === 'Absent').length,
    halfDay: records.filter((r) => r.status === 'Half Day').length,
    totalHours: records.reduce((sum, r) => sum + r.hoursWorked, 0),
    totalDays: records.length,
  };

  res.json({
    success: true,
    data: summary,
  });
});

module.exports = {
  getAttendance,
  checkIn,
  checkOut,
  getAttendanceSummary,
};
