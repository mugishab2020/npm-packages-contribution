import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import Loader from '../components/Loader';
import '../styles/ProfilePage.css'; // Make sure this path matches your project

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axiosInstance
            .get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error('Unauthorized:', err);
                localStorage.removeItem('token');
                navigate('/login');
            });
    }, [navigate]);

    if (!user) return <div className="loader"><Loader /></div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profile</h2>
                <p>View all your profile details here.</p>
            </div>

            <div className="profile-content">
                <div className="profile-left">
                    <h3>{user.username}</h3>
                    <div className="avatar-wrapper">
                        <img
                            src={user.avatar || "https://via.placeholder.com/150"}
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                        <label htmlFor="avatar-upload" className="camera-icon">
                            <img src="/icons/camera.png" alt="Upload" />
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                        />
                    </div>

                    <span className="badge-role">{user.role === 'admin' ? 'Admin' : 'Premium User'}</span>
                </div>
                <div className="profile-info">
                    <div className="profile-right">
                        <h4>Bio & Other Details</h4>
                        <div className="profile-grid">
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Phone:</strong> {user.phone}</div>
                            <div><strong>Age:</strong> {user.age}</div>
                            <div><strong>Role:</strong> {user.role}</div>
                            <div><strong>Status:</strong> <span className="status">Available</span></div>
                        </div>
                    </div>
                    <div className="edit-button">
                        <button className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>

            </div>


            <div className="links">
                <h3>Social Media</h3>
                <div className="icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/linkedin.png" alt="LinkedIn" />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
