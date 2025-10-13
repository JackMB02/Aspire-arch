import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

const API_BASE_URL = "http://localhost:4000/api";

// Helper function to construct proper image URLs
const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
        return "/images/placeholder.jpg";
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // If it's a data URL (base64 image), return as is
    if (imagePath.startsWith('data:')) {
        return imagePath;
    }
    
    // If it starts with /uploads, construct full URL
    if (imagePath.startsWith('/uploads/')) {
        return `${API_BASE_URL}${imagePath}`;
    }
    
    // If it's just a filename without path, assume it's in uploads
    if (!imagePath.includes('/')) {
        return `${API_BASE_URL}/uploads/${imagePath}`;
    }
    
    // For any other relative paths
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
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
                console.log('Photos data from API:', data); // Debug log
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
            <PageWrapper
                title="Photo Albums"
                description="Loading photos..."
            >
                <div className="loading-spinner">Loading photos...</div>
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
                    <div className="no-data">No photos found. Upload some photos through the admin dashboard!</div>
                ) : (
                    filteredPhotos.map((photo) => (
                        <div key={photo.id} className="media-card">
                            <img 
                                src={getImageUrl(photo.image)} 
                                alt={photo.title} 
                                onError={(e) => {
                                    console.log('Image failed to load:', photo.image);
                                    e.target.src = "/images/placeholder.jpg";
                                }}
                            />
                            <div className="media-overlay">
                                <h3>{photo.title}</h3>
                                <p>{photo.category}</p>
                                <button>View Album →</button>
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
                console.log('Videos data from API:', data); // Debug log
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
            <PageWrapper
                title="Video Stories"
                description="Loading videos..."
            >
                <div className="loading-spinner">Loading videos...</div>
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
                    <div className="no-data">No videos found. Upload some videos through the admin dashboard!</div>
                ) : (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            className="media-card video-card"
                        >
                            <Link
                                to={`/video/${video.id}`}
                                className="video-thumbnail"
                            >
                                <img
                                    src={getImageUrl(video.thumbnail)}
                                    alt={video.title}
                                    onError={(e) => {
                                        console.log('Thumbnail failed to load:', video.thumbnail);
                                        e.target.src = "/images/placeholder.jpg";
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

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/designs`);
            if (response.ok) {
                const data = await response.json();
                console.log('Designs data from API:', data); // Debug log
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
                <div className="loading-spinner">Loading designs...</div>
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
                    <div className="no-data">No designs found. Upload some designs through the admin dashboard!</div>
                ) : (
                    designs.map((design) => (
                        <div key={design.id} className="media-card">
                            <img 
                                src={getImageUrl(design.image)} 
                                alt={design.title}
                                onError={(e) => {
                                    console.log('Design image failed to load:', design.image);
                                    e.target.src = "/images/placeholder.jpg";
                                }}
                            />
                            <div className="media-overlay">
                                <h3>{design.title}</h3>
                                <p>{design.type}</p>
                                <button>View Details →</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
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
                console.log('Testimonials data from API:', data); // Debug log
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
                <div className="loading-spinner">Loading testimonials...</div>
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
                    <div className="no-data">No testimonials found. Add some testimonials through the admin dashboard!</div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-image">
                                <img
                                    src={getImageUrl(testimonial.image)}
                                    alt={testimonial.name}
                                    onError={(e) => {
                                        console.log('Testimonial image failed to load:', testimonial.image);
                                        e.target.src = "/images/placeholder.jpg";
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

// Media Overview Grid
function MediaOverview() {
    const [stats, setStats] = useState({
        photos: 0,
        videos: 0,
        designs: 0,
        testimonials: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/media/stats`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                console.error("Failed to fetch media stats");
            }
        } catch (error) {
            console.error("Error fetching media stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        {
            title: "Photo Albums",
            description: "Browse curated photo collections from our projects.",
            link: "photo-albums",
            image: "/images/pome.jpg",
            count: `${stats.photos} photos`,
        },
        {
            title: "Video Stories",
            description: "Watch inspiring video stories of our work.",
            link: "video-stories",
            image: "/images/villa.jpg",
            count: `${stats.videos} videos`,
        },
        {
            title: "Design Visualizations",
            description: "See 3D renders and visual concepts of our designs.",
            link: "design-visualizations",
            image: "/images/office.jpg",
            count: `${stats.designs} renders`,
        },
        {
            title: "Community Voices",
            description: "Read testimonials and stories from the community.",
            link: "community-voices",
            image: "/images/park.jpg",
            count: `${stats.testimonials} stories`,
        },
    ];

    if (loading) {
        return (
            <PageWrapper
                title="Media Gallery"
                description="Loading media gallery..."
            >
                <div className="loading-spinner">Loading media gallery...</div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            title="Media Gallery"
            description="Explore our media collection including photos, videos, design visualizations, and community stories. Click any category to explore further."
        >
            <div className="media-categories-grid">
                {categories.map((cat, idx) => (
                    <Link to={cat.link} key={idx} className="category-card">
                        <div className="category-image">
                            <img src={cat.image} alt={cat.title} />
                            <div className="category-count">{cat.count}</div>
                        </div>
                        <div className="category-content">
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                            <span className="explore-link">Explore →</span>
                        </div>
                    </Link>
                ))}
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
                <Route path="photo-albums" element={<PhotoAlbums />} />
                <Route path="video-stories" element={<VideoStories />} />
                <Route
                    path="design-visualizations"
                    element={<DesignVisualizations />}
                />
                <Route path="community-voices" element={<CommunityVoices />} />
                <Route path="*" element={<MediaOverview />} />
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
          padding: 6rem 2rem 2rem;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .media-page-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .media-page-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1rem;
        }

        .media-page-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        /* Categories Grid */
        .media-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .category-card {
          background: white;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: inherit;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .category-image {
          position: relative;
          height: 180px;
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
          padding: 3px 8px;
          border-radius: 0;
          font-size: 0.8rem;
        }

        .category-content {
          padding: 1.2rem;
        }

        .category-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #222;
        }

        .category-content p {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .explore-link {
          color: var(--accent-light);
          font-weight: 600;
          transition: color 0.2s ease;
          font-size: 0.9rem;
        }

        .category-card:hover .explore-link {
          color: rgba(176, 140, 77, 0.8);
        }

        /* Media Grid */
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.2rem;
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
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .media-card img {
          width: 100%;
          height: 180px;
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
          padding: 1.2rem;
          transition: opacity 0.3s ease;
        }

        .media-card:hover .media-overlay {
          opacity: 1;
        }

        .media-overlay h3 {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
        }

        .media-overlay p {
          font-size: 0.85rem;
          margin-bottom: 0.8rem;
          opacity: 0.9;
        }

        .media-overlay button {
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
        }

        .media-overlay button:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.4);
        }

        /* Video Cards */
        .video-card {
          min-height: 260px;
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
          border-radius: 0;
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
          border-radius: 0;
          font-size: 0.75rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .play-video-btn {
          display: inline-block;
          background: var(--accent-light);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }

        .play-video-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.3);
        }

        .media-info {
          padding: 0.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .media-info h3 {
          font-size: 1rem;
          margin-bottom: 0;
          color: #222;
        }

        .media-info button {
          background: var(--accent-light);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .media-info button:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.4);
        }

        /* Filters */
        .media-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .filter-btn {
          padding: 6px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
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
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .testimonial-card {
          background: white;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          border-left: 4px solid var(--accent-light);
        }

        .testimonial-image {
          height: 180px;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-content {
          padding: 1.2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .testimonial-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
          color: #222;
        }

        .testimonial-role {
          color: var(--accent-light);
          font-size: 0.85rem;
          margin-bottom: 0.8rem;
        }

        .testimonial-quote {
          font-style: italic;
          color: #555;
          line-height: 1.5;
          margin-bottom: 0.8rem;
          flex-grow: 1;
          font-size: 0.9rem;
        }

        .testimonial-project {
          color: #777;
          font-size: 0.85rem;
          font-weight: 500;
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
            padding: 5rem 1rem 1rem;
          }
          
          .media-page-title {
            font-size: 1.8rem;
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
            gap: 0.5rem;
          }
        }

        /* Dark theme overrides */
        .media-gallery-page {
          background: var(--primary-dark) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .media-gallery-page *:not(img):not(svg):not(video) {
          color: inherit !important;
        }
        
        .media-gallery-page h1,
        .media-gallery-page h2,
        .media-gallery-page h3,
        .media-gallery-page h4 {
          color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .media-gallery-page .media-page-wrapper {
          background: var(--primary-dark) !important;
        }
        
        .media-gallery-page .category-card,
        .media-gallery-page .album-card,
        .media-gallery-page .video-card,
        .media-gallery-page .visualization-card,
        .media-gallery-page .testimonial-card,
        .media-gallery-page .filter-btn {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .media-gallery-page .category-card:hover,
        .media-gallery-page .album-card:hover,
        .media-gallery-page .video-card:hover,
        .media-gallery-page .visualization-card:hover,
        .media-gallery-page .testimonial-card:hover,
        .media-gallery-page .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }
        
        .media-gallery-page .filter-btn.active,
        .media-gallery-page .view-btn,
        .media-gallery-page .play-btn {
          background: var(--accent-light) !important;
          color: white !important;
        }
        
        .media-gallery-page .filter-btn.active:hover,
        .media-gallery-page .view-btn:hover,
        .media-gallery-page .play-btn:hover {
          background: rgba(122, 158, 217, 0.8) !important;
        }
        `}
            </style>
        </div>
    );
}

export default MediaGallery;