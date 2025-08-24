import express from 'express';
import SpeakerRequest from '../models/SpeakerRequest.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get all speaker requests
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      event,
      speaker 
    } = req.query;

    let query = {};

    // Apply filters based on user role
    if (req.user.role === 'speaker') {
      query.speaker = req.user._id;
    } else if (req.user.role === 'school_admin') {
      // School admin can see requests for their events
      const userEvents = await Event.find({ organizer: req.user._id }).select('_id');
      query.event = { $in: userEvents.map(e => e._id) };
    }

    // Apply additional filters
    if (status) query.status = status;
    if (event && ['school_admin', 'super_admin'].includes(req.user.role)) query.event = event;
    if (speaker && req.user.role === 'super_admin') query.speaker = speaker;

    const speakerRequests = await SpeakerRequest.find(query)
      .populate('speaker', 'fullName email avatar bio skills')
      .populate('event', 'title date.start host status')
      .populate('reviewedBy', 'fullName')
      .sort({ requestDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await SpeakerRequest.countDocuments(query);

    res.json({
      speakerRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get speaker requests error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker requests' });
  }
});

// Get single speaker request
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const speakerRequest = await SpeakerRequest.findById(req.params.id)
      .populate('speaker', 'fullName email phone avatar bio skills experience')
      .populate({
        path: 'event',
        populate: {
          path: 'host organizer',
          select: 'name type fullName email'
        }
      })
      .populate('reviewedBy', 'fullName email');

    if (!speakerRequest) {
      return res.status(404).json({ message: 'Speaker request not found' });
    }

    // Check permissions
    if (req.user.role === 'speaker' && speakerRequest.speaker._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.role === 'school_admin' && speakerRequest.event.organizer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ speakerRequest });
  } catch (error) {
    console.error('Get speaker request error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker request' });
  }
});

// Create speaker request (speakers only)
router.post('/', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const {
      event,
      topic,
      description,
      duration,
      sessionType,
      expertise,
      targetAudience,
      equipment,
      bio,
      previousExperience,
      socialLinks,
      speakerFee,
      travelRequired,
      accommodationRequired
    } = req.body;

    // Validate event exists and is published
    const eventDoc = await Event.findById(event);
    if (!eventDoc) {
      return res.status(400).json({ message: 'Event not found' });
    }

    if (eventDoc.status !== 'published') {
      return res.status(400).json({ message: 'Event is not published' });
    }

    // Check if speaker already requested for this event
    const existingRequest = await SpeakerRequest.findOne({
      event: event,
      speaker: req.user._id
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested to speak at this event' });
    }

    // Check if event has reached max speakers
    const currentSpeakers = await SpeakerRequest.countDocuments({
      event: event,
      status: 'approved'
    });

    if (currentSpeakers >= eventDoc.maxSpeakers) {
      return res.status(400).json({ message: 'Event has reached maximum number of speakers' });
    }

    const speakerRequest = new SpeakerRequest({
      event,
      speaker: req.user._id,
      topic,
      description,
      duration,
      sessionType,
      expertise,
      targetAudience,
      equipment,
      bio,
      previousExperience,
      socialLinks,
      speakerFee,
      travelRequired,
      accommodationRequired
    });

    await speakerRequest.save();

    const populatedRequest = await SpeakerRequest.findById(speakerRequest._id)
      .populate('speaker', 'fullName email')
      .populate('event', 'title date.start host');

    res.status(201).json({
      message: 'Speaker request submitted successfully',
      speakerRequest: populatedRequest
    });
  } catch (error) {
    console.error('Create speaker request error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already requested to speak at this event' });
    }
    res.status(500).json({ message: 'Failed to create speaker request' });
  }
});

