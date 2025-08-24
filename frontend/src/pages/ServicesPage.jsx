import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  MessageSquare,
  BarChart3,
  Shield
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: GraduationCap,
      title: 'For Students',
      description: 'Access to diverse educational events, workshops, and networking opportunities.',
      features: [
        'Browse and register for events',
        'Earn certificates and recognition',
        'Connect with industry professionals',
        'Track learning progress'
      ]
    },
    {
      icon: Users,
      title: 'For Schools',
      description: 'Comprehensive event management and student engagement platform.',
      features: [
        'Create and manage events',
        'Student registration tracking',
        'Analytics and reporting',
        'Speaker management'
      ]
    },
    {
      icon: Calendar,
      title: 'For Speakers',
      description: 'Share your expertise and connect with eager learners worldwide.',
      features: [
        'Apply for speaking opportunities',
        'Manage your schedule',
        'Receive feedback and ratings',
        'Build your professional network'
      ]
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Diverse Learning Content',
      description: 'Access workshops, seminars, and courses across various disciplines and skill levels.'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Learning',
      description: 'Engage in real-time discussions, Q&A sessions, and collaborative learning experiences.'
    },
    {
      icon: Award,
      title: 'Certification & Recognition',
      description: 'Earn certificates and badges to showcase your skills and achievements.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and progress reports.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and privacy are protected with enterprise-grade security measures.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with like-minded learners and build lasting professional relationships.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Comprehensive solutions designed for every member of the educational community
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Solutions for Every Role
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you're a student, educator, or institution, we have the tools and features you need to succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the powerful features that make EduEvents the leading educational platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Student',
                price: 'Free',
                description: 'Perfect for individual learners',
                features: [
                  'Access to public events',
                  'Basic profile',
                  'Event registration',
                  'Certificate downloads'
                ]
              },
              {
                name: 'School',
                price: '$99/month',
                description: 'Ideal for educational institutions',
                features: [
                  'Event creation and management',
                  'Student analytics',
                  'Custom branding',
                  'Priority support'
                ]
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: [
                  'All School features',
                  'Custom integrations',
                  'Dedicated support',
                  'Advanced analytics'
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg ${
                  index === 1 ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-2xl font-semibold transition-colors duration-200 ${
                  index === 1
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students, educators, and institutions already using EduEvents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
