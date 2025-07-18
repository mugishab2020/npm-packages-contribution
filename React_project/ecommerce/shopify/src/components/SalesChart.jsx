// components/SalesChart.jsx
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/SalesChart.css";

const dummyData = [
    { name: "Mon", sales: 120 },
    { name: "Tue", sales: 210 },
    { name: "Wed", sales: 150 },
    { name: "Thu", sales: 80 },
    { name: "Fri", sales: 300 },
    { name: "Sat", sales: 400 },
    { name: "Sun", sales: 250 },
];

const SalesChart = () => (
    <div className="sales-chart-container">
        <h2 className="sales-chart-title">Weekly Sales</h2>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dummyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default SalesChart;