// Update speaker request (only by speaker and before approval)
router.put('/:id', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const speakerRequest = await SpeakerRequest.findById(req.params.id);
    if (!speakerRequest) {
      return res.status(404).json({ message: 'Speaker request not found' });
    }

    // Check permissions
    if (speakerRequest.speaker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own requests' });
    }

    // Can't edit approved or rejected requests
    if (['approved', 'rejected'].includes(speakerRequest.status)) {
      return res.status(400).json({ message: 'Cannot edit approved or rejected requests' });
    }

    const updatedRequest = await SpeakerRequest.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status: 'pending' }, // Reset to pending
      { new: true, runValidators: true }
    ).populate('speaker', 'fullName email')
     .populate('event', 'title date.start host');

    res.json({
      message: 'Speaker request updated successfully',
      speakerRequest: updatedRequest
    });
  } catch (error) {
    console.error('Update speaker request error:', error);
    res.status(500).json({ message: 'Failed to update speaker request' });
  }
});

// Review speaker request (event organizer and super admin)
router.put('/:id/review', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const { status, reviewComments } = req.body;

    if (!['approved', 'rejected', 'waitlisted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const speakerRequest = await SpeakerRequest.findById(req.params.id)
      .populate('event');

    if (!speakerRequest) {
      return res.status(404).json({ message: 'Speaker request not found' });
    }

    // Check permissions - school admin can only review their events
    if (req.user.role === 'school_admin' && speakerRequest.event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only review speakers for your events' });
    }

    if (speakerRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request has already been reviewed' });
    }

    // Check if approving would exceed max speakers
    if (status === 'approved') {
      const currentApprovedSpeakers = await SpeakerRequest.countDocuments({
        event: speakerRequest.event._id,
        status: 'approved'
      });

      if (currentApprovedSpeakers >= speakerRequest.event.maxSpeakers) {
        return res.status(400).json({ message: 'Event has reached maximum number of speakers' });
      }
    }

    speakerRequest.status = status;
    speakerRequest.reviewedBy = req.user._id;
    speakerRequest.reviewDate = new Date();
    speakerRequest.reviewComments = reviewComments;

    await speakerRequest.save();

    // If approved, add speaker to event
    if (status === 'approved') {
      await Event.findByIdAndUpdate(
        speakerRequest.event._id,
        {
          $push: {
            speakers: {
              speaker: speakerRequest.speaker,
              status: 'approved',
              topic: speakerRequest.topic,
              duration: speakerRequest.duration
            }
          }
        }
      );
    }

    const populatedRequest = await SpeakerRequest.findById(speakerRequest._id)
      .populate('speaker', 'fullName email')
      .populate('event', 'title date.start host')
      .populate('reviewedBy', 'fullName');

    res.json({
      message: `Speaker request ${status} successfully`,
      speakerRequest: populatedRequest
    });
  } catch (error) {
    console.error('Review speaker request error:', error);
    res.status(500).json({ message: 'Failed to review speaker request' });
  }
});

// Delete speaker request (only by speaker and if not approved)
router.delete('/:id', authenticateToken, authorizeRoles('speaker', 'super_admin'), async (req, res) => {
  try {
    const speakerRequest = await SpeakerRequest.findById(req.params.id);
    if (!speakerRequest) {
      return res.status(404).json({ message: 'Speaker request not found' });
    }

    // Check permissions
    if (req.user.role === 'speaker' && speakerRequest.speaker.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own requests' });
    }

    // Can't delete approved requests (would need to remove from event first)
    if (speakerRequest.status === 'approved') {
      return res.status(400).json({ message: 'Cannot delete approved requests. Contact event organizer.' });
    }

    await SpeakerRequest.findByIdAndDelete(req.params.id);

    res.json({ message: 'Speaker request deleted successfully' });
  } catch (error) {
    console.error('Delete speaker request error:', error);
    res.status(500).json({ message: 'Failed to delete speaker request' });
  }
});

// Get speaker requests for a specific event (event organizer and super admin)
router.get('/event/:eventId', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.query;

    // Validate event exists and user has permission
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.user.role === 'school_admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    let query = { event: eventId };
    if (status) query.status = status;

    const speakerRequests = await SpeakerRequest.find(query)
      .populate('speaker', 'fullName email avatar bio skills experience')
      .populate('reviewedBy', 'fullName')
      .sort({ requestDate: -1 });

    res.json({ speakerRequests });
  } catch (error) {
    console.error('Get event speaker requests error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker requests' });
  }
});

export default router;
