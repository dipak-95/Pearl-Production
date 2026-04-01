import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:9999/api'}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="contact-wrap">
      <div className="contact-box glass-card">
        <div className="contact-left">
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="section-title heading-serif">
            Let's Build <span className="gold-text">Together</span>
          </h2>
          <div className="gold-divider" />
          <p className="contact-left-desc">
            Share your idea, challenge, or question. Our team will get back to you within 24 hours.
          </p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.02 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.92 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span>+91 7016202159</span>
            </div>
            <div className="contact-detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>pearlproduction9@gmail.com</span>
            </div>
            <div className="contact-detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Gujarat, India</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 xxxxxxxx" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
          </div>
          <div className="form-group">
            <label>Service Needed</label>
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="" disabled>Select a service…</option>
              <option>Website Development</option>
              <option>App Development</option>
              <option>ERP Solutions</option>
              <option>Graphic Design</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Your Message</label>
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Tell us about your project…" required />
          </div>

          <button type="submit" className={`btn btn-gold submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? 'Sending…' : 'Send Inquiry'}
            {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
          </button>

          {status === 'success' && (
            <div className="form-status success">✅ Inquiry sent! We'll get back to you within 24 hours.</div>
          )}
          {status === 'error' && (
            <div className="form-status error">❌ Something went wrong. Please try again or call us directly.</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
