import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/login.css";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password)
        if (user) {
            navigate(user.role === 'admin' ? '/services' : '/');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Welcome Back to Shopify</h1>
                <p>Access your dashboard or continue shopping!</p>
            </div>

            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>

                    <div className="signup-link">
                        Don’t have an account? <a href="/signup">Create one</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
