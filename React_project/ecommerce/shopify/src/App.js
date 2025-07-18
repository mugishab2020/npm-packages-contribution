import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // 👈 import
import 'react-toastify/dist/ReactToastify.css';   // 👈 import styles

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import SignupPage from './pages/Signup';
import ServicesPage from './pages/Services';
import CartPage from './pages/CartPage';

import "./App.css"
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminProductPage from './pages/AdminProduct';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path="/admin/product" element={<AdminProductPage />} />
            <Route
              path="/dashboard"
              element={
                  <DashboardPage />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </div>
  );
}
export default App;
