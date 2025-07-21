import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSearch, FaHome, FaBoxOpen, FaTachometerAlt, FaConciergeBell, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import {
    FaUserCog,
    FaQuestionCircle,
    FaEye,
    FaSignOutAlt
} from 'react-icons/fa';

import '../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src="/Shopify-logo.png" alt="Shopify Logo" className="logo-img" />
                </Link>
            </div>

            <div className="nav-right">
                <ul className="nav-links">
                    {user?.role === 'admin' ? (
                        <li>
                            <Link to="/dashboard">
                                <FaTachometerAlt className="nav-icon" />Dashboard
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/">
                                <FaHome className="nav-icon" />Home
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link to={user?.role === 'admin' ? '/admin/product' : '/products'}>
                            <FaBoxOpen className="nav-icon" />Products
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link to={user?.role === 'admin' ? '/admin/orders' : '/orders'}>
                                <FaClipboardList className="nav-icon" />Orders
                            </Link>
                        </li>
                    )}
                    {user?.role !== 'admin' && (
                        <li>
                            <Link to="/services">
                                <FaConciergeBell className="nav-icon" />Services
                            </Link>
                        </li>
                    )}
                </ul>


                <div className="search-profile">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    {user?.role !== 'admin' && (
                        <Link to="/cart" className="cart-link">
                            <FaShoppingCart className="cart-icon" />
                            <span className="cart-count">{cartItems.length || 0}</span>
                        </Link>
                    )}
                    {user ? (
                        <div className="profile-section">
                            <div className="profile-icon-wrapper" onClick={toggleDropdown}>
                                {user.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt="profile"
                                        className="profile-pic"
                                    />
                                ) : (
                                    <FaUserCircle className="default-icon" />
                                )}
                            </div>

                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <Link to="profile" className="dropdown-item">
                                        <FaUserCircle className="dropdown-icon" />
                                        Profile settings
                                    </Link>
                                    <Link to="/settings" className="dropdown-item">
                                        <FaUserCog className="dropdown-icon" />
                                        Settings & Privacy
                                    </Link>
                                    <Link to="/support" className="dropdown-item">
                                        <FaQuestionCircle className="dropdown-icon" />
                                        Help & Support
                                    </Link>
                                    <Link to="/accessibility" className="dropdown-item">
                                        <FaEye className="dropdown-icon" />
                                        Display & Accessibility
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item logout">
                                        <FaSignOutAlt className="dropdown-icon" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-link">
                            <FaUserCircle className="default-icon" />
                            <button>Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
