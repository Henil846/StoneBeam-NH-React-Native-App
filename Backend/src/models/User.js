const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const VALID_ROLES = ['builder', 'contractor', 'client', 'labourer', 'skilled_labour', 'dealer'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never returned in queries by default
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: VALID_ROLES,
        message: '{VALUE} is not a valid role',
      },
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    experience: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: '',
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    avatar: {
      type: String, // ImageKit URL
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    projectCount: {
      type: Number,
      default: 0,
    },
    connections: {
      type: Number,
      default: 0,
    },
    memberSince: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    notificationSettings: {
      projects: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      orders: { type: Boolean, default: true },
      system: { type: Boolean, default: false },
    },
    language: {
      type: String,
      enum: ['English', 'Hindi', 'Regional'],
      default: 'English',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual to hide __v and re-map _id
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
