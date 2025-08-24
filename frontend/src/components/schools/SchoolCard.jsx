import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, CheckCircle, School, Globe } from 'lucide-react';
import Card from '../../components/ui/Card';

const SchoolCard = ({ school, viewMode = 'grid' }) => {
  const isGrid = viewMode === 'grid';

  return (
    <Link to={`/schools/${school._id}`} className="block">
      <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        isGrid ? 'h-full' : 'p-0'
      }`}>
        {isGrid ? (
          // Grid View
          <>
            {/* School Image/Header */}
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              {school.logo ? (
                <img 
                  src={school.logo} 
                  alt={school.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <School className="w-16 h-16 text-white opacity-80" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* School Type Badge */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-white capitalize">
                {school.type}
              </div>
              
              {/* Verification Badge */}
              {school.isVerified && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>

            {/* School Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {school.name}
              </h3>

              {/* Location */}
              {school.address && (
                <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {school.address.city}, {school.address.state}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {school.description || 'No description available.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {school.stats?.eventCount || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Events
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {school.stats?.studentCount || school.studentCount || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Students
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {school.contact?.website && (
                <div className="flex items-center space-x-2 mb-4 text-blue-600 dark:text-blue-400">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm truncate">
                    {school.contact.website.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          // List View
          <div className="flex p-6">
            {/* School Image */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex-shrink-0 relative mr-6">
              {school.logo ? (
                <img 
                  src={school.logo} 
                  alt={school.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <School className="w-8 h-8 text-white opacity-80" />
                </div>
              )}
              
              {school.isVerified && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* School Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {school.name}
                </h3>
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-white capitalize ml-4">
                  {school.type}
                </span>
              </div>

              {/* Location */}
              {school.address && (
                <div className="flex items-center space-x-2 mb-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {school.address.city}, {school.address.state}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {school.description || 'No description available.'}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{school.stats?.eventCount || 0} Events</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{school.stats?.studentCount || school.studentCount || 0} Students</span>
                </div>
                {school.contact?.website && (
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <Globe className="w-4 h-4" />
                    <span className="truncate">
                      {school.contact.website.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
};

export default SchoolCard;
