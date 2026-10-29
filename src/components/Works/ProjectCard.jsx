import { useState, useEffect, useRef } from 'react';

function ProjectCard({ project, index = 0 }) {
  const [isVisible, setIsVisible] = useState(() => {
    return typeof window !== 'undefined' && !('IntersectionObserver' in window);
  });
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`work-card ${isVisible ? 'is-visible' : ''}`}
      style={{
        transitionDelay: isVisible ? `${(index % 2) * 120}ms` : '0ms',
      }}
    >
      <div className="card-hover-bg"></div>
      
      {/* Mockups based on project type */}
      <div className="project-mockup-container">
        {project.mockupType === 'terminal' && (
          <div className="terminal-mockup">
            <div className="terminal-header">
              <span className="term-dot dot-red"></span>
              <span className="term-dot dot-yellow"></span>
              <span className="term-dot dot-green"></span>
            </div>
            <div className="terminal-body">
              <div className="term-line cmd">python extract.py</div>
              <div className="term-line info">Loading Nougat model...</div>
              <div className="term-line success">Formula Extracted:</div>
              <div className="term-line math">{"$$ f(x) = \\int e^{-x^2} dx $$"}</div>
              <div className="term-line cmd">nilesh$ █</div>
            </div>
          </div>
        )}

        {project.mockupType === 'ems' && (
          <div className="terminal-mockup ems-mockup">
            <div className="terminal-header">
              <span className="term-dot dot-red"></span>
              <span className="term-dot dot-yellow"></span>
              <span className="term-dot dot-green"></span>
            </div>
            <div className="terminal-body">
              <div className="term-line cmd">systemctl status gunicorn</div>
              <div className="term-line success">● ems.service - Active (running)</div>
              <div className="term-line info">Eventlet Workers: 4 Online</div>
              <div className="term-line cmd">python tracker_client.py</div>
              <div className="term-line math">Status: Active [Input Hooked]</div>
            </div>
          </div>
        )}

        {project.mockupType === 'crm' && (
          <div className="terminal-mockup crm-mockup">
            <div className="terminal-header">
              <span className="term-dot dot-red"></span>
              <span className="term-dot dot-yellow"></span>
              <span className="term-dot dot-green"></span>
            </div>
            <div className="terminal-body">
              <div className="term-line cmd">python email_ingest.py</div>
              <div className="term-line info">Gemini API: Ingesting Email...</div>
              <div className="term-line success">Parsed Unstructured Data</div>
              <div className="term-line cmd">python scraper.py</div>
              <div className="term-line math">Prices Sync: Updated Live</div>
            </div>
          </div>
        )}

        {project.mockupType === 'bookstore' && (
          <div className="bookstore-mockup">
            <div className="mock-book book-one">
              <div className="book-spine"></div>
              <div className="book-cover">
                <div className="book-title">E-Commerce</div>
                <div className="book-author">REST API</div>
              </div>
            </div>
            <div className="mock-book book-two">
              <div className="book-spine"></div>
              <div className="book-cover">
                <div className="book-title">SQL DB</div>
                <div className="book-author">MySQL</div>
              </div>
            </div>
            <div className="shop-badge">$24.99</div>
          </div>
        )}
      </div>
      
      <div className="work-card-top">
        <div className="work-card-meta">
          <span className={`work-card-category ${project?.category ? 'cat-' + project.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''}`}>
            {project?.category}
          </span>
          <span className="work-card-year">{project?.year}</span>
        </div>
        <div className="work-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      
      <div className="work-card-middle">
        <h3 className="work-project-title">{project?.title}</h3>
        <p className="work-project-description">{project?.description}</p>
        
        {project?.highlights && project.highlights.length > 0 && (
          <ul className="project-highlights-list">
            {project.highlights.map((point, idx) => (
              <li key={idx} className="project-highlight-item">
                <span className="highlight-bullet">▸</span>
                <span className="highlight-text">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="work-card-bottom">
        {project?.tags?.map((tag, idx) => (
          <span key={idx} className="work-tag">{tag}</span>
        ))}
      </div>
    </a>
  );
}

export default ProjectCard;
