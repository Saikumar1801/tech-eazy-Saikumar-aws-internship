import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to={token ? "/dashboard" : "/"} className="brand">TechEazy OMS</Link>
            
            <div className="nav-links">
                {/* ADMIN Links */}
                {user?.role === 'ADMIN' && (
                    <>
                        <Link to="/dashboard">All Orders</Link>
                        <Link to="/parcels">Manage Parcels</Link>
                    </>
                )}
                {/* VENDOR Links */}
                {user?.role === 'VENDOR' && (
                    <Link to="/dashboard">My Delivery Orders</Link>
                )}
            </div>
            
            <div className="user-section">
                {token ? (
                    <>
                        <span className="welcome-msg">Welcome, {user?.username} ({user?.role})</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/tracking">Track Parcel</Link>
                        <Link to="/login" className="login-link">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;