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
      excerpt: "Exploring how natural elements in urban design improve wellbeing and environmental performance..."
    },
    {
      id: 2,
      title: "Sustainable Materials in Modern Architecture",
      author: "Michael Chen",
      date: "April 2023",
      excerpt: "Analysis of innovative sustainable materials and their application in contemporary building design..."
    },
    {
      id: 3,
      title: "Adaptive Reuse of Industrial Spaces",
      author: "Sarah Johnson",
      date: "March 2023",
      excerpt: "Transforming former industrial buildings into vibrant community spaces while preserving heritage..."
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
          <div className="section-tabs">
            <button 
              className={`tab-btn ${activeTab === "featured" ? "active" : ""}`}
              onClick={() => setActiveTab("featured")}
            >
              Featured Designs
            </button>
            <button 
              className={`tab-btn ${activeTab === "research" ? "active" : ""}`}
              onClick={() => setActiveTab("research")}
            >
              Research
            </button>
            <button 
              className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "featured" && (
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
            )}

            {activeTab === "research" && (
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
                      <button className="read-more-btn">Read Paper →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "events" && (
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
                      <button className="register-btn">Register Now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          <div className="quick-links">
            <div className="quick-link-card">
              <div className="link-icon">🏢</div>
              <h3>View Projects</h3>
              <p>Explore our portfolio of architectural designs</p>
              <button className="link-btn">Browse Portfolio →</button>
            </div>
            
            <div className="quick-link-card">
              <div className="link-icon">👥</div>
              <h3>Meet the Team</h3>
              <p>Get to know our architects and designers</p>
              <button className="link-btn">Learn More →</button>
            </div>
            
            <div className="quick-link-card">
              <div className="link-icon">📞</div>
              <h3>Get in Touch</h3>
              <p>Start a conversation about your project</p>
              <button className="link-btn">Contact Us →</button>
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

        .section-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 12px 24px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .tab-btn.active {
          background: #f97316;
          border-color: #f97316;
          color: white;
        }

        .designs-grid, .research-grid, .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .design-card {
          background: white;
          border-radius: 12px;
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
          margin-bottom: 1.5rem;
        }

        .view-project-btn {
          background: none;
          border: none;
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .view-project-btn:hover {
          color: #ea580c;
        }

        .research-card {
          background: white;
          border-radius: 12px;
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
          margin-bottom: 1.5rem;
        }

        .read-more-btn {
          background: none;
          border: none;
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover {
          color: #ea580c;
        }

        .event-card {
          background: white;
          border-radius: 12px;
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
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .register-btn {
          background: #f97316;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .register-btn:hover {
          background: #ea580c;
        }

        .quick-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .quick-link-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
        }

        .link-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .quick-link-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .quick-link-card p {
          color: #6b7280;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .link-btn {
          background: #f97316;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .link-btn:hover {
          background: #ea580c;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .home-content {
            padding: 1rem;
          }
          
          .section-tabs {
            flex-direction: column;
            align-items: center;
          }
          
          .designs-grid, .research-grid, .events-grid {
            grid-template-columns: 1fr;
          }
          
          .quick-links {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Home;