import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboardView from '../components/AdminDashboardView';
import VendorDashboardView from '../components/VendorDashboardView';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            
            {/* If the user's role is ADMIN, show the AdminDashboardView */}
            {user?.role === 'ADMIN' && <AdminDashboardView />}
            
            {/* If the user's role is VENDOR, show the VendorDashboardView */}
            {user?.role === 'VENDOR' && <VendorDashboardView />}
            
            {/* A fallback message while the user object is loading */}
            {!user && <p>Loading user data...</p>}
        </div>
    );
};

export default DashboardPage;