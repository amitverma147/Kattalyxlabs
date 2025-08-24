import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'school_admin',
    schoolId: ''
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersResponse, schoolsResponse] = await Promise.all([
        axios.get('/admin/users'),
        axios.get('/admin/schools')
      ]);
      setUsers(usersResponse.data.users || []);
      setSchools(schoolsResponse.data.schools || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/create-admin', newAdminData);
      setShowAddAdmin(false);
      setNewAdminData({
        fullName: '',
        email: '',
        password: '',
        role: 'school_admin',
        schoolId: ''
      });
      fetchData(); // Refresh data
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create admin');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/admin/users/${userId}`);
        fetchData(); // Refresh data
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await axios.put(`/admin/users/${userId}/status`, { isActive: !isActive });
      fetchData(); // Refresh data
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'school_admin': return 'bg-blue-100 text-blue-800';
      case 'speaker': return 'bg-green-100 text-green-800';
      case 'attendee': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600 mt-2">Manage users, admins, and schools</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('schools')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schools'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Schools ({schools.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Statistics
              </button>
            </nav>
          </div>
        </div>

        {/* Add Admin Button */}
        {activeTab === 'users' && (
          <div className="mb-6">
            <Button onClick={() => setShowAddAdmin(true)}>
              Add New Admin
            </Button>
          </div>
        )}

        {/* Add Admin Form */}
        {showAddAdmin && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAdminData.fullName}
                  onChange={(e) => setNewAdminData({...newAdminData, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newAdminData.role}
                  onChange={(e) => setNewAdminData({...newAdminData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="school_admin">School Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              {newAdminData.role === 'school_admin' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School
                  </label>
                  <select
                    value={newAdminData.schoolId}
                    onChange={(e) => setNewAdminData({...newAdminData, schoolId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a school</option>
                    {schools.map(school => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit">Create Admin</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddAdmin(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {users.map((userItem) => (
              <Card key={userItem._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userItem.fullName}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userItem.role)}`}>
                        {userItem.role.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        userItem.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {userItem.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{userItem.email}</p>
                    <div className="text-sm text-gray-500">
                      <p>Joined: {new Date(userItem.createdAt).toLocaleDateString()}</p>
                      {userItem.school && (
                        <p>School: {userItem.school.name}</p>
                      )}
                      {userItem.lastLogin && (
                        <p>Last Login: {new Date(userItem.lastLogin).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleUserStatus(userItem._id, userItem.isActive)}
                      className={userItem.isActive ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'}
                    >
                      {userItem.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(userItem._id)}
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && (
          <div className="space-y-4">
            {schools.map((school) => (
              <Card key={school._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {school.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{school.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <p><strong>Address:</strong> {school.address}</p>
                        <p><strong>Phone:</strong> {school.phone}</p>
                        <p><strong>Email:</strong> {school.email}</p>
                      </div>
                      <div>
                        <p><strong>Type:</strong> {school.type}</p>
                        <p><strong>Established:</strong> {school.establishedYear}</p>
                        <p><strong>Students:</strong> {school.studentCount?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                    {school.admins && school.admins.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">Admins:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {school.admins.map((admin) => (
                            <span key={admin._id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                              {admin.fullName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.href = `/schools/${school._id}`;
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'super_admin').length}
              </h3>
              <p className="text-gray-600 mt-2">Super Admins</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600">
                {users.filter(u => u.role === 'school_admin').length}
              </h3>
              <p className="text-gray-600 mt-2">School Admins</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'speaker').length}
              </h3>
              <p className="text-gray-600 mt-2">Speakers</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-orange-600">
                {users.filter(u => u.role === 'attendee').length}
              </h3>
              <p className="text-gray-600 mt-2">Attendees</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-red-600">
                {schools.length}
              </h3>
              <p className="text-gray-600 mt-2">Total Schools</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-indigo-600">
                {users.filter(u => u.isActive).length}
              </h3>
              <p className="text-gray-600 mt-2">Active Users</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-600">
                {users.filter(u => !u.isActive).length}
              </h3>
              <p className="text-gray-600 mt-2">Inactive Users</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold text-teal-600">
                {schools.reduce((sum, school) => sum + (school.studentCount || 0), 0).toLocaleString()}
              </h3>
              <p className="text-gray-600 mt-2">Total Students</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
