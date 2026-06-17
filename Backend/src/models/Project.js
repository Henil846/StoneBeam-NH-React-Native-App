const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    type: {
      type: String,
      required: [true, 'Project type is required'],
      enum: ['Residential', 'Commercial', 'Industrial', 'Renovation'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Construction', 'Electrical', 'Plumbing', 'Interior', 'Civil', 'Renovation'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    budget: {
      min: { type: Number, required: [true, 'Minimum budget is required'] },
      max: { type: Number, required: [true, 'Maximum budget is required'] },
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    skills: {
      type: [String],
      default: [],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed', 'Completed'],
      default: 'Open',
    },
    photos: {
      type: [String], // ImageKit URLs
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        appliedAt: { type: Date, default: Date.now },
        message: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add text index for search
projectSchema.index({ title: 'text', description: 'text', location: 'text' });

projectSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Project', projectSchema);
