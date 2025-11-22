import { useState, useEffect } from "react";

// Text Truncate Component with Show More/Less
const TruncatedText = ({ text, maxLines = 4, className = "" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        // Check if text needs truncation (rough estimate: ~50 chars per line)
        const estimatedLines = Math.ceil((text || "").length / 50);
        setIsTruncated(estimatedLines > maxLines);
    }, [text, maxLines]);

    if (!text) return null;

    return (
        <div className={`truncated-text-wrapper ${className}`}>
            <p
                className="truncated-text"
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: !isExpanded ? maxLines : "unset",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {text}
            </p>
            {isTruncated && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    className="show-more-btn-text"
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent-light)",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        marginTop: "0.5rem",
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: "underline",
                    }}
                >
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    );
};

export default TruncatedText;
