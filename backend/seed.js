import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import School from './models/School.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-event-platform');
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      return;
    }

    // Create super admin user
    const superAdmin = new User({
      fullName: 'Super Administrator',
      email: 'superadmin@platform.com',
      password: 'SuperAdmin123!', // This will be hashed by the pre-save middleware
      role: 'super_admin',
      adminLevel: 'super_admin',
      permissions: [
        'manage_events',
        'manage_users',
        'manage_schools',
        'approve_requests',
        'view_analytics',
        'manage_admins',
        'system_settings'
      ],
      isVerified: true,
      isActive: true,
      phone: '+1234567890',
      bio: 'Platform Super Administrator'
    });

    await superAdmin.save();
    console.log('Super admin created successfully!');
    console.log('Email: superadmin@platform.com');
    console.log('Password: SuperAdmin123!');

    // Create a sample school
    const sampleSchool = new School({
      name: 'Sample University',
      type: 'university',
      address: {
        street: '123 Education Blvd',
        city: 'Academic City',
        state: 'CA',
        country: 'USA',
        zipCode: '12345'
      },
      contact: {
        email: 'admin@sampleuni.edu',
        phone: '+1987654321',
        website: 'https://sampleuni.edu'
      },
      description: 'A sample university for testing the platform',
      admin: superAdmin._id, // Temporarily assign super admin as school admin
      isVerified: true,
      isActive: true,
      studentCount: 5000,
      facilities: ['Library', 'Computer Lab', 'Auditorium', 'Sports Complex'],
      programs: [
        {
          name: 'Computer Science',
          description: 'Bachelor of Science in Computer Science',
          duration: '4 years'
        },
        {
          name: 'Business Administration',
          description: 'Master of Business Administration',
          duration: '2 years'
        }
      ]
    });

    await sampleSchool.save();
    console.log('Sample school created successfully!');

    // Create a sample school admin
    const schoolAdmin = new User({
      fullName: 'School Administrator',
      email: 'schooladmin@sampleuni.edu',
      password: 'SchoolAdmin123!',
      role: 'school_admin',
      school: sampleSchool._id,
      adminLevel: 'school_admin',
      permissions: ['manage_events', 'view_analytics'],
      assignedBy: superAdmin._id,
      isVerified: true,
      isActive: true,
      phone: '+1987654322',
      bio: 'Administrator for Sample University'
    });

    await schoolAdmin.save();
    
    // Update school admin to the actual school admin
    sampleSchool.admin = schoolAdmin._id;
    await sampleSchool.save();

    console.log('School admin created successfully!');
    console.log('Email: schooladmin@sampleuni.edu');
    console.log('Password: SchoolAdmin123!');

    // Create a sample speaker
    const speaker = new User({
      fullName: 'Dr. Jane Speaker',
      email: 'speaker@example.com',
      password: 'Speaker123!',
      role: 'speaker',
      isVerified: true,
      isActive: true,
      phone: '+1555666777',
      bio: 'Expert in AI and Machine Learning with 10+ years of experience in industry and academia.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'TensorFlow'],
      experience: 'Senior AI Researcher at Tech Corp, Former Professor at Tech University. Published 50+ research papers and holds 5 patents in AI/ML.'
    });

    await speaker.save();
    console.log('Sample speaker created successfully!');
    console.log('Email: speaker@example.com');
    console.log('Password: Speaker123!');

    // Create a sample student
    const student = new User({
      fullName: 'John Student',
      email: 'student@sampleuni.edu',
      password: 'Student123!',
      role: 'student',
      school: sampleSchool._id,
      isVerified: true,
      isActive: true,
      phone: '+1555888999',
      bio: 'Computer Science student interested in AI and web development.'
    });

    await student.save();
    console.log('Sample student created successfully!');
    console.log('Email: student@sampleuni.edu');
    console.log('Password: Student123!');

    console.log('\n=== Seeding completed successfully! ===');
    console.log('\nYou can now log in with any of the following accounts:');
    console.log('\n1. Super Admin:');
    console.log('   Email: superadmin@platform.com');
    console.log('   Password: SuperAdmin123!');
    console.log('\n2. School Admin:');
    console.log('   Email: schooladmin@sampleuni.edu');
    console.log('   Password: SchoolAdmin123!');
    console.log('\n3. Speaker:');
    console.log('   Email: speaker@example.com');
    console.log('   Password: Speaker123!');
    console.log('\n4. Student:');
    console.log('   Email: student@sampleuni.edu');
    console.log('   Password: Student123!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();
