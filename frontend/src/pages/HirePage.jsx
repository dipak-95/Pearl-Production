import React, { useState } from 'react';
import './HirePage.css';

const DEVELOPERS = [
  {
    id: 1,
    name: 'Krrish Virpariya',
    role: 'Graphic Designer',
    rate: 12,
    rating: 3.0,
    reviews: 18,
    skills: ['Photoshop', 'Illustrator', 'Figma', 'Brand Identity', 'Social Media'],
    color: '#e879f9',
    badge: 'Design',
    level: 'Intermediate',
    initials: 'KV',
  },
  {
    id: 2,
    name: 'Dhrvik Parmar',
    role: 'MERN Stack Developer',
    rate: 20,
    rating: 4.0,
    reviews: 31,
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    color: '#34d399',
    badge: 'Web Dev',
    level: 'Mid-Level',
    initials: 'DP',
  },
  {
    id: 3,
    name: 'Sahil Zinzuvadiya',
    role: 'Full Stack Developer',
    rate: 23,
    rating: 4.0,
    reviews: 44,
    skills: ['MERN Stack', 'MySQL', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    color: '#60a5fa',
    badge: 'Full Stack',
    level: 'Mid-Level',
    initials: 'SZ',
  },
  {
    id: 4,
    name: 'Shreepal Chavada',
    role: 'Digital Marketing Expert',
    rate: 28,
    rating: 4.1,
    reviews: 39,
    skills: ['Google Ads', 'Meta Ads', 'Performance Marketing', 'Analytics', 'Lead Gen'],
    color: '#fb923c',
    badge: 'Marketing',
    level: 'Expert',
    initials: 'SC',
  },
  {
    id: 5,
    name: 'Darshit Gadhiya',
    role: 'Android Developer',
    rate: 35,
    rating: 4.3,
    reviews: 52,
    skills: ['Java', 'Kotlin', 'Android Studio', 'Firebase', 'Play Store'],
    color: '#a78bfa',
    badge: 'Android',
    level: 'Senior',
    initials: 'DG',
  },
  {
    id: 6,
    name: 'Dipak Ladani',
    role: 'Mobile App Developer',
    rate: 40,
    rating: 4.5,
    reviews: 67,
    skills: ['Flutter', 'React Native', 'Dart', 'Expo', 'iOS & Android'],
    color: '#C9922A',
    badge: 'Mobile',
    level: 'Senior',
    initials: 'DL',
  },
];

const FILTERS = ['All', 'Web Dev', 'Full Stack', 'Android', 'Mobile', 'Design', 'Marketing'];

/* ── Star Rating Component ── */
const Stars = ({ rating }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s ? 1 : rating >= s - 0.5 ? 0.5 : 0;
        return (
          <svg key={s} width="14" height="14" viewBox="0 0 24 24" style={{ display: 'inline' }}>
            <defs>
              <linearGradient id={`star-${s}-${rating}`}>
                <stop offset={`${filled * 100}%`} stopColor="#C9922A"/>
                <stop offset={`${filled * 100}%`} stopColor="rgba(201,146,42,0.2)"/>
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={`url(#star-${s}-${rating})`}
              stroke="#C9922A"
              strokeWidth="1"
            />
          </svg>
        );
      })}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  );
};

