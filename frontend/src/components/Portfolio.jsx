import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { webProjects, mobileApps } from '../data/portfolioData';
import './Portfolio.css';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('mobile');

    return (
        <section className="portfolio" id="portfolio">
            <div data-reveal="up">
                <h2 className="section-title">Our <span className="highlight-text">Proven Success</span></h2>
                <p className="section-sub text-center">Transforming ideas into high-impact digital products across web and mobile.</p>
            </div>
            
            <div className="portfolio-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'mobile' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('mobile')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                    Mobile Apps
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('web')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                    Websites
                </button>
            </div>

            <div className="portfolio-grid">
                <div className="card-container">
                    {(activeTab === 'web' ? webProjects : mobileApps).map((p, i) => (
                        <Link to={`/portfolio/${p.id}`} key={p.id} className="portfolio-card glass-card fade-in tilt-card" style={{animationDelay: `${i * 0.1}s`}}>
                            <div className="card-media">
                                {p.icon ? (
                                    <img src={p.icon} alt={p.name} className="app-icon" />
                                ) : (
                                    <div className="placeholder-3d-wrapper">
                                        <img src="/floating_3d_placeholder.png" alt="Dev" className="floating-3d-img" />
                                        <div className="placeholder-text-overlay">{p.name.charAt(0)}</div>
                                    </div>
                                )}
                                {p.status === 'dev' && <div className="dev-badge">IN REVIEW / DEV</div>}
                            </div>
                            <div className="card-content">
                                <h3>{p.name}</h3>
                                <p className="card-desc text-dim">{p.desc}</p>
                                <div className="card-footer">
                                    <span className={`tech-badge ${p.status === 'dev' ? 'dev' : ''}`}>{p.tech}</span>
                                    <div className="view-details-btn">
                                        View Details
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
