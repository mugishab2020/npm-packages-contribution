import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/checkout.css';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // example 10% tax
    const shippingFee = subtotal > 100 ? 0 : 10; // free shipping over $100

    const total = subtotal + tax + shippingFee;

    const handlePlaceOrder = () => {
        // You'd typically validate and send this info to your backend here
        alert('Order placed successfully!');
        clearCart();
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-container">
                <section className="cart-summary">
                    <h2>Cart Summary</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="summary-totals">
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax (10%): ${tax.toFixed(2)}</p>
                        <p>Shipping: ${shippingFee.toFixed(2)}</p>
                        <p><strong>Total: ${total.toFixed(2)}</strong></p>
                    </div>
                </section>

                <section className="shipping-payment">
                    <div className="shipping-form">
                        <h2>Shipping Information</h2>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={shippingInfo.fullName}
                            onChange={handleShippingChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={shippingInfo.address}
                            onChange={handleShippingChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={handleShippingChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            required
                        />
                    </div>

                    <div className="payment-form">
                        <h2>Payment Details</h2>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            maxLength={19}
                            required
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date (MM/YY)"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentChange}
                            maxLength={5}
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            maxLength={4}
                            required
                        />
                    </div>
                </section>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                Place Order
            </button>
        </div>
    );
};

export default CheckoutPage;
