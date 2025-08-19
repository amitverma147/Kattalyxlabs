import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Calendar, Users } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 404 Number */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-9xl lg:text-[12rem] font-bold text-gray-200 dark:text-gray-700 mb-8"
                    >
                        404
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Page Not Found
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Link
                            to="/"
                            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200"
                        >
                            <Home className="w-5 h-5" />
                            <span>Go Home</span>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Go Back</span>
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            Popular Pages
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                to="/events"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl mb-4 mx-auto group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Browse Events
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Discover educational events and workshops
                                </p>
                            </Link>

                            <Link
                                to="/schools"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl mb-4 mx-auto group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors duration-200">
                                    <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Find Institutions
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Explore partner educational institutions
                                </p>
                            </Link>

                            <Link
                                to="/speakers"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-2xl mb-4 mx-auto group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-200">
                                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Expert Speakers
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Connect with industry leaders and experts
                                </p>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Help Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            Need Help?
                        </h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our support team is here to help you navigate the platform and find the information you need.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-2xl transition-colors duration-200"
                            >
                                Contact Support
                            </Link>
                            <Link
                                to="/about"
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-2xl transition-all duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
