import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../utils/AxiosInstance";
import "../styles/SalesChart.css";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SalesChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchWeeklyStats = async () => {
            try {
                const res = await axiosInstance.get("/admin/weekly-stats");
                const apiData = res.data.data;

                // Initializing data with all weekdays set to 0
                const weeklyData = weekDays.map(day => ({
                    name: day,
                    sales: 0,
                }));
                // Aggregating sales data for each weekday
                apiData.forEach(entry => {
                    const index = weekDays.findIndex(d => d === entry.name);
                    if (index !== -1) {
                        weeklyData[index].sales += entry.sales;
                    }
                });

                setChartData(weeklyData);
            } catch (err) {
                console.error("Failed to fetch weekly stats:", err.message);
            }
        };

        fetchWeeklyStats();
    }, []);

    return (
        <div className="sales-chart-container">
            <h2 className="sales-chart-title">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
