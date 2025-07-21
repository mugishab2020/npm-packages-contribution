import React, { useState } from 'react';
import OrderCard from '../components/OrderCard';
import '../styles/AdminOrders.css';

const mockOrders = [
    {
        id: 1,
        customer: 'John Doe',
        productName: 'Laptop',
        price: 999.99,
        quantity: 1,
        status: 'Pending',
    },
    {
        id: 2,
        customer: 'Jane Smith',
        productName: 'Smartphone',
        price: 699.99,
        quantity: 2,
        status: 'pending',
    },
    {
        id: 2,
        customer: 'Jane Smith',
        productName: 'Smartphone',
        price: 699.99,
        quantity: 2,
        status: 'Delivering',
    },
];

const AdminOrders = () => {
    const [orders, setOrders] = useState(mockOrders);

    const handleMarkAsDelivering = (orderId) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: 'Delivering' } : order
        );
        setOrders(updatedOrders);
        // later: send update to backend
    };

    return (
        <div className="orders-container">
            <h2>All User Orders</h2>
            <div className="orders-grid">
                {orders.map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onMarkAsDelivering={handleMarkAsDelivering}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
