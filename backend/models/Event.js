import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  speakers: [{
    speaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    topic: String,
    duration: Number // in minutes
  }],
  date: {
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
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  registeredParticipants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFree: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  image: {
    type: String,
    default: ''
  },
  requirements: [{
    type: String,
    trim: true
  }],
  materials: [{
    title: String,
    description: String,
    url: String,
    type: String
  }],
  maxSpeakers: {
    type: Number,
    default: 5
  },
  registrationDeadline: {
    type: Date
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for search and filtering
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ 'date.start': 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ host: 1 });
eventSchema.index({ category: 1 });

// Virtual for registration count
eventSchema.virtual('registrationCount').get(function() {
  return this.registeredParticipants.length;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.registeredParticipants.length;
});

// Virtual for isFull
eventSchema.virtual('isFull').get(function() {
  return this.registeredParticipants.length >= this.capacity;
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('Event', eventSchema);
