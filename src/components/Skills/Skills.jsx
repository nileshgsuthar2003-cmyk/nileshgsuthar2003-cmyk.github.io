import { useState, useRef, useEffect, useCallback } from 'react';
import { skillsData } from './skillsData';
import brushStroke from '../../assets/brush-stroke.webp';

function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const displayBoxRef = useRef(null);
  const prevIndexRef = useRef(0);

  // Scroll-driven skill activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far the sticky section has scrolled through
      // rect.top starts at some positive value and goes negative as we scroll
      const scrolled = -rect.top;
      const scrollableDistance = containerHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      // Map progress to skill index
      // Divide the scroll range evenly among skills
      const totalSkills = skillsData.length;
      const newIndex = Math.min(
        totalSkills - 1,
        Math.floor(progress * totalSkills)
      );

      if (newIndex !== prevIndexRef.current) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveIndex(newIndex);
          prevIndexRef.current = newIndex;
          setTimeout(() => {
            setIsTransitioning(false);
          }, 50);
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Also allow click to jump
  const handleSkillClick = useCallback((index) => {
    if (index === activeIndex || isTransitioning) return;
    
    const container = containerRef.current;
    if (!container) return;

    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    // On mobile (no sticky scroll), directly switch the skill
    if (scrollableDistance <= 50) {
      setIsTransitioning(true);
      prevIndexRef.current = index;
      setTimeout(() => {
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
      return;
    }

    // On desktop, scroll to the position that would activate this skill
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const targetProgress = (index + 0.5) / skillsData.length;
    const targetScroll = containerTop + targetProgress * scrollableDistance;
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [activeIndex, isTransitioning]);

  const currentSkill = skillsData[activeIndex];

  return (
    <div className="sticky-skills-container" ref={containerRef}>
      <section className="sticky-skills-section" id="skills">
        <img src={brushStroke} alt="brush stroke separator" className="brush-stroke-banner" />
        
        <div className="skills-wrapper">
          <div className="skills-left">
            <p className="skills-summary-intro">
              Core Technical Skills
            </p>
            <div className="skills-scrolling-titles">
              {/* Scroll progress track */}
              <div className="skills-progress-track">
                <div 
                  className="skills-progress-fill"
                  style={{ 
                    height: `${((activeIndex + 1) / skillsData.length) * 100}%`
                  }}
                />
                {skillsData.map((_, i) => (
                  <div 
                    key={i}
                    className={`skills-progress-dot ${i <= activeIndex ? 'active' : ''}`}
                    style={{ top: `${(i / (skillsData.length - 1)) * 100}%` }}
                  />
                ))}
              </div>
              <div className="skills-titles-list">
                {skillsData.map((skill, index) => (
                  <div
                    key={skill.id}
                    className={`skill-row-title ${index === activeIndex ? 'active' : 'inactive'}`}
                    data-skill-index={index}
                    onClick={() => handleSkillClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {skill.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="skills-right">
            <div 
              className="skill-detail-display-box" 
              ref={displayBoxRef}
              id="skillDisplayBox"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <div className="card-hover-bg"></div>
              <div>
                <div className="skill-box-header">
                  <div className="skill-icon-placeholder" id="skillIcon" dangerouslySetInnerHTML={{ __html: currentSkill.icon }} />
                  <h3 className="skill-box-title" id="skillTitle">{currentSkill.title}</h3>
                </div>
                <p className="skill-box-content" id="skillContent">{currentSkill.content}</p>
              </div>
              <div className="skill-pill-tags" id="skillPills">
                {currentSkill.pills.map((pill, idx) => (
                  <span key={idx} className="skill-pill-tag">{pill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Skills;
