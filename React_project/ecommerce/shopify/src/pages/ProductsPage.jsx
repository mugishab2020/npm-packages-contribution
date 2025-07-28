import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/productsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products');
                setProducts(response.data.Products.items || []); // adjust key based on actual API response
            } catch (err) {
                setError('Failed to load products.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedSubcategory
        ? products.filter(product => product.subcategory === selectedSubcategory)
        : products;

    return (
        <div className="products-page">
            <Sidebar onSelectSubcategory={setSelectedSubcategory} />
            <div className="products-container">
                {loading && <p>Loading products...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && filteredProducts.length === 0 && (
                    <p>No products found in this subcategory.</p>
                )}
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
