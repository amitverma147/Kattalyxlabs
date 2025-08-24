import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SchoolAdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/school-dashboard');
      setDashboardData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <Button onClick={fetchDashboardData} className="mt-2">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { school, overview, recentEventRequests, upcomingEvents } = dashboardData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">School Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.fullName} - {school?.name}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => window.location.href = '/admin/request-event'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Request New Event
            </Button>
            <Button 
              onClick={() => window.location.href = '/admin/my-requests'}
              variant="outline"
            >
              View My Requests
            </Button>
            <Button 
              onClick={() => window.location.href = '/events'}
              variant="outline"
            >
              Browse Events
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">School Events</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{overview?.totalEvents}</p>
            <p className="text-sm text-gray-500 mt-1">Total events hosted</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">Event Requests</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{overview?.totalEventRequests}</p>
            <p className="text-sm text-gray-500 mt-1">
              {overview?.pendingRequests} pending approval
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">Students</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{overview?.totalStudents}</p>
            <p className="text-sm text-gray-500 mt-1">Active students</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">Registrations</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{overview?.totalRegistrations}</p>
            <p className="text-sm text-gray-500 mt-1">Total event registrations</p>
          </Card>
        </div>

        {/* Request Status Overview */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{overview?.pendingRequests}</p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{overview?.approvedRequests}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{overview?.rejectedRequests}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Event Requests */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Event Requests</h3>
              <Button 
                onClick={() => window.location.href = '/admin/my-requests'}
                variant="outline"
                size="sm"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentEventRequests?.length > 0 ? (
                recentEventRequests.slice(0, 5).map((request) => (
                  <div key={request._id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{request.title}</h4>
                        <p className="text-sm text-gray-500">
                          Requested on {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                        {request.reviewedBy && (
                          <p className="text-sm text-gray-500">
                            Reviewed by {request.reviewedBy.fullName}
                          </p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    {request.reviewComments && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        "{request.reviewComments}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No event requests yet</p>
              )}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming School Events</h3>
              <Button 
                onClick={() => window.location.href = '/events?school=' + school?.name}
                variant="outline"
                size="sm"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingEvents?.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event._id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date.start).toLocaleDateString()} at{' '}
                          {new Date(event.date.start).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Organized by {event.organizer?.fullName}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === 'published' ? 'bg-green-100 text-green-800' :
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.registeredParticipants?.length || 0} / {event.capacity} registered
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming events</p>
              )}
            </div>
          </Card>
        </div>

        {/* Help & Tips */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📝</span>
              </div>
              <h4 className="font-medium text-gray-900">Request Events</h4>
              <p className="text-sm text-gray-600 mt-1">
                Submit event proposals for your school that require super admin approval.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">👥</span>
              </div>
              <h4 className="font-medium text-gray-900">Collaborate</h4>
              <p className="text-sm text-gray-600 mt-1">
                Work with speakers and organize events for your school community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <h4 className="font-medium text-gray-900">Track Progress</h4>
              <p className="text-sm text-gray-600 mt-1">
                Monitor your event requests and see how your events are performing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
