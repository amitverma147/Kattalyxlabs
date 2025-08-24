import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Star, Filter, Award, Users, Globe } from 'lucide-react';

const SpeakersPage = () => {
  const speakers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      bio: 'Dr. Johnson has over 10 years of experience in web development and has worked on projects for major tech companies. She specializes in frontend technologies and user experience design.',
      expertise: ['Web Development', 'JavaScript', 'React', 'UX Design'],
      eventsCount: 25,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      featured: true,
      verified: true
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'Associate Professor',
      company: 'MIT',
      location: 'Cambridge, MA',
      bio: 'Professor Chen specializes in human-computer interaction and has published numerous papers on web accessibility and inclusive design.',
      expertise: ['HCI', 'Accessibility', 'Research', 'Education'],
      eventsCount: 18,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      featured: true,
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      bio: 'Dr. Rodriguez leads data science initiatives at Netflix, focusing on recommendation systems and user behavior analysis.',
      expertise: ['Data Science', 'Machine Learning', 'Python', 'Statistics'],
      eventsCount: 32,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      verified: true
    },
    {
      id: 4,
      name: 'Alex Thompson',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      bio: 'Alex has successfully launched multiple products and specializes in product strategy and user research.',
      expertise: ['Product Management', 'Strategy', 'User Research', 'Agile'],
      eventsCount: 15,
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      verified: true
    },
    {
      id: 5,
      name: 'Dr. Lisa Wang',
      title: 'Research Scientist',
      company: 'Stanford University',
      location: 'Stanford, CA',
      bio: 'Dr. Wang conducts cutting-edge research in artificial intelligence and has published extensively in top-tier conferences.',
      expertise: ['AI', 'Machine Learning', 'Research', 'Neural Networks'],
      eventsCount: 28,
      rating: 4.8,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      verified: true
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      bio: 'James has designed user experiences for millions of users and specializes in mobile app design and interaction design.',
      expertise: ['UX Design', 'Mobile Design', 'Interaction Design', 'Prototyping'],
      eventsCount: 22,
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      verified: true
    }
  ];

  const categories = ['All', 'Technology', 'Design', 'Data Science', 'Business', 'Education', 'Research'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            Expert Speakers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto"
          >
            Connect with industry leaders and academic experts
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
                placeholder="Search speakers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200">
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Speakers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Top-rated experts with exceptional speaking experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {speakers.filter(speaker => speaker.featured).map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* Speaker Header */}
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        {speaker.verified && (
                          <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {speaker.name}
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                        {speaker.title} at {speaker.company}
                      </p>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{speaker.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {speaker.rating} ({speaker.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {speaker.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {speaker.expertise.length > 3 && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                        +{speaker.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{speaker.eventsCount} events</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{speaker.reviews} reviews</span>
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-2xl transition-colors duration-200">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Speakers Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Speakers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our complete network of expert speakers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* Speaker Content */}
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {speaker.name}
                        </h3>
                        {speaker.verified && (
                          <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-1">
                        {speaker.title} at {speaker.company}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {speaker.rating} ({speaker.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {speaker.location}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {speaker.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {speaker.expertise.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {speaker.expertise.length > 2 && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                        +{speaker.expertise.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{speaker.eventsCount} events</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{speaker.reviews} reviews</span>
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-2xl transition-colors duration-200 text-sm">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-gray-800 border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200">
              Load More Speakers
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Speaker Network Statistics
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Our growing community of expert speakers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1,000+', label: 'Expert Speakers' },
              { number: '50+', label: 'Countries' },
              { number: '25,000+', label: 'Events Delivered' },
              { number: '4.8', label: 'Average Rating' }
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
                <div className="text-purple-100 text-lg">
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
              Want to Become a Speaker?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Share your expertise and inspire the next generation of learners. Join our network of expert speakers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-2xl transition-colors duration-200">
                Apply as Speaker
              </button>
              <button className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersPage;
