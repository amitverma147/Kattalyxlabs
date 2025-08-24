import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['university', 'college', 'school', 'institute'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  contact: {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: String,
    website: String
  },
  description: {
    type: String,
    maxlength: 1000
  },
  logo: {
    type: String,
    default: ''
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  additionalAdmins: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedDate: {
      type: Date,
      default: Date.now
    },
    permissions: [{
      type: String,
      enum: ['manage_events', 'view_analytics', 'manage_students']
    }]
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  studentCount: {
    type: Number,
    default: 0
  },
  facilities: [{
    type: String,
    trim: true
  }],
  programs: [{
    name: String,
    description: String,
    duration: String
  }]
}, {
  timestamps: true
});

// Index for search functionality
schoolSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('School', schoolSchema);
