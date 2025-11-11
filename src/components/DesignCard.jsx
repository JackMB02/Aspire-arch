import { useState, useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import "./DesignCard.css";

const DesignCard = ({ project, backendBaseUrl, getSectorLabel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Parse gallery_images if it's a string (from database JSON) - memoize to prevent re-parsing
    const galleryImages = useMemo(() => {
        if (!project.gallery_images) return [];

        let parsedImages = [];
        if (typeof project.gallery_images === "string") {
            try {
                parsedImages = JSON.parse(project.gallery_images);
            } catch (e) {
                console.error("Error parsing gallery_images:", e);
                return [];
            }
        } else if (Array.isArray(project.gallery_images)) {
            parsedImages = project.gallery_images;
        } else {
            return [];
        }

        // Extract image paths from objects or use strings directly
        const galleryImagePaths = parsedImages
            .map((img) => {
                if (typeof img === "object" && img !== null) {
                    return img.image || img.url || img.path || null;
                }
                if (typeof img === "string") return img;
                return null;
            })
            .filter((img) => img !== null && img !== undefined && img !== "");

        return galleryImagePaths;
    }, [project.gallery_images]);

    // Combine main_image with gallery_images - memoize to prevent re-creation
    const allImages = useMemo(() => {
        return galleryImages && galleryImages.length > 0
            ? [project.main_image, ...galleryImages]
            : [project.main_image];
    }, [project.main_image, galleryImages]);

    // Helper function to construct proper image URLs
    const getProperImageUrl = (imagePath) => {
        // Convert to string and handle null/undefined/empty
        const pathStr = String(imagePath);
        if (
            !imagePath ||
            pathStr === "null" ||
            pathStr === "undefined" ||
            pathStr.trim() === ""
        ) {
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
            return `${backendBaseUrl}${pathStr}`;
        }

        // Otherwise, assume it's a relative path and prepend backend URL
        return `${backendBaseUrl}/${pathStr}`;
    };

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

    return (
        <div className="home-style-design-card">
            <div className="card-image">
                <img
                    src={getProperImageUrl(allImages[currentImageIndex])}
                    alt={project.title}
                    onError={(e) => {
                        e.target.src = "/images/placeholder.jpg";
                    }}
                />
                <span className="card-type">
                    {project.category || "Design"}
                </span>
                {/* Image indicators */}
                {allImages.length > 1 && (
                    <div className="card-image-indicators">
                        {allImages.map((_, index) => (
                            <button
                                key={index}
                                className={`card-indicator ${
                                    index === currentImageIndex ? "active" : ""
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentImageIndex(index);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.summary || project.description}</p>
                <Link
                    to={`/design/project/${project.id}`}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <button className="card-view-project-btn">
                        View Project →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default memo(DesignCard);
