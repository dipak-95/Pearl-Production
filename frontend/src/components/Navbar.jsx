import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/hire', label: 'Hire', highlight: true },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <img src="/logo.png" alt="Pearl Production" className="logo-img" />
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label, highlight }) => (
          <li key={to}>
            <Link
              to={to}
              className={`nav-link ${location.pathname === to ? 'active' : ''} ${highlight ? 'nav-hire' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button className="btn btn-gold nav-login" onClick={onLoginClick}>Login</button>
        </li>
      </ul>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
      </button>
    </nav>
  );
};

export default Navbar;
