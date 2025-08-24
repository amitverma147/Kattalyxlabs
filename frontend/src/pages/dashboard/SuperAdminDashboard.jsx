import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/dashboard');
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

  const { overview, charts, recentActivity } = dashboardData || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.fullName}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {['overview', 'requests', 'analytics', 'system'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{overview?.totalUsers}</p>
                <p className="text-sm text-gray-500 mt-1">+{overview?.recentUsers} this week</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Total Schools</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{overview?.totalSchools}</p>
                <p className="text-sm text-gray-500 mt-1">+{overview?.recentSchools} this week</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Total Events</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">{overview?.totalEvents}</p>
                <p className="text-sm text-gray-500 mt-1">+{overview?.recentEvents} this week</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Admins</h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">{overview?.activeAdmins}</p>
              </Card>
            </div>

            {/* Pending Requests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Event Requests</h3>
                <p className="text-2xl font-bold text-yellow-600">{overview?.pendingEventRequests}</p>
                <Button 
                  onClick={() => setActiveTab('requests')}
                  className="mt-3 w-full"
                  variant="outline"
                >
                  Review Requests
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Speaker Requests</h3>
                <p className="text-2xl font-bold text-red-600">{overview?.pendingSpeakerRequests}</p>
                <Button 
                  onClick={() => setActiveTab('requests')}
                  className="mt-3 w-full"
                  variant="outline"
                >
                  Review Requests
                </Button>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Event Requests</h3>
                <div className="space-y-3">
                  {recentActivity?.eventRequests?.map((request) => (
                    <div key={request._id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{request.title}</p>
                        <p className="text-sm text-gray-500">by {request.requestedBy?.fullName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Speaker Requests</h3>
                <div className="space-y-3">
                  {recentActivity?.speakerRequests?.map((request) => (
                    <div key={request._id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{request.topic}</p>
                        <p className="text-sm text-gray-500">by {request.speaker?.fullName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Pending Requests</h2>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => window.location.href = '/admin/event-requests'}
                  variant="outline"
                >
                  Manage Event Requests
                </Button>
                <Button 
                  onClick={() => window.location.href = '/admin/speaker-requests'}
                  variant="outline"
                >
                  Manage Speaker Requests
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Event Requests ({overview?.pendingEventRequests} pending)
                </h3>
                <p className="text-gray-600">
                  Review and approve event requests from school administrators.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Speaker Requests ({overview?.pendingSpeakerRequests} pending)
                </h3>
                <p className="text-gray-600">
                  Review and approve speaker applications for published events.
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            
            {/* Event Status Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Status Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {charts?.eventStatusBreakdown?.map((status) => (
                  <div key={status._id} className="text-center">
                    <p className="text-2xl font-bold">{status.count}</p>
                    <p className="text-sm text-gray-600 capitalize">{status._id}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Schools */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Schools by Events</h3>
              <div className="space-y-3">
                {charts?.topSchools?.map((school, index) => (
                  <div key={school._id} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-400 mr-3">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{school.schoolName}</p>
                        <p className="text-sm text-gray-500">{school.schoolType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{school.eventCount} events</p>
                      <p className="text-sm text-gray-500">{school.totalRegistrations} registrations</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Admin Management</h3>
                <p className="text-gray-600 mt-2 mb-4">
                  Add and manage platform administrators.
                </p>
                <Button 
                  onClick={() => window.location.href = '/admin/manage-admins'}
                  className="w-full"
                >
                  Manage Admins
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">School Management</h3>
                <p className="text-gray-600 mt-2 mb-4">
                  Manage schools and their administrators.
                </p>
                <Button 
                  onClick={() => window.location.href = '/admin/schools'}
                  className="w-full"
                  variant="outline"
                >
                  Manage Schools
                </Button>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Event Management</h3>
                <p className="text-gray-600 mt-2 mb-4">
                  Create and manage platform events.
                </p>
                <Button 
                  onClick={() => window.location.href = '/admin/events'}
                  className="w-full"
                  variant="outline"
                >
                  Manage Events
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
