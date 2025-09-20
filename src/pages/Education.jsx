import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function WorkshopsTraining() {
  const workshops = [
    {
      title: "Sustainable Design Principles",
      description: "Learn how to integrate eco-friendly practices into your architectural projects from concept to completion.",
      tag: "Beginner",
      duration: "2 Days",
      date: "June 15-16, 2023",
      instructor: "Dr. Elena Martinez",
      icon: "🌱"
    },
    {
      title: "BIM Implementation Masterclass",
      description: "Advanced training on Building Information Modeling workflows for complex architectural projects.",
      tag: "Advanced",
      duration: "3 Days",
      date: "July 5-7, 2023",
      instructor: "Marcus Johnson",
      icon: "💻"
    },
    {
      title: "Parametric Design with Rhino & Grasshopper",
      description: "Hands-on workshop exploring computational design techniques for innovative architectural forms.",
      tag: "Intermediate",
      duration: "2 Days",
      date: "June 22-23, 2023",
      instructor: "Sophie Chen",
      icon: "📐"
    },
    {
      title: "Architectural Photography",
      description: "Master the art of capturing buildings and spaces with professional architectural photographer.",
      tag: "All Levels",
      duration: "1 Day",
      date: "July 12, 2023",
      instructor: "David Wilson",
      icon: "📷"
    },
    {
      title: "Passive House Design Certification",
      description: "Comprehensive training on passive house standards and certification process.",
      tag: "Intermediate",
      duration: "4 Days",
      date: "August 8-11, 2023",
      instructor: "Olivia Zhang",
      icon: "🏠"
    },
    {
      title: "Urban Planning for Sustainable Communities",
      description: "Learn strategies for creating resilient, sustainable urban environments.",
      tag: "Advanced",
      duration: "3 Days",
      date: "July 19-21, 2023",
      instructor: "Robert Kim",
      icon: "🏙️"
    }
  ];

  return (
    <AnimatedSection>
      <div className="education-page-wrapper">
        <div className="education-content">
          <h1 className="education-title">Workshops & Training Programs</h1>
          <p className="education-description">
            Expand your skills and knowledge through our hands-on workshops and professional training programs. 
            Learn from industry experts and connect with fellow architects and designers.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Workshops Offered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Participants Trained</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">16</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
          </div>
          
          <h2 className="section-subtitle">Upcoming Workshops</h2>
          
          <div className="education-grid">
            {workshops.map((workshop, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">{workshop.icon}</div>
                <span className="education-tag">{workshop.tag}</span>
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="education-meta">
                  <span>{workshop.duration}</span>
                  <span>{workshop.date}</span>
                </div>
                <p className="education-instructor">Instructor: {workshop.instructor}</p>
              </div>
            ))}
          </div>
          
          <div className="info-section">
            <h2>Custom Corporate Training</h2>
            <p>
              We offer customized training programs for architecture firms and design teams. Our programs can be tailored 
              to your specific needs and delivered at your location or virtually. Topics range from software proficiency 
              to sustainable design practices and project management.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function TutorialsGuides() {
  const tutorials = [
    {
      title: "Revit for Architectural Documentation",
      description: "Complete guide to creating professional architectural documentation using Autodesk Revit.",
      category: "Software",
      level: "Beginner",
      format: "Video Series",
      icon: "📊"
    },
    {
      title: "Sustainable Material Selection",
      description: "Handbook for choosing eco-friendly materials that meet performance and aesthetic requirements.",
      category: "Materials",
      level: "Intermediate",
      format: "PDF Guide",
      icon: "🌿"
    },
    {
      title: "Architectural Rendering with V-Ray",
      description: "Step-by-step tutorial for creating photorealistic architectural visualizations.",
      category: "Visualization",
      level: "Advanced",
      format: "Video Tutorial",
      icon: "🎨"
    },
    {
      title: "Building Code Compliance",
      description: "Comprehensive reference for navigating building codes and regulations.",
      category: "Regulations",
      level: "All Levels",
      format: "Interactive Guide",
      icon: "📋"
    },
    {
      title: "Parametric Facade Design",
      description: "Advanced techniques for designing complex building envelopes using computational tools.",
      category: "Design",
      level: "Advanced",
      format: "Video Series",
      icon: "🏗️"
    },
    {
      title: "Client Presentation Techniques",
      description: "Strategies for effectively communicating design concepts to clients and stakeholders.",
      category: "Communication",
      level: "Intermediate",
      format: "Guidebook",
      icon: "🗣️"
    }
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Software', 'Design', 'Materials', 'Visualization', 'Regulations', 'Communication'];

  return (
    <AnimatedSection>
      <div className="education-page-wrapper">
        <div className="education-content">
          <h1 className="education-title">Tutorials & Learning Resources</h1>
          <p className="education-description">
            Access our comprehensive library of tutorials, guides, and learning materials designed to help architects 
            at all stages of their career develop new skills and deepen their expertise.
          </p>
          
          <div className="category-tabs">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="tutorials-list">
            {tutorials
              .filter(tutorial => activeCategory === 'All' || tutorial.category === activeCategory)
              .map((tutorial, index) => (
                <div key={index} className="tutorial-item">
                  <div className="tutorial-icon">{tutorial.icon}</div>
                  <div className="tutorial-content">
                    <h3>{tutorial.title}</h3>
                    <p>{tutorial.description}</p>
                    <div className="tutorial-meta">
                      <span>{tutorial.category}</span>
                      <span>{tutorial.level}</span>
                      <span>{tutorial.format}</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          
          <div className="info-section">
            <h2>Learning Pathways</h2>
            <p>
              Our structured learning pathways help you build skills systematically. Whether you're focusing on sustainable 
              design, computational methods, or project management, we have curated collections of resources to guide your 
              learning journey.
            </p>
            
            <div className="pathways-grid">
              <div className="pathway-item">Sustainable Design Path</div>
              <div className="pathway-item">BIM Specialist Path</div>
              <div className="pathway-item">Project Management Path</div>
              <div className="pathway-item">Digital Fabrication Path</div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Exhibitions() {
  const exhibitions = [
    {
      title: "Future Cities: Sustainable Urban Futures",
      description: "Exploring innovative approaches to urban design that address climate change and population growth.",
      date: "June 1 - August 31, 2023",
      location: "Main Gallery",
      curator: "Dr. Amanda Chen",
      icon: "🏙️"
    },
    {
      title: "Material Innovations in Architecture",
      description: "Showcasing cutting-edge materials and their applications in contemporary architecture.",
      date: "July 15 - September 15, 2023",
      location: "Materials Gallery",
      curator: "Prof. Michael Rodriguez",
      icon: "🧱"
    },
    {
      title: "Digital Fabrication: From Concept to Construction",
      description: "Exhibition of projects demonstrating advanced digital fabrication techniques.",
      date: "September 1 - November 30, 2023",
      location: "Technology Pavilion",
      curator: "Alexandra Wong",
      icon: "⚙️"
    },
    {
      title: "Women in Architecture: Pioneers and Innovators",
      description: "Celebrating the contributions of women architects throughout history and today.",
      date: "October 10 - December 20, 2023",
      location: "Heritage Hall",
      curator: "Sarah Johnson",
      icon: "👩‍💼"
    },
    {
      title: "Adaptive Reuse: Transforming Existing Structures",
      description: "Exhibition featuring innovative adaptive reuse projects from around the world.",
      date: "November 5, 2023 - January 15, 2024",
      location: "Main Gallery",
      curator: "David Kim",
      icon: "🔄"
    },
    {
      title: "Biomimicry in Architecture",
      description: "Exploring how nature-inspired design leads to more sustainable and efficient buildings.",
      date: "January 20 - March 30, 2024",
      location: "Nature & Design Pavilion",
      curator: "Elena Martinez",
      icon: "🌿"
    }
  ];

  return (
    <AnimatedSection>
      <div className="education-page-wrapper">
        <div className="education-content">
          <h1 className="education-title">Current & Upcoming Exhibitions</h1>
          <p className="education-description">
            Explore our rotating exhibitions that showcase innovative architectural projects, emerging trends, 
            and groundbreaking research in the field of architecture and design.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Current Exhibitions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Featured Architects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Exhibition Pieces</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Interactive Installations</span>
            </div>
          </div>
          
          <h2 className="section-subtitle">Exhibition Schedule</h2>
          
          <div className="education-grid">
            {exhibitions.map((exhibition, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">{exhibition.icon}</div>
                <h3>{exhibition.title}</h3>
                <p>{exhibition.description}</p>
                <div className="exhibition-details">
                  <p><strong>Dates:</strong> {exhibition.date}</p>
                  <p><strong>Location:</strong> {exhibition.location}</p>
                  <p><strong>Curated by:</strong> {exhibition.curator}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="info-section">
            <h2>Virtual Tours</h2>
            <p>
              Can't visit in person? Explore our exhibitions through immersive virtual tours that allow you to 
              experience the displays from anywhere in the world. Our virtual tours include curator commentary, 
              additional resources, and interactive elements.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function EducationOverview() {
  const upcomingEvents = [
    { date: "Jun 15", title: "Sustainable Design Workshop", time: "10:00 AM" },
    { date: "Jun 22", title: "Parametric Design Masterclass", time: "2:00 PM" },
    { date: "Jul 5", title: "BIM Implementation Training", time: "9:00 AM" },
    { date: "Jul 12", title: "Architectural Photography Workshop", time: "1:00 PM" }
  ];

  return (
    <AnimatedSection>
      <div className="education-page-wrapper">
        <div className="education-content overview-content">
          <h1 className="education-main-title">Education & Learning</h1>
          <p className="education-main-description">
            Expand your knowledge, develop new skills, and stay at the forefront of architectural innovation 
            through our comprehensive educational programs, resources, and exhibitions.
          </p>

          <div className="education-navigation">
            <Link to="workshops-training" className="nav-link">Workshops</Link>
            <Link to="tutorials-guides" className="nav-link">Tutorials</Link>
            <Link to="exhibitions" className="nav-link">Exhibitions</Link>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Learning Resources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Workshops per Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Annual Exhibitions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
          
          <div className="events-section">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date">{event.date}</div>
                  <h3>{event.title}</h3>
                  <p>{event.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="membership-section">
            <h2>Learning Membership</h2>
            <p>
              Join our learning membership program for unlimited access to all resources, exclusive workshops, 
              and priority registration for exhibitions and events. Choose from individual or organizational 
              membership options.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Education() {
  return (
    <div className="education-container">
      <Routes>
        <Route path="workshops-training" element={<WorkshopsTraining />} />
        <Route path="tutorials-guides" element={<TutorialsGuides />} />
        <Route path="exhibitions" element={<Exhibitions />} />
        <Route path="*" element={<EducationOverview />} />
      </Routes>

      <style>
        {`
        .education-container {
          min-height: 100vh;
        }

        .education-page-wrapper {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .education-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .overview-content {
          text-align: center;
        }

        .education-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .education-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .education-description {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .education-main-description {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        .section-subtitle {
          color: #1f2937;
          font-size: 1.4rem;
          margin: 2.5rem 0 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .education-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .education-card:hover {
          transform: translateY(-5px);
        }

        .education-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .education-tag {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: #f3f4f6;
          color: #1f2937;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .education-card h3 {
          font-size: 1.2rem;
          color: #1f2937;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .education-card p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .education-meta {
          display: flex;
          justify-content: space-between;
          color: #6b7280;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .education-instructor {
          color: #6b7280;
          font-size: 0.9rem;
          font-style: italic;
        }

        .exhibition-details p {
          margin: 0.5rem 0;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .info-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-top: 2.5rem;
          border: 1px solid #f3f4f6;
        }

        .info-section h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .info-section p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .category-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-tab {
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .category-tab.active {
          background: #1f2937;
          color: white;
          border-color: #1f2937;
        }

        .category-tab:hover {
          border-color: #1f2937;
          color: #1f2937;
        }

        .tutorials-list {
          margin: 2rem 0;
        }

        .tutorial-item {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          border: 1px solid #f3f4f6;
        }

        .tutorial-icon {
          font-size: 1.5rem;
          margin-top: 0.25rem;
        }

        .tutorial-content {
          flex: 1;
        }

        .tutorial-content h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .tutorial-content p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .tutorial-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .pathways-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .pathway-item {
          background: #f3f4f6;
          color: #1f2937;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .education-navigation {
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

        .events-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin: 2.5rem 0;
          border: 1px solid #f3f4f6;
        }

        .events-section h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .event-item {
          background: #f8f9fa;
          padding: 1.2rem;
          border-radius: 8px;
          text-align: center;
        }

        .event-date {
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .event-item h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .event-item p {
          color: #6b7280;
          margin: 0;
          font-size: 0.9rem;
        }

        .membership-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-top: 2.5rem;
          border: 1px solid #f3f4f6;
        }

        .membership-section h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .membership-section p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .education-page-wrapper {
            padding: 7rem 1rem 1rem;
          }
          
          .education-main-title {
            font-size: 2rem;
          }
          
          .education-title {
            font-size: 1.8rem;
          }
          
          .education-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .education-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .category-tabs {
            flex-direction: column;
            align-items: center;
          }
          
          .tutorial-item {
            flex-direction: column;
            text-align: center;
          }
          
          .tutorial-meta {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .events-grid {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Education;