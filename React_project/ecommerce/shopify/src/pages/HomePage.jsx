import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/homepage.css';

const heroImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486308510493-cb6f1f6fa7e3?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1499696012571-48fef32a3a4b?auto=format&fit=crop&w=1350&q=80',
];

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products');
                setProducts(response.data.Products.items);
            } catch (err) {
                setError('Failed to load products.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Slower rotation
        return () => clearInterval(interval);
    }, []);

    const groupedByCategory = products.reduce((acc, product) => {
        const category = product.Category?.category_name || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

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

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : error ? (
                <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            ) : (
                Object.entries(groupedByCategory).map(([category, items]) => (
                    <section key={category} className="category-section">
                        <h2>{category}</h2>
                        <div className="category-grid">
                            {items.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
};

export default HomePage;
