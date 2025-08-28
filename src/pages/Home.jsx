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
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <span className="event-time">{event.time}</span>
                    <span className="event-location">{event.location}</span>
                  </div>
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
          padding: 3rem 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e5e7eb, transparent);
          margin: 4rem 0;
        }

        .designs-grid, .research-grid, .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .design-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .design-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .design-image {
          position: relative;
          height: 250px;
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
          top: 15px;
          right: 15px;
          background: #f97316;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .design-content {
          padding: 1.5rem;
        }

        .design-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .design-content p {
          color: #6b7280;
          line-height: 1.6;
        }

        .research-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .research-card:hover {
          transform: translateY(-3px);
        }

        .research-content h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .research-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .research-excerpt {
          color: #6b7280;
          line-height: 1.6;
        }

        .event-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-3px);
        }

        .event-image {
          position: relative;
          height: 200px;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-date {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #f97316;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .event-content {
          padding: 1.5rem;
        }

        .event-content h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .stats-section {
          margin-top: 4rem;
          padding: 3rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          padding: 2rem;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #f97316;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .home-content {
            padding: 2rem 1rem;
          }
          
          .section-header h2 {
            font-size: 2rem;
          }
          
          .designs-grid, .research-grid, .events-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Home;