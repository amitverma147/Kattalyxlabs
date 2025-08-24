import express from 'express';
import User from '../models/User.js';
import School from '../models/School.js';
import Event from '../models/Event.js';
import EventRequest from '../models/EventRequest.js';
import SpeakerRequest from '../models/SpeakerRequest.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get all admins (super admin only)
router.get('/admins', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, school } = req.query;

    let query = { 
      role: { $in: ['school_admin', 'super_admin'] }
    };

    if (role) query.role = role;
    if (school) query.school = school;

    const admins = await User.find(query)
      .populate('school', 'name type')
      .populate('assignedBy', 'fullName email')
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments(query);

    res.json({
      admins,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ message: 'Failed to fetch admins' });
  }
});

// Create new admin (super admin only)
router.post('/admins', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      school,
      permissions,
      adminNotes
    } = req.body;

    // Validate role
    if (!['school_admin', 'super_admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid admin role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Validate school for school_admin
    if (role === 'school_admin') {
      if (!school) {
        return res.status(400).json({ message: 'School is required for school admin' });
      }
      
      const schoolDoc = await School.findById(school);
      if (!schoolDoc) {
        return res.status(400).json({ message: 'Invalid school ID' });
      }
    }

    const newAdmin = new User({
      fullName,
      email,
      password,
      role,
      school: role === 'school_admin' ? school : null,
      adminLevel: role,
      permissions,
      assignedBy: req.user._id,
      adminNotes,
      isVerified: true,
      isActive: true
    });

    await newAdmin.save();

    // If school admin, add to school's additional admins
    if (role === 'school_admin' && school) {
      await School.findByIdAndUpdate(school, {
        $push: {
          additionalAdmins: {
            user: newAdmin._id,
            assignedBy: req.user._id,
            permissions: permissions || ['manage_events']
          }
        }
      });
    }

    const populatedAdmin = await User.findById(newAdmin._id)
      .populate('school', 'name type')
      .populate('assignedBy', 'fullName email')
      .select('-password');

    res.status(201).json({
      message: 'Admin created successfully',
      admin: populatedAdmin
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Failed to create admin' });
  }
});

// Update admin (super admin only)
router.put('/admins/:id', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      role,
      school,
      permissions,
      adminNotes,
      isActive
    } = req.body;

    const admin = await User.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Can't demote the last super admin
    if (admin.role === 'super_admin' && role !== 'super_admin') {
      const superAdminCount = await User.countDocuments({ role: 'super_admin', isActive: true });
      if (superAdminCount <= 1) {
        return res.status(400).json({ message: 'Cannot demote the last super admin' });
      }
    }

    // Update user
    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        email,
        role,
        school: role === 'school_admin' ? school : null,
        adminLevel: role,
        permissions,
        adminNotes,
        isActive
      },
      { new: true, runValidators: true }
    ).populate('school', 'name type')
     .populate('assignedBy', 'fullName email')
     .select('-password');

    res.json({
      message: 'Admin updated successfully',
      admin: updatedAdmin
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ message: 'Failed to update admin' });
  }
});

// Delete admin (super admin only)
router.delete('/admins/:id', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Can't delete the last super admin
    if (admin.role === 'super_admin') {
      const superAdminCount = await User.countDocuments({ role: 'super_admin', isActive: true });
      if (superAdminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last super admin' });
      }
    }

    // Remove from school's additional admins if applicable
    if (admin.school) {
      await School.findByIdAndUpdate(admin.school, {
        $pull: { 'additionalAdmins': { user: admin._id } }
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ message: 'Failed to delete admin' });
  }
});

