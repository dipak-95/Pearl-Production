import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    const particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.6 ? '#C9922A' : '#F5F0E8';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 146, 42, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* 3D floating shapes */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <span className="badge-dot" />
          India's Premium Digital Production House
        </div>

        <h1 className="hero-title heading-serif animate-fadeUp" style={{ animationDelay: '0.3s' }}>
          We Build <span className="title-gold">Digital</span>
          <br />
          Experiences That <br/>
          <span className="title-gold">Matter</span>
        </h1>

        <p className="hero-sub animate-fadeUp" style={{ animationDelay: '0.5s' }}>
          From stunning websites and enterprise ERPs to powerful mobile apps and bold brand identities — we craft solutions that drive real growth.
        </p>

        <div className="hero-actions animate-fadeUp" style={{ animationDelay: '0.7s' }}>
          <Link to="/portfolio" className="btn btn-gold">
            View Our Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/contact" className="btn btn-outline">Start a Project</Link>
        </div>

        <div className="hero-stats animate-fadeUp" style={{ animationDelay: '0.9s' }}>
          <div className="stat">
            <span className="stat-num">6+</span>
            <span className="stat-label">Live Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Founders</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">2+</span>
            <span className="stat-label">Years Building</span>
          </div>
        </div>
      </div>

      <div className="hero-visual animate-fadeUp" style={{ animationDelay: '0.5s' }}>
        <div className="hero-3d-card">
          <div className="card-inner">
            <div className="card-top">
              <div className="card-dot gold" /><div className="card-dot dim" /><div className="card-dot dim" />
            </div>
            <div className="card-code">
              <p><span className="c-gold">const</span> client <span className="c-dim">= </span><span className="c-pearl">'Your Business'</span></p>
              <p><span className="c-gold">const</span> solution <span className="c-dim">= </span><span className="c-pearl">{'{'}</span></p>
              <p className="indent"><span className="c-dim">web:</span> <span className="c-gold">'MERN Stack'</span>,</p>
              <p className="indent"><span className="c-dim">app:</span> <span className="c-gold">'React Native'</span>,</p>
              <p className="indent"><span className="c-dim">design:</span> <span className="c-gold">'Premium UI'</span>,</p>
              <p className="indent"><span className="c-dim">erp:</span> <span className="c-gold">'Full System'</span>,</p>
              <p><span className="c-pearl">{'}'}</span></p>
              <p className="mt-8"><span className="c-gold">Pearl</span><span className="c-pearl">.build(client, solution)</span></p>
            </div>
          </div>
        </div>

        <div className="hero-floating-icons">
          <div className="float-icon fi-1">🌐</div>
          <div className="float-icon fi-2">📱</div>
          <div className="float-icon fi-3">⚙️</div>
          <div className="float-icon fi-4">🎨</div>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <div className="scroll-line" /><span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
