import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('mobile'); // Default to mobile as requested

    const webProjects = [
        {
            name: "Apexa Tour And Travels",
            url: "https://apexatourandtravels.com",
            desc: "Full-stack MERN platform with admin panel for car card management and active inquiry tracking.",
            tech: "MERN Stack, Admin Panel",
            status: "live"
        },
        {
            name: "Shree Industries",
            url: "https://shreeinds.com",
            desc: "Frontend-focused site for CNC/VMC works with seamless EmailJS integration for inquiries.",
            tech: "React, EmailJS",
            status: "live"
        },
        {
            name: "Saurashtra Darshan Tour",
            url: "https://saurashtradarshantour.com",
            desc: "Enterprise-level dynamic MERN platform for managing complex tours, car rentals, and hotel bookings.",
            tech: "MERN, Dynamic Admin Panel",
            status: "live"
        },
        {
            name: "hps Fintax",
            url: "https://hpsfintax.com",
            desc: "Coming soon: A powerful financial tool featuring multi-role login (Client/Employee/Admin) and mini ERP.",
            tech: "Financial SaaS, Mini ERP",
            status: "dev"
        },
        {
            name: "Copper Jems",
            url: "#",
            desc: "Under development: Large-scale ERP system for a major copper factory.",
            tech: "Factory Management ERP",
            status: "dev"
        },
        {
            name: "Radhe Imitation",
            url: "#",
            desc: "Complete E-commerce platform with payment gateway for high-end silver jewelry.",
            tech: "E-commerce, Payment Gateway",
            status: "dev"
        }
    ];

    const mobileApps = [
        {
            name: "Tic Tac Toe XoXo Challenge",
            url: "https://play.google.com/store/apps/details?id=com.dgpatel.tictactoewebapp",
            icon: "https://play-lh.googleusercontent.com/NdvcvPQLHHIYMg9ApPFaIyoXWCpri1DCVx6qx3l3YbcL9dPXELEg3XlRko5A0dNhQfXOcCb7eVxw2rxN0HyftA=s200-rw",
            desc: "Classic Tic Tac Toe converted from a high-performance web app to Android Native.",
            tech: "Web-to-App, Java/HTML",
            status: "live"
        },
        {
            name: "2048 Pearl",
            url: "https://play.google.com/store/apps/details?id=com.dgpatel.game2048",
            icon: "https://play-lh.googleusercontent.com/A5QJHPztrPV0n-mKA4F5Ynm4H275vbTpfJc7qiiEA9pvkFpn_zJfkcuFafLDJdueHLAjrwDKjFEdEK3D9BVrHw=s200-rw",
            desc: "Addictive slider puzzle game combining web-technologies with high-performance Kotlin/Java mobile layer.",
            tech: "Kotlin, HTML/JS",
            status: "live"
        },
        {
            name: "Ai Photo Prompt Pearl",
            url: "https://play.google.com/store/apps/details?id=com.dipak.pearlai",
            icon: "https://play-lh.googleusercontent.com/O_klApTFEGn3YJkGtwo6oofj1Cz5xNmV06pXjbuFIKTMoE9HtW8z8LBaw7gNwrSIo89LiS58KGmoukbN5OcD3fo=s200-rw",
            desc: "Cross-platform AI prompt engine. Includes admin panel, gamified spin rewards, and daily streak bonuses.",
            tech: "React Native, AI API",
            status: "live"
        },
        {
            name: "QR Code Generator - Pearl",
            url: "https://play.google.com/store/apps/details?id=com.anonymous.dynamiccopernicus",
            icon: "https://play-lh.googleusercontent.com/El87YMNgrfRMzljfFOUiIVzM-aXTbiRA_ee1UYLPdkx4PRMfOdax0-gvB4y3FUCLjSMaQZw_vInin3yYZ2QU=s200-rw",
            desc: "Powerful utility to generate and scan QR codes for Text, Links, and Contact info instantly.",
            tech: "React Native, Utility",
            status: "live"
        },
        {
            name: "2048 Challange - Pearl",
            url: "https://play.google.com/store/apps/details?id=com.dgpatelk.mobileapp",
            icon: "https://play-lh.googleusercontent.com/Y5w5FQf_Suta0h3q15hHCCj9mdXbfSCpVd66BdYv_OHvNr2lzDjntfxxU_xOgiRT57x6cPqYSyEvEKQ39auc=s200-rw",
            desc: "Multidimensional 2048 boards (4x4, 6x6, 8x8) for the ultimate puzzle enthusiasts. Ad-free & smooth gameplay.",
            tech: "React Native, Expo",
            status: "live"
        },
        {
            name: "Mahabharata Pearl",
            url: "https://play.google.com/store/apps/details?id=com.mahabharata.pearl",
            icon: "https://play-lh.googleusercontent.com/1naDimq8Lw_EVYYkWV_2vHd9HLNefeYj4SvzY0INujQ6PPaBlaXO13ej8OO1nAxbkvOPVE6Hk8bGiVRLoUA7uBQ=s200-rw",
            desc: "Deep-dive religious app featuring all 18 Adhyays of Mahabharata with detailed character studies.",
            tech: "React Native, Religious App",
            status: "live"
        },
        {
            name: "Pro Chess Multiplayer Pearl",
            url: "https://play.google.com/store/apps/details?id=com.chess123.chessapp",
            icon: "https://play-lh.googleusercontent.com/MQnBWHIQzPw0_pBORlUA18Vi8-Ihc_GR9M8Cs8CQTz5tRuyANQjDl4YcKeqN4JqNFvFJVbDyaxCyvvTzxHE-fg=s200-rw",
            desc: "Real-time multiplayer chess with leagues, invite-friend system, global leaderboards, and custom avatars.",
            tech: "React Native, Socket.io",
            status: "live"
        },
        {
            name: "Daily Darshan India Pearl",
            url: "#",
            icon: "/app_under_development_placeholder.png",
            desc: "Centralized hub for Indian temple darshan, photos, and spiritual events (Poonam/Grahan).",
            tech: "React Native, In Review",
            status: "dev"
        },
        {
            name: "Ai Product Photo Prompt Pearl",
            url: "#",
            icon: "/app_under_development_placeholder.png",
            desc: "Market-ready AI generated product photography prompts for E-commerce & Social Media.",
            tech: "AI/ML, E-commerce",
            status: "dev"
        },
        {
            name: "Exam Practice App 2026",
            url: "#",
            icon: "/app_under_development_placeholder.png",
            desc: "Massive question bank (25,000+) covering all major competitive exam subjects like History, Maths, & GS.",
            tech: "EdTech, React Native",
            status: "dev"
        }
    ];

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
                        <div key={p.name} className="portfolio-card glass-card fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                            <div className="card-media">
                                {p.icon ? (
                                    <img src={p.icon} alt={p.name} className="app-icon" />
                                ) : (
                                    <div className={`card-image-placeholder ${p.status === 'dev' ? 'grey' : ''}`}>{p.name.charAt(0)}</div>
                                )}
                                {p.status === 'dev' && <div className="dev-badge">IN REVIEW / DEV</div>}
                            </div>
                            <div className="card-content">
                                <h3>{p.name}</h3>
                                <p className="card-desc">{p.desc}</p>
                                <div className="card-footer">
                                    <span className={`tech-badge ${p.status === 'dev' ? 'dev' : ''}`}>{p.tech}</span>
                                    {p.url && p.url !== "#" ? (
                                        <a href={p.url} className="visit-btn" target="_blank" rel="noreferrer">
                                            {activeTab === 'mobile' ? 'Play Store' : 'Visit Site'} 
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </a>
                                    ) : (
                                        <span className="upcoming-tag">Coming Soon</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
