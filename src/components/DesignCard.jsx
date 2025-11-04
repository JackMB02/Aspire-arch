import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DesignCard.css";

const DesignCard = ({ project, backendBaseUrl, getSectorLabel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Parse gallery_images if it's a string (from database JSON)
    let galleryImages = [];
    if (project.gallery_images) {
        if (typeof project.gallery_images === 'string') {
            try {
                galleryImages = JSON.parse(project.gallery_images);
            } catch (e) {
                console.error('Error parsing gallery_images:', e);
                galleryImages = [];
            }
        } else if (Array.isArray(project.gallery_images)) {
            galleryImages = project.gallery_images;
        }
    }

    // Combine main_image with gallery_images
    const allImages =
        galleryImages && galleryImages.length > 0
            ? [project.main_image, ...galleryImages]
            : [project.main_image];

    console.log('Project:', project.title, 'All Images:', allImages);

    // Auto slideshow every 4 seconds
    useEffect(() => {
        if (allImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) =>
                prev === allImages.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [allImages.length]);

    const nextSlide = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    return (
        <div className="modern-design-card">
            {/* Main Slideshow Section */}
            <div className="card-slideshow">
                <div className="slideshow-container">
                    <img
                        src={`${backendBaseUrl}${allImages[currentImageIndex]}`}
                        alt={`${project.title} ${currentImageIndex + 1}`}
                        onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                        }}
                        className="slideshow-image"
                    />

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                        <>
                            <button
                                className="slide-arrow prev"
                                onClick={prevSlide}
                            >
                                ❮
                            </button>
                            <button
                                className="slide-arrow next"
                                onClick={nextSlide}
                            >
                                ❯
                            </button>
                        </>
                    )}

                    {/* Featured Badge */}
                    {project.is_featured && (
                        <div className="featured-badge">★ Featured</div>
                    )}

                    {/* Indicators */}
                    {allImages.length > 1 && (
                        <div className="slideshow-indicators">
                            {allImages.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`slide-indicator ${
                                        idx === currentImageIndex
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Project Info Section */}
            <div className="card-content">
                <div className="card-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                        <span className="tag category">{project.category}</span>
                        {project.sector && (
                            <span className="tag sector">
                                {getSectorLabel(project.sector)}
                            </span>
                        )}
                    </div>
                </div>

                <p className="project-summary">{project.summary}</p>

                {/* Individual Images with Descriptions */}
                {allImages.length > 0 && (
                    <div className="image-gallery">
                        <h4 className="gallery-title">Project Gallery</h4>
                        <div className="gallery-grid">
                            {allImages.map((image, idx) => (
                                <div key={idx} className="gallery-item">
                                    <div className="gallery-image-wrapper">
                                        <img
                                            src={`${backendBaseUrl}${image}`}
                                            alt={`${project.title} view ${
                                                idx + 1
                                            }`}
                                            onError={(e) => {
                                                e.target.src =
                                                    "/images/placeholder.jpg";
                                            }}
                                            className="gallery-image"
                                        />
                                    </div>
                                    <p className="gallery-description">
                                        {idx === 0
                                            ? "Main View"
                                            : `View ${idx + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full Description */}
                {project.description && (
                    <div className="project-description">
                        <h4 className="description-title">
                            About This Project
                        </h4>
                        <p>{project.description}</p>
                    </div>
                )}

                {/* View Details Button */}
                <Link
                    to={`/design/project/${project.id}`}
                    className="view-details-link"
                >
                    <button className="view-details-btn">
                        View Full Details →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DesignCard;
