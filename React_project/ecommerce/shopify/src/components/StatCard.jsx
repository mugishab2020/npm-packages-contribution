// components/StatCard.jsx
import React from "react";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import "../styles/StatCard.css";

const icons = {
    orders: <ShoppingCart color="#3b82f6" size={24} />,
    users: <Users color="#10b981" size={24} />,
    products: <Package color="#8b5cf6" size={24} />,
    revenue: <DollarSign color="#eab308" size={24} />,
};

const StatCard = ({ type, title, value }) => {
    return (
        <div className="stat-card">
            <div className="stat-icon">
                {icons[type]}
            </div>
            <div className="stat-text">
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
