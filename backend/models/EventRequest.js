import mongoose from 'mongoose';

const eventRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['workshop', 'seminar', 'conference', 'lecture', 'hackathon', 'competition', 'other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  proposedDate: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  location: {
    type: {
      type: String,
      enum: ['physical', 'virtual', 'hybrid'],
      default: 'physical'
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    virtualLink: String,
    room: String
  },
  expectedCapacity: {
    type: Number,
    required: true,
    min: 1
  },
  isFree: {
    type: Boolean,
    default: true
  },
  proposedPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  requirements: [{
    type: String,
    trim: true
  }],
  expectedSpeakers: {
    type: Number,
    default: 1,
    min: 1
  },
  justification: {
    type: String,
    required: true,
    maxlength: 1000
  },
  targetAudience: {
    type: String,
    maxlength: 500
  },
  expectedOutcomes: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'needs_revision'],
    default: 'pending'
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
    maxlength: 1000
  },
  approvedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes for search and filtering
eventRequestSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventRequestSchema.index({ status: 1 });
eventRequestSchema.index({ requestedBy: 1 });
eventRequestSchema.index({ school: 1 });
eventRequestSchema.index({ 'proposedDate.start': 1 });
eventRequestSchema.index({ priority: 1 });

export default mongoose.model('EventRequest', eventRequestSchema);
