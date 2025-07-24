import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import Loader from '../components/Loader';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // ✅ Fetch user profile from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile');
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setFormData(user); // reset edits if canceled
        setMessage('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Save updates to backend
    const handleSave = async () => {
        try {
            const response = await axiosInstance.put('/user/profile', formData);
            setUser(response.data);
            setMessage('Profile updated successfully.');
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage('Error updating profile.');
        }
    };

    if (loading) return <div><Loader /></div>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {message && <p className="message">{message}</p>}

            <div className="profile-info">
                <div className="profile-field">
                    <label>Username:</label>
                    <span>{user.username}</span>
                </div>

                <div className="profile-field">
                    <label>Email:</label>
                    <span>{user.email}</span>
                </div>

                <div className="profile-field">
                    <label>Phone:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{user.phone}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Address:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{user.address}</span>
                    )}
                </div>

                <div className="button-group">
                    <button onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    {isEditing && (
                        <button className="save-btn" onClick={handleSave}>
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
