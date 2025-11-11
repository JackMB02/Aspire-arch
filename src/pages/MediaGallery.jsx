import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";

// Dynamic backend base URL for images
const getBackendBaseUrl = () => {
    return window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://aspire-arch-server.onrender.com";
};

const BACKEND_BASE_URL = getBackendBaseUrl();
const API_BASE_URL = `${BACKEND_BASE_URL}/api`;

// Helper function to construct proper image URLs
const getImageUrl = (imagePath) => {
    // Handle null, undefined, empty values, and non-string types
    if (!imagePath) {
        return "/images/placeholder.jpg";
    }

    // Convert to string if it's not already a string (handles numbers, objects, etc.)
    const pathStr = String(imagePath);

    // Check for invalid string values
    if (
        pathStr === "null" ||
        pathStr === "undefined" ||
        pathStr.trim() === ""
    ) {
        return "/images/placeholder.jpg";
    }

    // If it's already a full URL, return as is
    if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
        return pathStr;
    }

    // If it's a data URL (base64 image), return as is
    if (pathStr.startsWith("data:")) {
        return pathStr;
    }

    // If it starts with /uploads, construct full URL
    if (pathStr.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${pathStr}`;
    }

    // If it's just a filename without path, assume it's in uploads
    if (!pathStr.includes("/")) {
        return `${BACKEND_BASE_URL}/uploads/${pathStr}`;
    }

    // For any other relative paths
    return `${BACKEND_BASE_URL}${pathStr.startsWith("/") ? "" : "/"}${pathStr}`;
};

// PageWrapper Component
const PageWrapper = ({ title, description, children }) => {
    return (
        <AnimatedSection>
            <div className="media-page-wrapper">
                <h1 className="media-page-title">{title}</h1>
                <p className="media-page-description">{description}</p>
                {children}
            </div>
        </AnimatedSection>
    );
};

// Individual Media Sections
function PhotoAlbumDetail() {
    const { photoId } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlbumDetails();
    }, [photoId]);

    const fetchAlbumDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/media/photos/${photoId}`
            );
            if (response.ok) {
                const data = await response.json();
                setAlbum(data);
            } else {
                console.error("Failed to fetch photo album");
            }
        } catch (error) {
            console.error("Error fetching photo album:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageWrapper title="Loading..." description="Please wait...">
                <SkeletonLoader type="card" count={1} />
            </PageWrapper>
        );
    }

    if (!album) {
        return (
            <PageWrapper
                title="Album Not Found"
                description="The requested photo album could not be found."
            >
                <div className="no-data">
                    <button
                        onClick={() => navigate("/media-gallery/photo-albums")}
                        className="back-btn-primary"
                    >
                        ← Back to Albums
                    </button>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={album.title} description={album.category}>
            <button
                onClick={() => navigate("/media-gallery/photo-albums")}
                className="back-btn-primary"
                style={{ marginBottom: "2rem" }}
            >
                ← Back to Albums
            </button>
            <div className="album-detail">
                <div className="album-main-image">
                    <img
                        src={getImageUrl(album.image)}
                        alt={album.title}
                        onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                        }}
                    />
                </div>
                <div className="album-info">
                    <h2>{album.title}</h2>
                    <p className="album-category">{album.category}</p>
                    {album.description && (
                        <p className="album-description">{album.description}</p>
                    )}
                    {album.location && (
                        <p className="album-location">
                            <strong>Location:</strong> {album.location}
                        </p>
                    )}
                    {album.date && (
                        <p className="album-date">
                            <strong>Date:</strong>{" "}
                            {new Date(album.date).toLocaleDateString()}
                        </p>
                    )}
                    {album.tags && album.tags.length > 0 && (
                        <div className="album-tags">
                            {album.tags.map((tag, idx) => (
                                <span key={idx} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}

function PhotoAlbums() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Architecture",
        "Nature",
        "Residential",
        "Public",
        "Commercial",
        "Cultural",
    ];

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/photos`);
            if (response.ok) {
                const data = await response.json();
                console.log("Photos data from API:", data); // Debug log
                setPhotos(data);
            } else {
                console.error("Failed to fetch photos");
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPhotos =
        selectedCategory === "All"
            ? photos
            : photos.filter((photo) => photo.category === selectedCategory);

    if (loading) {
        return (
            <PageWrapper title="Photo Albums" description="Loading photos...">
                <SkeletonLoader type="card" count={6} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Photo Albums"
            description="Browse through our curated collection of photographs capturing architecture, community events, and behind-the-scenes moments."
        >
            <div className="media-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`filter-btn ${
                            selectedCategory === category ? "active" : ""
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="media-grid">
                {filteredPhotos.length === 0 ? (
                    <div className="no-data">
                        No photos found. Upload some photos through the admin
                        dashboard!
                    </div>
                ) : (
                    filteredPhotos.map((photo) => (
                        <div key={photo.id} className="media-card">
                            <img
                                src={getImageUrl(photo.image)}
                                alt={photo.title}
                                onError={(e) => {
                                    console.log(
                                        "Image failed to load:",
                                        photo.image
                                    );
                                    e.target.src = "/images/placeholder.jpg";
                                }}
                            />
                            <div className="media-overlay">
                                <h3>{photo.title}</h3>
                                <p>{photo.category}</p>
                                <Link
                                    to={`/media-gallery/photo-albums/${photo.id}`}
                                    className="view-album-btn"
                                >
                                    View Album →
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageWrapper>
    );
}

function VideoStories() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/videos`);
            if (response.ok) {
                const data = await response.json();
                console.log("Videos data from API:", data); // Debug log
                setVideos(data);
            } else {
                console.error("Failed to fetch videos");
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageWrapper title="Video Stories" description="Loading videos...">
                <SkeletonLoader type="card" count={4} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Video Stories"
            description="Watch inspiring video stories highlighting our projects, community initiatives, and design process."
        >
            <div className="media-grid">
                {videos.length === 0 ? (
                    <div className="no-data">
                        No videos found. Upload some videos through the admin
                        dashboard!
                    </div>
                ) : (
                    videos.map((video) => (
                        <div key={video.id} className="media-card video-card">
                            <Link
                                to={`/video/${video.id}`}
                                className="video-thumbnail"
                            >
                                <img
                                    src={getImageUrl(video.thumbnail)}
                                    alt={video.title}
                                    onError={(e) => {
                                        console.log(
                                            "Thumbnail failed to load:",
                                            video.thumbnail
                                        );
                                        e.target.src =
                                            "/images/placeholder.jpg";
                                    }}
                                />
                                <div className="play-indicator">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 5V19L19 12L8 5Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                {video.duration && (
                                    <span className="video-duration">
                                        {video.duration}
                                    </span>
                                )}
                            </Link>
                            <div className="media-info">
                                <h3>{video.title}</h3>
                                <Link
                                    to={`/video/${video.id}`}
                                    className="play-video-btn"
                                >
                                    Play Video →
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageWrapper>
    );
}

function DesignVisualizations() {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDesign, setSelectedDesign] = useState(null);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/designs`);
            if (response.ok) {
                const data = await response.json();
                console.log("Designs data from API:", data); // Debug log
                setDesigns(data);
            } else {
                console.error("Failed to fetch designs");
            }
        } catch (error) {
            console.error("Error fetching designs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageWrapper
                title="Design Visualizations"
                description="Loading designs..."
            >
                <SkeletonLoader type="card" count={6} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Design Visualizations"
            description="Explore 3D renders and design visualizations showcasing architectural concepts and project ideas."
        >
            <div className="media-grid">
                {designs.length === 0 ? (
                    <div className="no-data">
                        No designs found. Upload some designs through the admin
                        dashboard!
                    </div>
                ) : (
                    designs.map((design) => (
                        <div key={design.id} className="media-card">
                            <img
                                src={getImageUrl(design.image)}
                                alt={design.title}
                                onError={(e) => {
                                    console.log(
                                        "Design image failed to load:",
                                        design.image
                                    );
                                    e.target.src = "/images/placeholder.jpg";
                                }}
                            />
                            <div className="media-overlay">
                                <h3>{design.title}</h3>
                                <p>{design.type}</p>
                                <button
                                    onClick={() => setSelectedDesign(design)}
                                >
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Design Detail Modal */}
            {selectedDesign && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedDesign(null)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setSelectedDesign(null)}
                        >
                            ×
                        </button>
                        <img
                            src={getImageUrl(selectedDesign.image)}
                            alt={selectedDesign.title}
                            className="modal-image"
                        />
                        <div className="modal-info">
                            <h2>{selectedDesign.title}</h2>
                            <p className="design-type">
                                {selectedDesign.type} ·{" "}
                                {selectedDesign.category}
                            </p>
                            <p className="design-description">
                                {selectedDesign.description}
                            </p>
                            {selectedDesign.project && (
                                <p className="design-project">
                                    <strong>Project:</strong>{" "}
                                    {selectedDesign.project}
                                </p>
                            )}
                            {selectedDesign.tags &&
                                selectedDesign.tags.length > 0 && (
                                    <div className="design-tags">
                                        {selectedDesign.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </PageWrapper>
    );
}

function CommunityVoices() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/testimonials`);
            if (response.ok) {
                const data = await response.json();
                console.log("Testimonials data from API:", data); // Debug log
                setTestimonials(data);
            } else {
                console.error("Failed to fetch testimonials");
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageWrapper
                title="Community Voices"
                description="Loading testimonials..."
            >
                <SkeletonLoader type="list" count={4} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Community Voices"
            description="Read testimonials and stories from our community, sharing experiences and insights about our projects."
        >
            <div className="testimonials-grid">
                {testimonials.length === 0 ? (
                    <div className="no-data">
                        No testimonials found. Add some testimonials through the
                        admin dashboard!
                    </div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-image">
                                <img
                                    src={getImageUrl(testimonial.image)}
                                    alt={testimonial.name}
                                    onError={(e) => {
                                        console.log(
                                            "Testimonial image failed to load:",
                                            testimonial.image
                                        );
                                        e.target.src =
                                            "/images/placeholder.jpg";
                                    }}
                                />
                            </div>
                            <div className="testimonial-content">
                                <h3>{testimonial.name}</h3>
                                <p className="testimonial-role">
                                    {testimonial.role}
                                </p>
                                <p className="testimonial-quote">
                                    "{testimonial.quote}"
                                </p>
                                {testimonial.project && (
                                    <p className="testimonial-project">
                                        {testimonial.project}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageWrapper>
    );
}

// Media Overview Grid - Now shows Photo Albums by default
function MediaOverview() {
    const [categoryImages, setCategoryImages] = useState({
        photoAlbums: null,
        videoStories: null,
        designs: null,
        testimonials: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoryImages();
    }, []);

    const fetchCategoryImages = async () => {
        try {
            setLoading(true);
            // Fetch the first image from each category
            const [photosRes, videosRes, designsRes, testimonialsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/media/photos`),
                fetch(`${API_BASE_URL}/media/videos`),
                fetch(`${API_BASE_URL}/media/designs`),
                fetch(`${API_BASE_URL}/media/testimonials`),
            ]);

            const photos = photosRes.ok ? await photosRes.json() : [];
            const videos = videosRes.ok ? await videosRes.json() : [];
            const designs = designsRes.ok ? await designsRes.json() : [];
            const testimonials = testimonialsRes.ok ? await testimonialsRes.json() : [];

            setCategoryImages({
                photoAlbums: photos.length > 0 ? getImageUrl(photos[0].image) : "/images/placeholder.jpg",
                videoStories: videos.length > 0 ? getImageUrl(videos[0].thumbnail) : "/images/placeholder.jpg",
                designs: designs.length > 0 ? getImageUrl(designs[0].image) : "/images/placeholder.jpg",
                testimonials: testimonials.length > 0 ? getImageUrl(testimonials[0].image) : "/images/placeholder.jpg",
            });
        } catch (error) {
            console.error("Error fetching category images:", error);
            // Set placeholder images on error
            setCategoryImages({
                photoAlbums: "/images/placeholder.jpg",
                videoStories: "/images/placeholder.jpg",
                designs: "/images/placeholder.jpg",
                testimonials: "/images/placeholder.jpg",
            });
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        {
            title: "Photo Albums",
            description:
                "Curated collections capturing architectural excellence, project milestones, and memorable moments.",
            link: "photo-albums",
            icon: "📷",
        },
        {
            title: "Video Stories",
            description:
                "Dynamic narratives showcasing our projects, team insights, and architectural journeys.",
            link: "video-stories",
            icon: "🎥",
        },
        {
            title: "Design Visualizations",
            description:
                "Detailed renderings and concepts bringing architectural visions to life.",
            link: "design-visualizations",
            icon: "🎨",
        },
        {
            title: "Community Voices",
            description:
                "Testimonials and experiences from clients, partners, and community members.",
            link: "community-voices",
            icon: "💬",
        },
    ];

    if (loading) {
        return (
            <PageWrapper
                title="Media Gallery"
                description="Loading..."
            >
                <SkeletonLoader type="card" count={4} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Media Gallery"
            description="Explore our visual journey through photographs, videos, design concepts, and community stories."
        >
            <div className="categories-grid">
                {categories.map((category, index) => {
                    const imageKey = index === 0 ? 'photoAlbums' : 
                                   index === 1 ? 'videoStories' : 
                                   index === 2 ? 'designs' : 'testimonials';
                    return (
                        <Link
                            to={category.link}
                            key={index}
                            className="category-card"
                        >
                            <div className="category-image-container">
                                <img
                                    src={categoryImages[imageKey]}
                                    alt={category.title}
                                    className="category-image"
                                    onError={(e) => {
                                        e.target.src = "/images/placeholder.jpg";
                                    }}
                                />
                                <div className="category-icon">{category.icon}</div>
                            </div>
                            <div className="category-content">
                                <h3>{category.title}</h3>
                                <p>{category.description}</p>
                                <span className="category-link-arrow">→</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </PageWrapper>
    );
}

// Main MediaGallery Component
function MediaGallery() {
    return (
        <div
            className="media-gallery-page"
            style={{
                background: "var(--primary-dark)",
                minHeight: "100vh",
                color: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <Routes>
                <Route
                    path="photo-albums/:photoId"
                    element={<PhotoAlbumDetail />}
                />
                <Route path="photo-albums" element={<PhotoAlbums />} />
                <Route path="video-stories" element={<VideoStories />} />
                <Route
                    path="design-visualizations"
                    element={<DesignVisualizations />}
                />
                <Route path="community-voices" element={<CommunityVoices />} />
                <Route path="*" element={<PhotoAlbums />} />
            </Routes>

            {/* Embedded CSS - Add loading styles */}
            <style>
                {`
        /* Loading and Error States */
        .loading-spinner {
            text-align: center;
            padding: 3rem;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.1rem;
        }

        .no-data {
            text-align: center;
            padding: 3rem;
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
            grid-column: 1 / -1;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Rest of your existing CSS styles... */
        .media-gallery-page {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .media-page-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .media-page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .media-page-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
          line-height: 1.6;
          text-align: center;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Categories Grid */
        .media-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .category-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border-color: var(--accent-light);
        }

        .category-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .category-card:hover .category-image img {
          transform: scale(1.05);
        }

        .category-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .category-content {
          padding: 1.5rem;
        }

        .category-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }

        .category-content p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .explore-link {
          color: var(--accent-light);
          font-weight: 600;
          transition: color 0.2s ease;
          font-size: 0.95rem;
        }

        .category-card:hover .explore-link {
          color: rgba(176, 140, 77, 0.8);
        }

        /* Media Grid */
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .media-card {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .media-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          border-color: var(--accent-light);
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
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .media-overlay p {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .media-overlay button,
        .media-overlay .view-album-btn {
          background: var(--accent-light);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          align-self: flex-start;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
        }

        .media-overlay button:hover,
        .media-overlay .view-album-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.4);
        }

        /* Video Cards */
        .video-card {
          min-height: 280px;
          display: flex;
          flex-direction: column;
        }
        
        .video-card.playing {
          grid-column: 1 / -1;
          max-width: 800px;
          margin: 0 auto;
          min-height: auto;
        }

        .video-thumbnail {
          position: relative;
          flex-grow: 1;
          cursor: pointer;
          display: block;
          text-decoration: none;
        }

        .play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: transparent;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }

        .play-indicator svg {
          width: 40px;
          height: 40px;
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }

        .video-thumbnail:hover .play-indicator {
          transform: translate(-50%, -50%) scale(1.15);
          background: rgba(176, 140, 77, 0.9);
          box-shadow: 0 8px 30px rgba(176, 140, 77, 0.5);
        }

        .video-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .play-video-btn {
          display: inline-block;
          background: var(--accent-light);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }

        .play-video-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.3);
        }

        .media-info {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .media-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }

        /* Filters */
        .media-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
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
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
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

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          border-left: 4px solid var(--accent-light);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .testimonial-image {
          height: 200px;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .testimonial-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }

        .testimonial-role {
          color: var(--accent-light);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .testimonial-quote {
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
          font-size: 0.95rem;
        }

        .testimonial-project {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
        }

        .modal-content {
          background: var(--primary-dark);
          border-radius: 12px;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          font-size: 2rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .modal-image {
          width: 100%;
          max-height: 60vh;
          object-fit: contain;
          background: rgba(0, 0, 0, 0.3);
        }

        .modal-info {
          padding: 2rem;
        }

        .modal-info h2 {
          color: var(--accent-light);
          margin-bottom: 0.5rem;
        }

        .design-type {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .design-description {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .design-project {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .design-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: rgba(122, 158, 217, 0.2);
          color: var(--accent-light);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }

        /* Album Detail Page */
        .album-detail {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .album-main-image {
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .album-main-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .album-info {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .album-info h2 {
          color: var(--accent-light);
          margin-bottom: 0.5rem;
        }

        .album-category {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .album-description {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .album-location,
        .album-date {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }

        .album-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .back-btn-primary {
          background: var(--accent-light);
          color: var(--primary-dark);
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-btn-primary:hover {
          background: rgba(122, 158, 217, 0.9);
          transform: translateX(-5px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .media-categories-grid,
          .media-grid,
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .media-gallery-page {
            padding: 7rem 1rem 1rem;
          }
          
          .media-page-title {
            font-size: 2rem;
          }
          
          .media-categories-grid,
          .media-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .media-filters {
            justify-content: center;
          }
          
          .video-card.playing {
            grid-column: 1;
          }
          
          .media-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .media-page-wrapper {
            padding: 1rem 0.5rem;
          }
          
          .media-page-title {
            font-size: 1.8rem;
          }
          
          .category-content,
          .testimonial-content {
            padding: 1rem;
          }
        }
        `}
            </style>
        </div>
    );
}

export default MediaGallery;