// Super Admin Dashboard - Get comprehensive statistics
router.get('/dashboard', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    // Basic counts
    const [
      totalUsers,
      totalSchools,
      totalEvents,
      totalEventRequests,
      totalSpeakerRequests,
      activeAdmins
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      School.countDocuments({ isActive: true }),
      Event.countDocuments(),
      EventRequest.countDocuments(),
      SpeakerRequest.countDocuments(),
      User.countDocuments({ role: { $in: ['school_admin', 'super_admin'] }, isActive: true })
    ]);

    // Recent activity
    const [
      recentUsers,
      recentSchools,
      recentEvents,
      pendingEventRequests,
      pendingSpeakerRequests
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startOfWeek }, isActive: true }),
      School.countDocuments({ createdAt: { $gte: startOfWeek }, isActive: true }),
      Event.countDocuments({ createdAt: { $gte: startOfWeek } }),
      EventRequest.countDocuments({ status: 'pending' }),
      SpeakerRequest.countDocuments({ status: 'pending' })
    ]);

    // Monthly statistics
    const monthlyStats = await Event.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 },
          totalRegistrations: { $sum: { $size: "$registeredParticipants" } }
        }
      }
    ]);

    // Event status breakdown
    const eventStatusBreakdown = await Event.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Request status breakdown
    const [eventRequestsBreakdown, speakerRequestsBreakdown] = await Promise.all([
      EventRequest.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]),
      SpeakerRequest.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Top schools by events
    const topSchools = await Event.aggregate([
      {
        $group: {
          _id: "$host",
          eventCount: { $sum: 1 },
          totalRegistrations: { $sum: { $size: "$registeredParticipants" } }
        }
      },
      {
        $lookup: {
          from: "schools",
          localField: "_id",
          foreignField: "_id",
          as: "school"
        }
      },
      {
        $unwind: "$school"
      },
      {
        $sort: { eventCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          schoolName: "$school.name",
          schoolType: "$school.type",
          eventCount: 1,
          totalRegistrations: 1
        }
      }
    ]);

    // Recent activity feed
    const [recentEventRequests, recentSpeakerRequestsData] = await Promise.all([
      EventRequest.find()
        .populate('requestedBy', 'fullName')
        .populate('school', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title status createdAt requestedBy school'),
      SpeakerRequest.find()
        .populate('speaker', 'fullName')
        .populate('event', 'title')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('topic status requestDate speaker event')
    ]);

    res.json({
      overview: {
        totalUsers,
        totalSchools,
        totalEvents,
        totalEventRequests,
        totalSpeakerRequests,
        activeAdmins,
        recentUsers,
        recentSchools,
        recentEvents,
        pendingEventRequests,
        pendingSpeakerRequests
      },
      charts: {
        monthlyStats,
        eventStatusBreakdown,
        eventRequestsBreakdown,
        speakerRequestsBreakdown,
        topSchools
      },
      recentActivity: {
        eventRequests: recentEventRequests,
        speakerRequests: recentSpeakerRequestsData
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

// School Admin Dashboard - Get school-specific statistics
router.get('/school-dashboard', authenticateToken, authorizeRoles('school_admin'), async (req, res) => {
  try {
    // Get school admin's school
    const school = await School.findOne({ 
      $or: [
        { admin: req.user._id },
        { 'additionalAdmins.user': req.user._id }
      ]
    });

    if (!school) {
      return res.status(404).json({ message: 'No school associated with your account' });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // School-specific statistics
    const [
      schoolEvents,
      schoolEventRequests,
      schoolStudents,
      pendingEventRequests,
      approvedEventRequests,
      rejectedEventRequests,
      totalRegistrations
    ] = await Promise.all([
      Event.countDocuments({ host: school._id }),
      EventRequest.countDocuments({ school: school._id }),
      User.countDocuments({ school: school._id, role: 'student', isActive: true }),
      EventRequest.countDocuments({ school: school._id, status: 'pending' }),
      EventRequest.countDocuments({ school: school._id, status: 'approved' }),
      EventRequest.countDocuments({ school: school._id, status: 'rejected' }),
      Event.aggregate([
        { $match: { host: school._id } },
        { $project: { registrationCount: { $size: "$registeredParticipants" } } },
        { $group: { _id: null, total: { $sum: "$registrationCount" } } }
      ])
    ]);

    // Recent event requests
    const recentEventRequests = await EventRequest.find({ school: school._id })
      .populate('requestedBy', 'fullName')
      .populate('reviewedBy', 'fullName')
      .populate('approvedEvent', 'title status')
      .sort({ createdAt: -1 })
      .limit(10);

    // Upcoming events for the school
    const upcomingEvents = await Event.find({ 
      host: school._id,
      'date.start': { $gte: new Date() },
      status: { $in: ['published', 'ongoing'] }
    })
    .populate('organizer', 'fullName')
    .sort({ 'date.start': 1 })
    .limit(5);

    // Monthly event requests
    const monthlyEventRequests = await EventRequest.aggregate([
      {
        $match: {
          school: school._id,
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      school: {
        name: school.name,
        type: school.type,
        studentCount: schoolStudents
      },
      overview: {
        totalEvents: schoolEvents,
        totalEventRequests: schoolEventRequests,
        totalStudents: schoolStudents,
        totalRegistrations: totalRegistrations[0]?.total || 0,
        pendingRequests: pendingEventRequests,
        approvedRequests: approvedEventRequests,
        rejectedRequests: rejectedEventRequests
      },
      recentEventRequests,
      upcomingEvents,
      monthlyEventRequests
    });
  } catch (error) {
    console.error('School dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch school dashboard data' });
  }
});

// Get system health and performance metrics (super admin only)
router.get('/system-health', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const dbStats = await Promise.all([
      User.estimatedDocumentCount(),
      School.estimatedDocumentCount(),
      Event.estimatedDocumentCount(),
      EventRequest.estimatedDocumentCount(),
      SpeakerRequest.estimatedDocumentCount()
    ]);

    const [userCount, schoolCount, eventCount, eventRequestCount, speakerRequestCount] = dbStats;

    // Performance metrics
    const startTime = Date.now();
    await User.findOne(); // Simple query to test response time
    const queryTime = Date.now() - startTime;

    // Active sessions (approximation based on recent activity)
    const activeSessions = await User.countDocuments({
      lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
      isActive: true
    });

    res.json({
      database: {
        totalCollections: 5,
        userCount,
        schoolCount,
        eventCount,
        eventRequestCount,
        speakerRequestCount,
        queryResponseTime: `${queryTime}ms`
      },
      performance: {
        activeSessions,
        averageQueryTime: `${queryTime}ms`,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      },
      status: 'healthy'
    });
  } catch (error) {
    console.error('System health error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch system health data',
      status: 'unhealthy'
    });
  }
});

// Get all users (super admin only)
router.get('/users', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, role, isActive } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    
    const users = await User.find(query)
      .populate('school', 'name type')
      .select('-password')
      .sort({ createdAt: -1 })
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

// Get all schools (super admin only)
router.get('/schools', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    
    let query = {};
    if (type) query.type = type;
    
    const schools = await School.find(query)
      .populate('admins', 'fullName email')
      .sort({ createdAt: -1 })
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

// Create new admin
router.post('/create-admin', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { fullName, email, password, role, schoolId } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      role,
      isActive: true,
      adminPermissions: {
        canManageUsers: role === 'super_admin',
        canManageEvents: true,
        canManageSchools: role === 'super_admin',
        canViewReports: true
      }
    };
    
    if (role === 'school_admin' && schoolId) {
      userData.school = schoolId;
    }
    
    const newUser = new User(userData);
    await newUser.save();
    
    // If school admin, add to school's admins list
    if (role === 'school_admin' && schoolId) {
      await School.findByIdAndUpdate(schoolId, {
        $addToSet: { admins: newUser._id }
      });
    }
    
    const userResponse = await User.findById(newUser._id)
      .populate('school', 'name type')
      .select('-password');
    
    res.status(201).json({
      message: 'Admin created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Failed to create admin' });
  }
});

// Update user status (activate/deactivate)
router.put('/users/:userId/status', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Failed to update user status' });
  }
});

// Delete user
router.delete('/users/:userId', authenticateToken, authorizeRoles('super_admin'), async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove from school's admins list if school admin
    if (user.role === 'school_admin' && user.school) {
      await School.findByIdAndUpdate(user.school, {
        $pull: { admins: userId }
      });
    }
    
    await User.findByIdAndDelete(userId);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
