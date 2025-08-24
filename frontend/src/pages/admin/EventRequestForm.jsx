import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const EventRequestForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'workshop',
    tags: '',
    proposedDate: {
      start: '',
      end: ''
    },
    location: {
      type: 'physical',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      },
      virtualLink: '',
      room: ''
    },
    expectedCapacity: '',
    isFree: true,
    proposedPrice: 0,
    requirements: '',
    expectedSpeakers: 1,
    justification: '',
    targetAudience: '',
    expectedOutcomes: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'proposedDate') {
        setFormData(prev => ({
          ...prev,
          proposedDate: {
            ...prev.proposedDate,
            [child]: value
          }
        }));
      } else if (parent === 'location') {
        if (child === 'address') {
          // Handle nested address fields
          return;
        }
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            [child]: value
          }
        }));
      }
    } else if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: {
            ...prev.location.address,
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Process form data
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        expectedCapacity: parseInt(formData.expectedCapacity),
        expectedSpeakers: parseInt(formData.expectedSpeakers),
        proposedPrice: parseFloat(formData.proposedPrice)
      };

      await axios.post('/event-requests', submitData);
      setSuccess('Event request submitted successfully! You will be notified once it\'s reviewed.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        category: 'workshop',
        tags: '',
        proposedDate: { start: '', end: '' },
        location: {
          type: 'physical',
          address: { street: '', city: '', state: '', country: '', zipCode: '' },
          virtualLink: '',
          room: ''
        },
        expectedCapacity: '',
        isFree: true,
        proposedPrice: 0,
        requirements: '',
        expectedSpeakers: 1,
        justification: '',
        targetAudience: '',
        expectedOutcomes: '',
        priority: 'medium'
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit event request');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'school_admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only school administrators can request events.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request New Event</h1>
          <p className="text-gray-600 mt-2">
            Submit an event proposal for your school. It will be reviewed by the super admin.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="lecture">Lecture</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="competition">Competition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  maxLength={200}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description (200 characters max)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed description of the event"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Date and Time */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Date and Time</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="proposedDate.start"
                  value={formData.proposedDate.start}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="proposedDate.end"
                  value={formData.proposedDate.end}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="location.type"
                  value={formData.location.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="physical">Physical</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {(formData.location.type === 'physical' || formData.location.type === 'hybrid') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.location.address.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.location.address.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room/Venue
                    </label>
                    <input
                      type="text"
                      name="location.room"
                      value={formData.location.room}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {(formData.location.type === 'virtual' || formData.location.type === 'hybrid') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Virtual Meeting Link
                  </label>
                  <input
                    type="url"
                    name="location.virtualLink"
                    value={formData.location.virtualLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Event Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Capacity *
                </label>
                <input
                  type="number"
                  name="expectedCapacity"
                  value={formData.expectedCapacity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Number of Speakers
                </label>
                <input
                  type="number"
                  name="expectedSpeakers"
                  value={formData.expectedSpeakers}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Free Event</span>
                </label>
              </div>

              {!formData.isFree && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposed Ticket Price
                  </label>
                  <input
                    type="number"
                    name="proposedPrice"
                    value={formData.proposedPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Justification *
                </label>
                <textarea
                  name="justification"
                  value={formData.justification}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain why this event is important for your school"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <textarea
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the intended audience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Outcomes
                </label>
                <textarea
                  name="expectedOutcomes"
                  value={formData.expectedOutcomes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What do you hope to achieve with this event?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List any special requirements (one per line)"
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRequestForm;
