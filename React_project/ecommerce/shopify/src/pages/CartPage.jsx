import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cartpage.css';

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart, clearCart } = useCart();

    if (cartItems.length === 0) {
        return <div className="cart-empty">🛒 Your cart is empty</div>;
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Cart</h2>
            <ul className="cart-list">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div className="item-info">
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-description">{item.description}</p>
                            <div className="price-quantity">
                                <span className="unit-price">{item.price.toFixed(2)}K rwf</span>
                                <span className="quantity">Qty: {item.quantity}</span>
                                <span className="subtotal">
                                    Subtotal: {(item.price * item.quantity).toFixed(2)} K rwf
                                </span>
                            </div>
                        </div>
                        <div className="item-actions">
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="remove-button"
                                aria-label={`Remove one ${item.name}`}
                            >
                                -
                            </button>
                            <button
                                onClick={() => addToCart(item)}
                                className="add-button"
                                aria-label={`Add one more ${item.name}`}
                            >
                                +
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">Total: {total.toFixed(2)}K rwf</div>
            <button
                onClick={clearCart}
                className="clear-cart-button"
            >
                Clear Cart
            </button>
            <button
                className="checkout-button"
                onClick={() => alert('Checkout not implemented yet!')}
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartPage;
