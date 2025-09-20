import { useState } from "react";
import AnimatedSection from '../components/AnimatedSection';
import Hero from '../components/Hero';

function Home() {
  const [activeTab, setActiveTab] = useState("featured");

  const featuredDesigns = [
    {
      id: 1,
      title: "Urban Green Park",
      type: "Public Space",
      image: "/images/park.jpg",
      description: "Sustainable urban park design integrating native vegetation and community spaces"
    },
    {
      id: 2,
      title: "Modern Campus Library",
      type: "Educational",
      image: "/images/library.jpg",
      description: "Innovative learning environment with sustainable features and flexible spaces"
    },
    {
      id: 3,
      title: "Luxury Residential Villa",
      type: "Residential",
      image: "/images/villa.jpg",
      description: "Contemporary villa blending modern architecture with natural landscapes"
    }
  ];

  const researchHighlights = [
    {
      id: 1,
      title: "Biophilic Design in Urban Environments",
      author: "Dr. Elena Rodriguez",
      date: "May 2023",
      excerpt: "Exploring how natural elements in urban design improve wellbeing and environmental performance through integrated green spaces and natural materials."
    },
    {
      id: 2,
      title: "Sustainable Materials in Modern Architecture",
      author: "Michael Chen",
      date: "April 2023",
      excerpt: "Analysis of innovative sustainable materials and their application in contemporary building design, focusing on lifecycle assessment and environmental impact."
    },
    {
      id: 3,
      title: "Adaptive Reuse of Industrial Spaces",
      author: "Sarah Johnson",
      date: "March 2023",
      excerpt: "Transforming former industrial buildings into vibrant community spaces while preserving architectural heritage and reducing construction waste."
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Architecture Exhibition Opening",
      date: "June 15, 2023",
      time: "6:00 PM",
      location: "City Art Gallery",
      image: "/images/exhibition.jpg"
    },
    {
      id: 2,
      title: "Sustainable Design Workshop",
      date: "June 22, 2023",
      time: "2:00 PM",
      location: "Community Center",
      image: "/images/workshop.jpg"
    },
    {
      id: 3,
      title: "Urban Planning Conference",
      date: "July 5-6, 2023",
      time: "9:00 AM",
      location: "Convention Center",
      image: "/images/conference.jpg"
    }
  ];

  return (
    <div className="home-page">
      <Hero />
      
      <AnimatedSection>
        <div className="home-content">
          <div className="section-header">
            <h2>Featured Work</h2>
            <p>Explore our latest architectural projects and innovations</p>
          </div>

          <div className="designs-grid">
            {featuredDesigns.map(design => (
              <div key={design.id} className="design-card">
                <div className="design-image">
                  <img src={design.image} alt={design.title} />
                  <span className="design-type">{design.type}</span>
                </div>
                <div className="design-content">
                  <h3>{design.title}</h3>
                  <p>{design.description}</p>
                  <button className="view-project-btn">View Project →</button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2>Research & Insights</h2>
            <p>Latest findings and thought leadership in architecture</p>
          </div>

          <div className="research-grid">
            {researchHighlights.map(research => (
              <div key={research.id} className="research-card">
                <div className="research-content">
                  <h3>{research.title}</h3>
                  <div className="research-meta">
                    <span className="research-author">By {research.author}</span>
                    <span className="research-date">{research.date}</span>
                  </div>
                  <p className="research-excerpt">{research.excerpt}</p>
                  <button className="read-more-btn">Read More →</button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-divider"></div>

          <div className="section-header">
            <h2>Upcoming Events</h2>
            <p>Join us for exhibitions, workshops, and conferences</p>
          </div>

          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date-overlay">
                    <span className="event-day">15</span>
                    <span className="event-month">JUN</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <div className="event-info">
                      <span className="event-icon">⏰</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="event-info">
                      <span className="event-icon">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="rsvp-btn">RSVP Now</button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">International Awards</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <style>
        {`
        .home-page {
          min-height: 100vh;
        }

        .home-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.8rem;
          letter-spacing: -0.5px;
        }

        .section-header p {
          font-size: 1rem;
          color: #6b7280;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e5e7eb, transparent);
          margin: 3rem 0;
        }

        .designs-grid, .research-grid, .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .design-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .design-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .design-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .design-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .design-card:hover .design-image img {
          transform: scale(1.05);
        }

        .design-type {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(249, 115, 22, 0.95);
          color: white;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 600;
          backdrop-filter: blur(4px);
        }

        .design-content {
          padding: 1.2rem;
        }

        .design-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.6rem;
          color: #1f2937;
          font-weight: 600;
        }

        .design-content p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .view-project-btn {
          background: transparent;
          color: #f97316;
          border: none;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .view-project-btn:hover {
          color: #ea580c;
        }

        .research-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .research-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .research-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
          color: #1f2937;
          font-weight: 600;
          line-height: 1.4;
        }

        .research-meta {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .research-excerpt {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .read-more-btn {
          background: transparent;
          color: #f97316;
          border: none;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover {
          color: #ea580c;
        }

        .event-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .event-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .event-image {
          position: relative;
          height: 160px;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-date-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.95);
          color: #1f2937;
          padding: 8px;
          border-radius: 8px;
          text-align: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .event-day {
          display: block;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1;
        }

        .event-month {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .event-content {
          padding: 1.2rem;
        }

        .event-content h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #1f2937;
          font-weight: 600;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .event-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .event-icon {
          font-size: 0.75rem;
        }

        .rsvp-btn {
          width: 100%;
          background: #f97316;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .rsvp-btn:hover {
          background: #ea580c;
        }

        .stats-section {
          margin-top: 3rem;
          padding: 2.5rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          text-align: center;
        }

        .stat-item {
          padding: 1rem;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #f97316;
          margin-bottom: 0.4rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .home-content {
            padding: 1.5rem 1rem;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
          
          .designs-grid, .research-grid, .events-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .section-header h2 {
            font-size: 1.6rem;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Home;