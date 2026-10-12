function Education() {
  const educationData = [
    {
      id: 1,
      date: "Expected 2026",
      type: "degree",
      typeLabel: "🎓 Master's Degree",
      degree: "Master of Computer Applications (MCA)",
      school: "Suryadatta Institute of Business and Management",
      details: "Pune, India — Deepening knowledge in advanced computer science, algorithms, software engineering methodologies, and database systems."
    },
    {
      id: 2,
      date: "Graduated May 2024",
      type: "degree",
      typeLabel: "🎓 Bachelor's Degree",
      degree: "Bachelor of Business Administration in Computer Applications (BBA-CA)",
      school: "Kaveri College of Arts, Science and Commerce",
      details: "Pune, India — CGPA: 7.92. Gained solid foundational skills in logic design, object-oriented concepts, database schemas, and application development."
    },
    {
      id: 3,
      date: "Graduated May 2021",
      type: "degree",
      typeLabel: "📜 Higher Secondary",
      degree: "Higher Secondary Certificate (HSC)",
      school: "Prestige Public School & Jr. College",
      details: "Pune, India — Percentage: 77.67%. Focused heavily on Mathematics, Science, and Information Technology."
    }
  ];

  const certificationsData = [
    {
      id: 1,
      date: "Oracle Cloud (2025)",
      type: "cert",
      typeLabel: "📜 Verified Certification",
      degree: "Certified OCI AI Foundations Associate",
      school: "Oracle",
      details: "Verified understanding of AI concepts (Machine Learning, Deep Learning, Generative AI, Large Language Models), and OCI AI architecture services."
    },
    {
      id: 2,
      date: "HackerRank",
      type: "cert",
      typeLabel: "📜 Skills Verification",
      degree: "Java (Basic) Certification",
      school: "HackerRank Verification",
      details: "Demonstrated core capability in Java programming constructs, data structures, OOP design patterns, exceptions, and collections framework."
    },
    {
      id: 3,
      date: "MBTB (2023)",
      type: "cert",
      typeLabel: "📜 Technical Course",
      degree: "Java Programming Course",
      school: "Maharashtra Board of Technical Education",
      details: "Rigorous training course covering object-oriented programming (OOP), JDBC database connectivity, multithreading, and networking fundamentals."
    },
    {
      id: 4,
      date: "Extracurricular",
      type: "leadership",
      typeLabel: "🏆 Leadership & Event Head",
      degree: "TechFest – \"Code with Battle\"",
      school: "Suryadatta College Organizer",
      details: "Managed operations, volunteer training, and coordinated competitor schedules for the college's flagship coding festival battle event."
    }
  ];

  return (
    <section className="edu-cert-section" id="education">
      <div className="edu-container">
        {/* 1. Education Section */}
        <div className="edu-block">
          <div className="edu-block-header">
            <h2 className="edu-column-title">Education</h2>
            <span className="edu-block-tag">Academic Background</span>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="edu-cards-list">
              {educationData.map((item) => (
                <div key={item.id} className="edu-card timeline-card">
                  <div className="timeline-node-dot"></div>
                  <div className="edu-card-header">
                    <span className={`edu-type-badge ${item.type}-badge`}>{item.typeLabel}</span>
                    <span className="edu-date">{item.date}</span>
                  </div>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <div className="edu-school">{item.school}</div>
                  <p className="edu-details">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Certifications & Leadership Section */}
        <div className="edu-block">
          <div className="edu-block-header">
            <h2 className="edu-column-title">Certifications & Leadership</h2>
            <span className="edu-block-tag">Verified Credentials</span>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="edu-cards-list">
              {certificationsData.map((item) => (
                <div key={item.id} className="edu-card timeline-card">
                  <div className="timeline-node-dot cert-dot"></div>
                  <div className="edu-card-header">
                    <span className={`edu-type-badge ${item.type}-badge`}>{item.typeLabel}</span>
                    <span className="edu-date">{item.date}</span>
                  </div>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <div className="edu-school">{item.school}</div>
                  <p className="edu-details">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
