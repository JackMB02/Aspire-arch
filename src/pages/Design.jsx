import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import "./ProjectGallery.css";

// ---------------- PageWrapper ----------------
const PageWrapper = ({ title, description, projects }) => {
    return (
        <AnimatedSection>
            <div className="page-wrapper">
                <h1 className="page-title">{title}</h1>
                <p className="page-description">{description}</p>

                <div className="media-grid">
                    {projects.map((project, idx) => (
                        <div key={idx} className="media-card">
                            <img src={project.image} alt={project.title} />
                            <div className="media-overlay">
                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>
                                <Link to={`/design/project/${project.id}`}>
                                    <button>View Project →</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// ---------------- Data ----------------
const academicProjects = [
    {
        id: "library",
        title: "Modern Campus Library",
        summary: "A sustainable library concept integrating natural light and community spaces.",
        image: "/images/library.jpg",
        images: ["/images/library.jpg", "/images/library2.jpg"],
        description: "This library design focuses on sustainability, using glass facades for natural light and open spaces for collaborative learning. It integrates green courtyards and modern interiors.",
    },
    {
        id: "housing",
        title: "Student Housing Concept",
        summary: "Affordable housing designed with modular units and green courtyards.",
        image: "/images/housing.jpg",
        images: ["/images/housing.jpg", "/images/housing2.jpg"],
        description: "The student housing project prioritizes affordability while maximizing comfort. Modular units are prefabricated and arranged around shared courtyards to foster community living.",
    },
];

const professionalProjects = [
    {
        id: "villa",
        title: "Luxury Residential Villa",
        summary: "High-end villa design blending modern architecture with natural landscapes.",
        image: "/images/villa.jpg",
        images: ["/images/villa.jpg", "/images/villa2.jpg"],
        description: "The villa design merges minimalism with luxury, featuring an infinity pool, open floor plans, and natural stone facades that harmonize with the surrounding landscape.",
    },
    {
        id: "office",
        title: "Office Tower Concept",
        summary: "An energy-efficient high-rise designed for flexible work environments.",
        image: "/images/office.jpg",
        images: ["/images/office.jpg", "/images/office2.jpg"],
        description: "This office tower reimagines workplace design with flexible interiors, solar glass technology, and smart energy systems to minimize environmental impact.",
    },
];

const competitionProjects = [
    {
        id: "park",
        title: "Urban Green Park",
        summary: "A competition entry transforming abandoned urban land into a green hub.",
        image: "/images/park.jpg",
        images: ["/images/park.jpg", "/images/park2.jpg"],
        description: "The park project transforms a neglected urban area into a thriving green hub with walking paths, cultural pavilions, and recreational spaces.",
    },
    {
        id: "pavilion",
        title: "Cultural Pavilion",
        summary: "A winning concept celebrating local heritage through modern design.",
        image: "/images/pavilion.jpg",
        images: ["/images/pavilion.jpg", "/images/pavilion2.jpg"],
        description: "The cultural pavilion combines traditional motifs with modern construction. It serves as an exhibition space and a landmark for cultural events.",
    },
];

// ---------------- Project Pages ----------------
function Academic() {
    return (
        <PageWrapper
            title="Academic Designs"
            description="Exploring innovative solutions through academic architectural projects that challenge creativity and functionality."
            projects={academicProjects}
        />
    );
}

function Profession() {
    return (
        <PageWrapper
            title="Professional Designs"
            description="A showcase of professional architecture projects completed for clients, merging aesthetics with purpose."
            projects={professionalProjects}
        />
    );
}

function Competition() {
    return (
        <PageWrapper
            title="Competition Entries"
            description="Award-winning and shortlisted competition projects that highlight design excellence and innovation."
            projects={competitionProjects}
        />
    );
}

// ---------------- Visit Project Page ----------------
function VisitProject() {
    const { id } = useParams();
    const allProjects = [
        ...academicProjects,
        ...professionalProjects,
        ...competitionProjects,
    ];
    const project = allProjects.find((p) => p.id === id);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatic slideshow every 3s
    useEffect(() => {
        if (!project?.images) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === project.images.length - 1 ? 0 : prev + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [project]);

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    if (!project) return <p>Project not found</p>;

    return (
        <div className="visit-project">
            {/* Slideshow */}
            <div className="slideshow">
                <img
                    src={project.images[currentIndex]}
                    alt={`${project.title} slide ${currentIndex}`}
                />
                {/* Arrows */}
                <button className="prev-arrow" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="next-arrow" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>

            {/* Long Description */}
            <div className="project-content">
                <h1>{project.title}</h1>
                <p>
                    {project.description} Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec at quam nec magna
                    suscipit porta. Suspendisse potenti. Quisque non quam sed
                    nulla sodales vulputate. Mauris sit amet posuere mauris.
                    Vestibulum euismod sapien vel arcu faucibus, ac facilisis
                    nunc varius. Proin sodales erat nec leo lacinia, a vehicula
                    nulla sagittis. Vivamus feugiat, arcu in gravida fermentum,
                    mauris lorem sodales purus, vitae viverra urna elit sed
                    massa.
                </p>
                <p>
                    Curabitur volutpat, sapien ut pellentesque vehicula, lorem
                    turpis sollicitudin velit, ac posuere neque sapien eu nunc.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Aenean aliquet sit amet
                    turpis vel vehicula. Proin rhoncus velit id magna euismod
                    bibendum. Suspendisse vulputate, sem et luctus aliquet, erat
                    mauris elementum justo, nec porttitor nisl nunc sed magna.
                </p>
                <p>
                    Morbi consequat sapien sed ex efficitur, at tincidunt sapien
                    consectetur. Praesent semper orci sed turpis ullamcorper
                    faucibus. Nam viverra, turpis id efficitur tincidunt, lorem
                    eros feugiat mauris, at pulvinar augue sapien sit amet
                    dolor. Ut elementum purus eu neque malesuada facilisis.
                    Phasellus rhoncus lectus ut ligula iaculis convallis.
                </p>

                {/* Extra detail images */}
                {project.images.slice(1).map((img, idx) => (
                    <img key={idx} src={img} alt={`detail ${idx}`} />
                ))}
            </div>
        </div>
    );
}

// ---------------- Main Design Page ----------------
function Design() {
    const mixedProjects = [
        ...academicProjects.slice(0, 1),
        ...professionalProjects.slice(0, 1),
        ...competitionProjects.slice(0, 1),
    ];

    return (
        <div className="design-page">
            <Routes>
                <Route path="academic" element={<Academic />} />
                <Route path="profession" element={<Profession />} />
                <Route path="competition" element={<Competition />} />
                <Route path="project/:id" element={<VisitProject />} />
                <Route
                    path="*"
                    element={
                        <AnimatedSection>
                            <div className="design-intro">
                                <PageWrapper
                                    title="Featured Projects"
                                    description="A curated mix of projects across all categories."
                                    projects={mixedProjects}
                                />
                            </div>
                        </AnimatedSection>
                    }
                />
            </Routes>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Futura&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
                
                .design-page {
                    background: var(--primary-dark);
                    min-height: 100vh;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-weight: 300;
                }

                .design-intro {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                }

                .page-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 8rem 2rem 2rem;
                    text-align: center;
                }

                /* Typography */
                .page-title {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.5px;
                }

                .page-description {
                    font-family: 'Lora', 'Georgia', serif;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                }

                /* Media Grid - Exact same as Media Gallery */
                .media-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .media-card {
                    position: relative;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .media-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
                }

                .media-card img {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                    display: block;
                }

                .media-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
                    color: white;
                    opacity: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    transition: opacity 0.3s ease;
                }

                .media-card:hover .media-overlay {
                    opacity: 1;
                }

                .media-overlay h3 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .media-overlay p {
                    font-family: 'Lora', 'Georgia', serif;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    opacity: 0.9;
                    line-height: 1.5;
                }

                .media-overlay button {
                    background: var(--accent-light);
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    align-self: flex-start;
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-weight: 600;
                }

                .media-overlay button:hover {
                    background: rgba(176, 140, 77, 0.9);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(176, 140, 77, 0.4);
                }

                /* Visit Project Page Styles */
                .visit-project {
                    padding: 8rem 2rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .slideshow {
                    position: relative;
                    margin-bottom: 2rem;
                }

                .slideshow img {
                    width: 100%;
                    height: 500px;
                    object-fit: cover;
                }

                .prev-arrow, .next-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 1rem;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.2s ease;
                }

                .prev-arrow:hover, .next-arrow:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .prev-arrow {
                    left: 1rem;
                }

                .next-arrow {
                    right: 1rem;
                }

                .visit-project .project-content {
                    background: none;
                    border: none;
                    padding: 0;
                    text-align: left;
                }

                .visit-project .project-content h1 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 2.2rem;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .visit-project .project-content p {
                    font-family: 'Lora', 'Georgia', serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }

                .visit-project .project-content img {
                    width: 100%;
                    height: auto;
                    margin: 1.5rem 0;
                }

                @media (max-width: 768px) {
                    .page-wrapper {
                        padding: 7rem 1rem 1rem;
                    }
                    
                    .page-title {
                        font-size: 2rem;
                    }
                    
                    .media-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .slideshow img {
                        height: 300px;
                    }
                    
                    .visit-project {
                        padding: 7rem 1rem 1rem;
                    }
                    
                    .media-overlay {
                        padding: 1rem;
                    }
                    
                    .media-overlay h3 {
                        font-size: 1.1rem;
                    }
                    
                    .media-overlay p {
                        font-size: 0.85rem;
                    }
                }

                @media (max-width: 480px) {
                    .page-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Design;