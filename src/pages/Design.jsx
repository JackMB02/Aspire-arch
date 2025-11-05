import { useState, useEffect } from "react";
import {
    Routes,
    Route,
    Link,
    useParams,
    useSearchParams,
} from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";
import DesignCard from "../components/DesignCard";
import { API_ENDPOINTS, apiRequest } from "../config/api";

// Dynamic backend base URL for images
const getBackendBaseUrl = () => {
    return window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://aspire-arch-server.onrender.com";
};

const BACKEND_BASE_URL = getBackendBaseUrl();

// Helper function to construct proper image URLs
const getProperImageUrl = (imagePath) => {
    if (!imagePath) return "/images/placeholder.jpg";
    
    // If it's a data URL (base64), use it directly
    if (imagePath.startsWith("data:")) {
        return imagePath;
    }
    
    // If it's already a full HTTP URL, use it directly
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }
    
    // If it starts with /uploads, prepend backend URL
    if (imagePath.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path and prepend backend URL
    return `${BACKEND_BASE_URL}/${imagePath}`;
};

// ---------------- PageWrapper ----------------
const PageWrapper = ({ title, description, projects, loading, error }) => {
    if (loading) {
        return (
            <AnimatedSection>
                <div className="page-wrapper">
                    <h1 className="page-title">{title}</h1>
                    <p className="page-description">{description}</p>
                    <SkeletonLoader type="card" count={6} />
                </div>
            </AnimatedSection>
        );
    }

    if (error) {
        return (
            <AnimatedSection>
                <div className="page-wrapper">
                    <h1 className="page-title">{title}</h1>
                    <p className="page-description">{description}</p>
                    <div className="error-message">
                        <i className="fas fa-exclamation-triangle"></i>
                        Error loading projects: {error}
                    </div>
                </div>
            </AnimatedSection>
        );
    }

    return (
        <AnimatedSection>
            <div className="page-wrapper">
                <h1 className="page-title">{title}</h1>
                <p className="page-description">{description}</p>

                {projects.length === 0 ? (
                    <div className="no-projects">
                        <i className="fas fa-inbox"></i>
                        No projects found in this category.
                    </div>
                ) : (
                    <div className="media-grid">
                        {projects.map((project, idx) => (
                            <DesignCard
                                key={project.id || idx}
                                project={project}
                                backendBaseUrl={BACKEND_BASE_URL}
                                getSectorLabel={getSectorLabel}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AnimatedSection>
    );
};

// Sector labels mapping
const getSectorLabel = (sector) => {
    const sectorLabels = {
        residential: "Residential Architecture",
        interior: "Interior Design",
        refurbishment: "Refurbishment",
        cultural: "Cultural Architecture",
        commercial: "Commercial & Offices",
        hospitality: "Hospitality Architecture",
        public: "Public Architecture",
        healthcare: "Healthcare Architecture",
        educational: "Educational Architecture",
        sports: "Sports Architecture",
        religious: "Religious Architecture",
        industrial: "Industrial & Infrastructure",
        landscape: "Landscape & Urbanism",
    };
    return sectorLabels[sector] || sector;
};

// ---------------- Project Pages ----------------
function Academic() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAcademicProjects();
    }, []);

    const fetchAcademicProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching academic projects...");

            const data = await apiRequest(
                API_ENDPOINTS.DESIGN_PROJECTS.ACADEMIC
            );
            console.log("Academic projects data:", data);

            if (data.success) {
                setProjects(data.data || []);
            } else {
                throw new Error(
                    data.message || "Failed to fetch academic projects"
                );
            }
        } catch (err) {
            console.error("Error fetching academic projects:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper
            title="Academic Designs"
            description="Exploring innovative solutions through academic architectural projects that challenge creativity and functionality."
            projects={projects}
            loading={loading}
            error={error}
        />
    );
}

function Profession() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfessionalProjects();
    }, []);

    const fetchProfessionalProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching professional projects...");

            const data = await apiRequest(
                API_ENDPOINTS.DESIGN_PROJECTS.PROFESSIONAL
            );
            console.log("Professional projects data:", data);

            if (data.success) {
                setProjects(data.data || []);
            } else {
                throw new Error(
                    data.message || "Failed to fetch professional projects"
                );
            }
        } catch (err) {
            console.error("Error fetching professional projects:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper
            title="Professional Designs"
            description="A showcase of professional architecture projects completed for clients, merging aesthetics with purpose."
            projects={projects}
            loading={loading}
            error={error}
        />
    );
}

