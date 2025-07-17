import React, { useState } from 'react';
import {
    FaTshirt,
    FaLaptop,
    FaSpa,
    FaChevronDown,
    FaChevronUp,
} from 'react-icons/fa';
import '../styles/sidebar.css';

const categories = {
    Fashion: ['Shoes', 'Bags', 'Clothes'],
    Electronics: ['Audio', 'Phones', 'Laptops'],
    Beauty: ['Makeup', 'Skincare'],
};

const categoryIcons = {
    Fashion: <FaTshirt className="category-icon" />,
    Electronics: <FaLaptop className="category-icon" />,
    Beauty: <FaSpa className="category-icon" />,
};

const Sidebar = ({ onSelectSubcategory }) => {
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (category) => {
        setOpenCategory((prev) => (prev === category ? null : category));
    };

    return (
        <div className="sidebar">
            <h3>Categories</h3>
            {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="category">
                    <h4
                        onClick={() => toggleCategory(category)}
                        className="dropdown-header"
                    >
                        {categoryIcons[category]} {category}
                        {openCategory === category ? (
                            <FaChevronUp className="dropdown-icon" />
                        ) : (
                            <FaChevronDown className="dropdown-icon" />
                        )}
                    </h4>
                    {openCategory === category && (
                        <ul className="subcategory-list">
                            {subcategories.map((sub) => (
                                <li key={sub} onClick={() => onSelectSubcategory(sub)}>
                                    {sub}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
