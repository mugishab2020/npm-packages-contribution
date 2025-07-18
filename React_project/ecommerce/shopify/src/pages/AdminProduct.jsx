import React, { useState } from 'react';
import '../styles/AdminProductPage.css';

const mockProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 49.99,
        category: 'Electronics',
        description: 'Noise-canceling over-ear headphones.',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Running Shoes',
        price: 79.99,
        category: 'Fashion',
        description: 'Lightweight and comfortable for runners.',
        image: 'https://via.placeholder.com/150',
    },
];

const AdminProductPage = () => {
    const [products, setProducts] = useState(mockProducts);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
    });

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        setProducts(products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p)));
        setShowEditModal(false);
    };

    const handleAddProduct = () => {
        const id = products.length + 1;
        setProducts([...products, { ...newProduct, id }]);
        setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
        setShowAddModal(false);
    };

    return (
        <div className="admin-container">
            <div className="header">
                <h2>Admin Products</h2>
                <button onClick={() => setShowAddModal(true)} className="add-btn">+ Add New Product</button>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="info">
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                            <p className="category">{product.category}</p>
                            <button onClick={() => handleEdit(product)} className="edit-btn">Edit product</button>
                            <button onClick={() => handleDelete(product)}>Delete Product</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Product</h3>
                        <input value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} placeholder="Name" />
                        <input value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} placeholder="Price" />
                        <input value={selectedProduct.category} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} placeholder="Category" />
                        <input value={selectedProduct.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} placeholder="Description" />
                        <input value={selectedProduct.image} onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })} placeholder="Image URL" />
                        <div className="modal-actions">
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setShowEditModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Product</h3>
                        <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Name" />
                        <input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" />
                        <input value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Category" />
                        <input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Description" />
                        <input value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="Image URL" />
                        <div className="modal-actions">
                            <button onClick={handleAddProduct}>Add</button>
                            <button onClick={() => setShowAddModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductPage;
