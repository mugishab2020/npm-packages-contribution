import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../utils/AxiosInstance';
import Loader from '../components/Loader';
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
                setProducts(response.data.Products.items || []);
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
        ? products.filter(product => product.SubCategory?.subcategory_name === selectedSubcategory)
        : products;

    console.log('Filtered Products:', filteredProducts);
    console.log('Selected Subcategory:', selectedSubcategory);
    console.log('All Products:', products);
    return (
        <div className="products-page">
            <Sidebar onSelectSubcategory={(sub) => setSelectedSubcategory(sub.subcategory_name)} />

            <div className="products-container">
                {loading && <Loader />}
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
