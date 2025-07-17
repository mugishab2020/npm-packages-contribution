import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import '../styles/productsPage.css';

const allProducts = [
    {
        id: 1,
        name: 'Leather Bag',
        description: 'Stylish and durable leather bag.',
        price: 45,
        image: '/images/bag.jpg',
        category: 'Fashion',
        subcategory: 'Bags',
    },
    {
        id: 2,
        name: 'Air Max 270',
        description: 'Comfortable and stylish sneakers.',
        price: 75,
        image: '/images/shoes.jpg',
        category: 'Fashion',
        subcategory: 'Shoes',
    },
    {
        id: 3,
        name: 'Earbuds Pro',
        description: 'Noise-canceling wireless earbuds.',
        price: 30,
        image: '/images/earbuds.jpg',
        category: 'Electronics',
        subcategory: 'Audio',
    },
    // Add more as needed...
];

const ProductsPage = () => {
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const filteredProducts = selectedSubcategory
        ? allProducts.filter(product => product.subcategory === selectedSubcategory)
        : allProducts;

    return (
        <div className="products-page">
            <Sidebar onSelectSubcategory={setSelectedSubcategory} />
            <div className="products-container">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
