import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { servicesData } from '../data/servicesData';
import './Home.css';

const steps = [
  { num: '01', title: 'Understand', icon: '🔍', desc: "We listen deeply to your business challenges, goals, and audience to get the full picture before writing a single line of code." },
  { num: '02', title: 'Strategize', icon: '🧠', desc: "Our experts craft a tailored technical roadmap and solution architecture that's efficient, scalable, and on budget." },
  { num: '03', title: 'Design', icon: '🎨', desc: "We create stunning UI/UX designs that are both beautiful and intuitive — because aesthetics and function must coexist." },
  { num: '04', title: 'Develop', icon: '⚡', desc: "Our MERN-stack engineers build your product with clean, maintainable code and performance as a core priority." },
  { num: '05', title: 'Deploy', icon: '🚀', desc: "We launch on secure, high-availability servers after rigorous testing — making sure your product is rock-solid on day one." },
  { num: '06', title: 'Support', icon: '🛡️', desc: "We stay with you post-launch: monitoring, updates, and dedicated support so your product keeps growing." },
];


const Home = () => {
  return (
    <div className="home-page">
      <Hero />

      {/* ── Process Section ─────────────────────── */}
      <section className="process-section">
        <div data-reveal="up">
          <div className="section-label">HOW WE WORK</div>
          <h2 className="section-title text-center">
            Our <span className="gold-text">6-Step Process</span>
          </h2>
          <div className="gold-divider center" />
          <p className="section-sub text-center">From problem discovery to final support — a seamless, proven delivery framework.</p>
        </div>

        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="process-card tilt-card" key={i} data-reveal="scale" data-delay={String(i % 3 + 1)}>
              <div className="process-num">{s.num}</div>
              <div className="process-icon">{s.icon}</div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities Section ─────────────────── */}
      <section className="capabilities-section">
        <div className="cap-header" data-reveal="up">
          <div>
            <div className="section-label">WHAT WE DO</div>
            <h2 className="section-title">Core <span className="gold-text">Capabilities</span></h2>
            <div className="gold-divider" />
          </div>
          <p className="cap-desc">
            Specialized digital solutions designed to transform the way your business operates, grows, and competes.
          </p>
        </div>
        <div className="cap-grid">
          {servicesData.map((c, i) => (
            <Link to={`/services/${c.id}`} className="cap-card glass-card tilt-card" key={c.id} data-reveal="up" data-delay={String(i + 1)}>
              <div className="cap-icon-wrap"><span className="cap-icon">{c.icon}</span></div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="cap-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Portfolio Teaser ─────────────────────── */}
      <section className="teaser-section">
        <div className="teaser-inner glass-card">
          <div className="teaser-text" data-reveal="left">
            <div className="section-label">PROVEN RESULTS</div>
            <h2 className="section-title">Projects That <span className="gold-text">Speak For Themselves</span></h2>
            <p className="dim-text" style={{ marginBottom: '36px', lineHeight: 1.75 }}>
              From enterprise tour platforms handling 1000s of bookings to industrial ERP systems — our portfolio proves we deliver at scale.
            </p>
            <Link to="/portfolio" className="btn btn-gold">
              Explore Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="teaser-stats" data-reveal="right">
            {[['16+', 'Projects Built'],['10+', 'Mobile Apps'],['6+', 'Web Apps'],['100%', 'Client Focus']].map(([n, l]) => (
              <div className="t-stat" key={l}>
                <span className="t-num heading-serif">{n}</span>
                <span className="t-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner" data-reveal="scale">
          <h2 className="section-title heading-serif text-center">
            Ready to Build <span className="gold-text">Something Great?</span>
          </h2>
          <p className="dim-text text-center" style={{ maxWidth: 540, margin: '20px auto 40px', lineHeight: 1.75 }}>
            Let's turn your idea into a fully-realized digital product that drives results.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gold">Start a Project</Link>
            <a href="tel:+917016202159" className="btn btn-outline">Call Us Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
