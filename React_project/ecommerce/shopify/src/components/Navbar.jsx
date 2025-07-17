import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // clear auth context
        navigate('/login'); // redirect to login
    };

    return (
        <nav className="navbar">
            <div className="logo">Logo</div>
            <ul className="navlinks">
                <li className="link-item"><Link to="/">Home</Link></li>
                <li className="link-item"><Link to="/products">Products</Link></li>

                {user ? (
                    user.role === 'admin' ? (
                        <li className="link-item"><Link to="/dashboard">Dashboard</Link></li>
                    ) : (
                        <li className="link-item"><Link to="/services">Services</Link></li>
                    )
                ) : (
                    <li className="link-item"><Link to="/services">Services</Link></li>
                )}

                {user ? (
                    <li className="link-item">
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </li>
                ) : (
                    <li className="link-item"><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
