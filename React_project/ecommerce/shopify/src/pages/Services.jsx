import React from 'react';
import '../styles/services.css';

const offers = [
    { icon: '🚚', title: 'Fast Shipping', desc: 'Quick delivery at your doorstep' },
    { icon: '💳', title: 'Secure Payments', desc: 'Safe and encrypted transactions' },
    { icon: '🛡️', title: 'Quality Assurance', desc: 'Only best quality products' },
    { icon: '🤝', title: 'Customer Support', desc: '24/7 help and support' },
];

const promotions = [
    { id: 1, title: 'Summer Sale', desc: 'Up to 50% off on electronics', image: 'https://via.placeholder.com/400x150?text=Summer+Sale' },
    { id: 2, title: 'Fashion Fest', desc: 'Buy 2 get 1 free on all fashion items', image: 'https://via.placeholder.com/400x150?text=Fashion+Fest' },
];

const testimonials = [
    { id: 1, name: 'Alice', feedback: 'Great service and fast delivery!' },
    { id: 2, name: 'Bob', feedback: 'Wide selection and excellent support.' },
    { id: 3, name: 'Charlie', feedback: 'Best shopping experience ever.' },
];

const ServicesPage = () => {
    return (
        <div className="services-container">

            {/* What We Offer */}
            <section className="services-section offers-section">
                <h2>What We Offer</h2>
                <div className="offers-grid">
                    {offers.map(({ icon, title, desc }, idx) => (
                        <div key={idx} className="offer-card">
                            <div className="offer-icon">{icon}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promotions */}
            <section className="services-section promotions-section">
                <h2>Promotions</h2>
                <div className="promotions-slider">
                    {promotions.map(({ id, title, desc, image }) => (
                        <div key={id} className="promotion-card">
                            <img src={image} alt={title} />
                            <div className="promotion-info">
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="services-section testimonials-section">
                <h2>What Our Customers Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map(({ id, name, feedback }) => (
                        <blockquote key={id} className="testimonial-card">
                            <p>"{feedback}"</p>
                            <footer>- {name}</footer>
                        </blockquote>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ServicesPage;
