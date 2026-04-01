import React, { useState } from 'react';
import Contact from '../components/Contact';
import './ServicesPage.css';

const ServicesPage = () => {
    const [activeTab, setActiveTab] = useState('web-dev');

    const detailedServices = {
        'web-dev': {
            title: "Website Development",
            subtitle: "Crafting High-Performance Digital Experiences",
            description: "We don't just build websites; we build digital growth engines. Our web solutions are optimized for speed, SEO, and conversion. Every project is a blend of innovation and functionality.",
            features: [
                {
                    name: "Informative Websites",
                    detail: "Perfect for businesses looking to establish a professional online presence. We focus on clean UI, fast loading, and clear communication of your brand value."
                },
                {
                    name: "Goods Management Systems",
                    detail: "Internal web tools designed to track inventory, manage orders, and streamline your supply chain with real-time data visualization."
                },
                {
                    name: "E-commerce Platforms",
                    detail: "Scale your sales with robust online stores. Integrated with secure payment gateways (like Razorpay/Stripe), inventory sync, and customer analytics."
                }
            ],
            icon: "🌐"
        },
        'app-dev': {
            title: "Application Development",
            subtitle: "Custom Solutions for Modern Workflows",
            description: "Mobile and Desktop applications tailored to your unique business processes. We transform complex workflows into simple, intuitive apps that your team will love to use.",
            features: [
                {
                    name: "Workflow Management Apps",
                    detail: "Manage your team's tasks, progress, and communication in one centralized mobile or web application."
                },
                {
                    name: "Custom Mobile Solutions",
                    detail: "Native and Cross-platform (React Native/Flutter) apps that provide seamless user experiences on both iOS and Android."
                },
                {
                    name: "In-House Profit Apps",
                    detail: "Building tools that automate repetitive tasks, saving time and increasing overall profitability for your company."
                }
            ],
            icon: "📱"
        },
        'erp-systems': {
            title: "Industrial ERP Systems",
            subtitle: "Automate and Scale Your Operations",
            description: "Our ERP solutions are built for massive scalability. From copper factories to finance firms, we handle the heavy lifting of data management and reporting.",
            features: [
                {
                    name: "Mini ERP & Workspace",
                    detail: "Affordable solutions for growing teams to manage multi-user roles, file sharing, and project tracking."
                },
                {
                    name: "Full-Scale Industrial ERP",
                    detail: "Comprehensive systems for manufacturing units, including stock management, HR, Payroll, and automated reporting."
                },
                {
                    name: "Finance ERP (Fintax)",
                    detail: "Specialized systems for financial firms to manage client logins, employee roles, and mini ERP workflows."
                }
            ],
            icon: "⚙️"
        },
        'graphic-design': {
            title: "Graphic & Brand Design",
            subtitle: "Visual Storytelling That Converts",
            description: "Aesthetics meet strategy. We create visuals that don't just look good but drive engagement and brand loyalty. Your visual identity is our priority.",
            features: [
                {
                    name: "Brand Identity",
                    detail: "Logo design, color palettes, and typography that make your brand stand out in a crowded market."
                },
                {
                    name: "Ads & Marketing Media",
                    detail: "Eye-catching creatives for social media campaigns, video editing, and digital advertisements."
                },
                {
                    name: "Marketing Collaterals",
                    detail: "Designing brochures, visiting cards, and digital assets that reflect professional excellence."
                }
            ],
            icon: "🎨"
        }
    };

    const currentService = detailedServices[activeTab];

    return (
        <div className="services-page-container">
            <header className="services-header fade-in">
                <h1 className="section-title">Our <span className="highlight-text">Service Hub</span></h1>
                <p className="header-subtitle">Select a category to explore our specialized solutions in detail.</p>
            </header>

            <div className="services-hub fade-in">
                <div className="services-nav">
                    {Object.keys(detailedServices).map((key) => (
                        <button 
                            key={key} 
                            className={`nav-item ${activeTab === key ? 'active' : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            <span className="nav-icon">{detailedServices[key].icon}</span>
                            <span className="nav-label">{detailedServices[key].title}</span>
                        </button>
                    ))}
                </div>

                <div className="service-detail-container glass-card">
                    <div className="service-detail-content fade-in" key={activeTab}>
                        <div className="detail-header">
                            <span className="detail-subtitle">{currentService.subtitle}</span>
                            <h2>{currentService.title}</h2>
                        </div>
                        <p className="detail-description">{currentService.description}</p>
                        
                        <div className="detail-features-list">
                            {currentService.features.map((feature, idx) => (
                                <div key={idx} className="detail-feature-card">
                                    <h4>{feature.name}</h4>
                                    <p>{feature.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Contact />
        </div>
    );
};

export default ServicesPage;
