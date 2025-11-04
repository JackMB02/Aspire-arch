import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";
import { API_ENDPOINTS, apiRequest } from "../config/api";
import {
    FaLeaf,
    FaLaptop,
    FaRulerCombined,
    FaCamera,
    FaHome,
    FaCity,
    FaChartBar,
    FaSeedling,
    FaPalette,
    FaFileAlt,
    FaCubes,
    FaUsers,
    FaCalendarAlt,
    FaClock,
    FaUserTie,
    FaMapMarkerAlt,
    FaUserCircle,
    FaBook,
    FaGraduationCap,
    FaLightbulb,
    FaComments,
} from "react-icons/fa";

// Dynamic backend base URL for images
const getBackendBaseUrl = () => {
    return window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://aspire-arch-server.onrender.com";
};

const BACKEND_BASE_URL = getBackendBaseUrl();

// Icon mapping for workshops from database
const iconMap = {
    FaLeaf: FaLeaf,
    FaLaptop: FaLaptop,
    FaRulerCombined: FaRulerCombined,
    FaCamera: FaCamera,
    FaHome: FaHome,
    FaCity: FaCity,
    FaChartBar: FaChartBar,
    FaSeedling: FaSeedling,
    FaPalette: FaPalette,
    FaFileAlt: FaFileAlt,
    FaCubes: FaCubes,
    FaUsers: FaUsers,
    FaBook: FaBook,
    FaGraduationCap: FaGraduationCap,
    FaLightbulb: FaLightbulb,
    FaComments: FaComments,
    FaUserCircle: FaUserCircle,
    FaUserTie: FaUserTie,
};

