import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const EventRequestList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await axios.get('/event-requests', { params });
      setRequests(response.data.eventRequests || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load event requests');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleReview = async (requestId, status, comments = '') => {
    try {
      await axios.put(`/event-requests/${requestId}/review`, {
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
      case 'needs_revision': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'super_admin' ? 'All Event Requests' : 'My Event Requests'}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'super_admin' 
              ? 'Review and manage event requests from all schools'
              : 'Track your event request submissions and their status'
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
              <p className="text-gray-500 text-lg">No event requests found</p>
              {user?.role === 'school_admin' && (
                <Button 
                  onClick={() => window.location.href = '/admin/request-event'}
                  className="mt-4"
                >
                  Create Event Request
                </Button>
              )}
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request._id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(request.priority)}`} 
                           title={`${request.priority} priority`} />
                    </div>
                    <p className="text-gray-600 mb-2">{request.shortDescription}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>By: {request.requestedBy?.fullName}</span>
                      <span>School: {request.school?.name}</span>
                      <span>
                        Date: {new Date(request.proposedDate?.start).toLocaleDateString()}
                      </span>
                      <span>Capacity: {request.expectedCapacity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Event Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Category:</strong> {request.category}</p>
                      <p><strong>Type:</strong> {request.location?.type}</p>
                      <p><strong>Expected Speakers:</strong> {request.expectedSpeakers}</p>
                      <p><strong>Price:</strong> {request.isFree ? 'Free' : `$${request.proposedPrice}`}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Justification</h4>
                    <p className="text-sm text-gray-600">{request.justification}</p>
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
                        // View full details - could open a modal or navigate to detail page
                        console.log('View details:', request._id);
                      }}
                    >
                      View Details
                    </Button>
                    {user?.role === 'school_admin' && request.status === 'needs_revision' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Edit request
                          window.location.href = `/admin/edit-request/${request._id}`;
                        }}
                      >
                        Edit Request
                      </Button>
                    )}
                  </div>

                  {/* Super Admin Actions */}
                  {user?.role === 'super_admin' && request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const comments = prompt('Review comments (optional):');
                          handleReview(request._id, 'needs_revision', comments);
                        }}
                      >
                        Needs Revision
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

                  {/* Approved Event Link */}
                  {request.status === 'approved' && request.approvedEvent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.href = `/events/${request.approvedEvent._id}`;
                      }}
                    >
                      View Event
                    </Button>
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

export default EventRequestList;
