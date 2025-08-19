import { motion } from 'framer-motion';
import { Search, MapPin, Users, Calendar, Star, Filter } from 'lucide-react';

const SchoolsPage = () => {
  const schools = [
    {
      id: 1,
      name: 'Massachusetts Institute of Technology',
      type: 'University',
      location: 'Cambridge, MA',
      description: 'A world-renowned research university known for its cutting-edge technology and innovation programs.',
      eventsCount: 45,
      studentsCount: 11500,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      featured: true
    },
    {
      id: 2,
      name: 'Stanford University',
      type: 'University',
      location: 'Stanford, CA',
      description: 'Leading research institution with strong programs in computer science, engineering, and business.',
      eventsCount: 38,
      studentsCount: 17249,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
      featured: true
    },
    {
      id: 3,
      name: 'Harvard University',
      type: 'University',
      location: 'Cambridge, MA',
      description: 'One of the world\'s most prestigious universities with a rich history of academic excellence.',
      eventsCount: 52,
      studentsCount: 31220,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=400'
    },
    {
      id: 4,
      name: 'UC Berkeley',
      type: 'University',
      location: 'Berkeley, CA',
      description: 'Public research university known for its groundbreaking research and diverse student body.',
      eventsCount: 41,
      studentsCount: 42347,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400'
    },
    {
      id: 5,
      name: 'MIT Sloan School of Management',
      type: 'Business School',
      location: 'Cambridge, MA',
      description: 'Premier business school offering innovative programs in management and entrepreneurship.',
      eventsCount: 28,
      studentsCount: 1200,
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'
    },
    {
      id: 6,
      name: 'Stanford Graduate School of Business',
      type: 'Business School',
      location: 'Stanford, CA',
      description: 'Elite business school known for its innovative curriculum and strong alumni network.',
      eventsCount: 32,
      studentsCount: 2000,
      rating: 4.9,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400'
    }
  ];

  const types = ['All', 'University', 'College', 'Business School', 'Community College', 'High School'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            Partner Institutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto"
          >
            Discover educational institutions hosting events and programs
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search institutions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200">
                {types.map(type => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Top-rated educational institutions with exceptional event programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {schools.filter(school => school.featured).map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* School Image */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-white">
                    {school.type}
                  </div>
                </div>

                {/* School Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {school.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {school.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {school.location}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {school.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {school.eventsCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Events
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {school.studentsCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Students
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Schools Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our complete network of partner institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* School Image */}
                <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-900 dark:text-white">
                    {school.type}
                  </div>
                </div>

                {/* School Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {school.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {school.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {school.location}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {school.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{school.eventsCount} events</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{school.studentsCount.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-2xl transition-colors duration-200 text-sm">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-gray-800 border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200">
              Load More Institutions
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Our growing network of educational institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Partner Institutions' },
              { number: '10,000+', label: 'Events Hosted' },
              { number: '100,000+', label: 'Students Reached' },
              { number: '50+', label: 'Countries' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Want to Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our network of educational institutions and start hosting events that inspire and educate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl transition-colors duration-200">
                Become a Partner
              </button>
              <button className="border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SchoolsPage;
