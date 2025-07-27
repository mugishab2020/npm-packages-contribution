import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import axiosInstance from "../utils/AxiosInstance";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: "$0",
        totalCustomers: 0,
        totalProducts: 0,
    });

    const [categoryStats, setCategoryStats] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    ordersRes,
                    revenueRes,
                    customersRes,
                    productsRes,
                    categoryRes
                ] = await Promise.all([
                    axiosInstance.get('/admin/order_number'),
                    axiosInstance.get('/admin/revenue'),
                    axiosInstance.get('/admin/customernumber'),
                    axiosInstance.get('/admin/product_number'),
                    axiosInstance.get('/admin/category-stats')
                ]);

                setStats({
                    totalOrders: ordersRes.data.count,
                    totalRevenue: `${revenueRes.data.totalRevenue.total_revenue} rwf`,
                    totalCustomers: customersRes.data.count,
                    totalProducts: productsRes.data.count,
                });

                setCategoryStats(categoryRes.data.data);

            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const response = await axiosInstance.get('/admin/recent_orders');
                setRecentOrders(response.data.orders);
            } catch (error) {
                console.error('Failed to fetch recent orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentOrders();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="stats-grid">
                <StatCard type="orders" title="Total Orders" value={stats.totalOrders} />
                <StatCard type="revenue" title="Total Revenue" value={stats.totalRevenue} />
                <StatCard type="users" title="Total Customers" value={stats.totalCustomers} />
                <StatCard type="products" title="Total Products" value={stats.totalProducts} />
            </div>

            <div className="flex-row sales-stock-wrapper">
                <div className="sales-stat-container">
                    <SalesChart />
                </div>

                <div className="stock-by-category">
                    <h3>Stock by Category</h3>
                    <ul>
                        {categoryStats.map((item, index) => (
                            <li key={index}>
                                <span>{item.category}</span>
                                <span>{item.stock} in stock</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex-row category-order-wrapper">
                <div className="category-breakdown">
                    <h3>Revenue by Category</h3>
                    <ul className="category-list">
                        {categoryStats.map((item, index) => (
                            <li key={index}>
                                <span>{item.category}</span>
                                <span>{item.revenue}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-orders">
                    <h3>Recent Orders</h3>
                    <ul>
                        <li className="order-item order-header">
                            <span>Customer</span>
                            <span>Total</span>
                            <span>Date</span>
                            <span>Items</span>
                        </li>
                        {recentOrders.map((order, index) => (
                            <li key={index} className="order-item">
                                <span>{order.customer}</span>
                                <span>{order.total}</span>
                                <span>{order.date}</span>
                                <span>{order.itemNumber}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