/* ── Hire Modal ── */
const HireModal = ({ dev, onClose }) => {
  const [form, setForm]   = useState({ clientName: '', clientEmail: '', clientPhone: '', projectDesc: '', estimatedHours: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:9999/api'}/hire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          developerName: dev.name,
          developerRole: dev.role,
          hourlyRate: dev.rate,
          estimatedHours: Number(form.estimatedHours) || 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTimeout(onClose, 2500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hire-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Dev summary */}
        <div className="hire-modal-dev" style={{ '--dev-color': dev.color }}>
          <div className="hm-avatar" style={{ background: `${dev.color}22`, border: `2px solid ${dev.color}` }}>
            <span style={{ color: dev.color }}>{dev.initials}</span>
          </div>
          <div>
            <h3 className="hm-dev-name">{dev.name}</h3>
            <p className="hm-dev-role">{dev.role}</p>
            <p className="hm-dev-rate">${dev.rate}<span>/hr</span></p>
          </div>
        </div>

        <h2 className="hire-modal-title">Send Hire Request</h2>

        {status === 'success' ? (
          <div className="hire-success">
            <div className="success-icon">🎉</div>
            <h3>Request Sent!</h3>
            <p>We'll connect you with {dev.name.split(' ')[0]} within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="hire-form">
            <div className="hf-row">
              <div className="hf-group">
                <label>Your Name</label>
                <input placeholder="John Doe" required
                  value={form.clientName}
                  onChange={e => setForm({...form, clientName: e.target.value})} />
              </div>
              <div className="hf-group">
                <label>Phone</label>
                <input placeholder="+91 xxxxxxxx" required
                  value={form.clientPhone}
                  onChange={e => setForm({...form, clientPhone: e.target.value})} />
              </div>
            </div>
            <div className="hf-group">
              <label>Email</label>
              <input type="email" placeholder="you@company.com" required
                value={form.clientEmail}
                onChange={e => setForm({...form, clientEmail: e.target.value})} />
            </div>
            <div className="hf-group">
              <label>Estimated Hours Needed</label>
              <input type="number" placeholder="e.g. 40 hours" min="1"
                value={form.estimatedHours}
                onChange={e => setForm({...form, estimatedHours: e.target.value})} />
              {form.estimatedHours && (
                <p className="est-cost">
                  Estimated Cost: <strong>${(dev.rate * (Number(form.estimatedHours) || 0)).toLocaleString()}</strong>
                </p>
              )}
            </div>
            <div className="hf-group">
              <label>Project Description</label>
              <textarea rows="4" placeholder="Describe your project, goals, and timeline…" required
                value={form.projectDesc}
                onChange={e => setForm({...form, projectDesc: e.target.value})} />
            </div>
            {status === 'error' && (
              <div className="form-status error">❌ Something went wrong. Try again.</div>
            )}
            <button type="submit" className={`btn btn-gold submit-hire-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Sending…' : `Send Request to ${dev.name.split(' ')[0]}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ── Main Page ── */
const HirePage = () => {
  const [filter, setFilter]   = useState('All');
  const [hireTarget, setHireTarget] = useState(null);

  const filtered = filter === 'All' ? DEVELOPERS : DEVELOPERS.filter(d => d.badge === filter);

  return (
    <div className="hire-page">
      {/* Header */}
      <header className="hire-header">
        <div className="hire-header-bg" />
        <div className="hire-header-content" data-reveal="up">
          <span className="section-label">TALENT ON DEMAND</span>
          <h1 className="section-title heading-serif">
            Hire Our <span className="gold-text">Expert Developers</span>
          </h1>
          <div className="gold-divider center" />
          <p className="hire-lead">
            Skip the recruitment hassle. Hire pre-vetted, experienced professionals from our team on an hourly basis — ready to start immediately.
          </p>
          <div className="hire-trust">
            <span>✅ Vetted Professionals</span>
            <span>⚡ Start in 24 Hours</span>
            <span>🔒 Secure Payments</span>
            <span>⭐ Quality Guaranteed</span>
          </div>
        </div>
      </header>

      {/* Filter */}
      <div className="hire-filters">
        {FILTERS.map(f => (
          <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* Dev Cards */}
      <section className="hire-cards-section">
        <div className="hire-cards-grid">
          {filtered.map((dev, i) => (
            <div
              key={`${filter}-${dev.id}`}
              className="dev-card tilt-card"
              style={{ '--dev-color': dev.color, animationDelay: `${i * 0.07}s` }}
            >
              {/* Top accent */}
              <div className="dev-card-accent" />

              {/* Header */}
              <div className="dev-card-top">
                <div className="dev-avatar" style={{ background: `${dev.color}18`, border: `2px solid ${dev.color}40` }}>
                  <span style={{ color: dev.color }}>{dev.initials}</span>
                </div>
                <div className="dev-badges">
                  <span className="dev-badge" style={{ background: `${dev.color}18`, color: dev.color, border: `1px solid ${dev.color}30` }}>
                    {dev.badge}
                  </span>
                  <span className="dev-level">{dev.level}</span>
                </div>
              </div>

              {/* Info */}
              <h3 className="dev-name">{dev.name}</h3>
              <p className="dev-role">{dev.role}</p>

              {/* Rating */}
              <div className="dev-rating-row">
                <Stars rating={dev.rating} />
                <span className="dev-reviews">({dev.reviews} reviews)</span>
              </div>

              {/* Skills */}
              <div className="dev-skills">
                {dev.skills.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>

              {/* Rate + CTA */}
              <div className="dev-card-footer">
                <div className="dev-rate">
                  <span className="rate-amount">${dev.rate}</span>
                  <span className="rate-unit">/hour</span>
                </div>
                <button
                  className="hire-now-btn"
                  style={{ background: dev.color }}
                  onClick={() => setHireTarget(dev)}
                >
                  Hire Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why hire from us */}
      <section className="why-hire-section">
        <div data-reveal="up">
          <div className="section-label text-center">WHY CHOOSE US</div>
          <h2 className="section-title text-center">The <span className="gold-text">Pearl Advantage</span></h2>
          <div className="gold-divider center" />
        </div>
        <div className="why-grid">
          {[
            { icon: '🎯', title: 'Pre-Vetted Talent', desc: 'Every developer is tested for technical and communication skills before joining our roster.' },
            { icon: '⚡', title: 'Quick Onboarding', desc: 'Get your developer up to speed within 24 hours. No lengthy hiring cycles.' },
            { icon: '📊', title: 'Transparent Pricing', desc: 'Fixed hourly rates, no hidden fees. You know exactly what you\'re paying.' },
            { icon: '🛡️', title: 'Quality Assured', desc: 'Regular performance reviews. If you\'re not happy, we find a replacement.' },
          ].map((w, i) => (
            <div key={i} className="why-card glass-card" data-reveal="scale" data-delay={String(i + 1)}>
              <div className="why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hire Modal */}
      {hireTarget && <HireModal dev={hireTarget} onClose={() => setHireTarget(null)} />}
    </div>
  );
};

export default HirePage;
