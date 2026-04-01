import React from 'react';
import './About.css';

const timeline = [
  {
    date: 'January 2024',
    title: 'The Vision is Born',
    desc: 'Dipak Ladani saw a gap in the market for genuine, quality-first digital products. He founded Pearl Production with a commitment to excellence.',
    people: [{ role: 'Founder & CEO', name: 'Dipak Ladani' }],
    align: 'left',
  },
  {
    date: 'January 2025',
    title: 'Strength in Numbers',
    desc: "Two exceptional co-founders join the team, bringing expertise in development and design — expanding the company's capabilities massively.",
    people: [
      { role: 'Co-Founder', name: 'Darshit Gadhiya' },
      { role: 'Co-Founder', name: 'Shreepal Chavada' },
    ],
    align: 'right',
  },
  {
    date: 'December 2025',
    title: 'Physical HQ Established',
    desc: 'Pearl Production plants its flag — a dedicated workspace to house our growing team and serve clients face-to-face across Gujarat.',
    align: 'left',
  },
  {
    date: 'March 2026',
    title: 'Portfolio at Scale',
    desc: 'With 6+ live projects across tourism, manufacturing, jewellery, and finance, Pearl Production stands as a proven digital powerhouse.',
    align: 'right',
  },
];

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-header-bg" />
        <div className="about-header-content" data-reveal="up">
          <span className="section-label">WHO WE ARE</span>
          <h1 className="section-title heading-serif">
            Built for <span className="gold-text">Ambition,</span><br />
            Driven by <span className="gold-text">Excellence</span>
          </h1>
          <div className="gold-divider center" />
          <p className="about-lead">
            Pearl Production is a Gujarat-based digital agency specializing in creating high-performance web applications, mobile apps, enterprise ERP systems, and brand identities that make businesses stand out and scale.
          </p>
        </div>
      </header>

      <section className="vm-section">
        <div className="vm-card glass-card tilt-card" data-reveal="up" data-delay="1">
          <div className="vm-icon">👁️</div>
          <h3>Our Vision</h3>
          <p>To become India's most trusted digital production house — delivering excellence at every stage, for businesses of every size.</p>
        </div>
        <div className="vm-card glass-card tilt-card" data-reveal="up" data-delay="2">
          <div className="vm-icon">🚀</div>
          <h3>Our Mission</h3>
          <p>Building solutions that are not just functional, but transformative — bridging the gap between business goals and digital reality.</p>
        </div>
        <div className="vm-card glass-card tilt-card" data-reveal="up" data-delay="3">
          <div className="vm-icon">💎</div>
          <h3>Our Values</h3>
          <p>Quality over quantity. Transparency with clients. Continuous learning. Delivering on every promise we make.</p>
        </div>
      </section>

      <section className="timeline-section">
        <div data-reveal="up">
          <div className="section-label text-center">OUR JOURNEY</div>
          <h2 className="section-title text-center">
            From <span className="gold-text">Idea</span> to <span className="gold-text">Impact</span>
          </h2>
          <div className="gold-divider center" />
        </div>

        <div className="timeline">
          <div className="timeline-spine" />
          {timeline.map((item, i) => (
            <div key={i} className={`timeline-row ${item.align}`}>
              <div
                className="timeline-content glass-card"
                data-reveal={item.align === 'left' ? 'left' : 'right'}
                data-delay={String(i % 2 + 1)}
              >
                <span className="tl-date">{item.date}</span>
                <h3 className="tl-title">{item.title}</h3>
                <p className="tl-desc">{item.desc}</p>
                {item.people && (
                  <div className="tl-people">
                    {item.people.map((p, j) => (
                      <div key={j} className="tl-person">
                        <div className="person-avatar">{p.name.charAt(0)}</div>
                        <div>
                          <p className="person-name">{p.name}</p>
                          <p className="person-role">{p.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="timeline-dot"><div className="dot-inner" /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
