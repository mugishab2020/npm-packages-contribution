// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/homepage.css';

export const products = [
    {
        id: 1,
        name: 'Smartphone',
        description: 'Fast, modern smartphone with great camera',
        price: 599.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 1,
        name: 'Smartphone',
        description: 'Fast, modern smartphone with great camera',
        price: 599.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 1,
        name: 'Smartphone',
        description: 'Fast, modern smartphone with great camera',
        price: 599.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 1,
        name: 'Smartphone',
        description: 'Fast, modern smartphone with great camera',
        price: 599.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 2,
        name: 'Leather Jacket',
        description: 'Stylish and comfortable',
        price: 89.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1531395021030-71f2db6c34e5?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 2,
        name: 'Leather Jacket',
        description: 'Stylish and comfortable',
        price: 89.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1531395021030-71f2db6c34e5?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 2,
        name: 'Leather Jacket',
        description: 'Stylish and comfortable',
        price: 89.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1531395021030-71f2db6c34e5?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 2,
        name: 'Leather Jacket',
        description: 'Stylish and comfortable',
        price: 89.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1531395021030-71f2db6c34e5?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 3,
        name: 'Wooden Table',
        description: 'Solid wood, handcrafted',
        price: 249.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1616627452168-42a98939a3df?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 3,
        name: 'Wooden Table',
        description: 'Solid wood, handcrafted',
        price: 249.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1616627452168-42a98939a3df?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 3,
        name: 'Wooden Table',
        description: 'Solid wood, handcrafted',
        price: 249.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1616627452168-42a98939a3df?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 3,
        name: 'Wooden Table',
        description: 'Solid wood, handcrafted',
        price: 249.99,
        category: 'Furniture',
        image: 'https://images.unsplash.com/photo-1616627452168-42a98939a3df?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 4,
        name: 'Drill Machine',
        description: 'Heavy-duty mechanical drill',
        price: 120.00,
        category: 'Mechanical Devices',
        image: 'https://images.unsplash.com/photo-1581090700227-1f6c985d91d2?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 4,
        name: 'Drill Machine',
        description: 'Heavy-duty mechanical drill',
        price: 120.00,
        category: 'Mechanical Devices',
        image: 'https://images.unsplash.com/photo-1581090700227-1f6c985d91d2?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 4,
        name: 'Drill Machine',
        description: 'Heavy-duty mechanical drill',
        price: 120.00,
        category: 'Mechanical Devices',
        image: 'https://images.unsplash.com/photo-1581090700227-1f6c985d91d2?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 5,
        name: 'Lipstick Set',
        description: 'Matte, long-lasting colors',
        price: 35.00,
        category: 'Beauty Products',
        image: 'https://images.unsplash.com/photo-1596464716121-9ecdf87b3f6d?auto=format&fit=crop&w=400&q=80',
    },
];
const heroImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486308510493-cb6f1f6fa7e3?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1499696012571-48fef32a3a4b?auto=format&fit=crop&w=1350&q=80',
];


const HomePage = () => {
    const categories = [...new Set(products.map(p => p.category))];


    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-page">
            <header className="hero-section">
                {heroImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="hero-background"
                        style={{
                            backgroundImage: `url(${img})`,
                            opacity: idx === currentHeroIndex ? 1 : 0,
                            zIndex: idx === currentHeroIndex ? 1 : 0,
                        }}
                    />
                ))}
                <div className="hero-content">
                    <h1>Shop the Latest Trends with Shopify</h1>
                    <p>Find the best deals on electronics, fashion, furniture, and more.</p>
                    <a href="/products" className="hero-btn">Shop Now</a>
                </div>
            </header>

            {categories.map(category => (
                <section key={category} className="category-section">
                    <h2>{category}</h2>
                    <div className="category-grid">
                        {products
                            .filter(p => p.category === category)
                            .map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default HomePage;
