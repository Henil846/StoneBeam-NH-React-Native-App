const asyncHandler = require('express-async-handler');
const CatalogueItem = require('../models/CatalogueItem');

// @desc    Get catalogue items
// @route   GET /api/catalogue?category=Cement&page=1
// @access  Private
const getCatalogueItems = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;

  const query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const total = await CatalogueItem.countDocuments(query);
  const items = await CatalogueItem.find(query)
    .populate('dealer', 'name company avatar')
    .sort({ rating: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: items,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Add a catalogue item (dealer only)
// @route   POST /api/catalogue
// @access  Private (dealer)
const addCatalogueItem = asyncHandler(async (req, res) => {
  const { name, category, price, unit, inStock, rating, icon } = req.body;

  const item = await CatalogueItem.create({
    name,
    category,
    price,
    unit,
    inStock: inStock !== undefined ? inStock : true,
    rating: rating || '0',
    icon: icon || 'cube',
    dealer: req.user._id,
  });

  await item.populate('dealer', 'name company avatar');

  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc    Update a catalogue item
// @route   PUT /api/catalogue/:id
// @access  Private (owner dealer)
const updateCatalogueItem = asyncHandler(async (req, res) => {
  let item = await CatalogueItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Catalogue item not found');
  }

  if (item.dealer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this item');
  }

  item = await CatalogueItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('dealer', 'name company avatar');

  res.json({
    success: true,
    data: item,
  });
});

// @desc    Delete a catalogue item
// @route   DELETE /api/catalogue/:id
// @access  Private (owner dealer)
const deleteCatalogueItem = asyncHandler(async (req, res) => {
  const item = await CatalogueItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Catalogue item not found');
  }

  if (item.dealer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this item');
  }

  await item.deleteOne();

  res.json({
    success: true,
    message: 'Catalogue item deleted',
  });
});

module.exports = {
  getCatalogueItems,
  addCatalogueItem,
  updateCatalogueItem,
  deleteCatalogueItem,
};
