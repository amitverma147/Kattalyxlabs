import express from 'express';
import User from '../models/User.js';
import Event from '../models/Event.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search, verified } = req.query;

    const query = {};

    if (role) query.role = role;
    if (verified !== undefined) query.isVerified = verified === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const users = await User.find(query)
      .select('-password')
      .populate('school', 'name type')
      .sort({ firstName: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('school', 'name type address');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('school', 'name type');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Update user role (super admin only)
router.put('/:id/role', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password')
     .populate('school', 'name type');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

// Toggle user verification (super admin only)
router.put('/:id/verify', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { isVerified } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    ).select('-password')
     .populate('school', 'name type');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
      user
    });
  } catch (error) {
    console.error('Toggle user verification error:', error);
    res.status(500).json({ message: 'Failed to update user verification status' });
  }
});

// Toggle user active status (super admin only)
router.put('/:id/active', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password')
     .populate('school', 'name type');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Toggle user active status error:', error);
    res.status(500).json({ message: 'Failed to update user active status' });
  }
});

// Get user statistics
router.get('/stats/overview', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalSpeakers = await User.countDocuments({ role: 'speaker' });
    const totalSchoolAdmins = await User.countDocuments({ role: 'school_admin' });
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const activeUsers = await User.countDocuments({ isActive: true });

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      stats: {
        totalUsers,
        totalStudents,
        totalSpeakers,
        totalSchoolAdmins,
        verifiedUsers,
        activeUsers,
        recentRegistrations
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Failed to fetch user statistics' });
  }
});

// Get speakers list (public)
router.get('/speakers/list', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, skills } = req.query;

    const query = { role: 'speaker', isActive: true, isVerified: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    const speakers = await User.find(query)
      .select('firstName lastName bio skills experience avatar')
      .populate('school', 'name type')
      .sort({ firstName: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments(query);

    res.json({
      speakers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get speakers error:', error);
    res.status(500).json({ message: 'Failed to fetch speakers' });
  }
});

// Get speaker profile (public)
router.get('/speakers/:id', async (req, res) => {
  try {
    const speaker = await User.findById(req.params.id)
      .select('firstName lastName bio skills experience avatar phone')
      .populate('school', 'name type');

    if (!speaker || speaker.role !== 'speaker') {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    // Get speaker's events
    const events = await Event.find({
      'speakers.speaker': speaker._id,
      status: { $in: ['published', 'ongoing', 'completed'] }
    })
    .select('title date category host')
    .populate('host', 'name')
    .sort({ 'date.start': -1 })
    .limit(5);

    res.json({
      speaker: {
        ...speaker.toObject(),
        events
      }
    });
  } catch (error) {
    console.error('Get speaker profile error:', error);
    res.status(500).json({ message: 'Failed to fetch speaker profile' });
  }
});

export default router;
