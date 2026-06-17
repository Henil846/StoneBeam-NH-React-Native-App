const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Feed = require('../models/Feed');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    itemName, category, categoryIcon, quantity,
    unit, unitPrice, supplierId,
  } = req.body;

  const order = await Order.create({
    itemName,
    category,
    categoryIcon: categoryIcon || 'cube',
    quantity,
    unit,
    unitPrice,
    total: quantity * unitPrice,
    supplier: supplierId,
    buyer: req.user._id,
    status: 'Pending',
    progress: 1,
  });

  await order.populate([
    { path: 'supplier', select: 'name avatar' },
    { path: 'buyer', select: 'name avatar' },
  ]);

  // Create feed entry
  await Feed.create({
    title: `Order placed: ${itemName}`,
    project: `${itemName} — ${order.orderId}`,
    status: 'Pending',
    type: 'order',
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc    Get orders for current user (as buyer or supplier)
// @route   GET /api/orders?status=Pending&page=1
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {
    $or: [{ buyer: req.user._id }, { supplier: req.user._id }],
  };

  if (status && status !== 'All') {
    query.status = status;
  }

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('supplier', 'name avatar')
    .populate('buyer', 'name avatar')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('supplier', 'name avatar')
    .populate('buyer', 'name avatar');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({
    success: true,
    data: order,
  });
});

// @desc    Update order status & progress
// @route   PUT /api/orders/:id/status
// @access  Private (supplier only)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, progress } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (status) order.status = status;
  if (progress !== undefined) order.progress = progress;

  if (status === 'Delivered') {
    order.deliveredDate = new Date();
    order.progress = 4;
  }

  await order.save();
  await order.populate([
    { path: 'supplier', select: 'name avatar' },
    { path: 'buyer', select: 'name avatar' },
  ]);

  // Create feed entry for buyer
  await Feed.create({
    title: `Order ${status?.toLowerCase() || 'updated'}: ${order.itemName}`,
    project: `${order.itemName} — ${order.orderId}`,
    status: order.status,
    type: 'order',
    user: order.buyer._id || order.buyer,
  });

  res.json({
    success: true,
    data: order,
  });
});

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private (buyer only)
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.buyer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the buyer can cancel this order');
  }

  if (order.status === 'Delivered') {
    res.status(400);
    throw new Error('Cannot cancel a delivered order');
  }

  order.status = 'Cancelled';
  order.progress = 0;
  await order.save();

  res.json({
    success: true,
    data: order,
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
