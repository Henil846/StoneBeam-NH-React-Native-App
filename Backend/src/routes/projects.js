const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  applyToProject,
} = require('../controllers/projectController');

const router = express.Router();

router
  .route('/')
  .get(protect, getProjects)
  .post(
    protect,
    [
      body('title').notEmpty().withMessage('Project title is required'),
      body('type').isIn(['Residential', 'Commercial', 'Industrial', 'Renovation']).withMessage('Valid project type is required'),
      body('category').isIn(['Construction', 'Electrical', 'Plumbing', 'Interior', 'Civil', 'Renovation']).withMessage('Valid category is required'),
      body('location').notEmpty().withMessage('Location is required'),
      body('budgetMin').isNumeric().withMessage('Minimum budget must be a number'),
      body('budgetMax').isNumeric().withMessage('Maximum budget must be a number'),
      body('startDate').notEmpty().withMessage('Start date is required'),
      body('endDate').notEmpty().withMessage('End date is required'),
    ],
    validate,
    createProject
  );

router
  .route('/:id')
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.post('/:id/apply', protect, applyToProject);

module.exports = router;
