import { useState, useEffect } from 'react';
import scribbleSvg from '../../assets/scribble.svg';
import Signature from './Signature';
import ResumeModal from '../Navigation/ResumeModal';
import { trackResumeDownload } from '../../utils/analytics';

function Hero() {
  const [backdropActive, setBackdropActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackdropActive(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWorks = (e) => {
    e.preventDefault();
    const element = document.getElementById('works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenResumeModal = () => {
    trackResumeDownload({ action: 'open_resume_modal', source: 'hero_section' });
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Interactive Backdrop Layer */}
      <div className={`hero-backdrop ${backdropActive ? 'active' : ''}`} id="heroBackdrop">
        <div className="scribble-wrap">
          <img src={scribbleSvg} alt="scribble graphic" />
        </div>
        <div className="hero-portrait-wrap">
          <div className="hero-avatar-card">
            <span className="hero-avatar-initials">NS</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Authentic Handwritten Signature (Spells Nilesh) */}
        <div className="hero-signature-container">
          <Signature />
        </div>

        {/* Title / Header Group */}
        <div className="hero-title-group">
          {/* Top Line (Above NILESH) */}
          <div className="hero-top-line"></div>

          {/* Name Heading */}
          <h1 className="hero-name-heading" id="heroName">Nilesh Suthar</h1>

          {/* Bottom Line (Under SUTHAR) */}
          <div className="hero-bottom-line"></div>
        </div>

        {/* Hero Actions */}
        <div className="hero-actions">
          <button className="hero-btn primary-hero-btn" onClick={handleOpenResumeModal}>
            <span>Download CV</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
          <a href="#works" className="hero-btn secondary-hero-btn" onClick={scrollToWorks}>
            <span>Explore Works ↴</span>
          </a>
        </div>
      </section>

      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Hero;
