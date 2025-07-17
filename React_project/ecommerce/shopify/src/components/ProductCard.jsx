// src/components/ProductCard.js
import React from 'react';
import '../styles/productCard.css';

const ProductCard = ({ product }) => {
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
            <button className="add-btn">Add to Cart</button>
        </div>
    );
};

export default ProductCard;
