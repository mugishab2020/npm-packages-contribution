import React from "react";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
    const stats = {
        totalOrders: 124,
        totalRevenue: "$15,230",
        totalCustomers: 89,
        totalProducts: 45,
    };

    const categoryRevenue = [
        { category: "Electronics", revenue: "$5,000" },
        { category: "Clothing", revenue: "$3,200" },
        { category: "Home Decor", revenue: "$2,150" },
        { category: "Books", revenue: "$1,800" },
    ];

    const stockByCategory = [
        { category: "Electronics", stock: 32 },
        { category: "Clothing", stock: 57 },
        { category: "Home Decor", stock: 28 },
        { category: "Books", stock: 13 },
    ];

    const recentOrders = [
        { id: "#001", customer: "Alice", total: "$150", date: "2025-07-15", itemNumber: "4" },
        { id: "#002", customer: "Bob", total: "$320", date: "2025-07-15", itemNumber: "4" },
        { id: "#003", customer: "Clara", total: "$200", date: "2025-07-14", itemNumber: "4" },
        { id: "#004", customer: "David", total: "$410", date: "2025-07-14", itemNumber: "4" },
        { id: "#005", customer: "Eva", total: "$90", date: "2025-07-13", itemNumber: "4" },
    ];

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
                        {stockByCategory.map((item, index) => (
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
                        {categoryRevenue.map((item, index) => (
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
