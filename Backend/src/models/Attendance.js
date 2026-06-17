const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    site: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
    },
    shift: {
      type: String,
      default: '8:00 AM - 5:00 PM',
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
    contractor: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Half Day'],
      default: 'Absent',
    },
    checkIn: {
      type: String,
      default: null,
    },
    checkOut: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one record per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

attendanceSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
