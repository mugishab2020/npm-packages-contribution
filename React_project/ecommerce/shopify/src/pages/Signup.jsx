import React, { useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        countryCode: '+250', // Default to Rwanda
        phone: '',
        password: '',
        confirmPassword: '',
        age: '',
        address: '',
        gender: '',
        adminsecret: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        const fullPhone = `${form.countryCode}${form.phone}`;
        console.log('Full phone number:', fullPhone);
        try {
            const response = await axiosInstance.post('/auth/signup', {
                username: form.username,
                email: form.email,
                phone: fullPhone,
                address: form.address,
                age: form.age,
                password: form.password,
                gender: form.gender,
                adminSecret: form.adminsecret || undefined // optional if empty
            });

            alert(response.data.message);
            navigate('/login');
        } catch (err) {
            if (err.response) {
                const { error, errors } = err.response.data;
                if (error) {
                    setError(error);
                } else if (errors && errors.length > 0) {
                    setError(errors[0].msg);
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } else {
                setError("Network error. Please try again.");
            }
        }
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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '0.4rem 0.6rem',
                                width: '120px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '0.85rem',
                            }}
                        >
                            <option value="+250">🇷🇼 Rwanda (+250)</option>
                            <option value="+254">🇰🇪 Kenya (+254)</option>
                            <option value="+255">🇹🇿 Tanzania (+255)</option>
                            <option value="+256">🇺🇬 Uganda (+256)</option>
                            <option value="+27">🇿🇦 South Africa (+27)</option>
                            <option value="+1">🇺🇸 USA (+1)</option>
                        </select>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone (e.g. 788123456)"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            style={{ flex: 1 }}
                        />
                    </div>
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

                    <input
                        type='text'
                        name='age'
                        placeholder='Age'
                        value={form.age}
                        onChange={handleChange}
                        required
                    />
                    <br />


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
                    <input
                        type="text"
                        name="adminsecret"
                        placeholder="Admin Secret (if you want to be an admin)"
                        value={form.adminsecret}
                        onChange={handleChange}
                    />
                    <br />

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
