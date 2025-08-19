import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get speaker's applications
router.get('/applications', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { 'speakers.speaker': req.user._id };
    if (status) {
      query['speakers.status'] = status;
    }

    const events = await Event.find(query)
      .populate('host', 'name type')
      .populate('organizer', 'firstName lastName')
      .sort({ 'date.start': 1 });

    // Filter applications for current user
    const applications = events.map(event => {
      const speakerApp = event.speakers.find(
        speaker => speaker.speaker.toString() === req.user._id.toString()
      );
      
      return {
        event: {
          id: event._id,
          title: event.title,
          date: event.date,
          category: event.category,
          host: event.host,
          organizer: event.organizer,
          status: event.status
        },
        application: speakerApp
      };
    });

    res.json({ applications });
  } catch (error) {
    console.error('Get speaker applications error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker applications' });
  }
});

// Get speaker's accepted events
router.get('/events', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const events = await Event.find({
      'speakers.speaker': req.user._id,
      'speakers.status': 'approved'
    })
    .populate('host', 'name type address')
    .populate('organizer', 'firstName lastName email')
    .sort({ 'date.start': 1 });

    res.json({ events });
  } catch (error) {
    console.error('Get speaker events error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker events' });
  }
});

// Get available events for speaker application
router.get('/available-events', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = {
      status: 'published',
      isPublic: true,
      'speakers.speaker': { $ne: req.user._id } // Not already applied
    };

    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const events = await Event.find(query)
      .populate('host', 'name type')
      .populate('organizer', 'firstName lastName')
      .populate('speakers.speaker', 'firstName lastName')
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
    console.error('Get available events error:', error);
    res.status(500).json({ message: 'Failed to fetch available events' });
  }
});

// Get speaker statistics
router.get('/stats', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const totalApplications = await Event.countDocuments({
      'speakers.speaker': req.user._id
    });

    const acceptedEvents = await Event.countDocuments({
      'speakers.speaker': req.user._id,
      'speakers.status': 'approved'
    });

    const pendingApplications = await Event.countDocuments({
      'speakers.speaker': req.user._id,
      'speakers.status': 'pending'
    });

    const rejectedApplications = await Event.countDocuments({
      'speakers.speaker': req.user._id,
      'speakers.status': 'rejected'
    });

    // Upcoming events
    const upcomingEvents = await Event.countDocuments({
      'speakers.speaker': req.user._id,
      'speakers.status': 'approved',
      'date.start': { $gte: new Date() }
    });

    res.json({
      stats: {
        totalApplications,
        acceptedEvents,
        pendingApplications,
        rejectedApplications,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Get speaker stats error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker statistics' });
  }
});

// Update speaker profile
router.put('/profile', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const { bio, skills, experience, phone, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update speaker-specific fields
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (experience) user.experience = experience;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Speaker profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update speaker profile error:', error);
    res.status(500).json({ message: 'Failed to update speaker profile' });
  }
});

// Get speaker's event schedule
router.get('/schedule', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {
      'speakers.speaker': req.user._id,
      'speakers.status': 'approved'
    };

    if (startDate && endDate) {
      query['date.start'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const events = await Event.find(query)
      .select('title date location speakers')
      .populate('host', 'name address')
      .sort({ 'date.start': 1 });

    // Format schedule
    const schedule = events.map(event => {
      const speakerSlot = event.speakers.find(
        speaker => speaker.speaker.toString() === req.user._id.toString()
      );

      return {
        eventId: event._id,
        title: event.title,
        date: event.date,
        location: event.location,
        host: event.host,
        topic: speakerSlot?.topic,
        duration: speakerSlot?.duration
      };
    });

    res.json({ schedule });
  } catch (error) {
    console.error('Get speaker schedule error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker schedule' });
  }
});

// Cancel speaker application
router.delete('/applications/:eventId', authenticateToken, authorizeRoles('speaker'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find and remove speaker application
    const speakerIndex = event.speakers.findIndex(
      speaker => speaker.speaker.toString() === req.user._id.toString()
    );

    if (speakerIndex === -1) {
      return res.status(404).json({ message: 'Speaker application not found' });
    }

    event.speakers.splice(speakerIndex, 1);
    await event.save();

    res.json({ message: 'Speaker application cancelled successfully' });
  } catch (error) {
    console.error('Cancel speaker application error:', error);
    res.status(500).json({ message: 'Failed to cancel speaker application' });
  }
});

export default router;
