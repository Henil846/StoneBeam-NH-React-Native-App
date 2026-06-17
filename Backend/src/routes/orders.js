const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');

const router = express.Router();

router
  .route('/')
  .get(protect, getOrders)
  .post(
    protect,
    [
      body('itemName').notEmpty().withMessage('Item name is required'),
      body('category').notEmpty().withMessage('Category is required'),
      body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
      body('unit').notEmpty().withMessage('Unit is required'),
      body('unitPrice').isNumeric().withMessage('Unit price must be a number'),
      body('supplierId').notEmpty().withMessage('Supplier ID is required'),
    ],
    validate,
    createOrder
  );

router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
