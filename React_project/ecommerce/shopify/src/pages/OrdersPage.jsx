// src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ordersPage.css';

const mockOrders = [
    {
        id: 'ORD12345',
        date: '2025-07-01',
        status: 'Pending',
        total: 150.75,
        items: [
            { id: 1, name: 'Leather Bag', quantity: 1 },
            { id: 2, name: 'Air Max 270', quantity: 2 },
        ],
    },
    {
        id: 'ORD12346',
        date: '2025-07-10',
        status: 'Pending',
        total: 75.00,
        items: [
            { id: 3, name: 'Earbuds Pro', quantity: 1 },
        ],
    },
    {
        id: 'ORD12346',
        date: '2025-07-10',
        status: 'Delivering',
        total: 75.00,
        items: [
            { id: 3, name: 'Earbuds Pro', quantity: 1 },
        ],
    },
];

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            setOrders(mockOrders);
        }
    }, [user]);

    if (!user) {
        return <p>Please login to view your orders.</p>;
    }

    return (
        <div className="orders-page">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <span><strong>Order ID:</strong> {order.id}</span>
                                <span><strong>Date:</strong> {order.date}</span>
                                <span><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></span>
                            </div>
                            <div className="order-items">
                                <strong>Items:</strong>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id}>{item.name} x {item.quantity}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-total">
                                <strong>Total:</strong> {order.total.toFixed(2)} K rwf
                            </div>
                            {order.status.toLowerCase() === 'delivering' && (
                                <div className="received-button">
                                    <button className="done-btn" onClick={() => alert(`Order ${order.id} marked as received.`)}>
                                        Mark as Received
                                    </button>
                                </div>

                            )
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
