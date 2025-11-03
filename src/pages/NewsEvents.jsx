import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";

function NewsEvents() {
    const [activeFilter, setActiveFilter] = useState("all");

    const newsArticles = [
        {
            id: 1,
            title: "New Sustainable Architecture Award",
            date: "May 15, 2023",
            author: "Sarah Johnson",
            excerpt:
                "Sustainable design recognition for Urban Green Park project",
            image: "/images/park.jpg",
            category: "news",
            readTime: "3 min read",
            content:
                "Aspire Architecture awarded for innovative sustainable design work.",
        },
        {
            id: 2,
            title: "Future of Urban Living Conference",
            date: "June 2, 2023",
            author: "Michael Chen",
            excerpt:
                "Architects discuss sustainable urban development",
            image: "/images/conference.jpg",
            category: "event",
            readTime: "5 min read",
            content:
                "Conference on sustainable urban living approaches.",
        },
        {
            id: 3,
            title: "Construction Begins on Modern Campus Library",
            date: "April 28, 2023",
            author: "James Wilson",
            excerpt:
                "Construction starts on innovative campus library design",
            image: "/images/library.jpg",
            category: "news",
            readTime: "4 min read",
            content:
                "Modern Campus Library construction commenced at Northwood University.",
        },
        {
            id: 4,
            title: "Design Workshop: Community Spaces",
            date: "June 15, 2023",
            author: "Lisa Martinez",
            excerpt:
                "Workshop on designing community-centered spaces",
            image: "/images/workshop.jpg",
            category: "event",
            readTime: "2 min read",
            content:
                "Interactive workshop on community space design approaches.",
        },
    ];

    const filteredArticles =
        activeFilter === "all"
            ? newsArticles
            : newsArticles.filter(
                  (article) => article.category === activeFilter
              );

    return (
        <div
            className="news-events-page"
            style={{
                background: "var(--primary-dark)",
                minHeight: "100vh",
                color: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <AnimatedSection>
                <div className="news-page-wrapper">
                    <h1 className="news-page-title">News & Events</h1>
                    <p className="news-page-description">
                        Stay updated with our latest projects, achievements, and
                        upcoming events. Explore our architectural journey and
                        connect with us.
                    </p>

                    <div className="news-filters">
                        <button
                            className={`filter-btn ${
                                activeFilter === "all" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${
                                activeFilter === "news" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("news")}
                        >
                            News
                        </button>
                        <button
                            className={`filter-btn ${
                                activeFilter === "event" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("event")}
                        >
                            Events
                        </button>
                    </div>

                    <div className="news-grid">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="news-card">
                                <div className="news-image">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                    />
                                    <span
                                        className={`news-badge ${article.category}`}
                                    >
                                        {article.category === "news"
                                            ? "News"
                                            : "Event"}
                                    </span>
                                </div>
                                <div className="news-content">
                                    <h3 className="news-card-title">
                                        {article.title}
                                    </h3>
                                    <div className="news-meta">
                                        <span className="news-date">
                                            {article.date}
                                        </span>
                                    </div>
                                    <p className="news-excerpt">
                                        {article.excerpt}
                                    </p>
                                    <p className="news-full-content">
                                        {article.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Featured Projects Section */}
            <AnimatedSection>
                <div className="featured-projects">
                    <h2>Featured Projects</h2>
                    <div className="projects-grid">
                        <div className="project-card">
                            <img
                                src="/images/park.jpg"
                                alt="Urban Green Park"
                            />
                            <h3>Urban Green Park</h3>
                            <p>
                                Award-winning sustainable park design that
                                incorporates native vegetation and eco-friendly
                                systems.
                            </p>
                        </div>
                        <div className="project-card">
                            <img
                                src="/images/library.jpg"
                                alt="Modern Campus Library"
                            />
                            <h3>Modern Campus Library</h3>
                            <p>
                                State-of-the-art academic facility with
                                innovative glass façade and energy-efficient
                                design.
                            </p>
                        </div>
                        <div className="project-card">
                            <img
                                src="/images/housing.jpg"
                                alt="Eco Housing Complex"
                            />
                            <h3>Eco Housing Complex</h3>
                            <p>
                                Sustainable residential development with green
                                roofs and renewable energy integration.
                            </p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Upcoming Events Section */}
            <AnimatedSection>
                <div className="upcoming-events">
                    <h2>Upcoming Events</h2>
                    <div className="events-list">
                        <div className="event-item">
                            <div className="event-date">
                                <span className="event-day">15</span>
                                <span className="event-month">Jun</span>
                            </div>
                            <div className="event-details">
                                <h3>Design Workshop: Community Spaces</h3>
                                <p>Interactive session on creating public areas</p>
                                <span className="event-time">10:00 AM - 4:00 PM</span>
                            </div>
                        </div>
                        <div className="event-item">
                            <div className="event-date">
                                <span className="event-day">22</span>
                                <span className="event-month">Jun</span>
                            </div>
                            <div className="event-details">
                                <h3>Sustainable Architecture Tour</h3>
                                <p>Guided tour of eco-friendly projects</p>
                                <span className="event-time">2:00 PM - 5:00 PM</span>
                            </div>
                        </div>
                        <div className="event-item">
                            <div className="event-date">
                                <span className="event-day">05</span>
                                <span className="event-month">Jul</span>
                            </div>
                            <div className="event-details">
                                <h3>Future of Urban Living Conference</h3>
                                <p>Keynote presentations on urban development</p>
                                <span className="event-time">9:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <style>
                {`
        .news-events-page {
          padding: 6rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .news-page-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .news-page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          text-align: center;
        }

        .news-page-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .news-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .filter-btn {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .filter-btn:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
        }

        .filter-btn.active {
          background: var(--accent-light);
          color: white;
          border-color: var(--accent-light);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .news-card {
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .news-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .news-card:hover .news-image img {
          transform: scale(1.05);
        }

        .news-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.3rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }        .news-badge.news {
          background: var(--accent-light);
          color: white;
        }

        .news-badge.event {
          background: var(--secondary-dark);
          color: white;
        }

        .news-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .news-card-title {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.4;
          font-weight: 600;
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .news-date {
          color: rgba(255, 255, 255, 0.7);
        }

        .news-read-time {
          color: rgba(255, 255, 255, 0.6);
        }

        .news-excerpt {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
          font-size: 0.95rem;
        }

        .news-full-content {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.5;
          font-size: 0.9rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Featured Projects Section */
        .featured-projects {
          max-width: 1200px;
          margin: 0 auto 4rem;
          padding: 0 1rem;
        }

        .featured-projects h2 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          text-align: center;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-card:hover {
          transform: translateY(-5px);
        }

        .project-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .project-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 1rem 1.5rem 0.5rem;
        }

        .project-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin: 0 1.5rem 1.5rem;
          font-size: 0.95rem;
        }

        /* Upcoming Events Section */
        .upcoming-events {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem 4rem;
        }

        .upcoming-events h2 {
          font-size: 2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          text-align: center;
        }

        .events-list {
          display: grid;
          gap: 1.5rem;
        }

        .event-item {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .event-item:hover {
          transform: translateY(-3px);
        }

        .event-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          background: var(--accent-light);
          color: white;
          padding: 1rem;
        }

        .event-day {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1;
        }

        .event-month {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .event-details {
          padding: 1.5rem;
          flex-grow: 1;
        }

        .event-details h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
        }

        .event-details p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .event-time {
          color: var(--accent-light);
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .news-grid, .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .news-events-page {
            padding: 5rem 1rem 1rem;
          }
          
          .news-page-title, .featured-projects h2, .upcoming-events h2 {
            font-size: 2rem;
          }
          
          .news-grid, .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .news-filters {
            flex-wrap: wrap;
          }
          
          .event-item {
            flex-direction: column;
          }
          
          .event-date {
            flex-direction: row;
            justify-content: flex-start;
            gap: 0.5rem;
            min-width: auto;
            padding: 0.8rem 1.5rem;
          }
        }
        `}
            </style>
        </div>
    );
}

export default NewsEvents;
