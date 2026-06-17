const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contractor: {
      type: String,
      default: '',
    },
    dailyRate: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Task', taskSchema);
