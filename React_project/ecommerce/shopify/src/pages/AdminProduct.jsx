import React, { useState } from 'react';
import '../styles/AdminProductPage.css';

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];

const initialProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 3,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 4,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 5,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 6,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
    {
        id: 7,
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise cancellation',
        price: 79.99,
        discount: 0,
        category: 'Electronics',
        image: null,
    },
];

const AdminProductPage = () => {
    const [products, setProducts] = useState(initialProducts);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProductModal, setNewProductModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        category: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData(product);
    };

    const saveEditedProduct = () => {
        setProducts((prev) =>
            prev.map((prod) =>
                prod.id === editingProduct.id ? { ...formData, id: prod.id } : prod
            )
        );
        setEditingProduct(null);
    };

    const addNewProduct = () => {
        const newProduct = {
            ...formData,
            id: products.length + 1,
        };
        setProducts([...products, newProduct]);
        setFormData({
            name: '',
            description: '',
            price: '',
            discount: '',
            category: '',
            image: null,
        });
        setNewProductModal(false);
    };

    const handleDelete = (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
        }
    };
    return (
        <div className="admin-product-container">
            <div className="header">
                <h2>Product Management</h2>
                <button className="add-btn" onClick={() => setNewProductModal(true)}>
                    + Add New Product
                </button>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="card-img-placeholder">
                            {product.image ? (
                                <img
                                    src={URL.createObjectURL(product.image)}
                                    alt={product.name}
                                />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <h3>{product.name}</h3>
                        <p className="desc">{product.description}</p>
                        <p className="price">
                            ${product.price}
                            {product.discount > 0 && (
                                <span className="discount"> (−{product.discount}%)</span>
                            )}
                        </p>
                        <p className="category">Category: {product.category}</p>
                        <div className="btn-group">
                            <button className="edit-btn" onClick={() => openEditModal(product)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Product</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="discount"
                            placeholder="Discount %"
                            value={formData.discount}
                            onChange={handleInputChange}
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                        <input type="file" name="image" onChange={handleInputChange} />
                        <div className="modal-actions">
                            <button onClick={saveEditedProduct}>Save</button>
                            <button onClick={() => setEditingProduct(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New Product Modal */}
            {newProductModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Product</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="discount"
                            placeholder="Discount %"
                            value={formData.discount}
                            onChange={handleInputChange}
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                        <input type="file" name="image" onChange={handleInputChange} />
                        <div className="modal-actions">
                            <button onClick={addNewProduct}>Add</button>
                            <button onClick={() => setNewProductModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductPage;
