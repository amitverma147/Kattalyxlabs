# Enhanced School Admin and Super Admin System

## Summary of Changes

This implementation enhances the existing educational event platform with comprehensive admin management system and event request workflows.

### Key Features Implemented:

## 1. **Role-Based System Enhancement**
- **School Admin**: Can request events, collaborate with platform, manage school-specific activities
- **Super Admin**: Full platform control, event creation, approval workflows, admin management
- **Speakers**: Can request to appear at events
- **Students**: Existing functionality maintained

## 2. **Event Request System**
- School admins can submit event proposals
- Comprehensive event request form with justification, priorities, and detailed requirements
- Super admin approval workflow
- Automatic event creation upon approval

## 3. **Speaker Request System**
- Speakers can apply to speak at published events
- Detailed speaker profiles and session proposals
- Event organizer and super admin approval process
- Automatic speaker assignment to events upon approval

## 4. **Admin Management**
- Super admin can create and manage multiple administrators
- Support for additional school admins per institution
- Permission-based access control
- Admin hierarchy management

## 5. **Enhanced Dashboards**

### Super Admin Dashboard:
- Platform-wide statistics and analytics
- Pending request management
- System health monitoring
- Top schools and performance metrics
- Admin management interface

### School Admin Dashboard:
- School-specific metrics
- Event request tracking
- Collaboration tools
- Quick action buttons for common tasks

## 6. **New Backend Models**

### EventRequest Model:
- Comprehensive event proposal system
- Status tracking (pending, approved, rejected, needs_revision)
- Priority levels and justification requirements
- Integration with school and user models

### SpeakerRequest Model:
- Speaker application system
- Session details and requirements
- Fee negotiation and travel requirements
- Status tracking and approval workflow

### Enhanced User Model:
- Admin-specific fields (adminLevel, permissions, assignedBy)
- Additional permission granularity
- Admin notes and management tracking

### Enhanced School Model:
- Support for multiple administrators
- Additional admin assignment tracking
- Permission delegation system

## 7. **New API Endpoints**

### Event Requests (`/api/event-requests`):
- `GET /` - List event requests (filtered by role)
- `POST /` - Create new event request (school admin only)
- `PUT /:id` - Update event request
- `PUT /:id/review` - Review and approve/reject (super admin only)
- `DELETE /:id` - Delete event request

### Speaker Requests (`/api/speaker-requests`):
- `GET /` - List speaker requests (filtered by role)
- `POST /` - Create speaker request (speakers only)
- `PUT /:id` - Update speaker request
- `PUT /:id/review` - Review and approve/reject
- `GET /event/:eventId` - Get requests for specific event

### Admin Management (`/api/admin`):
- `GET /admins` - List all administrators
- `POST /admins` - Create new administrator
- `PUT /admins/:id` - Update administrator
- `DELETE /admins/:id` - Delete administrator
- `GET /dashboard` - Super admin dashboard data
- `GET /school-dashboard` - School admin dashboard data
- `GET /system-health` - System health metrics

## 8. **Frontend Components**

### New Components:
- `SuperAdminDashboard.jsx` - Comprehensive super admin interface
- `SchoolAdminDashboard.jsx` - School-specific admin interface
- `EventRequestForm.jsx` - Event request submission form

### Enhanced Components:
- Updated main `Dashboard.jsx` to route based on user roles
- Enhanced authentication context
- Role-based navigation and access control

## 9. **Security Enhancements**
- Role-based middleware restrictions
- Only super admin can create events
- School admins can only manage their own school's requests
- Proper permission validation on all admin endpoints

## 10. **Workflow Changes**

### Event Creation Process:
1. School admin submits event request
2. Super admin reviews and approves/rejects
3. Upon approval, event is automatically created and published
4. Speakers can then request to participate

### Speaker Assignment Process:
1. Speakers browse published events
2. Submit speaker request with session details
3. Event organizer (school admin) or super admin reviews
4. Upon approval, speaker is added to event

### Admin Management Process:
1. Super admin creates new administrators
2. Assigns appropriate permissions and school associations
3. School admins can be assigned to specific schools
4. Multiple admins can be assigned to single schools

## 11. **Database Schema Updates**
- Added EventRequest collection
- Added SpeakerRequest collection
- Enhanced User model with admin fields
- Enhanced School model with additional admin support
- Proper indexing for performance

## File Structure Changes:

### Backend:
```
models/
  EventRequest.js (NEW)
  SpeakerRequest.js (NEW)
  User.js (ENHANCED)
  School.js (ENHANCED)

routes/
  eventRequests.js (NEW)
  speakerRequests.js (NEW)
  admin.js (NEW)
  events.js (MODIFIED - restricted to super admin)

server.js (MODIFIED - added new routes)
```

### Frontend:
```
pages/
  dashboard/
    SuperAdminDashboard.jsx (NEW)
    SchoolAdminDashboard.jsx (NEW)
    Dashboard.jsx (ENHANCED)
  admin/
    EventRequestForm.jsx (NEW)
```

## Usage Instructions:

1. **Super Admin Setup**: The first super admin should be created directly in the database
2. **School Admin Creation**: Super admin can create school admins through the admin management interface
3. **Event Requests**: School admins can request events through the dashboard
4. **Speaker Applications**: Speakers can apply to speak at events once they're published
5. **Approvals**: Super admin manages all approvals through the dashboard

This implementation provides a comprehensive collaboration platform where school administrators can propose events while maintaining centralized control through super admin oversight.
