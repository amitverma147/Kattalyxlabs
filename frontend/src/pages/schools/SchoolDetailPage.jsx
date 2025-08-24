import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle, 
  School,
  ArrowLeft,
  ExternalLink,
  Building,
  GraduationCap
} from 'lucide-react';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SchoolDetailPage = () => {
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch school details
        const schoolResponse = await axios.get(`/schools/${id}`);
        setSchool(schoolResponse.data);
        
        // Fetch school events
        const eventsResponse = await axios.get(`/schools/${id}/events`);
        setEvents(eventsResponse.data.events || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching school details:', err);
        setError('Failed to load school details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchoolDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <School className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {error || 'School Not Found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The school you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/schools">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Schools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <Link 
            to="/schools" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Schools</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* School Logo */}
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {school.logo ? (
                <img 
                  src={school.logo} 
                  alt={school.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <School className="w-16 h-16 text-white/60" />
              )}
            </div>

            {/* School Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {school.name}
                </h1>
                {school.isVerified && (
                  <div className="bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium capitalize">
                  {school.type}
                </span>
                {school.address && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{school.address.city}, {school.address.state}</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-white/90 max-w-3xl">
                {school.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  About {school.name}
                </h2>
                
                {/* Facilities */}
                {school.facilities && school.facilities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Facilities
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {school.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {facility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Programs */}
                {school.programs && school.programs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Programs Offered
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {school.programs.map((program, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {program}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Events Section */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upcoming Events
                  </h2>
                  <Link to={`/schools/${school._id}/events`}>
                    <Button variant="outline" size="sm">
                      View All
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{event.attendees?.length || 0} attending</span>
                              </div>
                            </div>
                          </div>
                          <Link to={`/events/${event._id}`}>
                            <Button size="sm">View</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No upcoming events at this time.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {school.contact?.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a 
                        href={`mailto:${school.contact.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {school.contact.email}
                      </a>
                    </div>
                  )}
                  
                  {school.contact?.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a 
                        href={`tel:${school.contact.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {school.contact.phone}
                      </a>
                    </div>
                  )}
                  
                  {school.contact?.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a 
                        href={school.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{school.contact.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </Card>

              {/* Address */}
              {school.address && (
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Address
                  </h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="text-gray-700 dark:text-gray-300">
                      <div>{school.address.street}</div>
                      <div>{school.address.city}, {school.address.state}</div>
                      <div>{school.address.country} - {school.address.zipCode}</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Quick Stats */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Events Hosted</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {school.stats?.eventCount || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Students</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {school.stats?.studentCount || school.studentCount || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Established</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {school.establishedYear || 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolDetailPage;
