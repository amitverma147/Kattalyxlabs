import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SpeakerRequestList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await axios.get('/speaker-requests', { params });
      setRequests(response.data.speakerRequests || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load speaker requests');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleReview = async (requestId, status, comments = '') => {
    try {
      await axios.put(`/speaker-requests/${requestId}/review`, {
        status,
        reviewComments: comments
      });
      fetchRequests(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to review request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waitlisted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'speaker' ? 'My Speaker Applications' : 'Speaker Requests'}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'speaker' 
              ? 'Track your speaker applications and their status'
              : 'Review speaker applications for events'
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'approved' ? 'primary' : 'outline'}
              onClick={() => setFilter('approved')}
            >
              Approved
            </Button>
            <Button
              variant={filter === 'rejected' ? 'primary' : 'outline'}
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </Button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500 text-lg">No speaker requests found</p>
              {user?.role === 'speaker' && (
                <Button 
                  onClick={() => window.location.href = '/events'}
                  className="mt-4"
                >
                  Browse Events to Apply
                </Button>
              )}
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request._id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {request.topic}
                    </h3>
                    <p className="text-gray-600 mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Speaker: {request.speaker?.fullName}</span>
                      <span>Event: {request.event?.title}</span>
                      <span>Session Type: {request.sessionType}</span>
                      <span>Duration: {request.duration} minutes</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Target Audience:</strong> {request.targetAudience}</p>
                      <p><strong>Expertise:</strong> {request.expertise?.join(', ')}</p>
                      {request.equipment?.length > 0 && (
                        <p><strong>Equipment Needed:</strong> {request.equipment.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Speaker Info</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Travel Required:</strong> {request.travelRequired ? 'Yes' : 'No'}</p>
                      <p><strong>Accommodation:</strong> {request.accommodationRequired ? 'Yes' : 'No'}</p>
                      {request.speakerFee?.amount > 0 && (
                        <p><strong>Fee:</strong> ${request.speakerFee.amount} {request.speakerFee.currency}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Review Comments */}
                {request.reviewComments && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Review Comments</h4>
                    <p className="text-sm text-gray-600">{request.reviewComments}</p>
                    {request.reviewedBy && (
                      <p className="text-xs text-gray-500 mt-2">
                        Reviewed by {request.reviewedBy.fullName} on{' '}
                        {new Date(request.reviewDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.href = `/events/${request.event?._id}`;
                      }}
                    >
                      View Event
                    </Button>
                    {user?.role === 'speaker' && request.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Edit request
                          console.log('Edit request:', request._id);
                        }}
                      >
                        Edit Application
                      </Button>
                    )}
                  </div>

                  {/* Event Organizer/Super Admin Actions */}
                  {(['super_admin', 'school_admin'].includes(user?.role)) && request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const comments = prompt('Waitlist reason (optional):');
                          handleReview(request._id, 'waitlisted', comments);
                        }}
                        className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        Waitlist
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const comments = prompt('Rejection reason:');
                          if (comments) {
                            handleReview(request._id, 'rejected', comments);
                          }
                        }}
                        className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const comments = prompt('Approval comments (optional):');
                          handleReview(request._id, 'approved', comments || 'Approved');
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerRequestList;
