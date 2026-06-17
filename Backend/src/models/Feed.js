const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Feed title is required'],
      trim: true,
    },
    project: {
      type: String, // Display name of the associated project
      default: '',
    },
    projectRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    status: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['update', 'bid', 'order', 'join', 'payment', 'system'],
      default: 'update',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

feedSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    ret.timeAgo = undefined; // Will be computed by controller
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Feed', feedSchema);
