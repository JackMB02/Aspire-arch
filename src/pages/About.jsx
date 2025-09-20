import { useState } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function AboutHero() {
  return (
    <div className="about-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Redefining Architecture for a Sustainable Future</h1>
          <p>Aspire Architecture is more than a design firm — we are visionaries committed to shaping sustainable, inspiring, and inclusive environments that elevate the human experience while honoring our planet.</p>
        </div>
        <div className="hero-image">
          <img src="/images/villa.jpg" alt="Modern Villa Design by Aspire Architecture" />
        </div>
      </div>
    </div>
  );
}

function Mission() {
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Mission & Purpose</h1>
          <p className="about-description">
            At Aspire Architecture, our mission is to design <strong>sustainable, functional, and inspiring spaces</strong> that serve communities while respecting the environment. We balance <em>innovation with tradition</em>, creating structures that stand the test of time while meeting contemporary needs.
          </p>
          
          <div className="image-showcase">
            <img src="/images/design-process.jpg" alt="Design Process" />
            <div className="image-caption">Our collaborative design process brings together diverse perspectives to create innovative solutions.</div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Environmental Stewardship</h3>
              <p>We champion eco-friendly materials and energy-efficient solutions, minimizing our carbon footprint while maximizing building performance.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Human-Centered Design</h3>
              <p>We prioritize user well-being and accessibility, creating spaces that promote health, happiness, and productivity for all occupants.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
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
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Vision for the Future</h1>
          <p className="about-description">
            Aspire Architecture envisions a world where built environments seamlessly connect people with nature, technology, and culture. We create <strong>resilient, adaptive spaces</strong> that inspire future generations while addressing urgent challenges of urban growth and climate change.
          </p>
          
          <div className="image-showcase">
            <img src="/images/future-city.jpg" alt="Future City Vision" />
            <div className="image-caption">Our vision for sustainable urban development integrates nature with modern living.</div>
          </div>
          
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
      icon: "fas fa-globe"
    },
    {
      title: "Innovation",
      description: "We embrace emerging technologies and novel approaches to solve complex design challenges, constantly exploring new possibilities.",
      icon: "fas fa-lightbulb"
    },
    {
      title: "Collaboration",
      description: "We believe the best designs emerge from diverse perspectives, fostering open dialogue between clients, communities, and builders.",
      icon: "fas fa-handshake"
    },
    {
      title: "Excellence",
      description: "We pursue perfection in every detail, combining meticulous craftsmanship with rigorous quality control to deliver exceptional results.",
      icon: "fas fa-star"
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
          
          <div className="image-showcase">
            <img src="/images/team-values.jpg" alt="Team Collaboration" />
            <div className="image-caption">Our team embodies these values in every project we undertake.</div>
          </div>
          
          <div className="values-tabs">
            {values.map((value, index) => (
              <button
                key={index}
                className={`value-tab ${activeValue === index ? 'active' : ''}`}
                onClick={() => setActiveValue(index)}
              >
                <span className="value-icon"><i className={value.icon}></i></span>
                {value.title}
              </button>
            ))}
          </div>
          
          <div className="value-content">
            <div className="value-icon-large"><i className={values[activeValue].icon}></i></div>
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
    { name: "Sarah Johnson", role: "Principal Architect", image: "/images/a.jpg" },
    { name: "Michael Chen", role: "Design Director", image: "/images/a.jpg" },
    { name: "Elena Rodriguez", role: "Sustainability Specialist", image: "/images/a.jpg" },
    { name: "David Kim", role: "Technical Lead", image: "/images/a.jpg" },
    { name: "Olivia Williams", role: "Project Manager", image: "/images/a.jpg" },
    { name: "James Wilson", role: "Urban Designer", image: "/images/a.jpg" }
  ];
  
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content">
          <h1 className="about-title">Our Leadership Team</h1>
          <p className="about-description">
            Our diverse team of architects, designers, and specialists brings together decades of experience and fresh perspectives to create innovative architectural solutions.
          </p>
          
          <div className="image-showcase">
            <img src="/images/team-collab.jpg" alt="Team Collaboration" />
            <div className="image-caption">Collaboration is at the heart of our design process.</div>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
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
          
          <div className="image-showcase">
            <img src="/images/history-timeline.jpg" alt="Our History" />
            <div className="image-caption">From our humble beginnings to international recognition.</div>
          </div>
          
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

function AboutNavigation() {
  const location = useLocation();
  
  return (
    <div className="about-navigation">
      <Link 
        to="/about" 
        className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
      >
        Overview
      </Link>
      <Link 
        to="/about/mission" 
        className={`nav-link ${location.pathname === '/about/mission' ? 'active' : ''}`}
      >
        Mission
      </Link>
      <Link 
        to="/about/vision" 
        className={`nav-link ${location.pathname === '/about/vision' ? 'active' : ''}`}
      >
        Vision
      </Link>
      <Link 
        to="/about/values" 
        className={`nav-link ${location.pathname === '/about/values' ? 'active' : ''}`}
      >
        Values
      </Link>
      <Link 
        to="/about/team" 
        className={`nav-link ${location.pathname === '/about/team' ? 'active' : ''}`}
      >
        Team
      </Link>
      <Link 
        to="/about/history" 
        className={`nav-link ${location.pathname === '/about/history' ? 'active' : ''}`}
      >
        History
      </Link>
    </div>
  );
}

