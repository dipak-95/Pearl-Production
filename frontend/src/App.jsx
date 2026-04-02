import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import HirePage from './pages/HirePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails';
import ServiceDetails from './pages/ServiceDetails';
import useScrollReveal from './hooks/useScrollReveal';
import './index.css';
import './styles/scroll-reveal.css';

// Pages that don't show Navbar/Footer
const ADMIN_ROUTES = ['/login', '/admin'];

function AppContent() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const isAdmin   = ADMIN_ROUTES.some(r => location.pathname.startsWith(r));

  useScrollReveal('[data-reveal]');

  // Global mouse-tilt 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll('.tilt-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        if (Math.sqrt(dx * dx + dy * dy) < 1.5) {
          card.style.transform = `perspective(800px) rotateY(${dx*8}deg) rotateX(${-dy*8}deg) scale3d(1.02,1.02,1.02)`;
        }
      });
    };
    const resetAll = () => {
      document.querySelectorAll('.tilt-card').forEach(c => { c.style.transform = ''; });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', resetAll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', resetAll);
    };
  }, [location.pathname]);

  return (
    <div className="App">
      {!isAdmin && <Navbar onLoginClick={() => navigate('/login')} />}
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:category" element={<PortfolioPage />} />
          <Route path="/portfolio/project/:id" element={<ProjectDetails />} />
          <Route path="/hire"      element={<HirePage />} />
          <Route path="/contact"   element={<ContactPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/admin"     element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
