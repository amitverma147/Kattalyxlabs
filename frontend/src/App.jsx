import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import EventsPage from './pages/events/EventsPage';
import EventDetailPage from './pages/events/EventDetailPage';
import SchoolsPage from './pages/schools/SchoolsPage';
import SchoolDetailPage from './pages/schools/SchoolDetailPage';
import SpeakersPage from './pages/speakers/SpeakersPage';
import SpeakerDetailPage from './pages/speakers/SpeakerDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import EventRequestForm from './pages/admin/EventRequestForm';
import EventRequestList from './pages/admin/EventRequestList';
import SpeakerRequestList from './pages/admin/SpeakerRequestList';
import SpeakerRequestForm from './pages/admin/SpeakerRequestForm';
import AdminManagement from './pages/admin/AdminManagement';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Public Event Routes */}
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventDetailPage />} />
                  
                  {/* Public School Routes */}
                  <Route path="/schools" element={<SchoolsPage />} />
                  <Route path="/schools/:id" element={<SchoolDetailPage />} />
                  
                  {/* Public Speaker Routes */}
                  <Route path="/speakers" element={<SpeakersPage />} />
                  <Route path="/speakers/:id" element={<SpeakerDetailPage />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard/*" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/request-event" 
                    element={
                      <ProtectedRoute allowedRoles={["school_admin"]}>
                        <EventRequestForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/my-requests" 
                    element={
                      <ProtectedRoute allowedRoles={["school_admin", "super_admin"]}>
                        <EventRequestList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/event-requests" 
                    element={
                      <ProtectedRoute allowedRoles={["super_admin"]}>
                        <EventRequestList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/speaker-requests" 
                    element={
                      <ProtectedRoute allowedRoles={["super_admin", "school_admin"]}>
                        <SpeakerRequestList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/events/:eventId/apply-speaker" 
                    element={
                      <ProtectedRoute allowedRoles={["speaker"]}>
                        <SpeakerRequestForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <ProtectedRoute allowedRoles={["super_admin"]}>
                        <AdminManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/manage" 
                    element={
                      <ProtectedRoute allowedRoles={["super_admin"]}>
                        <AdminManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
