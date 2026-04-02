import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { webProjects, mobileApps } from '../data/portfolioData';
import './Portfolio.css';

const Portfolio = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    // MAIN HUB VIEW (Selective Category)
    if (!category) {
        return (
            <section className="portfolio-hub" id="portfolio">
                <div data-reveal="up" className="hub-header">
                    <h1 className="section-title">Digital <span className="highlight-text">Showcase</span></h1>
                    <p className="section-sub text-center">Select your interest to explore our deep expertise.</p>
                </div>

                <div className="category-selection-grid">
                    <Link to="/portfolio/apps" className="category-reveal-card glass-card tilt-card" data-reveal="left">
                        <div className="cat-icon-lg pulse">📱</div>
                        <h2>Mobile Applications</h2>
                        <p>10+ In-house Apps | High Performance | Cross Platform</p>
                        <div className="cat-btn">Explore Apps →</div>
                    </Link>

                    <Link to="/portfolio/web" className="category-reveal-card glass-card tilt-card" data-reveal="right">
                        <div className="cat-icon-lg pulse">🌐</div>
                        <h2>Websites & ERPs</h2>
                        <p>Enterprise Portals | MERN Stack | Industrial ERPs</p>
                        <div className="cat-btn">Explore Websites →</div>
                    </Link>
                </div>
            </section>
        );
    }

    // LIST VIEW (The actual projects)
    const currentList = category === 'web' ? webProjects : mobileApps;
    const listTitle = category === 'web' ? 'Web Projects' : 'Mobile Applications';

    return (
        <section className="portfolio active-list" id="portfolio">
            <div data-reveal="up" className="list-header">
                <div className="breadcrumb-nav">
                    <Link to="/portfolio" className="breadcrumb-back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Portfolio Hub
                    </Link>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-current">{listTitle}</span>
                </div>
                <h2 className="section-title">Our <span className="highlight-text">{listTitle}</span></h2>
            </div>

            <div className="portfolio-grid animate-fadeUp">
                <div className="card-container">
                    {currentList.map((p, i) => (
                        <Link to={`/portfolio/project/${p.id}`} key={p.id} className="portfolio-card glass-card fade-in tilt-card" style={{animationDelay: `${i * 0.1}s`}}>
                            <div className="card-media">
                                {p.icon && !p.icon.includes('placeholder') ? (
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
                                        View Case Study
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
