import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: 1000,
    trim: true
  },
  categories: {
    content: {
      type: Number,
      min: 1,
      max: 5
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5
    },
    engagement: {
      type: Number,
      min: 1,
      max: 5
    },
    organization: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure one feedback per user per event
feedbackSchema.index({ event: 1, user: 1 }, { unique: true });

// Index for speaker feedback
feedbackSchema.index({ speaker: 1 });

// Virtual for average category rating
feedbackSchema.virtual('averageCategoryRating').get(function() {
  if (!this.categories) return this.rating;
  
  const categories = Object.values(this.categories).filter(val => val !== undefined);
  if (categories.length === 0) return this.rating;
  
  return categories.reduce((sum, val) => sum + val, 0) / categories.length;
});

// Ensure virtual fields are serialized
feedbackSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('Feedback', feedbackSchema);
