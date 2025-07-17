import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { FaHome, FaBoxOpen, FaTachometerAlt, FaConciergeBell } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';


import '../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    Shop<span className="ify">ify</span>
                </Link>
            </div>

            <div className="nav-right">
                <ul className="nav-links">
                    <li><Link to="/"> <FaHome className="nav-icon" />Home</Link></li>
                    <li><Link to="/products"> <FaBoxOpen className="nav-icon" />Products</Link></li>
                    {user?.role === 'admin' ? (
                        <li><Link to="/dashboard"> <FaTachometerAlt className="nav-icon" />Dashboard</Link></li>
                    ) : (
                        <li><Link to="/services"> <FaConciergeBell className="nav-icon" />Services</Link></li>
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
                    <Link to="/cart" className="cart-link">
                        <FaShoppingCart className="cart-icon" />
                        {user && (
                            <span className="cart-count">
                                {cartItems.length || 0}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="profile-section">
                            {user.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt="profile"
                                    className="profile-pic"
                                />
                            ) : (
                                <FaUserCircle className="default-icon" />
                            )}

                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="login-link">
                            <FaUserCircle className="default-icon" />
                            <button>
                                Login
                            </button>

                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
