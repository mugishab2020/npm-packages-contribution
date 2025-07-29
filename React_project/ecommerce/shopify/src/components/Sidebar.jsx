import React, { useState, useEffect } from 'react';
import {
    FaTshirt,
    FaLaptop,
    FaSpa,
    FaChevronDown,
    FaChevronUp,
} from 'react-icons/fa';
import axiosInstance from '../utils/AxiosInstance';
import '../styles/sidebar.css';

// Map of string icon names to actual icon components
const iconMap = {
    FaTshirt: FaTshirt,
    FaLaptop: FaLaptop,
    FaSpa: FaSpa,
};

const Sidebar = ({ onSelectSubcategory }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [openCategory, setOpenCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get('/category');
                setCategories(res.data.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleCategory = async (categoryId) => {
        setOpenCategory((prev) => (prev === categoryId ? null : categoryId));

        if (!subcategories[categoryId]) {
            try {
                const res = await axiosInstance.get(`/category/${categoryId}/subcategories`);
                setSubcategories((prev) => ({
                    ...prev,
                    [categoryId]: res.data.subcategories,
                }));
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        }
    };

    return (
        <div className="sidebar">
            <h3>Categories</h3>
            {categories.map((category) => {
                const Icon = iconMap[category.icon]; // Get icon component dynamically

                return (
                    <div key={category.id} className="category">
                        <h4
                            onClick={() => toggleCategory(category.id)}
                            className="dropdown-header"
                        >
                            {Icon && <Icon className="category-icon" />} {category.category_name}
                            {openCategory === category.id ? (
                                <FaChevronUp className="dropdown-icon" />
                            ) : (
                                <FaChevronDown className="dropdown-icon" />
                            )}
                        </h4>
                        {openCategory === category.id && subcategories[category.id] && (
                            <ul className="subcategory-list">
                                {subcategories[category.id].map((sub) => (
                                    <li key={sub.id} onClick={() => onSelectSubcategory(sub)}>
                                        {sub.subcategory_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;
