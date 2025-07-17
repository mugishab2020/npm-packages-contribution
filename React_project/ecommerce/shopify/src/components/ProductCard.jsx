import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ product }) => {

  

    const { cartItems, addToCart } = useCart();

    const handleAddToCart = () => {


        const existingItem = cartItems.find(item => item.id === product.id);
        addToCart(product);
        if (existingItem) {
            toast.success(`${product.name} quantity increased!`);
        } else {
            toast.success(`${product.name} added to cart!`);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">{product.price}K rwf</p>
            </div>
            <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
