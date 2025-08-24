# Admin Features Documentation

## Overview
This platform includes comprehensive admin functionality with role-based access control. There are three main admin roles:

1. **Super Admin** - Full platform control
2. **School Admin** - School-specific management 
3. **Speaker** - Can apply to speak at events

## Current Features Working

### 1. School Admin Dashboard (`/dashboard`)
- **Event Request Form** (`/admin/request-event`)
  - School admins can request new events
  - Form includes event details, date, venue, budget
  - Requests go to super admin for approval
- **My Event Requests** (`/admin/my-requests`)
  - View all submitted event requests
  - Check approval status
  - See review comments from super admin

### 2. Super Admin Dashboard (`/dashboard`)
- **Event Request Management** (`/admin/event-requests`)
  - Review all event requests from schools
  - Approve, reject, or request changes
  - Add review comments
- **Admin Management** (`/admin/manage` or `/admin/users`)
  - View all users (admins, speakers, attendees)
  - Create new admins (school admin or super admin)
  - Activate/deactivate user accounts
  - Delete users
  - View statistics (user counts, school stats)
- **Speaker Request Management** (`/admin/speaker-requests`)
  - Review speaker applications for events
  - Approve, reject, or waitlist speakers
  - View speaker details and session proposals

### 3. Speaker Features
- **Speaker Application Form** (`/events/{eventId}/apply-speaker`)
  - Apply to speak at specific events
  - Provide session details, expertise, requirements
  - Specify travel/accommodation needs
  - Set speaker fees
- **My Applications** (`/admin/speaker-requests` - filtered for speaker)
  - View application status
  - Track approval/rejection

## Navigation Structure

### School Admin Dashboard Links:
- Request New Event → `/admin/request-event`
- My Event Requests → `/admin/my-requests` 
- Speaker Applications → `/admin/speaker-requests`

### Super Admin Dashboard Links:
- Review Event Requests → `/admin/event-requests`
- Manage Admins → `/admin/manage`
- Speaker Applications → `/admin/speaker-requests`
- System Overview → `/admin/users` (statistics tab)

### Public Event Pages:
- Events List → `/events`
- Event Details → `/events/{id}` (with "Apply as Speaker" button for speakers)

## Backend API Endpoints

### Event Requests
- `GET /api/event-requests` - List event requests (filtered by role)
- `POST /api/event-requests` - Create new event request
- `PUT /api/event-requests/{id}/review` - Review event request (super admin)

### Speaker Requests  
- `GET /api/speaker-requests` - List speaker requests (filtered by role)
- `POST /api/speaker-requests` - Submit speaker application
- `PUT /api/speaker-requests/{id}/review` - Review speaker application

### Admin Management
- `GET /api/admin/users` - List all users (super admin only)
- `GET /api/admin/schools` - List all schools (super admin only)
- `POST /api/admin/create-admin` - Create new admin (super admin only)
- `PUT /api/admin/users/{id}/status` - Activate/deactivate user
- `DELETE /api/admin/users/{id}` - Delete user

### Events (Super Admin Only)
- `POST /api/events` - Create new event (restricted to super admin)
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

## Database Models

### EventRequest
- school (ref to School)
- eventDetails (title, description, date, venue, etc.)
- budget
- status (pending/approved/rejected/changes_requested)
- reviewComments
- reviewedBy (ref to User)

### SpeakerRequest
- speaker (ref to User)
- event (ref to Event)
- sessionDetails (topic, description, type, duration)
- expertise, equipment needs
- travel/accommodation requirements
- speaker fee
- status (pending/approved/rejected/waitlisted)

### User (Enhanced)
- adminPermissions object for fine-grained control
- isActive flag for account management
- school reference for school admins

### School (Enhanced)
- admins array (multiple school admins supported)
- Enhanced contact and institutional details

## Role-Based Access Control

### Route Protection:
- All admin routes require authentication
- Role-specific routes use `allowedRoles` prop in ProtectedRoute
- Frontend enforces UI restrictions
- Backend validates permissions on all endpoints

### Permission Matrix:
| Feature | Super Admin | School Admin | Speaker | Attendee |
|---------|-------------|--------------|---------|----------|
| Create Events | ✅ | ❌ | ❌ | ❌ |
| Request Events | ✅ | ✅ | ❌ | ❌ |
| Review Event Requests | ✅ | ❌ | ❌ | ❌ |
| Apply as Speaker | ❌ | ❌ | ✅ | ❌ |
| Review Speaker Apps | ✅ | ✅* | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Create Admins | ✅ | ❌ | ❌ | ❌ |

*School admins can only review speakers for their events

## Testing the Features

1. **Login as School Admin**:
   - Go to `/login`
   - Login with school admin credentials
   - Navigate to dashboard
   - Try "Request New Event"
   - Check "My Event Requests"

2. **Login as Super Admin**:
   - Go to `/login` 
   - Login with super admin credentials
   - Navigate to dashboard
   - Try "Review Event Requests"
   - Try "Manage Admins" → Create new admin
   - Check statistics

3. **Login as Speaker**:
   - Go to `/events`
   - Click on an event
   - Click "Apply as Speaker"
   - Fill out application
   - Check application status

## Known Issues Fixed

1. ✅ Import/export issues with Button and Card components
2. ✅ Missing admin routes in App.jsx
3. ✅ React hook dependency warnings
4. ✅ Missing API endpoints for user/school management
5. ✅ Navigation links in dashboards
6. ✅ Role-based route protection

## Next Steps for Enhancement

1. **Email Notifications**: When requests are reviewed
2. **File Uploads**: For speaker profiles, event materials
3. **Calendar Integration**: For event scheduling
4. **Advanced Filters**: In admin lists
5. **Bulk Operations**: For user management
6. **Audit Logs**: Track admin actions
7. **Real-time Updates**: Using WebSockets for status changes

## Environment Setup

Make sure both servers are running:

```bash
# Backend (Port 5000)
cd backend
npm start

# Frontend (Port 5173) 
cd frontend
npm run dev
```

The platform is now fully functional with all admin features working!
