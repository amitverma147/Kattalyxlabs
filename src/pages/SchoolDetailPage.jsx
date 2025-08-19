import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Calendar, Star, Phone, Mail, Globe, ArrowLeft, ExternalLink } from 'lucide-react';

const SchoolDetailPage = () => {
  const { id } = useParams();

  // Mock school data - in real app, this would come from API
  const school = {
    id: id,
    name: 'Massachusetts Institute of Technology',
    type: 'University',
    location: 'Cambridge, Massachusetts',
    address: '77 Massachusetts Ave, Cambridge, MA 02139',
    description: 'MIT is a world-renowned research university known for its cutting-edge technology and innovation programs. Founded in 1861, MIT has been at the forefront of scientific discovery and technological advancement.',
    longDescription: `The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has since played a key role in the development of many areas of modern technology and science.

    MIT is organized into five schools and one college, containing a total of 32 academic departments, with a strong emphasis on scientific and technological research. The Institute is traditionally known for its research and education in the physical sciences and engineering, and more recently in biology, economics, linguistics, and management as well.

    The "Engineers" sponsor 33 sports, most teams of which compete in the NCAA Division III's New England Women's and Men's Athletic Conference; the Division I rowing programs compete as part of the EARC and EAWRC.`,
    website: 'https://mit.edu',
    phone: '+1 (617) 253-1000',
    email: 'info@mit.edu',
    founded: 1861,
    studentsCount: 11500,
    facultyCount: 1000,
    eventsCount: 45,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100',
    departments: [
      'School of Architecture and Planning',
      'School of Engineering',
      'School of Humanities, Arts, and Social Sciences',
      'MIT Sloan School of Management',
      'School of Science'
    ],
    programs: [
      'Computer Science',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Physics',
      'Mathematics',
      'Biology',
      'Chemistry',
      'Economics'
    ],
    facilities: [
      'State-of-the-art research laboratories',
      'Innovation centers and maker spaces',
      'Modern lecture halls and classrooms',
      'Extensive library system',
      'Sports and recreation facilities',
      'Student housing and dining'
    ]
  };

  const events = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2024-02-15',
      time: '2:00 PM',
      category: 'workshop',
      attendees: 45,
      maxAttendees: 50
    },
    {
      id: 2,
      title: 'AI in Education Conference',
      date: '2024-02-25',
      time: '9:00 AM',
      category: 'conference',
      attendees: 300,
      maxAttendees: 400
    },
    {
      id: 3,
      title: 'Data Science Seminar',
      date: '2024-03-05',
      time: '10:00 AM',
      category: 'seminar',
      attendees: 120,
      maxAttendees: 150
    }
  ];

  const reviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Exceptional institution with world-class facilities and faculty. The events are always well-organized and informative.',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Michael Chen',
      rating: 5,
      comment: 'MIT consistently delivers high-quality educational events. The speakers are experts in their fields.',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Institutions</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* School Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                        {school.type}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {school.rating} ({school.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {school.name}
                    </h1>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{school.location}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* School Image */}
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* School Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {school.studentsCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {school.facultyCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Faculty</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {school.eventsCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {school.founded}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {school.description}
              </p>
            </motion.div>

            {/* About This Institution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                About This Institution
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {school.longDescription}
                </p>
              </div>
            </motion.div>

            {/* Departments and Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Schools & Departments
                  </h3>
                  <ul className="space-y-2">
                    {school.departments.map((dept, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{dept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Popular Programs
                  </h3>
                  <ul className="space-y-2">
                    {school.programs.map((program, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Facilities & Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {school.facilities.map((facility, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">{facility}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upcoming Events
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  View All Events
                </button>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                        <span>{event.time}</span>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {event.attendees}/{event.maxAttendees}
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Reviews
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  Write a Review
                </button>
              </div>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.user}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {review.comment}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-6"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {school.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {school.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {school.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                    <a 
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {school.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Institution Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Founded</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{school.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{school.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Faculty</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{school.facultyCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Events</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{school.eventsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{school.rating}/5</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Get Involved
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-200">
                  View All Events
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200">
                  Contact Institution
                </button>
                <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200">
                  Follow Updates
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