function Competition() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompetitionProjects();
    }, []);

    const fetchCompetitionProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching competition projects...");

            const data = await apiRequest(
                API_ENDPOINTS.DESIGN_PROJECTS.COMPETITION
            );
            console.log("Competition projects data:", data);

            if (data.success) {
                setProjects(data.data || []);
            } else {
                throw new Error(
                    data.message || "Failed to fetch competition projects"
                );
            }
        } catch (err) {
            console.error("Error fetching competition projects:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper
            title="Competition Entries"
            description="Award-winning and shortlisted competition projects that highlight design excellence and innovation."
            projects={projects}
            loading={loading}
            error={error}
        />
    );
}

// ---------------- Visit Project Page ----------------
function VisitProject() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (id) {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId) => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching project:", projectId);

            const data = await apiRequest(
                API_ENDPOINTS.DESIGN_PROJECTS.SINGLE_PROJECT(projectId)
            );
            console.log("Project data received:", data);
            console.log("Project main_image:", data.data?.main_image);
            console.log("Project gallery_images:", data.data?.gallery_images);

            if (data.success) {
                setProject(data.data);
            } else {
                throw new Error(data.message || "Project not found");
            }
        } catch (err) {
            console.error("Error fetching project:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Automatic slideshow every 3s
    useEffect(() => {
        if (!project) return;

        // Parse gallery_images if it's a string
        let galleryImages = [];
        if (project.gallery_images) {
            if (typeof project.gallery_images === "string") {
                try {
                    galleryImages = JSON.parse(project.gallery_images);
                } catch (e) {
                    console.error("Error parsing gallery_images:", e);
                    galleryImages = [];
                }
            } else if (Array.isArray(project.gallery_images)) {
                galleryImages = project.gallery_images;
            }
        }

        if (galleryImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === galleryImages.length - 1 ? 0 : prev + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [project]);

    const prevSlide = () => {
        if (!project) return;

        let galleryImages = [];
        if (typeof project.gallery_images === "string") {
            try {
                galleryImages = JSON.parse(project.gallery_images);
            } catch (e) {
                galleryImages = [];
            }
        } else if (Array.isArray(project.gallery_images)) {
            galleryImages = project.gallery_images;
        }

        const allImages =
            galleryImages.length > 0
                ? [project.main_image, ...galleryImages]
                : [project.main_image];

        setCurrentIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        if (!project) return;

        let galleryImages = [];
        if (typeof project.gallery_images === "string") {
            try {
                galleryImages = JSON.parse(project.gallery_images);
            } catch (e) {
                galleryImages = [];
            }
        } else if (Array.isArray(project.gallery_images)) {
            galleryImages = project.gallery_images;
        }

        const allImages =
            galleryImages.length > 0
                ? [project.main_image, ...galleryImages]
                : [project.main_image];

        setCurrentIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    if (loading) {
        return (
            <div className="visit-project">
                <SkeletonLoader type="card" count={1} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="visit-project">
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    Error loading project: {error}
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="visit-project">
                <div className="error-message">
                    <i className="fas fa-search"></i>
                    Project not found
                </div>
            </div>
        );
    }

    // Parse gallery_images if it's a string
    let galleryImages = [];
    if (project.gallery_images) {
        if (typeof project.gallery_images === "string") {
            try {
                galleryImages = JSON.parse(project.gallery_images);
                console.log("Parsed gallery_images:", galleryImages);
            } catch (e) {
                console.error("Error parsing gallery_images:", e);
                galleryImages = [];
            }
        } else if (Array.isArray(project.gallery_images)) {
            galleryImages = project.gallery_images;
            console.log("Gallery_images already array:", galleryImages);
        }
    }

    // Combine main image with gallery images for slideshow
    const allImages =
        galleryImages.length > 0
            ? [project.main_image, ...galleryImages]
            : [project.main_image];

    console.log("All images for slideshow:", allImages);
    console.log("Current image index:", currentIndex);
    console.log(
        "Current image URL:",
        getProperImageUrl(allImages[currentIndex])
    );

    return (
        <div className="visit-project">
            {/* Slideshow */}
            <div className="slideshow">
                <img
                    src={getProperImageUrl(allImages[currentIndex])}
                    alt={`${project.title} slide ${currentIndex + 1}`}
                    onError={(e) => {
                        e.target.src = "/images/placeholder.jpg";
                    }}
                />

                {/* Show arrows only if there are multiple images */}
                {allImages.length > 1 && (
                    <>
                        <button className="prev-arrow" onClick={prevSlide}>
                            &#10094;
                        </button>
                        <button className="next-arrow" onClick={nextSlide}>
                            &#10095;
                        </button>

                        {/* Slide indicators */}
                        <div className="slide-indicators">
                            {allImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${
                                        index === currentIndex ? "active" : ""
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Project Content */}
            <div className="project-content">
                <div className="project-header">
                    <h1>{project.title}</h1>
                    <div className="project-meta">
                        <span className="project-category">
                            {project.category}
                        </span>
                        {project.sector && (
                            <span className="project-sector">
                                {getSectorLabel(project.sector)}
                            </span>
                        )}
                        {project.is_featured && (
                            <span className="featured-badge">Featured</span>
                        )}
                    </div>
                </div>

                <div className="project-summary">
                    <p>{project.summary}</p>
                </div>

                <div className="project-description">
                    <p>{project.description}</p>
                </div>

                {/* Additional gallery images (excluding the first one which is in slideshow) */}
                {galleryImages.length > 0 && (
                    <div className="additional-images">
                        <h3>Project Gallery</h3>
                        <div className="gallery-grid">
                            {galleryImages.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={getProperImageUrl(img)}
                                    alt={`${project.title} detail ${idx + 1}`}
                                    onError={(e) => {
                                        e.target.src =
                                            "/images/placeholder.jpg";
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ---------------- Main Design Page ----------------
function Design() {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        fetchAllProjects();
    }, []);

    const fetchAllProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching all projects...");

            // Try the main endpoint first
            try {
                const data = await apiRequest(
                    API_ENDPOINTS.DESIGN_PROJECTS.ALL_PROJECTS
                );
                console.log("All projects data:", data);

                if (data.success) {
                    setAllProjects(data.data || []);
                    return;
                }
            } catch (mainError) {
                console.log(
                    "Main endpoint failed, trying individual categories..."
                );
                // If main endpoint fails, fetch from individual categories
                await fetchProjectsFromCategories();
            }
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Unable to load projects. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fallback: Fetch projects from individual categories if main endpoint fails
    const fetchProjectsFromCategories = async () => {
        try {
            console.log("Fetching projects from individual categories...");

            const categories = ["academic", "professional", "competition"];
            const allProjects = [];

            for (const category of categories) {
                try {
                    let endpoint;
                    switch (category) {
                        case "academic":
                            endpoint = API_ENDPOINTS.DESIGN_PROJECTS.ACADEMIC;
                            break;
                        case "professional":
                            endpoint =
                                API_ENDPOINTS.DESIGN_PROJECTS.PROFESSIONAL;
                            break;
                        case "competition":
                            endpoint =
                                API_ENDPOINTS.DESIGN_PROJECTS.COMPETITION;
                            break;
                        default:
                            continue;
                    }

                    const data = await apiRequest(endpoint);
                    if (data.success && data.data) {
                        allProjects.push(...data.data);
                    }
                } catch (categoryError) {
                    console.warn(
                        `Failed to fetch ${category} projects:`,
                        categoryError
                    );
                }
            }

            setAllProjects(allProjects);

            if (allProjects.length === 0) {
                setError(
                    "No projects found. Please check if the server is running."
                );
            }
        } catch (err) {
            console.error("Error fetching from categories:", err);
            setError("Unable to load projects. Please try again later.");
        }
    };

    // Get featured projects (first 3 projects from all categories)
    const featuredProjects = allProjects
        .filter((project) => project.is_featured)
        .slice(0, 3);

    // Filter projects based on search query
    const filterProjects = (projects) => {
        if (!searchQuery) return projects;

        return projects.filter(
            (project) =>
                project.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.summary
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.category
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.sector
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
    };

    // If searching, show all matching projects; otherwise show featured or first 3
    const displayProjects = searchQuery
        ? filterProjects(allProjects)
        : featuredProjects.length > 0
        ? featuredProjects
        : allProjects.slice(0, 3);

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
                                    title={
                                        searchQuery
                                            ? `Search Results for "${searchQuery}"`
                                            : "Design Projects"
                                    }
                                    description={
                                        searchQuery
                                            ? `Found ${displayProjects.length} project(s) matching your search.`
                                            : "A showcase of architectural projects across academic, professional, and competition categories."
                                    }
                                    projects={displayProjects}
                                    loading={loading}
                                    error={error}
                                />
                            </div>
                        </AnimatedSection>
                    }
                />
            </Routes>

            <style>{`
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

                /* Loading and Error States */
                .loading-spinner, .error-message, .no-projects {
                    padding: 3rem;
                    text-align: center;
                    font-family: 'Lora', 'Georgia', serif;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .loading-spinner i,
                .error-message i,
                .no-projects i {
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
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .error-message {
                    color: #ff6b6b;
                }

                /* Project Meta Styles */
                .project-meta {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .project-category, .project-sector, .featured-badge {
                    padding: 0.3rem 0.8rem;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }

                .project-category {
                    background: rgba(74, 144, 226, 0.2);
                    color: #4a90e2;
                    border: 1px solid #4a90e2;
                }

                .project-sector {
                    background: rgba(101, 200, 102, 0.2);
                    color: #65c866;
                    border: 1px solid #65c866;
                }

                .featured-badge {
                    background: rgba(255, 193, 7, 0.2);
                    color: #ffc107;
                    border: 1px solid #ffc107;
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

                /* Media Grid - Modern Layout */
                .media-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    margin-top: 2rem;
                    max-width: 1000px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .media-card {
                    position: relative;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
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

                .card-image-container {
                    position: relative;
                    width: 100%;
                    height: 220px;
                }

                .image-indicators {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 6px;
                    z-index: 10;
                }

                .indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .indicator.active {
                    background: rgba(255, 255, 255, 1);
                    width: 10px;
                    height: 10px;
                }

                .indicator:hover {
                    background: rgba(255, 255, 255, 0.8);
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
                    border-radius: 4px;
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
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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
                    backdrop-filter: blur(10px);
                    border-radius: 4px;
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

                .slide-indicators {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.5rem;
                }

                .indicator {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .indicator.active {
                    background: rgba(255, 255, 255, 0.9);
                    transform: scale(1.2);
                }

                .visit-project .project-content {
                    background: none;
                    border: none;
                    padding: 0;
                    text-align: left;
                }

                .project-header {
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .visit-project .project-content h1 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 2.2rem;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }

                .project-summary {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    border-left: 4px solid var(--accent-light);
                }

                .project-summary p {
                    font-family: 'Lora', 'Georgia', serif;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.7;
                    font-size: 1.1rem;
                    margin: 0;
                    font-style: italic;
                }

                .visit-project .project-content p {
                    font-family: 'Lora', 'Georgia', serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }

                .additional-images {
                    margin-top: 3rem;
                }

                .additional-images h3 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.5rem;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }

                .gallery-grid img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 8px;
                    transition: transform 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .gallery-grid img:hover {
                    transform: scale(1.02);
                }

                /* Responsive Design */
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

                    .gallery-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .page-title {
                        font-size: 1.8rem;
                    }
                    
                    .project-meta {
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}

export default Design;
