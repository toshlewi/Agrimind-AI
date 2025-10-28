import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FarmRecords from './pages/FarmRecords';
import Sustainability from './pages/Sustainability';
import Analytics from './pages/Analytics';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-agri-green-50 bg-farm-pattern">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-agri-green-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-agri-green-200 border-t-agri-green-500 rounded-full mx-auto mb-4"
        />
        <p className="text-agri-green-600">Loading AgriMind AI...</p>
      </div>
    </div>
  );
};

// Route Wrapper Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};

// Page Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Fixed Animated Route Component
const AnimatedRoute = ({ children, routeKey }) => {
  return (
    <motion.div
      key={routeKey}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Main App Content with Routing
function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AnimatedRoute routeKey="landing">
                  <Landing />
                </AnimatedRoute>
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <AnimatedRoute routeKey="login">
                  <Login />
                </AnimatedRoute>
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <AnimatedRoute routeKey="signup">
                  <Signup />
                </AnimatedRoute>
              </PublicRoute>
            } 
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="dashboard">
                    <Dashboard />
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/records" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="records">
                    <FarmRecords />
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/sustainability" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="sustainability">
                    <Sustainability />
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="analytics">
                    <Analytics />
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />

          {/* Additional Protected Routes */}
          <Route 
            path="/crops" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="crops">
                    <div className="p-8">
                      <h1 className="text-3xl font-bold text-agri-green-800">Crop Management</h1>
                      <p className="text-agri-green-600 mt-2">Coming soon - Advanced crop management features</p>
                    </div>
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/weather" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="weather">
                    <div className="p-8">
                      <h1 className="text-3xl font-bold text-agri-green-800">Weather Analytics</h1>
                      <p className="text-agri-green-600 mt-2">Coming soon - Detailed weather insights</p>
                    </div>
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />

          {/* Settings Route */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnimatedRoute routeKey="settings">
                    <div className="p-8">
                      <h1 className="text-3xl font-bold text-agri-green-800">Settings</h1>
                      <p className="text-agri-green-600 mt-2">Account and application settings</p>
                    </div>
                  </AnimatedRoute>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />

          {/* Redirect routes */}
          <Route 
            path="/home" 
            element={<Navigate to="/" replace />} 
          />
          
          <Route 
            path="/register" 
            element={<Navigate to="/signup" replace />} 
          />
          
          <Route 
            path="/profile" 
            element={<Navigate to="/dashboard" replace />} 
          />

          {/* 404 Page */}
          <Route 
            path="*" 
            element={
              isAuthenticated ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <AnimatedRoute routeKey="404-auth">
                      <div className="p-8 text-center">
                        <h1 className="text-4xl font-bold text-agri-green-800 mb-4">404 - Page Not Found</h1>
                        <p className="text-agri-green-600 mb-6">The page you're looking for doesn't exist.</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.history.back()}
                          className="agri-button"
                        >
                          Go Back
                        </motion.button>
                      </div>
                    </AnimatedRoute>
                  </DashboardLayout>
                </ProtectedRoute>
              ) : (
                <PublicRoute>
                  <AnimatedRoute routeKey="404-public">
                    <div className="min-h-screen bg-agri-green-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-agri-green-800 mb-4">404 - Page Not Found</h1>
                        <p className="text-agri-green-600 mb-6">The page you're looking for doesn't exist.</p>
                        <div className="space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.back()}
                            className="agri-button"
                          >
                            Go Back
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/'}
                            className="agri-button-secondary"
                          >
                            Go Home
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </AnimatedRoute>
                </PublicRoute>
              )
            } 
          />
        </Routes>
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2E7D32',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#FFD700',
              secondary: '#2E7D32',
            },
          },
          error: {
            style: {
              background: '#DC2626',
              color: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;