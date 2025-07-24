import React, { createContext, useState, useContext } from 'react';
import axiosInstance from '../utils/AxiosInstance';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Track both email and role

    const login = async (email, password) => {

        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);

            setUser(user);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            return null;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
