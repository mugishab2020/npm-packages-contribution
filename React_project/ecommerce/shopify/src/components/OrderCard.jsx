import React from 'react';
import '../styles/OrderCard.css';

const OrderCard = ({ order, onMarkAsDelivering }) => {
    return (
        <div className="order-card">
            <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>

            <div className="order-body">
                <img src={order.productImage} alt={order.productName} className="product-image" />
                <div className="order-info">
                    <h4>{order.products}</h4>
                    <p><strong>Price:</strong> ${order.total_cost}</p>

                    <p><strong>Customer:</strong> {order.User.username}</p>
                </div>
            </div>

            {order.status.toLowerCase() === 'pending' && (
                <button className="done-btn" onClick={() => onMarkAsDelivering(order.id)}>
                    Mark as Delivering
                </button>
            )}
        </div>
    );
};

export default OrderCard;
