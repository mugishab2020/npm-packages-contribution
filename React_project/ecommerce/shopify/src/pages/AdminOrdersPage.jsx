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
      const items = response.data.Orders?.items || [];
      setOrders(items);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivering = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/update-order-status/${orderId}`, {
        status: 'Delivering',
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'Delivering' } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status to Delivering:', error);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axiosInstance.put(`/admin/update-order-status/${orderId}`, {
        status: 'Delivered',
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'Delivered' } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status to Delivered:', error);
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
      ) : !Array.isArray(orders) || orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onMarkAsDelivering={handleMarkAsDelivering}
              onMarkAsDelivered={handleMarkAsDelivered}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
