const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Feed = require('../models/Feed');
const User = require('../models/User');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const {
    title, type, category, location,
    budgetMin, budgetMax, startDate, endDate,
    description, skills, priority, photos,
  } = req.body;

  const project = await Project.create({
    title,
    type,
    category,
    location,
    budget: { min: budgetMin, max: budgetMax },
    startDate,
    endDate,
    description: description || '',
    skills: skills || [],
    priority: priority || 'Medium',
    photos: photos || [],
    postedBy: req.user._id,
  });

  // Increment user's project count
  await User.findByIdAndUpdate(req.user._id, { $inc: { projectCount: 1 } });

  // Create feed entry
  await Feed.create({
    title: `New project posted: ${title}`,
    project: title,
    status: 'Open',
    type: 'update',
    user: req.user._id,
  });

  // Populate postedBy for response
  await project.populate('postedBy', 'name role avatar');

  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc    Get all projects with filters
// @route   GET /api/projects?status=Open&location=Mumbai&type=Residential&search=villa&page=1
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const { status, location, type, category, search, page = 1, limit = 20 } = req.query;

  const query = {};

  if (status && status !== 'All') query.status = status;
  if (location && location !== 'All') query.location = { $regex: location, $options: 'i' };
  if (type) query.type = type;
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .populate('postedBy', 'name role avatar')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  // Add applicant count for response
  const projectsWithCount = projects.map((p) => {
    const obj = p.toJSON();
    obj.applicants = p.applicants?.length || 0;
    obj.createdAt = p.createdAt;
    return obj;
  });

  res.json({
    success: true,
    data: projectsWithCount,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('postedBy', 'name role avatar')
    .populate('applicants.user', 'name role avatar');

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const obj = project.toJSON();
  obj.applicants = project.applicants?.length || 0;

  res.json({
    success: true,
    data: obj,
  });
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (owner only)
const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this project');
  }

  const allowedFields = [
    'title', 'type', 'category', 'location', 'description',
    'skills', 'priority', 'status', 'photos', 'startDate', 'endDate',
  ];

  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  // Handle budget separately
  if (req.body.budgetMin !== undefined || req.body.budgetMax !== undefined) {
    updates.budget = {
      min: req.body.budgetMin ?? project.budget.min,
      max: req.body.budgetMax ?? project.budget.max,
    };
  }

  project = await Project.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).populate('postedBy', 'name role avatar');

  res.json({
    success: true,
    data: project,
  });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (owner only)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this project');
  }

  await project.deleteOne();

  // Decrement project count
  await User.findByIdAndUpdate(req.user._id, { $inc: { projectCount: -1 } });

  res.json({
    success: true,
    message: 'Project deleted',
  });
});

// @desc    Apply to a project
// @route   POST /api/projects/:id/apply
// @access  Private
const applyToProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if already applied
  const alreadyApplied = project.applicants.some(
    (a) => a.user.toString() === req.user._id.toString()
  );

  if (alreadyApplied) {
    res.status(400);
    throw new Error('You have already applied to this project');
  }

  project.applicants.push({
    user: req.user._id,
    message: req.body.message || '',
  });

  await project.save();

  // Create feed entry for project owner
  await Feed.create({
    title: `${req.user.name} applied to your project`,
    project: project.title,
    status: project.status,
    type: 'bid',
    user: project.postedBy,
  });

  res.json({
    success: true,
    message: 'Applied successfully',
  });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  applyToProject,
};
