import { useState } from 'react';
import ProjectCard from './ProjectCard';

function Works() {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: "Employee Management System (EMS)",
      category: "Internship Project",
      description: "Developed a comprehensive platform for companies to manage employees, track projects, and monitor overall staff performance.",
      highlights: [
        "Built a local Python desktop client to track active versus idle computer usage based on keyboard and mouse input, utilizing a crash-safe SQLite database to reliably store activity logs.",
        "Deployed and configured the application backend on a live remote Linux server using Gunicorn, Eventlet workers, and systemd."
      ],
      year: "2026",
      tags: ["Python", "SQLite", "Linux Server", "Gunicorn", "systemd", "Eventlet"],
      link: "https://github.com/nileshgsuthar2003-cmyk",
      mockupType: "ems"
    },
    {
      id: 2,
      title: "SpectraSynth CRM",
      category: "Internship Project",
      description: "Developed a commercial Customer Relationship Management (CRM) platform to streamline business operations and automate data workflows.",
      highlights: [
        "Implemented an automated web scraper to dynamically fetch and update real-time pricing data from external websites.",
        "Built an asynchronous email ingestion system that utilizes the Gemini API to parse unstructured incoming emails and convert them into a structured, easily processable format.",
        "Engineered a data extraction pipeline to efficiently process and organize complex chemical information."
      ],
      year: "2026",
      tags: ["Python", "Django", "Gemini API", "Web Scraping", "LLM Pipeline", "MySQL"],
      link: "https://github.com/nileshgsuthar2003-cmyk",
      mockupType: "crm"
    },
    {
      id: 3,
      title: "Online Book Store",
      category: "Full Stack App",
      description: "Built a dynamic full-stack e-commerce web application with a React frontend and Flask REST APIs for product search, filtering, and cart management, coupled with a relational database.",
      highlights: [
        "Engineered RESTful API endpoints using Flask and relational MySQL database schema for inventory management and order processing.",
        "Developed responsive React frontend for seamless catalog browsing, item filtering, and cart state persistence."
      ],
      year: "2026",
      tags: ["React", "Python", "Flask", "MySQL", "REST APIs"],
      link: "https://github.com/nileshgsuthar2003-cmyk",
      mockupType: "bookstore"
    },
    {
      id: 4,
      title: "Math PDF Extractor",
      category: "AI Engine",
      description: "Developed an advanced OCR utility utilizing Meta's Nougat model and Hugging Face Transformers to transcribe scientific papers and extract complex formulas into structured Markdown format.",
      highlights: [
        "Transcribed mathematical PDFs & formulas directly into LaTeX/Markdown with high precision.",
        "Built PyTorch tensor manipulation pipeline for custom PDF layout extraction."
      ],
      year: "2025",
      tags: ["Python", "PyTorch", "Nougat OCR", "Hugging Face"],
      link: "https://github.com/nileshgsuthar2003-cmyk",
      mockupType: "terminal"
    }
  ];

  const filterCategories = ['All', 'Internship Project', 'Full Stack App', 'AI Engine'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="works-section" id="works">
      <div className="works-header">
        <h2 className="works-section-title" id="worksTitle">Curated Projects</h2>
        <p className="works-section-desc">
          Commercial systems, enterprise platforms, e-commerce web apps, and intelligent pipelines.
        </p>

        {/* Category Filter Pills */}
        <div className="works-filter-bar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`works-filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="works-grid-container">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Works;
