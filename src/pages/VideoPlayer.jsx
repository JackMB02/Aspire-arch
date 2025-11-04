import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaArrowLeft,
} from "react-icons/fa";

const VideoPlayer = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // Sample video data - in a real app, this would come from an API
    const videos = [
        {
            id: 1,
            title: "Sustainable Architecture in Rwanda",
            description:
                "Exploring innovative sustainable building practices in Kigali's urban development projects.",
            videoUrl: "/videos/wa.mp4",
            thumbnail: "/images/office.jpg",
            duration: "5:32",
            views: "2.1K",
            uploadDate: "2024-03-15",
        },
        {
            id: 2,
            title: "Community Housing Project",
            description:
                "A look into affordable housing solutions for growing communities in Rwanda.",
            videoUrl: "/videos/wa.mp4",
            thumbnail: "/images/villa.jpg",
            duration: "4:18",
            views: "1.8K",
            uploadDate: "2024-03-12",
        },
        {
            id: 3,
            title: "Green Building Technologies",
            description:
                "Modern eco-friendly construction techniques being implemented in East Africa.",
            videoUrl: "/videos/wa.mp4",
            thumbnail: "/images/park.jpg",
            duration: "6:45",
            views: "3.2K",
            uploadDate: "2024-03-10",
        },
        {
            id: 4,
            title: "Urban Planning Excellence",
            description:
                "Strategic urban development approaches for sustainable city growth.",
            videoUrl: "/videos/wa.mp4",
            thumbnail: "/images/pavilion.jpg",
            duration: "7:22",
            views: "2.9K",
            uploadDate: "2024-03-08",
        },
    ];

    const currentVideo = videos.find((v) => v.id === parseInt(videoId));
    const suggestedVideos = videos.filter((v) => v.id !== parseInt(videoId));

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener("timeupdate", updateTime);
        video.addEventListener("loadedmetadata", updateDuration);

        return () => {
            video.removeEventListener("timeupdate", updateTime);
            video.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    useEffect(() => {
        let timeout;
        if (isPlaying) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleProgressClick = (e) => {
        const video = videoRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        video.currentTime = newTime;
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!currentVideo) {
        return (
            <div className="video-player-page">
                <div className="container">
                    <div className="video-not-found">
                        <h2>Video not found</h2>
                        <Link to="/media-gallery" className="back-btn">
                            <FaArrowLeft /> Back to Media Gallery
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="video-player-page">
            <div className="container">
                {/* Back Button */}
                <div className="video-header">
                    <button
                        onClick={() => navigate("/media-gallery")}
                        className="back-btn"
                    >
                        <FaArrowLeft /> Back to Gallery
                    </button>
                </div>

                {/* Main Video Player */}
                <div className="main-video-container">
                    <div
                        className="video-wrapper"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => isPlaying && setShowControls(false)}
                    >
                        <video
                            ref={videoRef}
                            src={currentVideo.videoUrl}
                            poster={currentVideo.thumbnail}
                            onClick={togglePlay}
                            className="main-video"
                        />

                        {/* Play/Pause Overlay */}
                        {!isPlaying && (
                            <div className="play-overlay" onClick={togglePlay}>
                                <FaPlay />
                            </div>
                        )}

                        {/* Video Controls */}
                        <div
                            className={`video-controls ${
                                showControls ? "visible" : ""
                            }`}
                        >
                            <div
                                className="progress-bar"
                                onClick={handleProgressClick}
                            >
                                <div
                                    className="progress-filled"
                                    style={{
                                        width: `${
                                            (currentTime / duration) * 100
                                        }%`,
                                    }}
                                />
                            </div>

                            <div className="controls-row">
                                <div className="left-controls">
                                    <button
                                        onClick={togglePlay}
                                        className="control-btn"
                                    >
                                        {isPlaying ? <FaPause /> : <FaPlay />}
                                    </button>
                                    <button
                                        onClick={toggleMute}
                                        className="control-btn"
                                    >
                                        {isMuted ? (
                                            <FaVolumeMute />
                                        ) : (
                                            <FaVolumeUp />
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => {
                                            const newVolume = parseFloat(
                                                e.target.value
                                            );
                                            setVolume(newVolume);
                                            videoRef.current.volume = newVolume;
                                            setIsMuted(newVolume === 0);
                                        }}
                                        className="volume-slider"
                                    />
                                    <span className="time-display">
                                        {formatTime(currentTime)} /{" "}
                                        {formatTime(duration)}
                                    </span>
                                </div>

                                <div className="right-controls">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="control-btn"
                                    >
                                        <FaExpand />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="video-info">
                        <h1>{currentVideo.title}</h1>
                        <div className="video-meta">
                            <span>{currentVideo.views} views</span>
                            <span>•</span>
                            <span>
                                {new Date(
                                    currentVideo.uploadDate
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="video-description">
                            {currentVideo.description}
                        </p>
                    </div>
                </div>

                {/* Suggested Videos */}
                <div className="suggested-videos">
                    <h3>Suggested Videos</h3>
                    <div className="suggested-grid">
                        {suggestedVideos.map((video) => (
                            <Link
                                key={video.id}
                                to={`/video/${video.id}`}
                                className="suggested-video-card"
                            >
                                <div className="suggested-thumbnail">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                    />
                                    <div className="suggested-play-icon">
                                        <FaPlay />
                                    </div>
                                    <span className="duration-badge">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="suggested-content">
                                    <h4>{video.title}</h4>
                                    <div className="suggested-meta">
                                        <span>{video.views} views</span>
                                        <span>•</span>
                                        <span>
                                            {new Date(
                                                video.uploadDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .video-player-page {
                    min-height: 100vh;
                    background: var(--primary-dark);
                    color: white;
                    padding-top: 80px;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .video-header {
                    margin-bottom: 2rem;
                }

                .back-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 0.75rem 1.5rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    font-size: 0.9rem;
                }

                .back-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-1px);
                }

                .main-video-container {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    margin-bottom: 3rem;
                    border-radius: 0;
                }

                .video-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    background: #000;
                }

                .main-video {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .play-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .play-overlay svg {
                    width: 40px;
                    height: 40px;
                    color: white;
                    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7));
                }

                .play-overlay:hover svg {
                    transform: scale(1.1);
                }

                .video-controls {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(
                        transparent,
                        rgba(0, 0, 0, 0.8)
                    );
                    padding: 2rem 1rem 1rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .video-controls.visible {
                    opacity: 1;
                }

                .progress-bar {
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    margin-bottom: 1rem;
                    cursor: pointer;
                    border-radius: 2px;
                }

                .progress-filled {
                    height: 100%;
                    background: var(--accent-light);
                    border-radius: 2px;
                    transition: width 0.1s ease;
                }

                .controls-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .left-controls,
                .right-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .control-btn {
                    background: transparent;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                }

                .control-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .volume-slider {
                    width: 80px;
                    accent-color: var(--accent-light);
                }

                .time-display {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.9);
                }

                .video-info {
                    text-align: center;
                    margin-top: 2rem;
                }

                .video-info h1 {
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                    color: white;
                }

                .video-meta {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }

                .video-description {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .suggested-videos {
                    margin-top: 4rem;
                }

                .suggested-videos h3 {
                    font-size: 1.5rem;
                    margin-bottom: 2rem;
                    color: white;
                }

                .suggested-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .suggested-video-card {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1rem;
                    text-decoration: none;
                    color: white;
                    transition: all 0.2s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .suggested-video-card:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .suggested-thumbnail {
                    position: relative;
                    margin-bottom: 1rem;
                    overflow: hidden;
                }

                .suggested-thumbnail img {
                    width: 100%;
                    height: 160px;
                    object-fit: cover;
                }

                .suggested-play-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .suggested-thumbnail:hover .suggested-play-icon {
                    opacity: 1;
                }

                .suggested-play-icon svg {
                    width: 20px;
                    height: 20px;
                    color: white;
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7));
                }

                .duration-badge {
                    position: absolute;
                    bottom: 0.5rem;
                    right: 0.5rem;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                    border-radius: 3px;
                }

                .suggested-content h4 {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                .suggested-meta {
                    display: flex;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.8rem;
                }

                .video-not-found {
                    text-align: center;
                    padding: 4rem 2rem;
                }

                .video-not-found h2 {
                    margin-bottom: 2rem;
                    color: white;
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 1rem;
                    }

                    .main-video-container {
                        padding: 1rem;
                    }

                    .suggested-grid {
                        grid-template-columns: 1fr;
                    }

                    .video-info h1 {
                        font-size: 1.4rem;
                    }

                    .controls-row {
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }

                    .volume-slider {
                        width: 60px;
                    }
                }
            `}</style>
        </div>
    );
};

export default VideoPlayer;
