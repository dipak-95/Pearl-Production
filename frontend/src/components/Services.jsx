import React from 'react';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: "Website Development",
            icon: "🌐",
            features: ["Informative Websites", "Goods Management", "E-commerce Platforms"],
            desc: "Custom-built, responsive websites designed to convert visitors into loyal customers."
        },
        {
            title: "App Development",
            icon: "📱",
            features: ["Workflow Management", "Custom Mobile Apps", "Cross-platform Solutions"],
            desc: "Streamlining your business operations with tailor-made mobile applications."
        },
        {
            title: "ERP Solutions",
            icon: "⚙️",
            features: ["Industrial ERP", "Workspace Systems", "Role-based Access"],
            desc: "Complete business automation tools to manage resources, employees, and data efficiently."
        },
        {
            title: "Graphic Design",
            icon: "🎨",
            features: ["Brand Identity", "Marketing Collateral", "Ad Creatives"],
            desc: "Stunning visuals that capture your brand's essence and engage your target audience."
        }
    ];

    return (
        <section className="services" id="services">
            <h2 className="section-title">Our <span className="highlight-text">Premium Services</span></h2>
            <div className="services-grid">
                {services.map((s, i) => (
                    <div key={i} className="service-card glass-card fade-in" style={{animationDelay: `${i * 0.2}s`}}>
                        <div className="service-icon">{s.icon}</div>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <ul className="service-list">
                            {s.features.map((f, j) => (
                                <li key={j}>✔ {f}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
