import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login'); };
    return (
        <nav className="navbar">
            <Link to={token ? "/dashboard" : "/"} className="brand">TechEazy OMS</Link>
            <div className="nav-links">
                {token && (
                    <>
                        <Link to="/dashboard">Delivery Orders</Link>
                        <Link to="/parcels">Parcels</Link>
                    </>
                )}
            </div>
            <div>
                {token ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
            </div>
        </nav>
    );
};
export default Navbar;