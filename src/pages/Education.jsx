import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
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
    FaComments
} from "react-icons/fa";

function WorkshopsTraining() {
    const workshops = [
        {
            title: "Sustainable Design Principles",
            description: "Learn how to integrate eco-friendly practices into your architectural projects from concept to completion.",
            tag: "Beginner",
            duration: "2 Days",
            date: "June 15-16, 2023",
            instructor: "Dr. Elena Martinez",
            icon: FaLeaf,
        },
        {
            title: "BIM Implementation Masterclass",
            description: "Advanced training on Building Information Modeling workflows for complex architectural projects.",
            tag: "Advanced",
            duration: "3 Days",
            date: "July 5-7, 2023",
            instructor: "Marcus Johnson",
            icon: FaLaptop,
        },
        {
            title: "Parametric Design with Rhino & Grasshopper",
            description: "Hands-on workshop exploring computational design techniques for innovative architectural forms.",
            tag: "Intermediate",
            duration: "2 Days",
            date: "June 22-23, 2023",
            instructor: "Sophie Chen",
            icon: FaRulerCombined,
        },
        {
            title: "Architectural Photography",
            description: "Master the art of capturing buildings and spaces with professional architectural photographer.",
            tag: "All Levels",
            duration: "1 Day",
            date: "July 12, 2023",
            instructor: "David Wilson",
            icon: FaCamera,
        },
        {
            title: "Passive House Design Certification",
            description: "Comprehensive training on passive house standards and certification process.",
            tag: "Intermediate",
            duration: "4 Days",
            date: "August 8-11, 2023",
            instructor: "Olivia Zhang",
            icon: FaHome,
        },
        {
            title: "Urban Planning for Sustainable Communities",
            description: "Learn strategies for creating resilient, sustainable urban environments.",
            tag: "Advanced",
            duration: "3 Days",
            date: "July 19-21, 2023",
            instructor: "Robert Kim",
            icon: FaCity,
        },
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
                            <div className="stat-icon"><FaCalendarAlt /></div>
                            <span className="stat-label">Workshops Offered</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaUsers /></div>
                            <span className="stat-label">Expert Instructors</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaGraduationCap /></div>
                            <span className="stat-label">Participants Trained</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaChartBar /></div>
                            <span className="stat-label">Satisfaction Rate</span>
                        </div>
                    </div>

                    <h2 className="section-subtitle">Upcoming Workshops</h2>

                    <div className="education-grid">
                        {workshops.map((workshop, index) => (
                            <div key={index} className="education-card">
                                <div className="education-icon">
                                    <workshop.icon />
                                </div>
                                <span className="education-tag">{workshop.tag}</span>
                                <h3>{workshop.title}</h3>
                                <p>{workshop.description}</p>
                                <div className="education-meta">
                                    <span><FaClock /> {workshop.duration}</span>
                                    <span><FaCalendarAlt /> {workshop.date}</span>
                                </div>
                                <p className="education-instructor">
                                    <FaUserTie /> Instructor: {workshop.instructor}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="info-section">
                        <h2>Custom Corporate Training</h2>
                        <p>
                            We offer customized training programs for architecture firms and design teams. 
                            Our programs can be tailored to your specific needs and delivered at your location or virtually.
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
            icon: FaChartBar,
        },
        {
            title: "Sustainable Material Selection",
            description: "Handbook for choosing eco-friendly materials that meet performance and aesthetic requirements.",
            category: "Materials",
            level: "Intermediate",
            format: "PDF Guide",
            icon: FaSeedling,
        },
        {
            title: "Architectural Rendering with V-Ray",
            description: "Step-by-step tutorial for creating photorealistic architectural visualizations.",
            category: "Visualization",
            level: "Advanced",
            format: "Video Tutorial",
            icon: FaPalette,
        },
        {
            title: "Building Code Compliance",
            description: "Comprehensive reference for navigating building codes and regulations.",
            category: "Regulations",
            level: "All Levels",
            format: "Interactive Guide",
            icon: FaFileAlt,
        },
        {
            title: "Parametric Facade Design",
            description: "Advanced techniques for designing complex building envelopes using computational tools.",
            category: "Design",
            level: "Advanced",
            format: "Video Series",
            icon: FaCubes,
        },
        {
            title: "Client Presentation Techniques",
            description: "Strategies for effectively communicating design concepts to clients and stakeholders.",
            category: "Communication",
            level: "Intermediate",
            format: "Guidebook",
            icon: FaComments,
        },
    ];

    const [activeCategory, setActiveCategory] = useState("All");
    const categories = ["All", "Software", "Design", "Materials", "Visualization", "Regulations", "Communication"];

    return (
        <AnimatedSection>
            <div className="education-page-wrapper">
                <div className="education-content">
                    <h1 className="education-title">Tutorials & Learning Resources</h1>
                    <p className="education-description">
                        Access our comprehensive library of tutorials, guides, and learning materials designed to help 
                        architects at all stages of their career develop new skills and deepen their expertise.
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
                            .filter((tutorial) => activeCategory === "All" || tutorial.category === activeCategory)
                            .map((tutorial, index) => (
                                <div key={index} className="tutorial-item">
                                    <div className="tutorial-icon">
                                        <tutorial.icon />
                                    </div>
                                    <div className="tutorial-content">
                                        <h3>{tutorial.title}</h3>
                                        <p>{tutorial.description}</p>
                                        <div className="tutorial-meta">
                                            <span><FaBook /> {tutorial.category}</span>
                                            <span><FaGraduationCap /> {tutorial.level}</span>
                                            <span><FaLaptop /> {tutorial.format}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="info-section">
                        <h2>Learning Pathways</h2>
                        <p>
                            Our structured learning pathways help you build skills systematically. Whether you're focusing 
                            on sustainable design, computational methods, or project management, we have curated collections 
                            of resources to guide your learning journey.
                        </p>
                        <div className="pathways-grid">
                            <div className="pathway-item"><FaLeaf /> Sustainable Design Path</div>
                            <div className="pathway-item"><FaLaptop /> BIM Specialist Path</div>
                            <div className="pathway-item"><FaUsers /> Project Management Path</div>
                            <div className="pathway-item"><FaCubes /> Digital Fabrication Path</div>
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
            icon: FaCity,
        },
        {
            title: "Material Innovations in Architecture",
            description: "Showcasing cutting-edge materials and their applications in contemporary architecture.",
            date: "July 15 - September 15, 2023",
            location: "Materials Gallery",
            curator: "Prof. Michael Rodriguez",
            icon: FaCubes,
        },
        {
            title: "Digital Fabrication: From Concept to Construction",
            description: "Exhibition of projects demonstrating advanced digital fabrication techniques.",
            date: "September 1 - November 30, 2023",
            location: "Technology Pavilion",
            curator: "Alexandra Wong",
            icon: FaLaptop,
        },
        {
            title: "Women in Architecture: Pioneers and Innovators",
            description: "Celebrating the contributions of women architects throughout history and today.",
            date: "October 10 - December 20, 2023",
            location: "Heritage Hall",
            curator: "Sarah Johnson",
            icon: FaUsers,
        },
        {
            title: "Adaptive Reuse: Transforming Existing Structures",
            description: "Exhibition featuring innovative adaptive reuse projects from around the world.",
            date: "November 5, 2023 - January 15, 2024",
            location: "Main Gallery",
            curator: "David Kim",
            icon: FaHome,
        },
        {
            title: "Biomimicry in Architecture",
            description: "Exploring how nature-inspired design leads to more sustainable and efficient buildings.",
            date: "January 20 - March 30, 2024",
            location: "Nature & Design Pavilion",
            curator: "Elena Martinez",
            icon: FaLeaf,
        },
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
                            <div className="stat-icon"><FaCalendarAlt /></div>
                            <span className="stat-label">Current Exhibitions</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaUserCircle /></div>
                            <span className="stat-label">Featured Architects</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaPalette /></div>
                            <span className="stat-label">Exhibition Pieces</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaLightbulb /></div>
                            <span className="stat-label">Interactive Installations</span>
                        </div>
                    </div>

                    <h2 className="section-subtitle">Exhibition Schedule</h2>

                    <div className="education-grid">
                        {exhibitions.map((exhibition, index) => (
                            <div key={index} className="education-card">
                                <div className="education-icon">
                                    <exhibition.icon />
                                </div>
                                <h3>{exhibition.title}</h3>
                                <p>{exhibition.description}</p>
                                <div className="exhibition-details">
                                    <p><FaCalendarAlt /> <strong>Dates:</strong> {exhibition.date}</p>
                                    <p><FaMapMarkerAlt /> <strong>Location:</strong> {exhibition.location}</p>
                                    <p><FaUserTie /> <strong>Curated by:</strong> {exhibition.curator}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="info-section">
                        <h2>Virtual Tours</h2>
                        <p>
                            Can't visit in person? Explore our exhibitions through immersive virtual tours that allow you 
                            to experience the displays from anywhere in the world.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function EducationOverview() {
    const upcomingEvents = [
        { date: "Jun 15", title: "Sustainable Design Workshop", time: "10:00 AM", icon: FaLeaf },
        { date: "Jun 22", title: "Parametric Design Masterclass", time: "2:00 PM", icon: FaRulerCombined },
        { date: "Jul 5", title: "BIM Implementation Training", time: "9:00 AM", icon: FaLaptop },
        { date: "Jul 12", title: "Architectural Photography Workshop", time: "1:00 PM", icon: FaCamera },
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
                            <div className="stat-icon"><FaBook /></div>
                            <span className="stat-label">Learning Resources</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaCalendarAlt /></div>
                            <span className="stat-label">Workshops per Year</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaPalette /></div>
                            <span className="stat-label">Annual Exhibitions</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><FaChartBar /></div>
                            <span className="stat-label">Satisfaction Rate</span>
                        </div>
                    </div>

                    <div className="events-section">
                        <h2>Upcoming Events</h2>
                        <div className="events-grid">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className="event-item">
                                    <div className="event-icon"><event.icon /></div>
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
                            and priority registration for exhibitions and events.
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

                .education-title, .education-main-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .education-description, .education-main-description {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                    text-align: center;
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
                    
                    .education-title, .education-main-title {
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