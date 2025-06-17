import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await auth.login(username, password);
        if (success) { navigate('/dashboard'); } else { setError('Invalid username or password.'); }
    };
    return (
        <div>
            <h2>Vendor Login</h2>
            <form onSubmit={handleSubmit} className="form-card">
                <div><label>Username:</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} required /></div>
                <div><label>Password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginPage;