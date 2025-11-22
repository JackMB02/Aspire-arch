import styled, { keyframes } from "styled-components";

// Advanced shimmer animation with multiple gradients
const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

// Pulse animation for additional effect
const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
`;

// Base skeleton style with dark theme and advanced shimmer
const SkeletonBase = styled.div`
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.08) 25%,
        rgba(255, 255, 255, 0.12) 50%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 100%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2.5s infinite linear, ${pulse} 2s infinite ease-in-out;
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -150%;
        width: 150%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
        );
        animation: ${shimmer} 2s infinite;
    }
`;

// Container for skeleton loaders
const SkeletonContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

// Card skeleton with enhanced dark styling
const SkeletonCard = styled(SkeletonBase)`
    width: 100%;
    height: 300px;
    margin-bottom: 1.5rem;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.1) 75%,
        rgba(255, 255, 255, 0.04) 100%
    );
    background-size: 1000px 100%;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        height: 250px;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        height: 200px;
        margin-bottom: 0.75rem;
    }
`;

// Grid for cards
const SkeletonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (max-width: 480px) {
        gap: 1rem;
    }
`;

// List item skeleton
const SkeletonListItem = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SkeletonCircle = styled(SkeletonBase)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SkeletonText = styled.div`
    flex: 1;
`;

const SkeletonLine = styled(SkeletonBase)`
    height: ${(props) => props.height || "16px"};
    width: ${(props) => props.width || "100%"};
    margin-bottom: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.03);
`;

// Workshop skeleton
const SkeletonWorkshop = styled(SkeletonBase)`
    width: 100%;
    height: 200px;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

// Table skeleton
const SkeletonTable = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SkeletonTableRow = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:last-child {
        border-bottom: none;
    }
`;

const SkeletonTableCell = styled(SkeletonBase)`
    height: 20px;
    flex: ${(props) => props.flex || 1};
`;

// Main SkeletonLoader component
const SkeletonLoader = ({ type = "card", count = 3 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case "card":
                return (
                    <SkeletonGrid>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </SkeletonGrid>
                );

            case "list":
                return (
                    <div>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonListItem key={index}>
                                <SkeletonCircle />
                                <SkeletonText>
                                    <SkeletonLine width="80%" />
                                    <SkeletonLine width="60%" height="12px" />
                                </SkeletonText>
                            </SkeletonListItem>
                        ))}
                    </div>
                );

            case "workshop":
                return (
                    <SkeletonGrid>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonWorkshop key={index} />
                        ))}
                    </SkeletonGrid>
                );

            case "table":
                return (
                    <SkeletonTable>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonTableRow key={index}>
                                <SkeletonTableCell flex={2} />
                                <SkeletonTableCell flex={1} />
                                <SkeletonTableCell flex={1} />
                            </SkeletonTableRow>
                        ))}
                    </SkeletonTable>
                );

            case "text":
                return (
                    <div>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonLine
                                key={index}
                                width={`${Math.random() * 30 + 70}%`}
                            />
                        ))}
                    </div>
                );

            default:
                return (
                    <SkeletonGrid>
                        {Array.from({ length: count }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </SkeletonGrid>
                );
        }
    };

    return <SkeletonContainer>{renderSkeleton()}</SkeletonContainer>;
};

export default SkeletonLoader;
