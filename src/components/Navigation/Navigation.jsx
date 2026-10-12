import { useState, useEffect, useRef } from 'react';
import logoSvg from '../../assets/logo.svg';
import ResumeModal from './ResumeModal';
import { trackResumeDownload } from '../../utils/analytics';

function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      if (window.__lenis__) {
        window.__lenis__.scrollTo(element, { duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close when clicking outside sidebar or pressing Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while mobile drawer is open
    document.body.style.overflow = 'hidden';
    if (window.__lenis__) {
      window.__lenis__.stop();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (window.__lenis__) {
        window.__lenis__.start();
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="top-nav">
        <div className="brand-logo-wrap" onClick={(e) => scrollToSection(e, 'heroName')}>
          <img src={logoSvg} alt="Nilesh Suthar Logo" className="brand-logo-img" />
          <span className="brand-logo-text">NILESH SUTHAR</span>
        </div>

        {/* Hamburger button — mobile only */}
        <button 
          ref={hamburgerRef}
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Desktop nav links */}
        <div className="nav-links">
          <a href="#experience" className="nav-link" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a>
          <a href="#works" className="nav-link" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
          <a href="#skills" className="nav-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
          <a href="#education" className="nav-link" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
          <a href="#footer" className="nav-link" onClick={(e) => scrollToSection(e, 'footer')}>Contact</a>
          <button 
            className="nav-resume-btn" 
            onClick={() => {
              trackResumeDownload({ action: 'open_resume_modal', source: 'top_nav_desktop' });
              setIsModalOpen(true);
            }}
          >
            <span>Resume</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — outside top-nav so backdrop-filter doesn't clip it */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
        onTouchStart={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu drawer — outside top-nav for proper viewport layering */}
      <div 
        ref={sidebarRef}
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-menu-header">
          <button 
            className="mobile-menu-close-btn" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <a href="#experience" className="mobile-menu-link" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a>
        <a href="#works" className="mobile-menu-link" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
        <a href="#skills" className="mobile-menu-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
        <a href="#education" className="mobile-menu-link" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
        <a href="#footer" className="mobile-menu-link" onClick={(e) => scrollToSection(e, 'footer')}>Contact</a>
        <button 
          className="mobile-resume-btn" 
          onClick={() => { 
            trackResumeDownload({ action: 'open_resume_modal', source: 'mobile_menu_drawer' });
            setIsModalOpen(true); 
            setIsMobileMenuOpen(false); 
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Resume
        </button>
      </div>

      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Navigation;
