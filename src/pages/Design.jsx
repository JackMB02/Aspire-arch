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
    // Handle null, undefined, empty values, and non-string types
    if (!imagePath) {
        return "/images/placeholder.jpg";
    }
    
    // Convert to string if it's not already a string (handles numbers, objects, etc.)
    const pathStr = String(imagePath);
    
    // Check for invalid string values
    if (pathStr === "null" || pathStr === "undefined" || pathStr.trim() === "") {
        return "/images/placeholder.jpg";
    }

    // If it's a data URL (base64), use it directly
    if (pathStr.startsWith("data:")) {
        return pathStr;
    }

    // If it's already a full HTTP URL, use it directly
    if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
        return pathStr;
    }

    // If it starts with /uploads, prepend backend URL
    if (pathStr.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${pathStr}`;
    }

    // Otherwise, assume it's a relative path and prepend backend URL
    return `${BACKEND_BASE_URL}/${pathStr}`;
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

        fetchAcademicProjects();
    }, []);

    return (
        <PageWrapper
            title="Academic Projects"
            description="Engage with and critique our academic projects that celebrate place, honor cultural identity, and express architecture as a dialogue of dignity and empathy."
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

        fetchProfessionalProjects();
    }, []);

    return (
        <PageWrapper
            title="Professional Projects"
            description="Our portfolio currently highlights academic explorations, competition entries, and professional training or mentorship projects developed through internships. These works reflect our commitment to rigorous research, collaborative learning, and a growing practice that is steadily evolving into a client-facing professional platform."
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

        fetchCompetitionProjects();
    }, []);

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
            console.log("Full project object:", data.data);
            console.log("All project fields:", Object.keys(data.data || {}));
            console.log("main_image:", data.data?.main_image);
            console.log("gallery_images:", data.data?.gallery_images);
            console.log("content_blocks field:", data.data?.content_blocks);
            console.log("content_blocks type:", typeof data.data?.content_blocks);
            
            // Log all available text fields
            console.log("=== TEXT FIELDS ===");
            console.log("title:", data.data?.title);
            console.log("summary:", data.data?.summary);
            console.log("description:", data.data?.description);
            console.log("location:", data.data?.location);
            console.log("client:", data.data?.client);
            console.log("year:", data.data?.year);
            console.log("area:", data.data?.area);
            console.log("budget:", data.data?.budget);
            console.log("team:", data.data?.team);
            console.log("awards:", data.data?.awards);
            console.log("content:", data.data?.content);
            console.log("specifications:", data.data?.specifications);
            console.log("challenges:", data.data?.challenges);
            console.log("solutions:", data.data?.solutions);
            console.log("tags:", data.data?.tags);

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
        if (!project || !project.gallery_images) return;

        // Parse gallery_images if it's a string
        let galleryImages = [];
        if (typeof project.gallery_images === "string") {
            try {
                galleryImages = JSON.parse(project.gallery_images);
            } catch (e) {
                console.error("Error parsing gallery_images:", e);
                return;
            }
        } else if (Array.isArray(project.gallery_images)) {
            galleryImages = project.gallery_images;
        }

        // Extract image paths properly
        const galleryImagePaths = galleryImages
            .map(img => {
                if (typeof img === 'object' && img !== null) {
                    return img.image || img.url || img.path || null;
                }
                if (typeof img === 'string') {
                    return img;
                }
                return null;
            })
            .filter(img => img !== null && img !== undefined && img !== '');

        // Only set up interval if we have multiple images
        if (galleryImagePaths.length <= 0) return;

        const allImagesCount = galleryImagePaths.length + (project.main_image ? 1 : 0);
        if (allImagesCount <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = allImagesCount - 1;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [project?.id, project?.main_image, project?.gallery_images]);

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

        // Extract image paths properly
        const galleryImagePaths = galleryImages
            .map(img => {
                if (typeof img === 'object' && img !== null) {
                    // Try common property names for the image path
                    return img.image || img.url || img.path || img.src || img.file || img.imageUrl || null;
                }
                if (typeof img === 'string') {
                    return img;
                }
                return null;
            })
            .filter(img => img !== null && img !== undefined && img !== '');

        const allImages = [
            project.main_image,
            ...galleryImagePaths
        ].filter(img => img !== null && img !== undefined && img !== '');

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

        // Extract image paths properly
        const galleryImagePaths = galleryImages
            .map(img => {
                if (typeof img === 'object' && img !== null) {
                    // Try common property names for the image path
                    return img.image || img.url || img.path || img.src || img.file || img.imageUrl || null;
                }
                if (typeof img === 'string') {
                    return img;
                }
                return null;
            })
            .filter(img => img !== null && img !== undefined && img !== '');

        const allImages = [
            project.main_image,
            ...galleryImagePaths
        ].filter(img => img !== null && img !== undefined && img !== '');

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

    // Log the structure of gallery images for debugging
    if (galleryImages.length > 0) {
        console.log("First gallery image structure:", galleryImages[0]);
        console.log("First gallery image keys:", Object.keys(galleryImages[0] || {}));
    }

    // Extract image paths from gallery_images (handle both strings and objects)
    const galleryImagePaths = galleryImages
        .map((img, idx) => {
            // If it's an object with an image property, use that
            if (typeof img === 'object' && img !== null) {
                // Try common property names for the image path
                const extractedPath = img.image || img.url || img.path || img.src || img.file || img.imageUrl || null;
                console.log(`Gallery image ${idx} extracted path:`, extractedPath, 'from object:', img);
                return extractedPath;
            }
            // If it's already a string, use it
            if (typeof img === 'string') {
                console.log(`Gallery image ${idx} is string:`, img);
                return img;
            }
            console.log(`Gallery image ${idx} could not be extracted:`, img);
            return null;
        })
        .filter(img => img !== null && img !== undefined && img !== '');

    // Combine main image with gallery images for slideshow
    const allImages = [
        project.main_image,
        ...galleryImagePaths
    ].filter(img => img !== null && img !== undefined && img !== '');

    console.log("All images for slideshow:", allImages);
    console.log("Current image index:", currentIndex);
    
    // Ensure currentIndex is valid
    const validIndex = allImages.length > 0 ? Math.min(currentIndex, allImages.length - 1) : 0;
    const currentImageUrl = allImages.length > 0 ? allImages[validIndex] : project.main_image || '/images/placeholder.jpg';
    
    console.log(
        "Current image URL:",
        getProperImageUrl(currentImageUrl)
    );

    return (
        <div className="visit-project" key={project.id}>
            {/* Advanced Slideshow */}
            {allImages.length > 0 && (
                <div className="slideshow-wrapper">
                    <div className="slideshow">
                        <img
                            src={getProperImageUrl(currentImageUrl)}
                            alt={`${project.title} slide ${validIndex + 1}`}
                            onError={(e) => {
                                e.target.src = "/images/placeholder.jpg";
                            }}
                        />

                    {/* Show arrows only if there are multiple images */}
                    {allImages.length > 1 && (
                        <>
                            <button className="prev-arrow" onClick={prevSlide}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 18L9 12L15 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button className="next-arrow" onClick={nextSlide}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 18L15 12L9 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* Image counter */}
                            <div className="image-counter">
                                {validIndex + 1} / {allImages.length}
                            </div>
                        </>
                    )}
                </div>
            </div>
            )}
            
            {/* Fallback: Show placeholder when no images available */}
            {allImages.length === 0 && (
                <div className="slideshow-wrapper">
                    <div className="slideshow">
                        <img
                            src="/images/placeholder.jpg"
                            alt={`${project.title}`}
                        />
                    </div>
                </div>
            )}

            {/* Project Content */}
            <div className="project-content">
                <div className="project-header">
                    <h1 style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif", fontSize: "2.5rem", fontWeight: "normal" }}>{project.title}</h1>
                </div>

                {/* Project Summary */}
                {project.summary && (
                    <div className="project-summary">
                        <h3>Summary</h3>
                        <p>{project.summary}</p>
                    </div>
                )}

                {/* Project Description */}
                {project.description && (
                    <div className="project-description">
                        <h3>Description</h3>
                        <p>{project.description}</p>
                    </div>
                )}

                {/* Project Content Builder - Display custom content blocks */}
                {project.content_blocks && (() => {
                    let contentBlocks = [];
                    
                    console.log("=== CONTENT BLOCKS DEBUG ===");
                    console.log("Raw content_blocks:", project.content_blocks);
                    console.log("Type:", typeof project.content_blocks);
                    
                    // Parse content_blocks if it's a string
                    if (typeof project.content_blocks === "string") {
                        try {
                            contentBlocks = JSON.parse(project.content_blocks);
                            console.log("Parsed contentBlocks:", contentBlocks);
                        } catch (e) {
                            console.error("Error parsing content_blocks:", e);
                            contentBlocks = [];
                        }
                    } else if (Array.isArray(project.content_blocks)) {
                        contentBlocks = project.content_blocks;
                        console.log("contentBlocks is already array:", contentBlocks);
                    }

                    console.log("Final contentBlocks length:", contentBlocks.length);
                    console.log("Final contentBlocks:", contentBlocks);

                    // Only render if we have content blocks
                    if (contentBlocks.length === 0) {
                        console.log("No content blocks to render");
                        return null;
                    }

                    console.log("Rendering", contentBlocks.length, "content blocks");

                    return (
                        <div className="project-content-builder">
                            <h3 style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif", fontWeight: "normal" }}>Project Description</h3>
                            <div className="content-blocks">
                                {contentBlocks.map((block, index) => {
                                    console.log(`Block ${index}:`, block);
                                    if (block.type === "text") {
                                        return (
                                            <div
                                                key={index}
                                                className="content-block text-block"
                                            >
                                                <div
                                                    className="text-content"
                                                    style={{
                                                        whiteSpace: "pre-wrap",
                                                        textAlign: "justify",
                                                        textAlignLast: "left",
                                                        fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif",
                                                    }}
                                                >
                                                    {block.content}
                                                </div>
                                            </div>
                                        );
                                    } else if (block.type === "image") {
                                        // Try multiple property names for the image URL
                                        const imageUrl = block.url || block.image || block.content || block.src || block.file || block.imageUrl;
                                        console.log(`Image block ${index} URL:`, imageUrl);
                                        console.log(`Image block ${index} full object:`, block);
                                        return (
                                            <div
                                                key={index}
                                                className="content-block image-block"
                                            >
                                                <img
                                                    src={getProperImageUrl(imageUrl)}
                                                    alt={
                                                        block.caption ||
                                                        `Content image ${index + 1}`
                                                    }
                                                    style={{
                                                        maxWidth: "900px",
                                                        width: "100%",
                                                        display: "block",
                                                        margin: "0 auto"
                                                    }}
                                                    onError={(e) => {
                                                        console.error(`Failed to load image ${index}:`, imageUrl);
                                                        e.target.src =
                                                            "/images/placeholder.jpg";
                                                    }}
                                                />
                                                {block.caption && (
                                                    <p className="image-caption">
                                                        {block.caption}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }
                                    console.log(`Unknown block type at ${index}:`, block.type);
                                    return null;
                                })}
                            </div>
                        </div>
                    );
                })()}

                {/* Additional Content Fields */}
                {project.content && (
                    <div className="project-additional-content">
                        <h3>Additional Information</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: project.content,
                            }}
                        />
                    </div>
                )}

                {project.specifications && (
                    <div className="project-specifications">
                        <h3>Specifications</h3>
                        <p>{project.specifications}</p>
                    </div>
                )}

                {project.challenges && (
                    <div className="project-challenges">
                        <h3>Challenges</h3>
                        <p>{project.challenges}</p>
                    </div>
                )}

                {project.solutions && (
                    <div className="project-solutions">
                        <h3>Solutions</h3>
                        <p>{project.solutions}</p>
                    </div>
                )}

                {project.tags && (
                    <div className="project-tags-section">
                        <h3>Tags</h3>
                        <div className="tags-list">
                            {(Array.isArray(project.tags)
                                ? project.tags
                                : project.tags.split(",")
                            ).map((tag, idx) => (
                                <span key={idx} className="tag-item">
                                    {tag.trim()}
                                </span>
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                }

                /* Media Grid - Modern Layout - 3 cards per row */
                .media-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    margin-top: 2rem;
                    max-width: 1200px;
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
                    border-radius: 0;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
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
                    padding: 8rem 15% 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .slideshow-wrapper {
                    max-width: 900px;
                    margin: 0 auto 3rem;
                }

                .slideshow {
                    position: relative;
                    border-radius: 0;
                    overflow: hidden;
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
                    background: rgba(0, 0, 0, 0.2);
                }

                .slideshow img {
                    width: 100%;
                    height: 400px;
                    object-fit: cover;
                    display: block;
                }

                .prev-arrow, .next-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.6);
                    border: none;
                    color: white;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    border-radius: 50%;
                    z-index: 10;
                }

                .prev-arrow:hover, .next-arrow:hover {
                    background: rgba(176, 140, 77, 0.9);
                    transform: translateY(-50%) scale(1.1);
                }

                .prev-arrow {
                    left: 1.5rem;
                }

                .next-arrow {
                    right: 1.5rem;
                }

                .image-counter {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    z-index: 10;
                }

                .slide-indicators {
                    position: absolute;
                    bottom: 1.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.5rem;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    z-index: 10;
                }

                .slide-indicators .indicator {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .slide-indicators .indicator.active {
                    background: rgba(255, 255, 255, 1);
                    width: 30px;
                    border-radius: 10px;
                }

                .slide-indicators .indicator:hover {
                    background: rgba(255, 255, 255, 0.7);
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
                    border-radius: 0;
                    margin-bottom: 2rem;
                    border-left: 4px solid var(--accent-light);
                }

                .project-summary h3,
                .project-description h3,
                .project-additional-content h3,
                .project-specifications h3,
                .project-challenges h3,
                .project-solutions h3,
                .project-tags-section h3 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.3rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .project-summary p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.7;
                    font-size: 1.1rem;
                    margin: 0;
                    font-style: italic;
                }

                .visit-project .project-content p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }

                .project-description {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 1.5rem;
                    border-radius: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 2rem;
                }

                /* Project Details Grid */
                .project-details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin: 2rem 0;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .detail-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 0;
                    transition: all 0.3s ease;
                }

                .detail-item:hover {
                    background: rgba(176, 140, 77, 0.1);
                    transform: translateY(-2px);
                }

                .detail-label {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .detail-value {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.95);
                    font-weight: 600;
                }

                /* Additional Content Sections */
                .project-additional-content,
                .project-specifications,
                .project-challenges,
                .project-solutions {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 1.5rem;
                    border-radius: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 2rem;
                }

                /* Tags Section */
                .project-tags-section {
                    margin-top: 2rem;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tag-item {
                    background: rgba(176, 140, 77, 0.2);
                    color: var(--accent-light);
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    border: 1px solid rgba(176, 140, 77, 0.3);
                    transition: all 0.3s ease;
                }

                .tag-item:hover {
                    background: rgba(176, 140, 77, 0.3);
                    transform: translateY(-2px);
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
                    border-radius: 0;
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
                        gap: 1.5rem;
                    }
                    
                    .slideshow img {
                        height: 300px;
                    }
                    
                    .visit-project {
                        padding: 7rem 1rem 1rem;
                    }

                    .slideshow-wrapper {
                        max-width: 100%;
                    }

                    .prev-arrow, .next-arrow {
                        width: 40px;
                        height: 40px;
                    }

                    .prev-arrow {
                        left: 0.5rem;
                    }

                    .next-arrow {
                        right: 0.5rem;
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

                @media (min-width: 769px) and (max-width: 1024px) {
                    .media-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .visit-project {
                        padding: 7rem 5% 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .page-title {
                        font-size: 1.8rem;
                    }
                    
                    .project-meta {
                        justify-content: center;
                    }

                    .slideshow img {
                        height: 250px;
                    }

                    .image-counter {
                        font-size: 0.75rem;
                        padding: 0.4rem 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Design;