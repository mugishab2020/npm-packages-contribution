import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/AdminProductPage.css';

const availableIcons = [
    { value: 'FaPumpSoap', label: 'Beauty Product' },
    { value: 'FaShirt', label: 'Fashion' },
    { value: 'FaLaptop', label: 'Electronics' },
    { value: 'FaCogs', label: 'Mechanical' },
    { value: 'FaHamburger', label: 'Food & Drinks' },
    { value: 'FaSoap', label: 'Hygiene' },
    { value: 'FaCouch', label: 'Furniture' },
];

const AdminProductPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProductModal, setNewProductModal] = useState(false);


    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    // Product form data
    const [formData, setFormData] = useState({
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

    // New category form data
    const [newCategoryModal, setNewCategoryModal] = useState(false);
    const [newSubCategoryModal, setNewSubCategoryModal] = useState(false);

    const [categoryForm, setCategoryForm] = useState({
        category_name: '',
        icon: '',
    });

    const [subcategoryForm, setSubcategoryForm] = useState({
        subcategory_name: '',
        categoryId: '',
    });

    // Fetch products and categories on mount
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
            const selectedCategory = categories.find((cat) => cat.id === value);
            if (selectedCategory) {
                fetchSubcategories(selectedCategory.id);
            } else {
                setSubcategories([]);
            }
            setFormData((prev) => ({
                ...prev,
                categoryId: value,
                subcategoryId: '',
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setSubcategoryForm((prev) => ({ ...prev, [name]: value }));
    };
    // Open edit modal and fetch subcategories for that product's category
    const openEditModal = (product) => {
        const categoryObj = categories.find((cat) => cat.category_name === product.category);
        const categoryId = categoryObj ? categoryObj.id : '';
        if (categoryId) {
            fetchSubcategories(categoryId);
        } else {
            setSubcategories([]);
        }

        const subcategoryObj = subcategories.find((sub) => sub.subcategory_name === product.subcategory);

        setFormData({
            ...product,
            categoryId: categoryId,
            subcategoryId: subcategoryObj ? subcategoryObj.id : '',
            discount: product.discount || '',
            image: null,
        });
        setEditingProduct(product);
    };

    const saveEditedProduct = async () => {
        try {
            const payload = {
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                categoryId: formData.categoryId,
                subcategoryId: formData.subcategoryId,
                production_date: formData.production_date || null,
                expiration_date: formData.expiration_date || null,
            };

            const response = await axiosInstance.put(`/admin/edit-product/${editingProduct.id}`, payload);

            const updatedProduct = response.data.product;

            setProducts((prev) =>
                prev.map((prod) =>
                    prod.id === updatedProduct.id
                        ? {
                            ...prod,
                            ...updatedProduct,
                            category:
                                categories.find((cat) => cat.id === updatedProduct.categoryId)
                                    ?.category_name || '',
                            subcategory:
                                subcategories.find((sub) => sub.id === updatedProduct.subcategoryId)
                                    ?.subcategory_name || '',
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
                price: Number(formData.price),
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
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axiosInstance.delete(`/admin/delete-product/${id}`);

            setProducts((prev) => prev.filter((prod) => prod.id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error.message);
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

    const createCategory = async () => {
        if (!categoryForm.category_name || !categoryForm.icon) return;

        try {
            const payload = {
                category_name:
                    categoryForm.category_name.charAt(0).toUpperCase() +
                    categoryForm.category_name.slice(1),
                icon: categoryForm.icon,
            };

            const response = await axiosInstance.post('/admin/add-category', payload);
            const newCategory = response.data.category;
            setCategories((prev) => [...prev, newCategory]);
            setCategoryForm({ category_name: '', icon: '' });
            setNewCategoryModal(false);
        } catch (error) {
            console.error('Failed to create category:', error.message);
        }
    };


    const createSubCategory = async () => {
        if (!subcategoryForm.subcategory_name || !subcategoryForm.categoryId) return;

        try {
            const payload = {
                subcategory_name:
                    subcategoryForm.subcategory_name.charAt(0).toUpperCase() +
                    subcategoryForm.subcategory_name.slice(1),
                categoryId: subcategoryForm.categoryId,
            };

            const response = await axiosInstance.post('/admin/add-subcategory', payload);
            const newSubcategory = response.data.subcategory;
            setSubcategories((prev) => [...prev, newSubcategory]);
            setSubcategoryForm({ subcategory_name: '', categoryId: '' });
            setNewSubCategoryModal(false);
        } catch (error) {
            console.error('Failed to create subcategory:', error.message);
        }
    };
    // Product add/edit form modal
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
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                />
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount %"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                />
                <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>

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
                    <button onClick={onSubmit} disabled={!formData.name || !formData.price || !formData.categoryId}>
                        {isEdit ? 'Save' : 'Add'}
                    </button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );

    // Category creation modal with icon preview
    const renderCategoryModal = () => {
        const IconComponent = FaIcons[categoryForm.icon];
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Add New Category</h3>
                    <input
                        type="text"
                        name="category_name"
                        placeholder="Category Name"
                        value={categoryForm.category_name}
                        onChange={handleCategoryInputChange}
                        required
                    />

                    <label htmlFor="icon-select" style={{ marginTop: '1rem', display: 'block' }}>
                        Select Icon:
                    </label>

                    <select id="icon-select" name="icon" value={categoryForm.icon} onChange={handleCategoryInputChange} required>
                        <option value="">-- Select Icon --</option>
                        {availableIcons.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    {categoryForm.icon && IconComponent && (
                        <div
                            style={{
                                marginTop: '1rem',
                                fontSize: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <IconComponent />
                            <span>Selected Icon Preview</span>
                        </div>
                    )}

                    <div className="modal-actions" style={{ marginTop: '1rem' }}>
                        <button
                            onClick={createCategory}
                            disabled={!categoryForm.category_name || !categoryForm.icon}
                        >
                            Create
                        </button>
                        <button onClick={() => setNewCategoryModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };
    const renderSubCategoryModal = () => (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Add New SubCategory</h3>
                <label>Select Category:</label>
                <select
                    name="categoryId"
                    value={subcategoryForm.categoryId}
                    onChange={handleSubCategoryInputChange}
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="subcategory_name"
                    placeholder="Subcategory Name"
                    value={subcategoryForm.subcategory_name}
                    onChange={handleSubCategoryInputChange}
                />

                <div className="modal-actions">
                    <button
                        onClick={createSubCategory}
                        disabled={!subcategoryForm.subcategory_name || !subcategoryForm.categoryId}
                    >
                        Create
                    </button>
                    <button onClick={() => setNewSubCategoryModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="admin-product-container">
            <div className="header">
                <h2>Product Management</h2>

                <div className="buttonsection">
                    <button
                        className="add-btn"
                        onClick={() => setNewCategoryModal(true)}
                        style={{ marginRight: '10px' }}
                    >
                        + Add New Category
                    </button>
                    <button
                        className="add-btn"
                        onClick={() => setNewSubCategoryModal(true)}
                        style={{ marginRight: '10px' }}
                    >
                        + Add New SubCategory
                    </button>
                    <button className="add-btn" onClick={() => setNewProductModal(true)}>
                        + Add New Product
                    </button>
                </div>
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
                                {product.discount > 0 && <span className="discount"> (−{product.discount}%)</span>}
                            </div>

                            <div className="info-row">
                                <strong>Stock:</strong> {product.stock || 'N/A'}
                            </div>

                            <div className="info-row">
                                <strong>Category:</strong> {product.category}
                                {product.subcategory && ` → ${product.subcategory}`}
                            </div>

                            <div className="info-row">
                                <strong>Production Date:</strong>{' '}
                                {product.production_date
                                    ? new Date(product.production_date).toLocaleDateString()
                                    : 'N/A'}
                            </div>

                            <div className="info-row">
                                <strong>Expiration Date:</strong>{' '}
                                {product.expiration_date
                                    ? new Date(product.expiration_date).toLocaleDateString()
                                    : 'N/A'}
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
                renderProductForm(
                    saveEditedProduct,
                    () => setEditingProduct(null),
                    'Edit Product',
                    true
                )}
            {newProductModal &&
                renderProductForm(addNewProduct, () => setNewProductModal(false), 'Add New Product')}
            {newCategoryModal && renderCategoryModal()}
            {newSubCategoryModal && renderSubCategoryModal()}
        </div>
    );
};

export default AdminProductPage;
