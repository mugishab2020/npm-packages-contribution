import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      setOrders(response.data.orders); // Adjust this if the key is different
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivering = async (orderId) => {
    try {
      const response = await axiosInstance.put(`/admin/update-order-status/${orderId}`, {
        status: 'Delivering',
      });

      // Update frontend state
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: 'Delivering' } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>All User Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orders-grid">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onMarkAsDelivering={handleMarkAsDelivering}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
