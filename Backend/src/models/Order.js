const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    categoryIcon: {
      type: String,
      default: 'cube',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Price cannot be negative'],
    },
    total: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    orderedDate: {
      type: Date,
      default: Date.now,
    },
    deliveredDate: {
      type: Date,
      default: null,
    },
    // Progress maps to stepper: 0=none, 1=Placed, 2=Confirmed, 3=Dispatched, 4=Delivered
    progress: {
      type: Number,
      default: 1,
      min: 0,
      max: 4,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate orderId before save
orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 900) + 100;
    this.orderId = `ORD-${dateStr}-${rand}`;
  }
  next();
});

orderSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Order', orderSchema);
