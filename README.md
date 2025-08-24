# Enhanced Educational Event Platform

A comprehensive platform for educational institutions to manage events, speakers, and collaboration with role-based access control.

## 🚀 Features

### Role-Based Access Control
- **Super Admin**: Full platform control, event creation, approval workflows
- **School Admin**: Event requests, collaboration, school management
- **Speakers**: Apply to speak at events, manage speaker profiles
- **Students**: Event browsing, registration, profile management

### Key Functionalities
- **Event Request System**: School admins can submit event proposals for super admin approval
- **Speaker Request System**: Speakers can apply to speak at published events
- **Admin Management**: Super admin can create and manage multiple administrators
- **Comprehensive Dashboards**: Role-specific dashboards with analytics and management tools
- **Collaboration Platform**: Schools can work together through centralized platform

## 🛠️ Technical Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** enabled for frontend communication

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Router** for navigation
- **Framer Motion** for animations
- **Lucide React** for icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Navigate to your project directory
cd "c:\Users\amitv\Desktop\New folder"

# Setup backend
cd backend
npm install

# Setup frontend
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
# Copy example environment file
cp .env.example .env

# Edit the .env file with your configuration
MONGODB_URI=mongodb://localhost:27017/edu-event-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

#### Frontend (.env)
```bash
# Copy example environment file
cp .env.example .env

# Edit the .env file
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup

```bash
# Start MongoDB service (if not already running)
# Windows: Run MongoDB as a service or start manually
# macOS: brew services start mongodb/brew/mongodb-community
# Linux: sudo systemctl start mongod

# Seed the database with initial data
cd backend
npm run seed
```

### 4. Start the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 👥 Default User Accounts

After running the seeder, you can log in with these accounts:

### Super Administrator
- **Email**: `superadmin@platform.com`
- **Password**: `SuperAdmin123!`
- **Capabilities**: Full platform control, create events, manage admins

### School Administrator
- **Email**: `schooladmin@sampleuni.edu`
- **Password**: `SchoolAdmin123!`
- **Capabilities**: Request events, manage school activities

### Speaker
- **Email**: `speaker@example.com`
- **Password**: `Speaker123!`
- **Capabilities**: Apply to speak at events, manage speaker profile

### Student
- **Email**: `student@sampleuni.edu`
- **Password**: `Student123!`
- **Capabilities**: Browse and register for events

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user profile

### Event Management
- `GET /api/events` - List all events (public)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (super admin only)
- `PUT /api/events/:id` - Update event (super admin only)
- `DELETE /api/events/:id` - Delete event (super admin only)

### Event Requests
- `GET /api/event-requests` - List event requests (filtered by role)
- `POST /api/event-requests` - Create event request (school admin)
- `PUT /api/event-requests/:id` - Update event request
- `PUT /api/event-requests/:id/review` - Review request (super admin)
- `DELETE /api/event-requests/:id` - Delete event request

### Speaker Requests
- `GET /api/speaker-requests` - List speaker requests (filtered by role)
- `POST /api/speaker-requests` - Apply to speak (speakers)
- `PUT /api/speaker-requests/:id` - Update speaker request
- `PUT /api/speaker-requests/:id/review` - Review speaker application
- `GET /api/speaker-requests/event/:eventId` - Get requests for event

### Admin Management
- `GET /api/admin/admins` - List administrators (super admin)
- `POST /api/admin/admins` - Create administrator (super admin)
- `PUT /api/admin/admins/:id` - Update administrator (super admin)
- `DELETE /api/admin/admins/:id` - Delete administrator (super admin)
- `GET /api/admin/dashboard` - Super admin dashboard data
- `GET /api/admin/school-dashboard` - School admin dashboard data

## 📱 User Workflows

### School Admin Workflow
1. **Login** with school admin credentials
2. **Request Events** through the dashboard
3. **Track Requests** and view approval status
4. **Manage School** activities and students
5. **Collaborate** with other schools through platform

### Super Admin Workflow
1. **Monitor Platform** through comprehensive dashboard
2. **Review Event Requests** from school administrators
3. **Approve/Reject Events** with comments
4. **Create Events** directly for schools
5. **Manage Administrators** and assign permissions
6. **Review Speaker Applications** for events

### Speaker Workflow
1. **Browse Published Events** on the platform
2. **Apply to Speak** at relevant events
3. **Provide Session Details** and requirements
4. **Track Application Status** through dashboard
5. **Manage Speaker Profile** and expertise

### Student Workflow
1. **Browse Available Events** from all schools
2. **Register for Events** of interest
3. **Track Attendance** and certificates
4. **Network** with other students and speakers

## 🔐 Security Features

- **JWT Authentication** with secure token handling
- **Role-based Authorization** for all endpoints
- **Password Hashing** with bcryptjs
- **Input Validation** and sanitization
- **CORS Protection** for API access
- **Permission-based Access Control**

## 📊 Dashboard Features

### Super Admin Dashboard
- Platform-wide statistics and metrics
- Pending request management
- System health monitoring
- User and school analytics
- Admin management interface
- Top performing schools and events

### School Admin Dashboard
- School-specific metrics and analytics
- Event request tracking and history
- Student engagement statistics
- Quick action buttons for common tasks
- Upcoming events overview
- Request status monitoring

## 🛡️ Error Handling

The application includes comprehensive error handling:
- **Authentication errors** with clear messages
- **Validation errors** for form submissions
- **Permission errors** for unauthorized access
- **Network errors** with retry functionality
- **Database errors** with graceful fallbacks

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Database Operations
```bash
# Reset and seed database
npm run seed

# Start fresh development environment
npm run dev
```

## 📝 Contributing

1. Follow the existing code structure and patterns
2. Add proper error handling for new features
3. Include appropriate role-based access controls
4. Test all new functionality with different user roles
5. Update documentation for new features

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure MongoDB is running
2. **Port Conflicts**: Check if ports 5000 or 5173 are in use
3. **Environment Variables**: Verify .env files are properly configured
4. **Dependencies**: Run `npm install` in both backend and frontend directories

### Reset Database
```bash
# Stop the application
# Drop the database in MongoDB
# Run the seeder again
npm run seed
```

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 👥 Support

For support and questions about the platform:
1. Check the troubleshooting section
2. Review the API documentation
3. Examine the user workflows
4. Test with the provided sample accounts

---

**Note**: This platform provides a comprehensive solution for educational event management with role-based collaboration features. Each user type has specific capabilities designed to facilitate smooth operation and inter-school collaboration while maintaining proper oversight and approval workflows.
