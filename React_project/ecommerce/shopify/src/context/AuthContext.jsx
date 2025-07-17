import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Track both email and role

    const login = (email, password) => {
        if (email === 'admin@shop.com' && password === 'admin123') {
            const adminUser = { email, role: 'admin' };
            setUser(adminUser);
            return adminUser;
        } else if (email === 'user@shop.com' && password === 'user123') {
            const normalUser = { email, role: 'user' };
            setUser(normalUser);
            return normalUser;
        } else {
            return null;
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
