/**
 * useScrollReveal — attaches IntersectionObserver to add 'revealed' class
 * when elements enter the viewport, enabling CSS 3D scroll animations.
 */
import { useEffect } from 'react';

const useScrollReveal = (selector = '[data-reveal]', options = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Don't unobserve — keep class persistent
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, options]);
};

export default useScrollReveal;
