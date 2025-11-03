import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="skeleton-card">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                        </div>
                    </div>
                );
            case 'list':
                return (
                    <div className="skeleton-list-item">
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-list-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                );
            case 'workshop':
                return (
                    <div className="skeleton-workshop">
                        <div className="skeleton-workshop-header">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-badge"></div>
                        </div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-workshop-footer">
                            <div className="skeleton-text short"></div>
                            <div className="skeleton-button"></div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="skeleton-card">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <div className="skeleton-grid">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index}>{renderSkeleton()}</div>
                ))}
            </div>
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }

                .skeleton-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin: 2rem 0;
                }

                .skeleton-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                }

                .skeleton-image {
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                .skeleton-content {
                    padding: 1.5rem;
                }

                .skeleton-title {
                    width: 70%;
                    height: 24px;
                    margin-bottom: 1rem;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                .skeleton-text {
                    width: 100%;
                    height: 16px;
                    margin-bottom: 0.75rem;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                .skeleton-text.short {
                    width: 60%;
                }

                .skeleton-list-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 1rem;
                }

                .skeleton-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                .skeleton-list-content {
                    flex: 1;
                }

                .skeleton-workshop {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1.5rem;
                }

                .skeleton-workshop-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .skeleton-badge {
                    width: 80px;
                    height: 24px;
                    border-radius: 20px;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                .skeleton-workshop-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                }

                .skeleton-button {
                    width: 100px;
                    height: 36px;
                    border-radius: 20px;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0px,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }

                @media (max-width: 768px) {
                    .skeleton-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </>
    );
};

export default SkeletonLoader;
