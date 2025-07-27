import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/AdminProductPage.css';

const AdminProductPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProductModal, setNewProductModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        categoryId: '',    // Store category id
        subcategoryId: '', // Store subcategory id
        image: null,
        production_date: '',
        expiration_date: '',
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get('/admin/products');
            const items = res.data.Products.items;

            const mapped = items.map((product) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                production_date: product.production_date,
                expiration_date: product.expiration_date,
                discount: 0,
                category: product.Category?.category_name || 'Uncategorized',
                subcategory: product.SubCategory?.subcategory_name || '',
                image: null,
            }));

            setProducts(mapped);
        } catch (err) {
            console.error('Failed to fetch products:', err.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get('/admin/categories');
            const categories = res.data.categories.items;
            setCategories(categories);
        } catch (err) {
            console.error('Failed to fetch categories:', err.message);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            const res = await axiosInstance.get(`/admin/subcategories/${categoryId}`);
            const items = res.data.subcategories?.items || [];
            setSubcategories(items);
        } catch (err) {
            console.error('Failed to fetch subcategories:', err.message);
            setSubcategories([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'categoryId') {
            const selectedCategory = categories.find(cat => cat.id === value);
            if (selectedCategory) {
                fetchSubcategories(selectedCategory.id);
            } else {
                setSubcategories([]);
            }
            setFormData((prev) => ({
                ...prev,
                categoryId: value,
                subcategoryId: '', // Reset subcategory on category change
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const openEditModal = (product) => {
        // Map category and subcategory names to their ids for editing
        const categoryObj = categories.find(cat => cat.category_name === product.category);
        const subcategoryObj = subcategories.find(sub => sub.subcategory_name === product.subcategory);

        setFormData({
            ...product,
            categoryId: categoryObj ? categoryObj.id : '',
            subcategoryId: subcategoryObj ? subcategoryObj.id : '',
        });
        setEditingProduct(product);
    };

    const saveEditedProduct = async () => {
        try {
            const payload = {
                name: formData.name,
                price: formData.price,
                description: formData.description,
                categoryId: formData.categoryId,
                subcategoryId: formData.subcategoryId,
                production_date: formData.production_date || null,
                expiration_date: formData.expiration_date || null
            };

            const response = await axiosInstance.put(
                `/admin/edit-product/${editingProduct.id}`,
                payload
            );

            const updatedProduct = response.data.product;

            setProducts((prev) =>
                prev.map((prod) =>
                    prod.id === updatedProduct.id
                        ? {
                            ...prod,
                            ...updatedProduct,
                            category: categories.find(cat => cat.id === updatedProduct.categoryId)?.category_name || '',
                            subcategory: subcategories.find(sub => sub.id === updatedProduct.subcategoryId)?.subcategory_name || '',
                        }
                        : prod
                )
            );

            setEditingProduct(null);
            resetForm();
        } catch (error) {
            console.error('Failed to update product:', error.message);
        }
    };

    const addNewProduct = async () => {
        try {
            const payload = {
                name: formData.name,
                price: formData.price,
                description: formData.description,
                categoryId: formData.categoryId,
                subcategoryId: formData.subcategoryId,
                production_date: formData.production_date,
                expiration_date: formData.expiration_date,
            };

            const response = await axiosInstance.post('/admin/add-product', payload);
            const createdProduct = response.data.product;

            setProducts((prev) => [...prev, createdProduct]);

            resetForm();
            setNewProductModal(false);
        } catch (error) {
            console.error('Failed to add new product:', error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axiosInstance.delete(`/admin/delete-product/${id}`);

            setProducts((prev) => prev.filter((prod) => prod.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            discount: '',
            categoryId: '',
            subcategoryId: '',
            image: null,
            production_date: '',
            expiration_date: '',
        });
        setSubcategories([]);
    };

    // --- Modal JSX Generator ---
    const renderProductForm = (onSubmit, onCancel, title, isEdit = false) => (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{title}</h3>
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
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>

                {/* Show subcategory only if category is selected */}
                {formData.categoryId && (
                    <select
                        name="subcategoryId"
                        value={formData.subcategoryId}
                        onChange={handleInputChange}
                        disabled={!subcategories.length}
                    >
                        <option value="">-- Select Subcategory --</option>
                        {subcategories.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                                {sub.subcategory_name}
                            </option>
                        ))}
                    </select>
                )}

                <input type="file" name="image" onChange={handleInputChange} />

                <input
                    type="date"
                    name="production_date"
                    value={formData.production_date}
                    onChange={handleInputChange}
                    placeholder="Production Date"
                />
                <input
                    type="date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleInputChange}
                    placeholder="Expiration Date"
                />

                <div className="modal-actions">
                    <button onClick={onSubmit}>{isEdit ? 'Save' : 'Add'}</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="admin-product-container">
            <div className="header">
                <h2>Product Management</h2>
                <button className="add-btn" onClick={() => setNewProductModal(true)}>
                    + Add New Product
                </button>
            </div>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="card-img-placeholder">
                            {product.image ? (
                                <img src={URL.createObjectURL(product.image)} alt={product.name} />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>

                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <div className="info-row">
                                <strong>Description</strong>
                                <p>{product.description}</p>
                            </div>


                            <div className="info-row">
                                <strong>Price:</strong> {product.price} Rwf
                                {product.discount > 0 && (
                                    <span className="discount"> (−{product.discount}%)</span>
                                )}
                            </div>

                            <div className="info-row">
                                <strong>Stock:</strong> {product.stock || "N/A"}
                            </div>

                            <div className="info-row">
                                <strong>Category:</strong> {product.category}
                                {product.subcategory && ` → ${product.subcategory}`}
                            </div>

                            <div className="info-row">
                                <strong>Production Date:</strong>{" "}
                                {product.production_date
                                    ? new Date(product.production_date).toLocaleDateString()
                                    : "N/A"}
                            </div>

                            <div className="info-row">
                                <strong>Expiration Date:</strong>{" "}
                                {product.expiration_date
                                    ? new Date(product.expiration_date).toLocaleDateString()
                                    : "N/A"}
                            </div>
                        </div>

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

            {/* Modals */}
            {editingProduct &&
                renderProductForm(saveEditedProduct, () => setEditingProduct(null), 'Edit Product', true)}
            {newProductModal && renderProductForm(addNewProduct, () => setNewProductModal(false), 'Add New Product')}
        </div>
    );
};

export default AdminProductPage;
