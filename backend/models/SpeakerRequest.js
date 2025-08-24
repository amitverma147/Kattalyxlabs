import mongoose from 'mongoose';

const speakerRequestSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 480 // 8 hours max
  },
  sessionType: {
    type: String,
    enum: ['keynote', 'workshop', 'panel', 'presentation', 'demo', 'fireside_chat'],
    required: true
  },
  expertise: [{
    type: String,
    trim: true
  }],
  targetAudience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all_levels'],
    default: 'all_levels'
  },
  equipment: [{
    type: String,
    trim: true
  }],
  bio: {
    type: String,
    maxlength: 500
  },
  previousExperience: {
    type: String,
    maxlength: 1000
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'waitlisted'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: {
    type: Date
  },
  reviewComments: {
    type: String,
    maxlength: 500
  },
  speakerFee: {
    amount: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    isNegotiable: {
      type: Boolean,
      default: true
    }
  },
  travelRequired: {
    type: Boolean,
    default: false
  },
  accommodationRequired: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate requests
speakerRequestSchema.index({ event: 1, speaker: 1 }, { unique: true });

// Indexes for search and filtering
speakerRequestSchema.index({ status: 1 });
speakerRequestSchema.index({ speaker: 1 });
speakerRequestSchema.index({ event: 1 });
speakerRequestSchema.index({ sessionType: 1 });
speakerRequestSchema.index({ requestDate: 1 });

export default mongoose.model('SpeakerRequest', speakerRequestSchema);
