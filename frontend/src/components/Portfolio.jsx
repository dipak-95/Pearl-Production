import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
    const liveProjects = [
        {
            name: "Apexa Tour And Travels",
            url: "https://apexatourandtravels.com",
            desc: "Full-stack MERN platform with admin panel for car card management and active inquiry tracking.",
            tech: "MERN Stack, Admin Panel"
        },
        {
            name: "Shree Industries",
            url: "https://shreeinds.com",
            desc: "Frontend-focused site for CNC/VMC works with seamless EmailJS integration for inquiries.",
            tech: "React, EmailJS"
        },
        {
            name: "Saurashtra Darshan Tour",
            url: "https://saurashtradarshantour.com",
            desc: "Enterprise-level dynamic MERN platform for managing complex tours, car rentals, and hotel bookings with dynamic revenue reports.",
            tech: "MERN, Dynamic Admin Panel"
        }
    ];

    const upcomingProjects = [
        {
            name: "hps Fintax",
            url: "https://hpsfintax.com",
            desc: "Coming soon: A powerful financial tool featuring multi-role login (Client/Employee/Admin) and mini ERP.",
            tech: "Financial SaaS, Mini ERP"
        },
        {
            name: "Copper Jems",
            url: "#",
            desc: "Under development: Large-scale ERP system for a major copper factory.",
            tech: "Factory Management ERP"
        },
        {
            name: "Radhe Imitation",
            url: "#",
            desc: "Complete E-commerce platform with payment gateway for high-end silver jewelry.",
            tech: "E-commerce, Payment Gateway"
        }
    ];

    return (
        <section className="portfolio" id="portfolio">
            <h2 className="section-title">Our <span className="highlight-text">Proven Success</span></h2>
            
            <div className="portfolio-grid">
                <h3 className="grid-label">Live Projects</h3>
                <div className="card-container">
                    {liveProjects.map((p, i) => (
                        <div key={i} className="portfolio-card glass-card fade-in" style={{animationDelay: `${i * 0.2}s`}}>
                            <div className="card-image-placeholder">{p.name.charAt(0)}</div>
                            <div className="card-content">
                                <h3>{p.name}</h3>
                                <p>{p.desc}</p>
                                <span className="tech-badge">{p.tech}</span>
                                <a href={p.url} className="visit-btn" target="_blank" rel="noreferrer">Visit Website <i className="arrow-icon">→</i></a>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="grid-label">Under Development</h3>
                <div className="card-container">
                    {upcomingProjects.map((p, i) => (
                        <div key={i} className="portfolio-card glass-card fade-in" style={{animationDelay: `${i * 0.2 + 0.6}s`}}>
                             <div className="card-image-placeholder grey">{p.name.charAt(0)}</div>
                            <div className="card-content">
                                <h3>{p.name}</h3>
                                <p>{p.desc}</p>
                                <span className="tech-badge dev">{p.tech}</span>
                                {p.url !== "#" && <a href={p.url} className="visit-btn" target="_blank" rel="noreferrer">Preview <i className="arrow-icon">→</i></a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
