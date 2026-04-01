import React from 'react';
import Contact from '../components/Contact';
import './ContactPage.css';

const ContactPage = () => {
  const info = [
    { icon: '📞', label: 'Phone', value: '+91 7016202159', href: 'tel:+917016202159' },
    { icon: '✉️', label: 'Email', value: 'pearlproduction9@gmail.com', href: 'mailto:pearlproduction9@gmail.com' },
    { icon: '📍', label: 'Office', value: 'Gujarat, India', href: '#' },
    { icon: '🕐', label: 'Hours', value: 'Mon – Sat  |  10:00 AM – 7:00 PM', href: '#' },
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="contact-header">
        <div className="contact-header-bg" />
        <div className="contact-header-content">
          <span className="section-label">LET'S CONNECT</span>
          <h1 className="section-title heading-serif">
            Have a Project? <br /><span className="gold-text">Let's Talk.</span>
          </h1>
          <div className="gold-divider center" />
          <p className="dim-text" style={{ maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Whether you need a website, an app, an ERP system, or a complete brand refresh — we're ready to listen, advise, and build.
          </p>
        </div>
      </header>

      {/* Info Cards */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {info.map((item) => (
            <a href={item.href} key={item.label} className="contact-info-card glass-card">
              <span className="ci-icon">{item.icon}</span>
              <span className="ci-label">{item.label}</span>
              <span className="ci-value">{item.value}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Form + CTA */}
      <section className="contact-form-section">
        <Contact />
      </section>
    </div>
  );
};

export default ContactPage;
