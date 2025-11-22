import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";
import Hero from "../components/Hero";
import HomeNavbar from "../components/HomeNavbar";
import TruncatedText from "../components/TruncatedText";
import { API_ENDPOINTS } from "../config/api";

function Home() {
    const [activeTab, setActiveTab] = useState("featured");
    const [allDesigns, setAllDesigns] = useState([]);
    const [researchHighlights, setResearchHighlights] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState("");

    // Fetch all home page data
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                setError(null);
                setDataSource("");

                // Fetch ALL design projects
                console.log(
                    "🔍 Fetching all design projects from:",
                    API_ENDPOINTS.DESIGN_PROJECTS.ALL_PROJECTS
                );

                const response = await fetch(
                    API_ENDPOINTS.DESIGN_PROJECTS.ALL_PROJECTS
                );
                console.log(
                    "📡 Response status:",
                    response.status,
                    response.statusText
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("✅ All projects data received:", result);

                if (result.success) {
                    setAllDesigns(result.data || []);
                    setDataSource("Live data from backend");

                    console.log("🎉 All projects loaded successfully:", {
                        designs: result.data?.length,
                    });
                } else {
                    throw new Error(
                        result.message || "Failed to fetch design projects"
                    );
                }

                // Fetch Research Insights
                console.log(
                    "🔍 Fetching research articles from:",
                    API_ENDPOINTS.RESEARCH.ARTICLES
                );
                try {
                    const researchResponse = await fetch(
                        API_ENDPOINTS.RESEARCH.ARTICLES
                    );
                    if (researchResponse.ok) {
                        const researchData = await researchResponse.json();
                        console.log("✅ Research data received:", researchData);
                        
                        // Format research data and take only first 3 articles for home page
                        const articles = (researchData.data || researchData || [])
                            .slice(0, 3)
                            .map(article => ({
                                id: article.id,
                                title: article.title,
                                author: article.author || "ASPIRE Design Lab",
                                date: article.year || article.date || new Date().getFullYear(),
                                excerpt: article.description || article.excerpt || ""
                            }));
                        
                        setResearchHighlights(articles);
                    } else {
                        console.log("⚠️ Research endpoint not available");
                        setResearchHighlights([]);
                    }
                } catch (researchErr) {
                    console.log("⚠️ Could not fetch research:", researchErr);
                    setResearchHighlights([]);
                }

                // Fetch Upcoming Events
                console.log(
                    "🔍 Fetching events from:",
                    API_ENDPOINTS.NEWS_EVENTS.EVENTS
                );
                try {
                    const eventsResponse = await fetch(
                        API_ENDPOINTS.NEWS_EVENTS.EVENTS
                    );
                    if (eventsResponse.ok) {
                        const eventsData = await eventsResponse.json();
                        console.log("✅ Events data received:", eventsData);
                        
                        // Filter for upcoming events and take first 3
                        const events = eventsData.data || eventsData || [];
                        const upcomingOnly = events
                            .filter(event => {
                                const eventDate = new Date(event.eventDate || event.date);
                                return eventDate >= new Date();
                            })
                            .slice(0, 3)
                            .map(event => ({
                                id: event.id,
                                title: event.title,
                                date: event.eventDate || event.date,
                                time: event.eventTime || event.time || "TBA",
                                location: event.location || "TBA",
                                image: event.image || "/images/event-placeholder.jpg"
                            }));
                        
                        setUpcomingEvents(upcomingOnly);
                    } else {
                        console.log("⚠️ Events endpoint not available");
                        setUpcomingEvents([]);
                    }
                } catch (eventsErr) {
                    console.log("⚠️ Could not fetch events:", eventsErr);
                    setUpcomingEvents([]);
                }
            } catch (err) {
                console.error("❌ Error fetching Home data:", err);
                setError(err.message);
                setDataSource("Database connection issue - no data available");

                // No fallback mock data - keep arrays empty
                setAllDesigns([]);
                setResearchHighlights([]);
                setUpcomingEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Format date for event display
    const formatEventDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return {
                day: date.getDate(),
                month: date
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase(),
            };
        } catch (error) {
            return {
                day: "15",
                month: "JUN",
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
                        <SkeletonLoader type="card" count={6} />
                    </div>
                </AnimatedSection>
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
                    {/* Show error banner if there was an error */}
                    {error && (
                        <div className="error-banner">
                            <div className="error-banner-content">
                                <strong>Backend Connection Issue:</strong>{" "}
                                {error}
                                <br />
                                <small>
                                    Showing demo data. Make sure your backend
                                    server is running.
                                </small>
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
                            Explore our latest architectural projects and
                            innovations
                        </p>
                    </div>

                    {allDesigns.length > 0 ? (
                        <>
                            <div className="designs-grid">
                                {allDesigns.map((design) => {
                                    // Debug: Log the design data
                                    console.log("Design data:", {
                                        id: design.id,
                                        title: design.title,
                                        main_image: design.main_image,
                                        category: design.category,
                                        summary: design.summary,
                                    });

                                    // Handle image URL
                                    let imageUrl;

                                    // Check if main_image exists and is not null
                                    if (!design.main_image) {
                                        imageUrl =
                                            design.image ||
                                            "/images/placeholder.jpg";
                                    }
                                    // If it's a data URL (base64), use it directly
                                    else if (
                                        design.main_image.startsWith("data:")
                                    ) {
                                        imageUrl = design.main_image;
                                    }
                                    // If it's already a full HTTP URL, use it directly
                                    else if (
                                        design.main_image.startsWith("http")
                                    ) {
                                        imageUrl = design.main_image;
                                    }
                                    // If it starts with /uploads, prepend backend URL
                                    else if (
                                        design.main_image.startsWith("/uploads")
                                    ) {
                                        const backendUrl =
                                            window.location.hostname ===
                                            "localhost"
                                                ? "http://localhost:4000"
                                                : "https://aspire-arch-server.onrender.com";
                                        imageUrl = `${backendUrl}${design.main_image}`;
                                    }
                                    // Otherwise, assume it's a relative path and prepend backend URL
                                    else {
                                        const backendUrl =
                                            window.location.hostname ===
                                            "localhost"
                                                ? "http://localhost:4000"
                                                : "https://aspire-arch-server.onrender.com";
                                        imageUrl = `${backendUrl}/${design.main_image}`;
                                    }

                                    console.log(
                                        "Constructed imageUrl:",
                                        imageUrl
                                    );

                                    return (
                                        <div
                                            key={design.id}
                                            className="design-card"
                                        >
                                            <div className="design-image">
                                                <img
                                                    src={imageUrl}
                                                    alt={design.title}
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "/images/placeholder.jpg";
                                                    }}
                                                />
                                                <span className="design-type">
                                                    {design.category ||
                                                        design.type ||
                                                        "Design"}
                                                </span>
                                            </div>
                                            <div className="design-content">
                                                <h3>{design.title}</h3>
                                                <TruncatedText
                                                    text={
                                                        design.summary ||
                                                        design.description ||
                                                        "No description available"
                                                    }
                                                    maxLines={4}
                                                />
                                                <Link
                                                    to={`/design/project/${design.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="view-project-btn">
                                                        View Project →
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* View More Button */}
                            <div className="view-more-section">
                                <Link to="/design" className="view-more-link">
                                    <button className="view-more-btn">
                                        <span>View All Projects</span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="no-data-message">
                            <p>No featured designs available at the moment.</p>
                        </div>
                    )}

                    <div className="section-divider"></div>

                    <div className="section-header">
                        <h2>Research & Insights</h2>
                        <p>
                            Latest findings and thought leadership in
                            architecture
                        </p>
                    </div>

                    {researchHighlights.length > 0 ? (
                        <div className="research-grid">
                            {researchHighlights.map((research) => (
                                <div
                                    key={research.id}
                                    className="research-card"
                                >
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
                                        <TruncatedText
                                            text={research.excerpt || "No excerpt available"}
                                            maxLines={4}
                                        />
                                        <button className="read-more-btn">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-data-message">
                            <p>
                                No research highlights available at the moment.
                            </p>
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
                                const formattedDate = formatEventDate(
                                    event.date
                                );
                                return (
                                    <div key={event.id} className="event-card">
                                        <div className="event-image">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/images/event-placeholder.jpg";
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
                                                    <span>
                                                        {event.location}
                                                    </span>
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
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
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

        /* View More Section */
        .view-more-section {
          text-align: center;
          margin: 3rem 0;
        }

        .view-more-link {
          text-decoration: none;
        }

        .view-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #8A6D3B, #B08C4D);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(138, 109, 59, 0.3);
        }

        .view-more-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(138, 109, 59, 0.5);
          background: linear-gradient(135deg, #B08C4D, #8A6D3B);
        }

        .view-more-btn svg {
          transition: transform 0.3s ease;
        }

        .view-more-btn:hover svg {
          transform: translateX(5px);
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

        @media (min-width: 769px) and (max-width: 1024px) {
          .designs-grid, .research-grid, .events-grid {
            grid-template-columns: repeat(2, 1fr);
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
