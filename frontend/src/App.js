import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ParcelsPage from './pages/ParcelsPage';
import Navbar from './components/Navbar';
import './App.css';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <main className="container">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/parcels" element={<ProtectedRoute><ParcelsPage /></ProtectedRoute>} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
}
export default App;