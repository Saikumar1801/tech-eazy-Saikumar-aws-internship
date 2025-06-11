import React, { createContext, useState, useContext } from 'react';
import { apiLogin } from '../services/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const login = async (username, password) => {
        try {
            const response = await apiLogin(username, password);
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            return true;
        } catch (error) { logout(); return false; }
    };
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };
    return (<AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>);
};
export const useAuth = () => useContext(AuthContext);