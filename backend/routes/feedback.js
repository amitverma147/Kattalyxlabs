import express from 'express';
import Feedback from '../models/Feedback.js';
import Event from '../models/Event.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Submit feedback for an event
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      eventId,
      speakerId,
      rating,
      review,
      categories,
      isAnonymous
    } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user participated in the event
    const isParticipant = event.registeredParticipants.some(
      participant => participant.user.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ message: 'You can only provide feedback for events you participated in' });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      event: eventId,
      user: req.user._id
    });

    if (existingFeedback) {
      return res.status(400).json({ message: 'You have already provided feedback for this event' });
    }

    // Create feedback
    const feedback = new Feedback({
      event: eventId,
      user: req.user._id,
      speaker: speakerId,
      rating,
      review,
      categories,
      isAnonymous
    });

    await feedback.save();

    // Update event average rating
    const allFeedbacks = await Feedback.find({ event: eventId });
    const totalRating = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / allFeedbacks.length;

    await Event.findByIdAndUpdate(eventId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: allFeedbacks.length
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

// Get feedback for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const feedbacks = await Feedback.find({ event: req.params.eventId })
      .populate('user', 'firstName lastName avatar')
      .populate('speaker', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments({ event: req.params.eventId });

    // Calculate average rating
    const allFeedbacks = await Feedback.find({ event: req.params.eventId });
    const averageRating = allFeedbacks.length > 0 
      ? allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) / allFeedbacks.length 
      : 0;

    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      averageRating: Math.round(averageRating * 10) / 10
    });
  } catch (error) {
    console.error('Get event feedback error:', error);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
});

// Get user's feedback
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const feedbacks = await Feedback.find({ user: req.user._id })
      .populate('event', 'title date category host')
      .populate('speaker', 'firstName lastName')
      .populate('host', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments({ user: req.user._id });

    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get user feedback error:', error);
    res.status(500).json({ message: 'Failed to fetch user feedback' });
  }
});

// Update feedback
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { rating, review, categories, isAnonymous } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own feedback' });
    }

    // Update feedback
    if (rating) feedback.rating = rating;
    if (review !== undefined) feedback.review = review;
    if (categories) feedback.categories = categories;
    if (isAnonymous !== undefined) feedback.isAnonymous = isAnonymous;

    await feedback.save();

    // Update event average rating
    const allFeedbacks = await Feedback.find({ event: feedback.event });
    const totalRating = allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / allFeedbacks.length;

    await Event.findByIdAndUpdate(feedback.event, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: allFeedbacks.length
    });

    res.json({
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ message: 'Failed to update feedback' });
  }
});

// Delete feedback
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns this feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own feedback' });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    // Update event average rating
    const allFeedbacks = await Feedback.find({ event: feedback.event });
    const averageRating = allFeedbacks.length > 0 
      ? allFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) / allFeedbacks.length 
      : 0;

    await Event.findByIdAndUpdate(feedback.event, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: allFeedbacks.length
    });

    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({ message: 'Failed to delete feedback' });
  }
});

// Get feedback statistics for an event
router.get('/stats/event/:eventId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ event: req.params.eventId });

    if (feedbacks.length === 0) {
      return res.json({
        stats: {
          totalFeedbacks: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          categoryAverages: {}
        }
      });
    }

    // Calculate rating distribution
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbacks.forEach(feedback => {
      ratingDistribution[feedback.rating]++;
    });

    // Calculate category averages
    const categoryAverages = {};
    const categories = ['content', 'delivery', 'engagement', 'organization'];
    
    categories.forEach(category => {
      const categoryFeedbacks = feedbacks.filter(fb => fb.categories && fb.categories[category]);
      if (categoryFeedbacks.length > 0) {
        const avg = categoryFeedbacks.reduce((sum, fb) => sum + fb.categories[category], 0) / categoryFeedbacks.length;
        categoryAverages[category] = Math.round(avg * 10) / 10;
      }
    });

    const averageRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;

    res.json({
      stats: {
        totalFeedbacks: feedbacks.length,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
        categoryAverages
      }
    });
  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({ message: 'Failed to fetch feedback statistics' });
  }
});

// Get speaker feedback
router.get('/speaker/:speakerId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const feedbacks = await Feedback.find({ speaker: req.params.speakerId })
      .populate('event', 'title date category')
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Feedback.countDocuments({ speaker: req.params.speakerId });

    // Calculate speaker average rating
    const allSpeakerFeedbacks = await Feedback.find({ speaker: req.params.speakerId });
    const averageRating = allSpeakerFeedbacks.length > 0 
      ? allSpeakerFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) / allSpeakerFeedbacks.length 
      : 0;

    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      averageRating: Math.round(averageRating * 10) / 10
    });
  } catch (error) {
    console.error('Get speaker feedback error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker feedback' });
  }
});

export default router;
