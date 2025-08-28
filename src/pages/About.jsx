import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function Mission() {
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Mission & Purpose</h1>
          <p className="about-description">
            At Aspire Architecture, our mission is to design <strong>sustainable, functional, and inspiring spaces</strong> that serve communities while respecting the environment. We balance <em>innovation with tradition</em>, creating structures that stand the test of time while meeting contemporary needs.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Environmental Stewardship</h3>
              <p>We champion eco-friendly materials and energy-efficient solutions, minimizing our carbon footprint while maximizing building performance.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Human-Centered Design</h3>
              <p>We prioritize user well-being and accessibility, creating spaces that promote health, happiness, and productivity for all occupants.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Collaborative Innovation</h3>
              <p>We foster creativity and collaboration at every stage, working closely with clients and communities to realize visionary solutions.</p>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">350+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">85%</span>
              <span className="stat-label">Energy Savings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">27</span>
              <span className="stat-label">International Awards</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Vision() {
  return (
    <AnimatedSection>
      <div className="about-page-wrapper vision-bg">
        <div className="about-content">
          <h1 className="about-title">Our Vision for the Future</h1>
          <p className="about-description">
            Aspire Architecture envisions a world where built environments seamlessly connect people with nature, technology, and culture. We create <strong>resilient, adaptive spaces</strong> that inspire future generations while addressing urgent challenges of urban growth and climate change.
          </p>
          
          <div className="vision-grid">
            <div className="vision-item">
              <h3>Regenerative Design</h3>
              <p>Moving beyond sustainability, our designs actively regenerate ecosystems, produce clean energy, and improve environmental conditions.</p>
            </div>
            
            <div className="vision-item">
              <h3>Smart Integration</h3>
              <p>We seamlessly integrate cutting-edge technology with timeless design principles, creating responsive environments that adapt to changing needs.</p>
            </div>
            
            <div className="vision-item">
              <h3>Cultural Legacy</h3>
              <p>Our work honors cultural heritage while pioneering new architectural languages that speak to our evolving global community.</p>
            </div>
          </div>
          
          <div className="goals-section">
            <h3>Our 2030 Goals</h3>
            <ul className="goals-list">
              <li>Achieve net-zero carbon in all new projects by 2025</li>
              <li>Develop affordable housing solutions for 10,000 families</li>
              <li>Establish design education programs in 15 underserved communities</li>
              <li>Pioneer 3 new sustainable building materials</li>
              <li>Reduce construction waste by 75% across all projects</li>
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Values() {
  const [activeValue, setActiveValue] = useState(0);
  
  const values = [
    {
      title: "Sustainability",
      description: "We prioritize environmental responsibility in every project, employing cutting-edge sustainable practices and materials to minimize ecological impact.",
      icon: "🌍"
    },
    {
      title: "Innovation",
      description: "We embrace emerging technologies and novel approaches to solve complex design challenges, constantly exploring new possibilities.",
      icon: "💡"
    },
    {
      title: "Collaboration",
      description: "We believe the best designs emerge from diverse perspectives, fostering open dialogue between clients, communities, and builders.",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "We pursue perfection in every detail, combining meticulous craftsmanship with rigorous quality control to deliver exceptional results.",
      icon: "⭐"
    }
  ];
  
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Core Values</h1>
          <p className="about-description">
            Our values are the foundation of everything we do at Aspire Architecture. They guide our decisions, shape our culture, and define our approach to creating meaningful architecture.
          </p>
          
          <div className="values-tabs">
            {values.map((value, index) => (
              <button
                key={index}
                className={`value-tab ${activeValue === index ? 'active' : ''}`}
                onClick={() => setActiveValue(index)}
              >
                <span className="value-icon">{value.icon}</span>
                {value.title}
              </button>
            ))}
          </div>
          
          <div className="value-content">
            <div className="value-icon-large">{values[activeValue].icon}</div>
            <h2>{values[activeValue].title}</h2>
            <p>{values[activeValue].description}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Team() {
  const teamMembers = [
    { name: "Sarah Johnson", role: "Principal Architect", initial: "S" },
    { name: "Michael Chen", role: "Design Director", initial: "M" },
    { name: "Elena Rodriguez", role: "Sustainability Specialist", initial: "E" },
    { name: "David Kim", role: "Technical Lead", initial: "D" },
    { name: "Olivia Williams", role: "Project Manager", initial: "O" },
    { name: "James Wilson", role: "Urban Designer", initial: "J" }
  ];
  
  return (
    <AnimatedSection>
      <div className="about-page-wrapper team-bg">
        <div className="about-content">
          <h1 className="about-title">Our Leadership Team</h1>
          <p className="about-description">
            Our diverse team of architects, designers, and specialists brings together decades of experience and fresh perspectives to create innovative architectural solutions.
          </p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  {member.initial}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function History() {
  const timelineItems = [
    { year: "2005", title: "Foundation", description: "Aspire Architecture was founded with a vision to merge sustainable practices with innovative design." },
    { year: "2008", title: "First Major Project", description: "Completed the award-winning Green Tower, setting new standards for eco-friendly high-rises." },
    { year: "2012", title: "International Expansion", description: "Opened offices in Europe and Asia, bringing our design philosophy to global projects." },
    { year: "2016", title: "Research Division", description: "Established our dedicated R&D division to pioneer new sustainable building technologies." },
    { year: "2020", title: "Net-Zero Commitment", description: "Pledged to achieve net-zero carbon in all new projects by 2025." },
    { year: "2023", title: "Global Recognition", description: "Received the prestigious Global Sustainable Architecture Award." }
  ];
  
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Journey Through Time</h1>
          
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="future-section">
            <h2>Looking Forward</h2>
            <p>
              As we continue to grow and evolve, our commitment to creating sustainable, human-centered architecture remains unwavering. The next chapter will be defined by even more ambitious goals and groundbreaking innovations.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function AboutIntro() {
  return (
    <AnimatedSection>
      <div className="about-page-wrapper intro-bg">
        <div className="about-content intro-content">
          <h1 className="about-main-title">Redefining Architecture for a Sustainable Future</h1>
          <p className="about-main-description">
            Aspire Architecture is more than a design firm — we are visionaries committed to shaping sustainable, inspiring, and inclusive environments that elevate the human experience while honoring our planet.
          </p>

          <div className="about-navigation">
            <Link to="mission" className="nav-link primary">Our Mission</Link>
            <Link to="vision" className="nav-link">Our Vision</Link>
            <Link to="values" className="nav-link">Our Values</Link>
            <Link to="team" className="nav-link">Our Team</Link>
            <Link to="history" className="nav-link">Our History</Link>
          </div>
          
          <div className="intro-stats">
            <div className="stat-item">
              <span className="stat-number">18</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Creative Professionals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">47</span>
              <span className="stat-label">Industry Awards</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function About() {
  return (
    <div className="about-container">
      <Routes>
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="values" element={<Values />} />
        <Route path="team" element={<Team />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<AboutIntro />} />
      </Routes>

      <style>
        {`
        .about-container {
          min-height: 100vh;
        }

        .about-page-wrapper {
          padding: 6rem 2rem 4rem;
          background: #f8f9fa;
        }

        .vision-bg {
          background: linear-gradient(135deg, #fff8f0 0%, #fef3c7 100%);
        }

        .team-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 100%);
        }

        .intro-bg {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .intro-content {
          text-align: center;
        }

        .about-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .about-main-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-description {
          font-size: 1.2rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .about-main-description {
          font-size: 1.3rem;
          color: #6b7280;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        .stats-grid, .intro-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: #f97316;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }

        .vision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .vision-item {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .vision-item h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .vision-item p {
          color: #6b7280;
          line-height: 1.6;
        }

        .goals-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .goals-section h3 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .goals-list {
          color: #6b7280;
          line-height: 1.8;
          padding-left: 1.5rem;
        }

        .goals-list li {
          margin-bottom: 0.5rem;
        }

        .values-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .value-tab {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .value-tab.active {
          background: #f97316;
          color: white;
          border-color: #f97316;
        }

        .value-tab:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .value-content {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .value-icon-large {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .value-content h2 {
          font-size: 1.8rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .value-content p {
          color: #6b7280;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .team-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-5px);
        }

        .team-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f97316;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .team-card h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .team-card p {
          color: #6b7280;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 4rem auto;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 100%;
          width: 2px;
          background: #f97316;
          opacity: 0.3;
        }

        .timeline-item {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-year {
          background: #f97316;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          margin-right: 1rem;
          z-index: 2;
        }

        .timeline-content {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          flex: 1;
        }

        .timeline-content h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .timeline-content p {
          color: #6b7280;
          line-height: 1.6;
        }

        .future-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          margin-top: 3rem;
        }

        .future-section h2 {
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .future-section p {
          color: #6b7280;
          line-height: 1.7;
        }

        .about-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-link.primary {
          background: #f97316;
          color: white;
        }

        .nav-link:not(.primary) {
          background: white;
          color: #6b7280;
          border: 1px solid #e5e7eb;
        }

        .nav-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }

        @media (max-width: 768px) {
          .about-page-wrapper {
            padding: 5rem 1rem 2rem;
          }
          
          .about-main-title {
            font-size: 2.2rem;
          }
          
          .about-title {
            font-size: 2rem;
          }
          
          .features-grid, .vision-grid, .team-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid, .intro-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .values-tabs {
            flex-direction: column;
          }
          
          .about-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .timeline::before {
            left: 20px;
          }
          
          .timeline-item {
            flex-direction: column;
            padding-left: 40px;
          }
          
          .timeline-year {
            margin-bottom: 1rem;
            margin-right: 0;
          }
        }
        `}
      </style>
    </div>
  );
}

export default About;