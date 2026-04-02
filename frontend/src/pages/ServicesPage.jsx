import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Contact from '../components/Contact';
import './ServicesPage.css';

const ServicesPage = () => {
    return (
        <div className="services-page-container">
            <header className="services-header fade-in">
                <h1 className="section-title">Our <span className="highlight-text">Solution Suite</span></h1>
                <p className="header-subtitle text-center">Engineered for growth. Specialized digital products tailored for your success.</p>
            </header>

            <div className="services-directory fade-in">
                <div className="service-grid-premium">
                    {servicesData.map((s, i) => (
                        <Link 
                            to={`/services/${s.id}`} 
                            key={s.id} 
                            className="service-reveal-card glass-card tilt-card"
                            style={{animationDelay: `${i * 0.15}s`}}
                        >
                            <div className="service-icon-lg pulse">{s.icon}</div>
                            <div className="service-info-wrap">
                                <span className="service-cat-label">Expertise</span>
                                <h2>{s.title}</h2>
                                <p>{s.desc}</p>
                                <div className="explore-link">
                                    Full Capabilities
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            <div className="card-bloom"></div>
                        </Link>
                    ))}
                </div>
            </div>

            <section className="why-choose-pearl" data-reveal="up">
                <div className="text-center mb-60">
                    <h2 className="heading-serif">Why Choose <span className="gold-text">Pearl Production?</span></h2>
                    <p className="section-sub">We don't just write code; we architect business solutions.</p>
                </div>
                <div className="why-grid">
                    <div className="why-item">
                        <span className="why-icon">⚡</span>
                        <h4>Performance First</h4>
                        <p>Websites and apps that load under 1.5s for peak retention.</p>
                    </div>
                    <div className="why-item">
                        <span className="why-icon">🎯</span>
                        <h4>Strategic Design</h4>
                        <p>UI/UX that guides users to actions that matter for your ROI.</p>
                    </div>
                    <div className="why-item">
                        <span className="why-icon">🛡️</span>
                        <h4>Built to Scale</h4>
                        <p>Industrial-grade code that grows as your business grows.</p>
                    </div>
                </div>
            </section>

            <Contact />
        </div>
    );
};

export default ServicesPage;