function AboutIntro() {
  return (
    <AnimatedSection>
      <div className="about-page-wrapper">
        <div className="about-content intro-content">
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
          
          <div className="intro-text">
            <h2>Our Approach</h2>
            <p>
              At Aspire Architecture, we believe that great design emerges from a deep understanding of both human needs and environmental responsibility. Our interdisciplinary approach combines cutting-edge technology with time-honored design principles to create spaces that are not only beautiful but also functional, sustainable, and meaningful.
            </p>
            <p>
              We work closely with our clients and communities to ensure that every project reflects their unique identity while pushing the boundaries of what's possible in sustainable architecture.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function About() {
  return (
    <div className="about-container">
      <AboutHero />
      <AboutNavigation />
      
      <Routes>
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="values" element={<Values />} />
        <Route path="team" element={<Team />} />
        <Route path="history" element={<History />} />
        <Route path="/" element={<AboutIntro />} />
      </Routes>

      <style>
        {`
        .about-container {
          min-height: 100vh;
        }

        .about-hero {
          padding: 10rem 2rem 4rem;
          background: #f8f9fa;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-text p {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
        }

        .hero-image {
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
          width: 90%;
          margin: 0 auto;
        }

        .hero-image:hover {
          transform: translateY(-5px);
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Restored original navigation style */
        .about-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          font-size: 0.9rem;
        }

        .nav-link:hover {
          background: #1f2937;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .nav-link.active {
          background: #1f2937;
          color: white;
        }

        .about-page-wrapper {
          padding: 4rem 2rem;
          background: #f8f9fa;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .intro-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .about-description {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .image-showcase {
          margin: 3rem 0;
          text-align: center;
        }

        .image-showcase img {
          width: 80%;
          max-height: 400px;
          object-fit: cover;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin: 2rem auto 1rem;
        }

        .image-caption {
          color: #6b7280;
          font-style: italic;
          font-size: 0.9rem;
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
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #f97316;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          color: #1f2937;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .feature-card p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 1rem;
        }

        .stats-grid, .intro-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }

        .stat-item {
          text-align: center;
          padding: 2rem 1.5rem;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }

        .intro-text h2 {
          font-size: 2rem;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .intro-text p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
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
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .vision-item h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .vision-item p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 1rem;
        }

        .goals-section {
          background: white;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .goals-section h3 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
        }

        .goals-list {
          color: #6b7280;
          line-height: 1.8;
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .goals-list li {
          margin-bottom: 1rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .goals-list li:before {
          content: "•";
          color: #f97316;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .values-tabs {
          display: flex;
          gap: 1rem;
          margin: 3rem 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .value-tab {
          padding: 1rem 1.5rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
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
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
          margin-top: 2rem;
        }

        .value-icon-large {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: #f97316;
        }

        .value-content h2 {
          font-size: 1.8rem;
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .value-content p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }

        .team-card {
          background: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .team-card:hover {
          transform: translateY(-5px);
        }

        .team-image {
          width: 150px;
          height: 180px;
          overflow: hidden;
          margin: 0 auto 1.5rem;
          border: 2px solid #f3f4f6;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-card h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .team-card p {
          color: #6b7280;
          font-size: 1rem;
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
          background: #e5e7eb;
        }

        .timeline-item {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-year {
          background: #1f2937;
          color: white;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          margin-right: 2rem;
          z-index: 2;
          font-size: 1rem;
        }

        .timeline-content {
          background: white;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          flex: 1;
          border: 1px solid #f3f4f6;
        }

        .timeline-content h3 {
          color: #1f2937;
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .timeline-content p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 1rem;
        }

        .future-section {
          background: white;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-top: 4rem;
          border: 1px solid #f3f4f6;
          text-align: center;
        }

        .future-section h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .future-section p {
          color: #6b7280;
          line-height: 1.6;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          
          .hero-text h1 {
            font-size: 2.2rem;
          }
          
          .hero-image {
            width: 80%;
          }
          
          .intro-content {
            grid-template-columns: 1fr;
          }
          
          .image-showcase img {
            width: 90%;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 8rem 1.5rem 3rem;
          }
          
          .about-page-wrapper {
            padding: 3rem 1.5rem;
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
          
          .about-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .values-tabs {
            flex-direction: column;
          }
          
          .timeline::before {
            left: 20px;
            transform: none;
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

        @media (max-width: 480px) {
          .stats-grid, .intro-stats {
            grid-template-columns: 1fr;
          }
          
          .hero-text h1 {
            font-size: 1.8rem;
          }
          
          .team-image {
            width: 120px;
            height: 150px;
          }
          
          .hero-image {
            width: 100%;
          }
          
          .image-showcase img {
            width: 100%;
          }
        }
        `}
      </style>
    </div>
  );
}

export default About;