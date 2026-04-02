import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import './Details.css';

const ServiceDetails = () => {
    const { id } = useParams();
    const service = servicesData.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return <div className="details-page"><h2 className="text-center">Service Not Found</h2></div>;
    }

    return (
        <div className="details-page animate-fadeUp">
            <div className="details-container glass-card">
                <Link to="/services" className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back to Services
                </Link>

                <div className="details-grid">
                    <div className="details-media">
                         <div className="service-icon-wrap">
                            <span className="detail-service-icon">{service.icon}</span>
                            <div className="floating-elements">
                                <div className="element e1"></div>
                                <div className="element e2"></div>
                            </div>
                        </div>
                    </div>

                    <div className="details-info">
                        <span className="status-badge">Professional Solutions</span>
                        <h1 className="heading-serif detail-title">{service.title}</h1>
                        <div className="gold-divider" />
                        
                        <p className="detail-full-desc">{service.fullDesc}</p>
                        
                        <div className="features-list">
                            <h3 className="list-title">What we offer:</h3>
                            <ul>
                                {service.features.map((f, i) => (
                                    <li key={i}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9922A" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to="/contact" className="btn btn-gold detail-btn">
                            Get Quote for {service.title}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
