import express from 'express';
import School from '../models/School.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get all schools (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, search, verified } = req.query;

    const query = { isActive: true };

    if (type) query.type = type;
    if (verified !== undefined) query.isVerified = verified === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const schools = await School.find(query)
      .populate('admin', 'firstName lastName email')
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await School.countDocuments(query);

    res.json({
      schools,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get schools error:', error);
    res.status(500).json({ message: 'Failed to fetch schools' });
  }
});

// Get single school
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id)
      .populate('admin', 'firstName lastName email phone');

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Get school statistics
    const eventCount = await Event.countDocuments({ host: school._id });
    const studentCount = await User.countDocuments({ school: school._id, role: 'student' });

    res.json({
      school: {
        ...school.toObject(),
        stats: {
          eventCount,
          studentCount
        }
      }
    });
  } catch (error) {
    console.error('Get school error:', error);
    res.status(500).json({ message: 'Failed to fetch school' });
  }
});

// Create school (super admin only)
router.post('/', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const {
      name,
      type,
      address,
      contact,
      description,
      adminId
    } = req.body;

    // Validate admin user
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid admin user ID' });
    }

    // Check if admin is already assigned to another school
    const existingSchool = await School.findOne({ admin: adminId });
    if (existingSchool) {
      return res.status(400).json({ message: 'Admin is already assigned to another school' });
    }

    const school = new School({
      name,
      type,
      address,
      contact,
      description,
      admin: adminId
    });

    await school.save();

    // Update admin user role
    admin.role = 'school_admin';
    admin.school = school._id;
    await admin.save();

    const populatedSchool = await School.findById(school._id)
      .populate('admin', 'firstName lastName email');

    res.status(201).json({
      message: 'School created successfully',
      school: populatedSchool
    });
  } catch (error) {
    console.error('Create school error:', error);
    res.status(500).json({ message: 'Failed to create school' });
  }
});

// Update school
router.put('/:id', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && school.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own school' });
    }

    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('admin', 'firstName lastName email');

    res.json({
      message: 'School updated successfully',
      school: updatedSchool
    });
  } catch (error) {
    console.error('Update school error:', error);
    res.status(500).json({ message: 'Failed to update school' });
  }
});

// Delete school (super admin only)
router.delete('/:id', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Check if school has events
    const eventCount = await Event.countDocuments({ host: school._id });
    if (eventCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete school with existing events. Please delete events first.' 
      });
    }

    // Update admin user role back to student
    const admin = await User.findById(school.admin);
    if (admin) {
      admin.role = 'student';
      admin.school = null;
      await admin.save();
    }

    await School.findByIdAndDelete(req.params.id);

    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Delete school error:', error);
    res.status(500).json({ message: 'Failed to delete school' });
  }
});

// Get school events
router.get('/:id/events', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { host: req.params.id, isPublic: true };

    if (status) query.status = status;

    const events = await Event.find(query)
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
    console.error('Get school events error:', error);
    res.status(500).json({ message: 'Failed to fetch school events' });
  }
});

// Get school students
router.get('/:id/students', authenticateToken, authorizeRoles('school_admin', 'super_admin'), async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Check permissions
    if (req.user.role === 'school_admin' && school.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only view students from your school' });
    }

    const { page = 1, limit = 10, role } = req.query;

    const query = { school: req.params.id };

    if (role) query.role = role;

    const students = await User.find(query)
      .select('-password')
      .sort({ firstName: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get school students error:', error);
    res.status(500).json({ message: 'Failed to fetch school students' });
  }
});

// Verify school (super admin only)
router.put('/:id/verify', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { isVerified } = req.body;

    const school = await School.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    ).populate('admin', 'firstName lastName email');

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json({
      message: `School ${isVerified ? 'verified' : 'unverified'} successfully`,
      school
    });
  } catch (error) {
    console.error('Verify school error:', error);
    res.status(500).json({ message: 'Failed to update school verification status' });
  }
});

export default router;
