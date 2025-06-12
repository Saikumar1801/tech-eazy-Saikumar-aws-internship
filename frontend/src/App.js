import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ParcelsPage from './pages/ParcelsPage';
import PublicTrackingPage from './pages/PublicTrackingPage';
import Navbar from './components/Navbar';
import './App.css';

// This component now checks for a token and an optional requiredRole
const ProtectedRoute = ({ children, requiredRole }) => {
    const { token, user } = useAuth();

    // 1. If no token, always redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. If a role is required, check if the user has that role
    if (requiredRole && user?.role !== requiredRole) {
        // User is logged in but doesn't have the right role, send them to the dashboard
        return <Navigate to="/dashboard" replace />;
    }
    
    // 3. If all checks pass, render the component
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <main className="container">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/tracking" element={<PublicTrackingPage />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        
                        {/* Admin-Only Protected Route */}
                        <Route
                            path="/parcels"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <ParcelsPage />
                                </ProtectedRoute>
                            }
                        />
                        
                        {/* Default route */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
}

export default App;