import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  GraduationCap, 
  Settings, 
  BarChart3,
  BookOpen,
  MessageSquare,
  Award
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SuperAdminDashboard from './SuperAdminDashboard';
import SchoolAdminDashboard from './SchoolAdminDashboard';

// Placeholder dashboard components
const StudentDashboard = () => {
  const stats = [
    { title: 'Events Attended', value: '12', icon: Calendar, color: 'blue' },
    { title: 'Certificates Earned', value: '8', icon: Award, color: 'green' },
    { title: 'Connections Made', value: '45', icon: Users, color: 'purple' },
    { title: 'Hours Learned', value: '120', icon: BookOpen, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Student Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your learning progress and upcoming events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Web Development Workshop</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tomorrow at 2:00 PM</p>
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Data Science Seminar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Friday at 10:00 AM</p>
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Completed AI Fundamentals Course</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Registered for Machine Learning Workshop</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Earned Python Programming Certificate</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const SpeakerDashboard = () => {
  const stats = [
    { title: 'Events Spoken At', value: '8', icon: Calendar, color: 'blue' },
    { title: 'Total Attendees', value: '450', icon: Users, color: 'green' },
    { title: 'Average Rating', value: '4.8', icon: Award, color: 'yellow' },
    { title: 'Upcoming Events', value: '3', icon: MessageSquare, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Speaker Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your speaking engagements and track your impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Speaking Engagements
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Advanced React Patterns</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">MIT - Tomorrow at 3:00 PM</p>
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Cloud Architecture Best Practices</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stanford - Friday at 11:00 AM</p>
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Feedback
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">"Excellent presentation on React Hooks"</p>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">- Sarah Johnson, MIT</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">"Very informative and well-structured"</p>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">- Mike Chen, UC Berkeley</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'speaker':
        return <SpeakerDashboard />;
      case 'school_admin':
        return <SchoolAdminDashboard />;
      case 'super_admin':
        return <SuperAdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={getDashboardComponent()} />
          <Route path="/events" element={<div>Events Management</div>} />
          <Route path="/users" element={<div>User Management</div>} />
          <Route path="/analytics" element={<div>Analytics</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
