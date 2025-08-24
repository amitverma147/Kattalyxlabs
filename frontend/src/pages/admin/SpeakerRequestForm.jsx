import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SpeakerRequestForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    sessionType: 'workshop',
    duration: 60,
    targetAudience: '',
    expertise: [],
    equipment: [],
    travelRequired: false,
    accommodationRequired: false,
    speakerFee: {
      amount: 0,
      currency: 'USD'
    },
    additionalInfo: ''
  });

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [eventId, fetchEvent]);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await axios.get(`/events/${eventId}`);
      setEvent(response.data.event);
    } catch {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayInput = (name, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [name]: array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventId) {
      setError('Event ID is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const requestData = {
        ...formData,
        event: eventId
      };

      await axios.post('/speaker-requests', requestData);
      
      navigate('/dashboard', { 
        state: { 
          message: 'Speaker request submitted successfully! You will be notified of the status.' 
        }
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit speaker request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply as Speaker</h1>
          {event && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900">{event.title}</h2>
              <p className="text-blue-700 mt-1">
                {new Date(event.date?.start).toLocaleDateString()} - {event.location}
              </p>
              <p className="text-blue-600 mt-2">{event.description}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What will you speak about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type *
                </label>
                <select
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="workshop">Workshop</option>
                  <option value="keynote">Keynote</option>
                  <option value="panel">Panel Discussion</option>
                  <option value="presentation">Presentation</option>
                  <option value="seminar">Seminar</option>
                  <option value="demo">Demo</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your session in detail..."
                required
              />
            </div>

            {/* Duration and Target Audience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="15"
                  max="480"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Students, Faculty, Industry professionals"
                  required
                />
              </div>
            </div>

            {/* Expertise and Equipment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Expertise
                </label>
                <input
                  type="text"
                  value={formData.expertise.join(', ')}
                  onChange={(e) => handleArrayInput('expertise', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., AI, Machine Learning, Web Development (comma separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Needed
                </label>
                <input
                  type="text"
                  value={formData.equipment.join(', ')}
                  onChange={(e) => handleArrayInput('equipment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Projector, Microphone, Laptop (comma separated)"
                />
              </div>
            </div>

            {/* Travel and Accommodation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="travelRequired"
                  checked={formData.travelRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Travel assistance required
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="accommodationRequired"
                  checked={formData.accommodationRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Accommodation required
                </label>
              </div>
            </div>

            {/* Speaker Fee */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker Fee (Amount)
                </label>
                <input
                  type="number"
                  name="speakerFee.amount"
                  value={formData.speakerFee.amount}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0 for free sessions"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  name="speakerFee.currency"
                  value={formData.speakerFee.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="min-w-[120px]"
              >
                {submitting ? <LoadingSpinner size="sm" /> : 'Submit Application'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SpeakerRequestForm;
