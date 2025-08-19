import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import School from '../models/School.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      search, 
      host,
      dateFrom,
      dateTo,
      isFree
    } = req.query;

    const query = { isPublic: true };

    // Apply filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (host) query.host = host;
    if (isFree !== undefined) query.isFree = isFree === 'true';
    if (dateFrom || dateTo) {
      query['date.start'] = {};
      if (dateFrom) query['date.start'].$gte = new Date(dateFrom);
      if (dateTo) query['date.start'].$lte = new Date(dateTo);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const events = await Event.find(query)
      .populate('host', 'name type')
      .populate('organizer', 'firstName lastName')
      .populate('speakers.speaker', 'firstName lastName avatar')
      .sort({ 'date.start': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host', 'name type address contact')
      .populate('organizer', 'firstName lastName email')
      .populate('speakers.speaker', 'firstName lastName avatar bio skills')
      .populate('registeredParticipants.user', 'firstName lastName avatar');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// Create event (school admin and super admin only)
router.post('/', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category,
      tags,
      host,
      date,
      location,
      capacity,
      isPublic,
      isFree,
      price,
      requirements,
      maxSpeakers,
      registrationDeadline
    } = req.body;

    // Validate host school
    const school = await School.findById(host);
    if (!school) {
      return res.status(400).json({ message: 'Invalid school ID' });
    }

    // Check if user has permission to create events for this school
    if (req.user.role === 'school_admin' && school.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only create events for your school' });
    }

    const event = new Event({
      title,
      description,
      shortDescription,
      category,
      tags,
      host,
      organizer: req.user._id,
      date,
      location,
      capacity,
      isPublic,
      isFree,
      price,
      requirements,
      maxSpeakers,
      registrationDeadline
    });

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('host', 'name type')
      .populate('organizer', 'firstName lastName');

    res.status(201).json({
      message: 'Event created successfully',
      event: populatedEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Update event
router.put('/:id', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own events' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('host', 'name type')
     .populate('organizer', 'firstName lastName');

    res.json({
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own events' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

// Register for event
router.post('/:id/register', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is published
    if (event.status !== 'published') {
      return res.status(400).json({ message: 'Event is not open for registration' });
    }

    // Check if event is full
    if (event.isFull) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if user is already registered
    const isRegistered = event.registeredParticipants.some(
      participant => participant.user.toString() === req.user._id.toString()
    );

    if (isRegistered) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    // Add user to registered participants
    event.registeredParticipants.push({
      user: req.user._id,
      registrationDate: new Date()
    });

    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Failed to register for event' });
  }
});

// Cancel event registration
router.delete('/:id/register', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Remove user from registered participants
    event.registeredParticipants = event.registeredParticipants.filter(
      participant => participant.user.toString() !== req.user._id.toString()
    );

    await event.save();

    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({ message: 'Failed to cancel registration' });
  }
});

// Apply as speaker
router.post('/:id/apply-speaker', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const { topic, duration } = req.body;
    
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is published
    if (event.status !== 'published') {
      return res.status(400).json({ message: 'Event is not accepting speaker applications' });
    }

    // Check if user is already applied
    const isApplied = event.speakers.some(
      speaker => speaker.speaker.toString() === req.user._id.toString()
    );

    if (isApplied) {
      return res.status(400).json({ message: 'You have already applied as a speaker for this event' });
    }

    // Check if event has space for more speakers
    if (event.speakers.length >= event.maxSpeakers) {
      return res.status(400).json({ message: 'Event has reached maximum number of speakers' });
    }

    // Add speaker application
    event.speakers.push({
      speaker: req.user._id,
      status: 'pending',
      topic,
      duration
    });

    await event.save();

    res.json({ message: 'Speaker application submitted successfully' });
  } catch (error) {
    console.error('Speaker application error:', error);
    res.status(500).json({ message: 'Failed to submit speaker application' });
  }
});

// Approve/reject speaker application (event organizer only)
router.put('/:id/speakers/:speakerId', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only manage speakers for your own events' });
    }

    const speaker = event.speakers.id(req.params.speakerId);
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker application not found' });
    }

    speaker.status = status;
    await event.save();

    res.json({ message: `Speaker application ${status} successfully` });
  } catch (error) {
    console.error('Speaker approval error:', error);
    res.status(500).json({ message: 'Failed to update speaker application' });
  }
});

// Get user's events
router.get('/user/events', authenticateToken, async (req, res) => {
  try {
    const { type = 'all' } = req.query;
    
    let query = {};
    
    if (type === 'hosted') {
      query.organizer = req.user._id;
    } else if (type === 'registered') {
      query['registeredParticipants.user'] = req.user._id;
    } else if (type === 'speaking') {
      query['speakers.speaker'] = req.user._id;
    }

    const events = await Event.find(query)
      .populate('host', 'name type')
      .populate('organizer', 'firstName lastName')
      .populate('speakers.speaker', 'firstName lastName')
      .sort({ 'date.start': 1 });

    res.json({ events });
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({ message: 'Failed to fetch user events' });
  }
});

export default router;
