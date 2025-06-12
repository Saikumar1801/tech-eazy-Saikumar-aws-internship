import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiLogin } from '../services/api';

const AuthContext = createContext(null);

// Helper function to decode the JWT payload
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedJwt = parseJwt(token);
            if (decodedJwt && decodedJwt.roles) {
                // Extract the role (e.g., "ROLE_ADMIN" -> "ADMIN")
                const role = decodedJwt.roles[0]?.replace('ROLE_', '');
                setUser({
                    username: decodedJwt.sub,
                    role: role,
                });
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await apiLogin(username, password);
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            return true;
        } catch (error) {
            logout(); // Clear any invalid state
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    // Expose the user object along with the token and functions
    const value = { token, user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};