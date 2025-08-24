import express from 'express';
import EventRequest from '../models/EventRequest.js';
import Event from '../models/Event.js';
import School from '../models/School.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get all event requests (super admin can see all, school admin sees only their school's)
router.get('/', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority,
      school,
      search 
    } = req.query;

    let query = {};

    // School admin can only see their school's requests
    if (req.user.role === 'school_admin') {
      const userSchool = await School.findOne({ 
        $or: [
          { admin: req.user._id },
          { 'additionalAdmins.user': req.user._id }
        ]
      });
      if (userSchool) {
        query.school = userSchool._id;
      } else {
        return res.status(403).json({ message: 'No school associated with your account' });
      }
    }

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (school && req.user.role === 'super_admin') query.school = school;

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const eventRequests = await EventRequest.find(query)
      .populate('requestedBy', 'fullName email')
      .populate('school', 'name type')
      .populate('reviewedBy', 'fullName')
      .populate('approvedEvent', 'title status')
      .sort({ createdAt: -1, priority: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await EventRequest.countDocuments(query);

    res.json({
      eventRequests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get event requests error:', error);
    res.status(500).json({ message: 'Failed to fetch event requests' });
  }
});

// Get single event request
router.get('/:id', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const eventRequest = await EventRequest.findById(req.params.id)
      .populate('requestedBy', 'fullName email phone')
      .populate('school', 'name type address contact')
      .populate('reviewedBy', 'fullName email')
      .populate('approvedEvent');

    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin') {
      const userSchool = await School.findOne({ 
        $or: [
          { admin: req.user._id },
          { 'additionalAdmins.user': req.user._id }
        ]
      });
      if (!userSchool || userSchool._id.toString() !== eventRequest.school._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    res.json({ eventRequest });
  } catch (error) {
    console.error('Get event request error:', error);
    res.status(500).json({ message: 'Failed to fetch event request' });
  }
});

// Create event request (school admin only)
router.post('/', authenticateToken, authorizeRoles('school_admin'), async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category,
      tags,
      proposedDate,
      location,
      expectedCapacity,
      isFree,
      proposedPrice,
      requirements,
      expectedSpeakers,
      justification,
      targetAudience,
      expectedOutcomes,
      priority
    } = req.body;

    // Get school admin's school
    const school = await School.findOne({ 
      $or: [
        { admin: req.user._id },
        { 'additionalAdmins.user': req.user._id }
      ]
    });

    if (!school) {
      return res.status(400).json({ message: 'No school associated with your account' });
    }

    const eventRequest = new EventRequest({
      title,
      description,
      shortDescription,
      category,
      tags,
      requestedBy: req.user._id,
      school: school._id,
      proposedDate,
      location,
      expectedCapacity,
      isFree,
      proposedPrice,
      requirements,
      expectedSpeakers,
      justification,
      targetAudience,
      expectedOutcomes,
      priority
    });

    await eventRequest.save();

    const populatedRequest = await EventRequest.findById(eventRequest._id)
      .populate('requestedBy', 'fullName email')
      .populate('school', 'name type');

    res.status(201).json({
      message: 'Event request submitted successfully',
      eventRequest: populatedRequest
    });
  } catch (error) {
    console.error('Create event request error:', error);
    res.status(500).json({ message: 'Failed to create event request' });
  }
});

// Update event request (only by requestor and before approval)
router.put('/:id', authenticateToken, authorizeRoles('school_admin'), async (req, res) => {
  try {
    const eventRequest = await EventRequest.findById(req.params.id);
    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    // Check permissions
    if (eventRequest.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own requests' });
    }

    // Can't edit approved or rejected requests
    if (['approved', 'rejected'].includes(eventRequest.status)) {
      return res.status(400).json({ message: 'Cannot edit approved or rejected requests' });
    }

    const updatedRequest = await EventRequest.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status: 'pending' }, // Reset to pending if was needs_revision
      { new: true, runValidators: true }
    ).populate('requestedBy', 'fullName email')
     .populate('school', 'name type');

    res.json({
      message: 'Event request updated successfully',
      eventRequest: updatedRequest
    });
  } catch (error) {
    console.error('Update event request error:', error);
    res.status(500).json({ message: 'Failed to update event request' });
  }
});

// Review event request (super admin only)
router.put('/:id/review', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { status, reviewComments } = req.body;

    if (!['approved', 'rejected', 'needs_revision'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const eventRequest = await EventRequest.findById(req.params.id);
    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    if (eventRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request has already been reviewed' });
    }

    eventRequest.status = status;
    eventRequest.reviewedBy = req.user._id;
    eventRequest.reviewDate = new Date();
    eventRequest.reviewComments = reviewComments;

    await eventRequest.save();

    // If approved, create the actual event
    if (status === 'approved') {
      const event = new Event({
        title: eventRequest.title,
        description: eventRequest.description,
        shortDescription: eventRequest.shortDescription,
        category: eventRequest.category,
        tags: eventRequest.tags,
        host: eventRequest.school,
        organizer: eventRequest.requestedBy,
        date: eventRequest.proposedDate,
        location: eventRequest.location,
        capacity: eventRequest.expectedCapacity,
        isPublic: true,
        isFree: eventRequest.isFree,
        price: eventRequest.proposedPrice,
        requirements: eventRequest.requirements,
        maxSpeakers: eventRequest.expectedSpeakers,
        status: 'published'
      });

      await event.save();
      
      eventRequest.approvedEvent = event._id;
      await eventRequest.save();
    }

    const populatedRequest = await EventRequest.findById(eventRequest._id)
      .populate('requestedBy', 'fullName email')
      .populate('school', 'name type')
      .populate('reviewedBy', 'fullName')
      .populate('approvedEvent', 'title status');

    res.json({
      message: `Event request ${status} successfully`,
      eventRequest: populatedRequest
    });
  } catch (error) {
    console.error('Review event request error:', error);
    res.status(500).json({ message: 'Failed to review event request' });
  }
});

// Delete event request (only by requestor and if not approved)
router.delete('/:id', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const eventRequest = await EventRequest.findById(req.params.id);
    if (!eventRequest) {
      return res.status(404).json({ message: 'Event request not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && eventRequest.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own requests' });
    }

    // Can't delete approved requests
    if (eventRequest.status === 'approved') {
      return res.status(400).json({ message: 'Cannot delete approved requests' });
    }

    await EventRequest.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event request deleted successfully' });
  } catch (error) {
    console.error('Delete event request error:', error);
    res.status(500).json({ message: 'Failed to delete event request' });
  }
});

export default router;
