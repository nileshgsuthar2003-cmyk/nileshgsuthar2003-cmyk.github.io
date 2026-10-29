function Experience() {
  const experiences = [
    {
      id: 1,
      role: "AI-ML Developer Intern",
      company: "Darshand Digital Solution (DD Digital Solutions LLP)",
      period: "Feb 2026 – July 2026 (6 Months)",
      location: "Pune, Maharashtra, India",
      website: "https://www.dddigitalsolution.com",
      highlights: [
        "Architected AI/ML automation pipelines, local LLM inference engines, and web data extraction systems for enterprise client operations.",
        "Engineered SpectraSynth CRM featuring asynchronous email ingestion via Gemini API to automatically parse unstructured emails into structured database fields.",
        "Built Employee Management System (EMS) with a local Python desktop client tracking active vs. idle computer activity (keyboard/mouse inputs) backed by a crash-safe SQLite DB.",
        "Deployed and maintained production backends on live remote Linux servers utilizing Gunicorn, Eventlet workers, and systemd service daemons."
      ],
      tags: ["Python", "AI / ML", "Gemini API", "Django", "Gunicorn", "Linux Server", "SQLite", "Web Scraping"]
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-header">
          <span className="experience-badge">💼 Career Timeline</span>
          <h2 className="experience-section-title">Work Experience</h2>
        </div>

        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="exp-card-header">
                <div className="exp-role-wrap">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">
                    <a href={exp.website} target="_blank" rel="noopener noreferrer" className="exp-company-link">
                      {exp.company} ↗
                    </a>
                  </div>
                </div>
                <div className="exp-meta-wrap">
                  <span className="exp-period-badge">{exp.period}</span>
                  <span className="exp-location">{exp.location}</span>
                </div>
              </div>

              <ul className="exp-highlights-list">
                {exp.highlights.map((item, idx) => (
                  <li key={idx} className="exp-highlight-item">
                    <span className="exp-bullet">▸</span>
                    <span className="exp-text">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="exp-tags-wrap">
                {exp.tags.map((tag, idx) => (
                  <span key={idx} className="exp-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
