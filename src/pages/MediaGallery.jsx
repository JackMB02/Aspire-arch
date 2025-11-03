import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

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
    const photos = [
        {
            id: 1,
            title: "Urban Architecture",
            image: "/images/pome.jpg",
            category: "Architecture",
        },
        {
            id: 2,
            title: "Nature Integration",
            image: "/images/library.jpg",
            category: "Nature",
        },
        {
            id: 3,
            title: "Modern Design",
            image: "/images/villa.jpg",
            category: "Residential",
        },
        {
            id: 4,
            title: "Community Spaces",
            image: "/images/park.jpg",
            category: "Public",
        },
        {
            id: 5,
            title: "Interior Design",
            image: "/images/office.jpg",
            category: "Commercial",
        },
        {
            id: 6,
            title: "Cultural Heritage",
            image: "/images/pavilion.jpg",
            category: "Cultural",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = [
        "All",
        "City",
        "Nature",
        "Residential",
        "Public",
        "Commercial",
        "Cultural",
    ];

    const filteredPhotos =
        selectedCategory === "All"
            ? photos
            : photos.filter((photo) => photo.category === selectedCategory);

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
                {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="media-card">
                        <img src={photo.image} alt={photo.title} />
                        <div className="media-overlay">
                            <h3>{photo.title}</h3>
                            <p>{photo.category}</p>
                            <button>View Album →</button>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}

function VideoStories() {
    const videos = [
        {
            id: 1,
            title: "Project Walkthrough",
            thumbnail: "/images/pome.jpg",
            duration: "2:45",
            videoSrc: "/videos/wa.mp4",
        },
        {
            id: 2,
            title: "Design Process",
            thumbnail: "/images/villa.jpg",
            duration: "4:20",
            videoSrc: "/videos/wa.mp4",
        },
        {
            id: 3,
            title: "Client Testimonials",
            thumbnail: "/images/office.jpg",
            duration: "3:15",
            videoSrc: "/videos/wa.mp4",
        },
        {
            id: 4,
            title: "Construction Progress",
            thumbnail: "/images/housing.jpg",
            duration: "5:30",
            videoSrc: "/videos/wa.mp4",
        },
    ];

    return (
        <PageWrapper
            title="Video Stories"
            description="Watch inspiring video stories highlighting our projects, community initiatives, and design process."
        >
            <div className="media-grid">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="media-card video-card"
                    >
                        <Link
                            to={`/video/${video.id}`}
                            className="video-thumbnail"
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
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
                            <span className="video-duration">
                                {video.duration}
                            </span>
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
                ))}
            </div>
        </PageWrapper>
    );
}

function DesignVisualizations() {
    const designs = [
        {
            id: 1,
            title: "3D Concept Render",
            image: "/images/pome.jpg",
            type: "Exterior",
        },
        {
            id: 2,
            title: "Interior Visualization",
            image: "/images/library.jpg",
            type: "Interior",
        },
        {
            id: 3,
            title: "Landscape Design",
            image: "/images/park.jpg",
            type: "Landscape",
        },
        {
            id: 4,
            title: "Urban Planning",
            image: "/images/office.jpg",
            type: "Masterplan",
        },
    ];

    return (
        <PageWrapper
            title="Design Visualizations"
            description="Explore 3D renders and design visualizations showcasing architectural concepts and project ideas."
        >
            <div className="media-grid">
                {designs.map((design) => (
                    <div key={design.id} className="media-card">
                        <img src={design.image} alt={design.title} />
                        <div className="media-overlay">
                            <h3>{design.title}</h3>
                            <p>{design.type}</p>
                            <button>View Details →</button>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}

function CommunityVoices() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Community Resident",
            image: "/images/pome.jpg",
            quote: "The design completely transformed our neighborhood. It's both beautiful and functional.",
            project: "Urban Green Park",
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Local Business Owner",
            image: "/images/villa.jpg",
            quote: "The attention to detail and understanding of our needs made this project exceptional.",
            project: "Modern Campus Library",
        },
    ];

    return (
        <PageWrapper
            title="Community Voices"
            description="Read testimonials and stories from our community, sharing experiences and insights about our projects."
        >
            <div className="testimonials-grid">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-image">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
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
                            <p className="testimonial-project">
                                {testimonial.project}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}

// Media Overview Grid
function MediaOverview() {
    const categories = [
        {
            title: "Photo Albums",
            description: "Browse curated photo collections from our projects.",
            link: "photo-albums",
            image: "/images/pome.jpg",
            count: "48 photos",
        },
        {
            title: "Video Stories",
            description: "Watch inspiring video stories of our work.",
            link: "video-stories",
            image: "/images/villa.jpg",
            count: "12 videos",
        },
        {
            title: "Design Visualizations",
            description: "See 3D renders and visual concepts of our designs.",
            link: "design-visualizations",
            image: "/images/office.jpg",
            count: "24 renders",
        },
        {
            title: "Community Voices",
            description: "Read testimonials and stories from the community.",
            link: "community-voices",
            image: "/images/park.jpg",
            count: "16 stories",
        },
    ];

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

            {/* Embedded CSS */}
            <style>
                {`
        /* Media Gallery Styles */
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

        /* Video Cards Enhanced */

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
