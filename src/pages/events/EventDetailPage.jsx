import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Star, Share2, Bookmark, ArrowLeft } from 'lucide-react';

const EventDetailPage = () => {
  const { id } = useParams();

  // Mock event data - in real app, this would come from API
  const event = {
    id: id,
    title: 'Web Development Workshop',
    description: 'Join us for an intensive hands-on workshop where you\'ll learn modern web development techniques using the latest technologies. This workshop is designed for both beginners and intermediate developers who want to enhance their skills.',
    longDescription: `This comprehensive workshop covers everything from HTML5 and CSS3 fundamentals to advanced JavaScript concepts and modern frameworks. You'll work on real-world projects and learn best practices for responsive design, performance optimization, and deployment.

    What you'll learn:
    • Modern HTML5 semantic markup
    • CSS3 with Flexbox and Grid
    • JavaScript ES6+ features
    • React.js fundamentals
    • Responsive design principles
    • Performance optimization techniques
    • Deployment strategies

    Prerequisites:
    • Basic computer literacy
    • Familiarity with any programming language (helpful but not required)
    • Laptop with code editor installed`,
    date: '2024-02-15',
    time: '2:00 PM - 6:00 PM',
    location: 'MIT Campus, Building 10, Room 101',
    category: 'workshop',
    attendees: 45,
    maxAttendees: 50,
    price: 0,
    organizer: 'MIT Computer Science Department',
    speakers: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        title: 'Senior Software Engineer',
        company: 'Google',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        bio: 'Dr. Johnson has over 10 years of experience in web development and has worked on projects for major tech companies.'
      },
      {
        id: 2,
        name: 'Prof. Michael Chen',
        title: 'Associate Professor',
        company: 'MIT',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        bio: 'Professor Chen specializes in human-computer interaction and has published numerous papers on web accessibility.'
      }
    ],
    requirements: [
      'Laptop with code editor (VS Code recommended)',
      'Basic understanding of programming concepts',
      'Stable internet connection',
      'GitHub account (free)'
    ],
    materials: [
      'Course materials will be provided digitally',
      'Access to online resources and documentation',
      'Certificate of completion',
      'Networking opportunities with industry professionals'
    ],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    averageRating: 4.8,
    totalRatings: 127,
    tags: ['Web Development', 'JavaScript', 'React', 'CSS', 'HTML'],
    registrationDeadline: '2024-02-10'
  };

  const reviews = [
    {
      id: 1,
      user: 'Alex Thompson',
      rating: 5,
      comment: 'Excellent workshop! The instructors were knowledgeable and the hands-on projects really helped solidify the concepts.',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Maria Garcia',
      rating: 4,
      comment: 'Great content and well-organized. Would have liked more time for the advanced topics.',
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
            <span>Back to Events</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.averageRating} ({event.totalRatings} reviews)
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Event Image */}
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.attendees}/{event.maxAttendees} registered
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration Deadline</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About This Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                About This Event
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {event.longDescription}
                </p>
              </div>
            </motion.div>

            {/* Speakers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Speakers
              </h2>
              <div className="space-y-6">
                {event.speakers.map((speaker, index) => (
                  <div key={speaker.id} className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {speaker.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {speaker.title} at {speaker.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements & Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    What You'll Get
                  </h3>
                  <ul className="space-y-2">
                    {event.materials.map((material, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-6"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {event.attendees}/{event.maxAttendees} spots filled
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 mb-4">
                Register Now
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200">
                Add to Calendar
              </button>
            </motion.div>

            {/* Organizer Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Organized by
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {event.organizer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Educational Institution
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
