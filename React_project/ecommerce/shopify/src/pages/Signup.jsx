import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        age: '',
        address: '',
        gender: '',
        role: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        // TODO: send form to backend
        setError('');
        alert('Account created! Please log in.');
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Create Account</h1>
                <p>Join us to enjoy the best shopping experience!</p>
            </div>
            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Sign Up</h2>
                    {error && <p className="error">{error}</p>}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.9rem', margin: '0.6rem 0', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1rem' }}
                    >
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <select
                        value={form.role}
                        onChange={handleChange}
                        name='role'
                        required
                        style={{ padding: '0.9rem', margin: '0.6rem 0', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1rem' }}
                    >
                        <option value="" disabled>Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>

                    <div className="signup-link">
                        Already have an account? <a href="/login">Login here</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
