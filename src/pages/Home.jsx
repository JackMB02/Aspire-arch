import { useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Hero from "../components/Hero";
import HomeNavbar from "../components/HomeNavbar";
import { API_ENDPOINTS } from '../config/api';

function Home() {
    const [activeTab, setActiveTab] = useState("featured");
    const [featuredDesigns, setFeaturedDesigns] = useState([]);
    const [researchHighlights, setResearchHighlights] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('');

    // Fetch all home page data
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                setError(null);
                setDataSource('');
                console.log('🔍 Fetching home page data from:', API_ENDPOINTS.HOME);

                const response = await fetch(API_ENDPOINTS.HOME);
                console.log('📡 Response status:', response.status, response.statusText);
                
                // Check if response is HTML (error page) instead of JSON
                const contentType = response.headers.get('content-type');
                console.log('📄 Content-Type:', contentType);
                
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('❌ Received non-JSON response:', text.substring(0, 200));
                    throw new Error(`Server returned HTML instead of JSON. Backend might not be running.`);
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('✅ Data received:', result);
                
                if (result.success) {
                    setFeaturedDesigns(result.data.featuredDesigns || []);
                    setResearchHighlights(result.data.researchHighlights || []);
                    setUpcomingEvents(result.data.upcomingEvents || []);
                    setDataSource(result.message || 'Live data from backend');
                    
                    console.log('🎉 Data loaded successfully:', {
                        designs: result.data.featuredDesigns?.length,
                        research: result.data.researchHighlights?.length,
                        events: result.data.upcomingEvents?.length,
                        source: result.message
                    });
                } else {
                    throw new Error(result.message || 'Failed to fetch data');
                }

            } catch (err) {
                console.error('💥 Error fetching home data:', err);
                setError(err.message);
                setDataSource('Using demo data due to connection issues');
                
                // Fallback to mock data for now
                setFeaturedDesigns(getMockFeaturedDesigns());
                setResearchHighlights(getMockResearchHighlights());
                setUpcomingEvents(getMockUpcomingEvents());
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Mock data fallback
    const getMockFeaturedDesigns = () => [
        {
            id: 1,
            title: "Urban Green Park",
            type: "Public Space",
            image: "/images/park.jpg",
            description: "Sustainable urban park design integrating native vegetation and community spaces",
        },
        {
            id: 2,
            title: "Modern Campus Library", 
            type: "Educational",
            image: "/images/library.jpg",
            description: "Innovative learning environment with sustainable features and flexible spaces",
        },
        {
            id: 3,
            title: "Luxury Residential Villa",
            type: "Residential", 
            image: "/images/villa.jpg",
            description: "Contemporary villa blending modern architecture with natural landscapes",
        },
    ];

    const getMockResearchHighlights = () => [
        {
            id: 1,
            title: "Biophilic Design in Urban Environments",
            author: "Dr. Elena Rodriguez",
            date: "May 2023",
            excerpt: "Exploring how natural elements in urban design improve wellbeing and environmental performance through integrated green spaces and natural materials.",
        },
        {
            id: 2,
            title: "Sustainable Materials in Modern Architecture",
            author: "Michael Chen", 
            date: "April 2023",
            excerpt: "Analysis of innovative sustainable materials and their application in contemporary building design, focusing on lifecycle assessment and environmental impact.",
        },
        {
            id: 3,
            title: "Adaptive Reuse of Industrial Spaces",
            author: "Sarah Johnson",
            date: "March 2023",
            excerpt: "Transforming former industrial buildings into vibrant community spaces while preserving architectural heritage and reducing construction waste.",
        },
    ];

    const getMockUpcomingEvents = () => [
        {
            id: 1,
            title: "Architecture Exhibition Opening",
            date: "2023-06-15",
            time: "6:00 PM",
            location: "City Art Gallery",
            image: "/images/exhibition.jpg",
        },
        {
            id: 2,
            title: "Sustainable Design Workshop", 
            date: "2023-06-22",
            time: "2:00 PM", 
            location: "Community Center",
            image: "/images/workshop.jpg",
        },
        {
            id: 3,
            title: "Urban Planning Conference",
            date: "2023-07-05",
            time: "9:00 AM",
            location: "Convention Center", 
            image: "/images/conference.jpg",
        },
    ];

    // Format date for event display
    const formatEventDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return {
                day: date.getDate(),
                month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
            };
        } catch (error) {
            return {
                day: '15',
                month: 'JUN'
            };
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="home-page">
                <Hero />
                <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                    <HomeNavbar />
                </div>
                <AnimatedSection>
                    <div className="home-content">
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading content from backend...</p>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                                Connecting to: {API_ENDPOINTS.HOME}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
                <style>
                    {`
                    .loading-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 4rem 2rem;
                        color: rgba(255, 255, 255, 0.7);
                        text-align: center;
                    }
                    
                    .loading-spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-top: 3px solid #8A6D3B;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Hero />

            {/* Sticky Navbar positioned after Hero */}
            <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <HomeNavbar />
            </div>

            <AnimatedSection>
                <div className="home-content">
                    {/* Data source indicator */}
                    {dataSource && (
                        <div className="data-source-indicator">
                            <span className="data-source-badge">ℹ️</span>
                            <span>{dataSource}</span>
                        </div>
                    )}

                    {/* Show error banner if there was an error */}
                    {error && (
                        <div className="error-banner">
                            <div className="error-banner-content">
                                <strong>Backend Connection Issue:</strong> {error}
                                <br />
                                <small>Showing demo data. Make sure your backend server is running.</small>
                                <button 
                                    className="retry-btn-small"
                                    onClick={() => window.location.reload()}
                                >
                                    Retry Connection
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="section-header">
                        <h2>Featured Work</h2>
                        <p>
                            Explore our latest architectural projects and innovations
                        </p>
                    </div>

                    {featuredDesigns.length > 0 ? (
                        <div className="designs-grid">
                            {featuredDesigns.map((design) => (
                                <div key={design.id} className="design-card">
                                    <div className="design-image">
                                        <img
                                            src={design.image}
                                            alt={design.title}
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        <span className="design-type">
                                            {design.type}
                                        </span>
                                    </div>
                                    <div className="design-content">
                                        <h3>{design.title}</h3>
                                        <p>{design.description}</p>
                                        <button className="view-project-btn">
                                            View Project →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-data-message">
                            <p>No featured designs available at the moment.</p>
                        </div>
                    )}

                    <div className="section-divider"></div>

                    <div className="section-header">
                        <h2>Research & Insights</h2>
                        <p>
                            Latest findings and thought leadership in architecture
                        </p>
                    </div>

                    {researchHighlights.length > 0 ? (
                        <div className="research-grid">
                            {researchHighlights.map((research) => (
                                <div key={research.id} className="research-card">
                                    <div className="research-content">
                                        <h3>{research.title}</h3>
                                        <div className="research-meta">
                                            <span className="research-author">
                                                By {research.author}
                                            </span>
                                            <span className="research-date">
                                                {research.date}
                                            </span>
                                        </div>
                                        <p className="research-excerpt">
                                            {research.excerpt}
                                        </p>
                                        <button className="read-more-btn">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-data-message">
                            <p>No research highlights available at the moment.</p>
                        </div>
                    )}

                    <div className="section-divider"></div>

                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <p>
                            Join us for exhibitions, workshops, and conferences
                        </p>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="events-grid">
                            {upcomingEvents.map((event) => {
                                const formattedDate = formatEventDate(event.date);
                                return (
                                    <div key={event.id} className="event-card">
                                        <div className="event-image">
                                            <img 
                                                src={event.image} 
                                                alt={event.title}
                                                onError={(e) => {
                                                    e.target.src = '/images/event-placeholder.jpg';
                                                }}
                                            />
                                            <div className="event-date-overlay">
                                                <span className="event-day">
                                                    {formattedDate.day}
                                                </span>
                                                <span className="event-month">
                                                    {formattedDate.month}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="event-content">
                                            <h3>{event.title}</h3>
                                            <div className="event-details">
                                                <div className="event-info">
                                                    <span className="event-icon">
                                                        ⏰
                                                    </span>
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="event-info">
                                                    <span className="event-icon">
                                                        📍
                                                    </span>
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                            <button className="rsvp-btn">
                                                RSVP Now
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-data-message">
                            <p>No upcoming events scheduled at the moment.</p>
                        </div>
                    )}
                </div>
            </AnimatedSection>

            <style>
                {`
        .home-page {
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .home-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .data-source-indicator {
          background: rgba(138, 109, 59, 0.1);
          border: 1px solid rgba(138, 109, 59, 0.3);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .data-source-badge {
          background: #8A6D3B;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .error-banner {
          background: rgba(178, 34, 34, 0.1);
          border: 1px solid rgba(178, 34, 34, 0.3);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .error-banner-content {
          text-align: center;
        }

        .retry-btn-small {
          background: #8A6D3B;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .retry-btn-small:hover {
          background: #B08C4D;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.8rem;
          letter-spacing: -0.5px;
        }

        .section-header p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
          margin: 3rem 0;
        }

        .designs-grid, .research-grid, .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .design-card {
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .design-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          background: rgba(255, 255, 255, 0.08);
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
          background: #8A6D3B;
          color: white;
          padding: 4px 10px;
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
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        .design-content p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .view-project-btn {
          background: transparent;
          color: #8A6D3B;
          border: none;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .view-project-btn:hover {
          color: #B08C4D;
        }

        .research-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .research-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          background: rgba(255, 255, 255, 0.08);
        }

        .research-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          line-height: 1.4;
        }

        .research-meta {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .research-excerpt {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .read-more-btn {
          background: transparent;
          color: #8A6D3B;
          border: none;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover {
          color: #B08C4D;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .event-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          background: rgba(255, 255, 255, 0.08);
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
          background: #8A6D3B;
          color: white;
          padding: 8px;
          text-align: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
          color: rgba(255, 255, 255, 0.9);
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
          color: rgba(255, 255, 255, 0.7);
        }

        .event-icon {
          font-size: 0.75rem;
        }

        .rsvp-btn {
          width: 100%;
          background: #8A6D3B;
          color: white;
          border: none;
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .rsvp-btn:hover {
          background: #B08C4D;
        }

        .no-data-message {
          text-align: center;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
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
        }

        @media (max-width: 480px) {
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