function WorkshopsTraining() {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching workshops from server...");

            const data = await apiRequest(API_ENDPOINTS.EDUCATION.WORKSHOPS);
            console.log("Workshops data received:", data);

            setWorkshops(data.workshops || data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching workshops:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <SkeletonLoader type="workshop" count={4} />
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    if (error && workshops.length === 0) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            Error loading workshops: {error}
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    return (
        <AnimatedSection>
            <div className="education-page-wrapper">
                <div className="education-content">
                    <h1 className="education-title">
                        Workshops & Training Programs
                    </h1>
                    <p className="education-description">
                        Expand your skills and knowledge through our hands-on
                        workshops and professional training programs. Learn from
                        industry experts and connect with fellow architects and
                        designers.
                    </p>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaCalendarAlt />
                            </div>
                            <span className="stat-label">
                                Workshops Offered
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaUsers />
                            </div>
                            <span className="stat-label">
                                Expert Instructors
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaGraduationCap />
                            </div>
                            <span className="stat-label">
                                Participants Trained
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaChartBar />
                            </div>
                            <span className="stat-label">
                                Satisfaction Rate
                            </span>
                        </div>
                    </div>

                    <h2 className="section-subtitle">Upcoming Workshops</h2>

                    <div className="education-grid">
                        {workshops.map((workshop, index) => {
                            const IconComponent =
                                iconMap[workshop.icon] || FaLeaf;
                            return (
                                <div
                                    key={workshop.id || index}
                                    className="education-card"
                                >
                                    <div className="education-icon">
                                        <IconComponent />
                                    </div>
                                    <span className="education-tag">
                                        {workshop.tag}
                                    </span>
                                    <h3>{workshop.title}</h3>
                                    <p>{workshop.description}</p>
                                    <div className="education-meta">
                                        <span>
                                            <FaClock /> {workshop.duration}
                                        </span>
                                        <span>
                                            <FaCalendarAlt /> {workshop.date}
                                        </span>
                                    </div>
                                    <p className="education-instructor">
                                        <FaUserTie /> Instructor:{" "}
                                        {workshop.instructor}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="info-section">
                        <h2>Custom Corporate Training</h2>
                        <p>
                            We offer customized training programs for
                            architecture firms and design teams. Our programs
                            can be tailored to your specific needs and delivered
                            at your location or virtually.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function TutorialsGuides() {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const categories = [
        "All",
        "Software",
        "Design",
        "Materials",
        "Visualization",
        "Regulations",
        "Communication",
    ];

    useEffect(() => {
        fetchTutorials();
    }, []);

    const fetchTutorials = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching tutorials from server...");

            const data = await apiRequest(API_ENDPOINTS.EDUCATION.TUTORIALS);
            console.log("Tutorials data received:", data);

            setTutorials(data.tutorials || data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching tutorials:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <SkeletonLoader type="card" count={6} />
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    if (error && tutorials.length === 0) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            Error loading tutorials: {error}
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    return (
        <AnimatedSection>
            <div className="education-page-wrapper">
                <div className="education-content">
                    <h1 className="education-title">
                        Tutorials & Learning Resources
                    </h1>
                    <p className="education-description">
                        Access our comprehensive library of tutorials, guides,
                        and learning materials designed to help architects at
                        all stages of their career develop new skills and deepen
                        their expertise.
                    </p>

                    <div className="category-tabs">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`category-tab ${
                                    activeCategory === category ? "active" : ""
                                }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="tutorials-list">
                        {tutorials
                            .filter(
                                (tutorial) =>
                                    activeCategory === "All" ||
                                    tutorial.category === activeCategory
                            )
                            .map((tutorial, index) => {
                                const IconComponent =
                                    iconMap[tutorial.icon] || FaBook;
                                return (
                                    <div
                                        key={tutorial.id || index}
                                        className="tutorial-item"
                                    >
                                        <div className="tutorial-icon">
                                            <IconComponent />
                                        </div>
                                        <div className="tutorial-content">
                                            <h3>{tutorial.title}</h3>
                                            <p>{tutorial.description}</p>
                                            <div className="tutorial-meta">
                                                <span>
                                                    <FaBook />{" "}
                                                    {tutorial.category}
                                                </span>
                                                <span>
                                                    <FaGraduationCap />{" "}
                                                    {tutorial.level}
                                                </span>
                                                <span>
                                                    <FaLaptop />{" "}
                                                    {tutorial.format}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="info-section">
                        <h2>Learning Pathways</h2>
                        <p>
                            Our structured learning pathways help you build
                            skills systematically. Whether you're focusing on
                            sustainable design, computational methods, or
                            project management, we have curated collections of
                            resources to guide your learning journey.
                        </p>
                        <div className="pathways-grid">
                            <div className="pathway-item">
                                <FaLeaf /> Sustainable Design Path
                            </div>
                            <div className="pathway-item">
                                <FaLaptop /> BIM Specialist Path
                            </div>
                            <div className="pathway-item">
                                <FaUsers /> Project Management Path
                            </div>
                            <div className="pathway-item">
                                <FaCubes /> Digital Fabrication Path
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function Exhibitions() {
    const [exhibitions, setExhibitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExhibitions();
    }, []);

    const fetchExhibitions = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching exhibitions from server...");

            const data = await apiRequest(API_ENDPOINTS.EDUCATION.EXHIBITIONS);
            console.log("Exhibitions data received:", data);

            setExhibitions(data.exhibitions || data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching exhibitions:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <SkeletonLoader type="card" count={4} />
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    if (error && exhibitions.length === 0) {
        return (
            <AnimatedSection>
                <div className="education-page-wrapper">
                    <div className="education-content">
                        <div className="error-message">
                            <i className="fas fa-exclamation-triangle"></i>
                            Error loading exhibitions: {error}
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    return (
        <AnimatedSection>
            <div className="education-page-wrapper">
                <div className="education-content">
                    <h1 className="education-title">
                        Current & Upcoming Exhibitions
                    </h1>
                    <p className="education-description">
                        Explore our rotating exhibitions that showcase
                        innovative architectural projects, emerging trends, and
                        groundbreaking research in the field of architecture and
                        design.
                    </p>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaCalendarAlt />
                            </div>
                            <span className="stat-label">
                                Current Exhibitions
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaUserCircle />
                            </div>
                            <span className="stat-label">
                                Featured Architects
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaPalette />
                            </div>
                            <span className="stat-label">
                                Exhibition Pieces
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaLightbulb />
                            </div>
                            <span className="stat-label">
                                Interactive Installations
                            </span>
                        </div>
                    </div>

                    <h2 className="section-subtitle">Exhibition Schedule</h2>

                    <div className="education-grid">
                        {exhibitions.map((exhibition, index) => {
                            const IconComponent =
                                iconMap[exhibition.icon] || FaCity;
                            return (
                                <div
                                    key={exhibition.id || index}
                                    className="education-card"
                                >
                                    <div className="education-icon">
                                        <IconComponent />
                                    </div>
                                    <h3>{exhibition.title}</h3>
                                    <p>{exhibition.description}</p>
                                    <div className="exhibition-details">
                                        <p>
                                            <FaCalendarAlt />{" "}
                                            <strong>Dates:</strong>{" "}
                                            {exhibition.date}
                                        </p>
                                        <p>
                                            <FaMapMarkerAlt />{" "}
                                            <strong>Location:</strong>{" "}
                                            {exhibition.location}
                                        </p>
                                        <p>
                                            <FaUserTie />{" "}
                                            <strong>Curated by:</strong>{" "}
                                            {exhibition.curator}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="info-section">
                        <h2>Virtual Tours</h2>
                        <p>
                            Can't visit in person? Explore our exhibitions
                            through immersive virtual tours that allow you to
                            experience the displays from anywhere in the world.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function EducationOverview() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    const fetchUpcomingEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching upcoming events from server...");

            const data = await apiRequest(API_ENDPOINTS.EDUCATION.EVENTS);
            console.log("Events data received:", data);

            setUpcomingEvents(data.events || data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching upcoming events:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="education-page-wrapper">
                <div className="education-content overview-content">
                    <h1 className="education-main-title">
                        Education & Learning
                    </h1>
                    <p className="education-main-description">
                        Expand your knowledge, develop new skills, and stay at
                        the forefront of architectural innovation through our
                        comprehensive educational programs, resources, and
                        exhibitions.
                    </p>

                    <div className="education-navigation">
                        <Link to="workshops-training" className="nav-link">
                            <FaLaptop /> Workshops
                        </Link>
                        <Link to="tutorials-guides" className="nav-link">
                            <FaBook /> Tutorials
                        </Link>
                        <Link to="exhibitions" className="nav-link">
                            <FaPalette /> Exhibitions
                        </Link>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaBook />
                            </div>
                            <span className="stat-label">
                                Learning Resources
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaCalendarAlt />
                            </div>
                            <span className="stat-label">
                                Workshops per Year
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaPalette />
                            </div>
                            <span className="stat-label">
                                Annual Exhibitions
                            </span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaChartBar />
                            </div>
                            <span className="stat-label">
                                Satisfaction Rate
                            </span>
                        </div>
                    </div>

                    <div className="events-section">
                        <h2>Upcoming Events</h2>
                        {loading ? (
                            <SkeletonLoader type="card" count={3} />
                        ) : error ? (
                            <div className="error-message">
                                <i className="fas fa-exclamation-triangle"></i>
                                Error loading events
                            </div>
                        ) : (
                            <div className="events-grid">
                                {upcomingEvents.map((event, index) => {
                                    const IconComponent =
                                        iconMap[event.icon] || FaCalendarAlt;
                                    return (
                                        <div
                                            key={event.id || index}
                                            className="event-item"
                                        >
                                            <div className="event-icon">
                                                <IconComponent />
                                            </div>
                                            <div className="event-date">
                                                {event.date}
                                            </div>
                                            <h3>{event.title}</h3>
                                            <p>{event.time}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="membership-section">
                        <h2>Learning Membership</h2>
                        <p>
                            Join our learning membership program for unlimited
                            access to all resources, exclusive workshops, and
                            priority registration for exhibitions and events.
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
                <Route
                    path="workshops-training"
                    element={<WorkshopsTraining />}
                />
                <Route path="tutorials-guides" element={<TutorialsGuides />} />
                <Route path="exhibitions" element={<Exhibitions />} />
                <Route path="*" element={<EducationOverview />} />
            </Routes>

            <style jsx>{`
                .education-container {
                    background: var(--primary-dark);
                    min-height: 100vh;
                    color: rgba(255, 255, 255, 0.9);
                }

                .education-page-wrapper {
                    padding: 8rem 2rem 2rem;
                    min-height: 100vh;
                    background: var(--primary-dark);
                }

                .education-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .overview-content {
                    text-align: center;
                }

                .education-title,
                .education-main-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .education-description,
                .education-main-description {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                    text-align: center;
                }

                /* Loading and Error States */
                .loading-spinner,
                .error-message {
                    padding: 3rem;
                    text-align: center;
                    font-family: "Lora", "Georgia", serif;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .loading-spinner i,
                .error-message i {
                    font-size: 2rem;
                    opacity: 0.7;
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-left: 4px solid rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .error-message {
                    color: #ff6b6b;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin: 3rem 0;
                }

                .stat-item {
                    text-align: center;
                    padding: 2rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-light);
                }

                .stat-icon {
                    font-size: 3rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                }

                .stat-label {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                }

                .section-subtitle {
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 2rem;
                    margin: 3rem 0 2rem;
                    text-align: center;
                    font-weight: 600;
                }

                .education-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .education-card {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .education-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-light);
                }

                .education-icon {
                    font-size: 2.5rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                }

                .education-tag {
                    display: inline-block;
                    padding: 8px 20px;
                    background: var(--accent-light);
                    color: white;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .education-card h3 {
                    font-size: 1.3rem;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .education-card p {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .education-meta {
                    display: flex;
                    justify-content: space-between;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }

                .education-meta span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .education-instructor {
                    color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                }

                .info-section {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: 3rem;
                }

                .info-section h2 {
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }

                .category-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .category-tab {
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .category-tab:hover {
                    border-color: var(--accent-light);
                    color: var(--accent-light);
                }

                .category-tab.active {
                    background: var(--accent-light);
                    color: white;
                    border-color: var(--accent-light);
                }

                .tutorials-list {
                    margin: 2rem 0;
                }

                .tutorial-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    transition: all 0.3s ease;
                }

                .tutorial-item:hover {
                    border-color: var(--accent-light);
                    transform: translateX(5px);
                }

                .tutorial-icon {
                    font-size: 2rem;
                    color: var(--accent-light);
                    margin-top: 0.5rem;
                }

                .tutorial-content h3 {
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                }

                .tutorial-meta {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 1rem;
                }

                .tutorial-meta span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                }

                .pathways-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .pathway-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .pathway-item:hover {
                    border-color: var(--accent-light);
                    transform: translateY(-3px);
                }

                .education-navigation {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }

                .nav-link {
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s ease;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                .nav-link:hover {
                    border-color: var(--accent-light);
                    color: var(--accent-light);
                }

                .events-section {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin: 3rem 0;
                }

                .events-section h2 {
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 2rem;
                    text-align: center;
                    font-size: 1.8rem;
                }

                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }

                .event-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .event-item:hover {
                    border-color: var(--accent-light);
                    transform: translateY(-3px);
                }

                .event-icon {
                    font-size: 2.5rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                }

                .event-date {
                    font-weight: 700;
                    color: var(--accent-light);
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                }

                .event-item h3 {
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                }

                .membership-section {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: 3rem;
                }

                .membership-section h2 {
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }

                @media (max-width: 768px) {
                    .education-page-wrapper {
                        padding: 6rem 1rem 1rem;
                    }

                    .education-title,
                    .education-main-title {
                        font-size: 2rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .education-grid {
                        grid-template-columns: 1fr;
                    }

                    .education-navigation {
                        flex-direction: column;
                        align-items: center;
                    }

                    .nav-link {
                        width: 100%;
                        justify-content: center;
                    }

                    .tutorial-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .education-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .category-tabs {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}

export default Education;
