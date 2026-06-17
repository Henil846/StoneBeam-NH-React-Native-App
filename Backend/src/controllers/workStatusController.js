const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Payment = require('../models/Payment');
const Attendance = require('../models/Attendance');

// @desc    Get work status overview (active tasks + weekly earnings)
// @route   GET /api/work-status
// @access  Private
const getWorkStatus = asyncHandler(async (req, res) => {
  // Get tasks assigned to user
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate('project', 'title')
    .sort({ createdAt: -1 });

  // Calculate weekly earnings from attendance
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyAttendance = await Attendance.find({
    user: req.user._id,
    date: { $gte: startOfWeek, $lte: now },
  }).sort({ date: 1 });

  // Determine daily rate from first task or default
  const dailyRate = tasks.length > 0 ? (tasks[0].dailyRate || 800) : 800;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyEarnings = dayNames.slice(1, 7).map((day, idx) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + idx);
    const att = weeklyAttendance.find(
      (a) => new Date(a.date).toDateString() === dayDate.toDateString()
    );
    let amount = 0;
    if (att) {
      if (att.status === 'Present') amount = dailyRate;
      else if (att.status === 'Half Day') amount = dailyRate / 2;
    }
    return { day, amount };
  });

  // Active work info — first task with an assigned project
  const activeTask = tasks.find((t) => t.project);
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  res.json({
    success: true,
    data: {
      activeWork: activeTask
        ? {
            projectName: activeTask.project?.title || 'Unassigned',
            contractor: activeTask.contractor,
            dailyRate,
            startDate: activeTask.startDate,
            progress,
          }
        : null,
      tasks: tasks.map((t) => ({
        id: t._id,
        title: t.title,
        completed: t.completed,
      })),
      weeklyEarnings,
      totalWeeklyEarnings: weeklyEarnings.reduce((sum, e) => sum + e.amount, 0),
    },
  });
});

// @desc    Toggle task completion
// @route   PUT /api/work-status/tasks/:id
// @access  Private
const toggleTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  task.completed = !task.completed;
  await task.save();

  res.json({
    success: true,
    data: task,
  });
});

// @desc    Get payment history
// @route   GET /api/work-status/payments?page=1
// @access  Private
const getPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const total = await Payment.countDocuments({ user: req.user._id });
  const payments = await Payment.find({ user: req.user._id })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: payments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = { getWorkStatus, toggleTask, getPayments };
