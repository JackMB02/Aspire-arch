import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DesignCard = ({ project, backendBaseUrl, getSectorLabel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Combine main_image with gallery_images
    const allImages = project.gallery_images && project.gallery_images.length > 0
        ? [project.main_image, ...project.gallery_images]
        : [project.main_image];

    // Auto slideshow every 3 seconds
    useEffect(() => {
        if (allImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => 
                prev === allImages.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [allImages.length]);

    return (
        <div className="media-card">
            <div className="card-image-container">
                <img
                    src={`${backendBaseUrl}${allImages[currentImageIndex]}`}
                    alt={`${project.title} ${currentImageIndex + 1}`}
                    onError={(e) => {
                        e.target.src = "/images/placeholder.jpg";
                    }}
                />
                {allImages.length > 1 && (
                    <div className="image-indicators">
                        {allImages.map((_, idx) => (
                            <span
                                key={idx}
                                className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(idx)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="media-overlay">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-meta-tags">
                    <span className="meta-tag">{project.category}</span>
                    {project.sector && (
                        <span className="meta-tag">
                            {getSectorLabel(project.sector)}
                        </span>
                    )}
                    {project.is_featured && (
                        <span className="featured-badge-overlay">★ Featured</span>
                    )}
                </div>
                <Link
                    to={`/design/project/${project.id}`}
                >
                    <button>View Project →</button>
                </Link>
            </div>
        </div>
    );
};

export default DesignCard;
