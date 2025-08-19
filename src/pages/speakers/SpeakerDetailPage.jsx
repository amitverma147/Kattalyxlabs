import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Star, Award, Users, Mail, Globe, ArrowLeft, ExternalLink, Clock, BookOpen } from 'lucide-react';

const SpeakerDetailPage = () => {
    const { id } = useParams();

    // Mock speaker data - in real app, this would come from API
    const speaker = {
        id: id,
        name: 'Dr. Sarah Johnson',
        title: 'Senior Software Engineer',
        company: 'Google',
        location: 'San Francisco, California',
        email: 'sarah.johnson@google.com',
        website: 'https://sarahjohnson.dev',
        bio: 'Dr. Sarah Johnson is a Senior Software Engineer at Google with over 10 years of experience in web development and user experience design. She has worked on projects that impact millions of users worldwide.',
        longBio: `Dr. Sarah Johnson is a Senior Software Engineer at Google with over 10 years of experience in web development and user experience design. She has worked on projects that impact millions of users worldwide.

    Sarah specializes in frontend technologies, particularly React, JavaScript, and modern CSS. She has led teams in developing scalable web applications and has contributed to several open-source projects. Her expertise includes performance optimization, accessibility, and responsive design.

    Before joining Google, Sarah worked at Facebook and Twitter, where she gained extensive experience in building user-facing applications at scale. She holds a Ph.D. in Computer Science from Stanford University, where her research focused on human-computer interaction and user experience design.

    Sarah is passionate about mentoring junior developers and frequently speaks at conferences and workshops. She believes in the power of education and technology to create positive change in the world.`,
        expertise: [
            'Web Development',
            'JavaScript',
            'React',
            'UX Design',
            'Performance Optimization',
            'Accessibility',
            'Responsive Design',
            'Team Leadership'
        ],
        education: [
            {
                degree: 'Ph.D. in Computer Science',
                institution: 'Stanford University',
                year: '2018'
            },
            {
                degree: 'M.S. in Computer Science',
                institution: 'Stanford University',
                year: '2015'
            },
            {
                degree: 'B.S. in Computer Science',
                institution: 'UC Berkeley',
                year: '2013'
            }
        ],
        experience: [
            {
                position: 'Senior Software Engineer',
                company: 'Google',
                duration: '2020 - Present',
                description: 'Leading frontend development for Google\'s consumer products.'
            },
            {
                position: 'Software Engineer',
                company: 'Facebook',
                duration: '2018 - 2020',
                description: 'Developed user-facing features for Facebook\'s web platform.'
            },
            {
                position: 'Software Engineer',
                company: 'Twitter',
                duration: '2015 - 2018',
                description: 'Worked on Twitter\'s web interface and mobile web applications.'
            }
        ],
        eventsCount: 25,
        rating: 4.9,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
        verified: true,
        featured: true,
        languages: ['English', 'Spanish'],
        availability: 'Available for events worldwide',
        speakingFee: '$5,000 - $10,000',
        responseTime: 'Within 24 hours'
    };

    const events = [
        {
            id: 1,
            title: 'Web Development Workshop',
            date: '2024-02-15',
            time: '2:00 PM',
            location: 'MIT Campus',
            category: 'workshop',
            attendees: 45,
            maxAttendees: 50,
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'React Best Practices',
            date: '2024-01-20',
            time: '10:00 AM',
            location: 'Stanford University',
            category: 'seminar',
            attendees: 120,
            maxAttendees: 150,
            status: 'completed'
        },
        {
            id: 3,
            title: 'UX Design Principles',
            date: '2024-03-10',
            time: '9:00 AM',
            location: 'UC Berkeley',
            category: 'lecture',
            attendees: 200,
            maxAttendees: 250,
            status: 'upcoming'
        }
    ];

    const reviews = [
        {
            id: 1,
            user: 'Alex Thompson',
            rating: 5,
            comment: 'Dr. Johnson is an exceptional speaker with deep knowledge of web development. Her workshop was engaging and informative.',
            date: '2024-01-15',
            event: 'React Best Practices'
        },
        {
            id: 2,
            user: 'Maria Garcia',
            rating: 5,
            comment: 'Sarah\'s expertise in UX design is outstanding. She provided practical insights that I could immediately apply to my work.',
            date: '2024-01-10',
            event: 'UX Design Workshop'
        },
        {
            id: 3,
            user: 'David Chen',
            rating: 4,
            comment: 'Great presentation skills and very knowledgeable. Would definitely recommend for any web development event.',
            date: '2024-01-05',
            event: 'JavaScript Fundamentals'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Back Button */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Speakers</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Speaker Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start space-x-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex-shrink-0"></div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-3">
                                            {speaker.featured && (
                                                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                                                    Featured
                                                </span>
                                            )}
                                            {speaker.verified && (
                                                <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                                                    <Award className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                            {speaker.name}
                                        </h1>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium text-lg mb-3">
                                            {speaker.title} at {speaker.company}
                                        </p>
                                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{speaker.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span>{speaker.rating} ({speaker.reviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <a
                                        href={speaker.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span>Website</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Speaker Image */}
                            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500"></div>
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {speaker.eventsCount}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Events</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {speaker.rating}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {speaker.reviews}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {speaker.languages.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
                                </div>
                            </div>

                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {speaker.bio}
                            </p>
                        </motion.div>

                        {/* About This Speaker */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                About This Speaker
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                    {speaker.longBio}
                                </p>
                            </div>
                        </motion.div>

                        {/* Expertise */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Areas of Expertise
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {speaker.expertise.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-2xl text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Education & Experience */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Education
                                    </h3>
                                    <div className="space-y-4">
                                        {speaker.education.map((edu, index) => (
                                            <div key={index} className="border-l-4 border-purple-600 pl-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {edu.degree}
                                                </h4>
                                                <p className="text-purple-600 dark:text-purple-400 font-medium">
                                                    {edu.institution}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {edu.year}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Professional Experience
                                    </h3>
                                    <div className="space-y-4">
                                        {speaker.experience.map((exp, index) => (
                                            <div key={index} className="border-l-4 border-blue-600 pl-4">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {exp.position}
                                                </h4>
                                                <p className="text-blue-600 dark:text-blue-400 font-medium">
                                                    {exp.company}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    {exp.duration}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                                    View All Events
                                </button>
                            </div>
                            <div className="space-y-4">
                                {events.filter(event => event.status === 'upcoming').map((event) => (
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
                                                <span>{event.location}</span>
                                                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {event.attendees}/{event.maxAttendees}
                                            </div>
                                            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
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
                                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
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
                                                        className={`w-4 h-4 ${i < review.rating
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
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <span>{review.event}</span>
                                            <span>{new Date(review.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
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
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {speaker.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                                        <a
                                            href={speaker.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                                        >
                                            {speaker.website.replace('https://', '')}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {speaker.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Speaker Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Speaker Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Languages</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {speaker.languages.join(', ')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Availability</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {speaker.availability}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Speaking Fee</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {speaker.speakingFee}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {speaker.responseTime}
                                    </span>
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
                                Book This Speaker
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-200">
                                    Request Booking
                                </button>
                                <button className="w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200">
                                    Send Message
                                </button>
                                <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200">
                                    View Calendar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerDetailPage;
