import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Settings, Bell, Shield, Bookmark, Star } from 'lucide-react';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        location: user?.location || '',
        skills: user?.skills || []
    });

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // const handleCancel = () => {
    //     setFormData({
    //         fullName: user?.fullName || '',
    //         email: user?.email || '',
    //         phone: user?.phone || '',
    //         bio: user?.bio || '',
    //         location: user?.location || '',
    //         skills: user?.skills || []
    //     });
    //     setIsEditing(false);
    // };

    const mockUserStats = {
        eventsAttended: 12,
        eventsHosted: 3,
        reviewsGiven: 8,
        averageRating: 4.8,
        memberSince: '2023-01-15'
    };

    const recentEvents = [
        {
            id: 1,
            title: 'Web Development Workshop',
            date: '2024-01-20',
            status: 'completed',
            rating: 5
        },
        {
            id: 2,
            title: 'Data Science Seminar',
            date: '2024-01-15',
            status: 'completed',
            rating: 4
        },
        {
            id: 3,
            title: 'AI in Education Conference',
            date: '2024-02-25',
            status: 'upcoming'
        }
    ];

    const upcomingEvents = [
        {
            id: 4,
            title: 'UX Design Principles',
            date: '2024-03-10',
            location: 'UC Berkeley'
        },
        {
            id: 5,
            title: 'Machine Learning Workshop',
            date: '2024-03-20',
            location: 'Stanford University'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex-shrink-0"></div>
                                        <button className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                                {user?.role}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {mockUserStats.averageRating} ({mockUserStats.reviewsGiven} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                            {user?.firstName} {user?.lastName}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Member since {new Date(mockUserStats.memberSince).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                        <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                                    </button>
                                    {isEditing && (
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* User Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {mockUserStats.eventsAttended}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Events Attended</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {mockUserStats.eventsHosted}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Events Hosted</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {mockUserStats.reviewsGiven}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Reviews Given</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {mockUserStats.averageRating}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Profile Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Profile Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.lastName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.location || 'Not provided'}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bio
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{user?.bio || 'No bio provided'}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Events */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Recent Events
                            </h2>
                            <div className="space-y-4">
                                {recentEvents.map((event) => (
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
                                                <span className={`px-2 py-1 rounded-full text-xs ${event.status === 'completed'
                                                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                                {event.rating && (
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                        <span>{event.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Upcoming Events */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Upcoming Events
                            </h2>
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
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
                                                <span>{event.location}</span>
                                                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs">
                                                    upcoming
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors duration-200">
                                    <Calendar className="w-5 h-5" />
                                    <span>Browse Events</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200">
                                    <Bookmark className="w-5 h-5" />
                                    <span>Saved Events</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-200">
                                    <Star className="w-5 h-5" />
                                    <span>My Reviews</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Account Settings */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Account Settings
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 px-3 rounded-2xl transition-colors duration-200">
                                    <Settings className="w-5 h-5" />
                                    <span>Preferences</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 px-3 rounded-2xl transition-colors duration-200">
                                    <Bell className="w-5 h-5" />
                                    <span>Notifications</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 px-3 rounded-2xl transition-colors duration-200">
                                    <Shield className="w-5 h-5" />
                                    <span>Privacy & Security</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Account Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Account Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {new Date(mockUserStats.memberSince).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                        Active
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Verification</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                        Verified
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Last Login</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Today
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
