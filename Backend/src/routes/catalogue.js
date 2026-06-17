const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const {
  getCatalogueItems,
  addCatalogueItem,
  updateCatalogueItem,
  deleteCatalogueItem,
} = require('../controllers/catalogueController');

const router = express.Router();

router
  .route('/')
  .get(protect, getCatalogueItems)
  .post(
    protect,
    authorize('dealer'),
    [
      body('name').notEmpty().withMessage('Item name is required'),
      body('category').notEmpty().withMessage('Category is required'),
      body('price').isNumeric().withMessage('Price must be a number'),
      body('unit').notEmpty().withMessage('Unit is required'),
    ],
    validate,
    addCatalogueItem
  );

router
  .route('/:id')
  .put(protect, authorize('dealer'), updateCatalogueItem)
  .delete(protect, authorize('dealer'), deleteCatalogueItem);

module.exports = router;
