import styled, { keyframes } from "styled-components";

// Shimmer animation
const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

// Base skeleton style
const SkeletonBase = styled.div`
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 8px;
`;

// Container for skeleton loaders
const SkeletonContainer = styled.div`
    width: 100%;
    padding: 2rem;
`;

// Card skeleton
const SkeletonCard = styled(SkeletonBase)`
    width: 100%;
    height: 300px;
    margin-bottom: 1.5rem;
`;

// Grid for cards
const SkeletonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
`;

// List item skeleton
const SkeletonListItem = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
`;

const SkeletonCircle = styled(SkeletonBase)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
`;

const SkeletonText = styled.div`
    flex: 1;
`;

const SkeletonLine = styled(SkeletonBase)`
    height: ${(props) => props.height || "16px"};
    width: ${(props) => props.width || "100%"};
    margin-bottom: 0.5rem;
`;

// Workshop skeleton
const SkeletonWorkshop = styled(SkeletonBase)`
    width: 100%;
    height: 200px;
    margin-bottom: 1.5rem;
`;

// Table skeleton
const SkeletonTable = styled.div`
    width: 100%;
`;

const SkeletonTableRow = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
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
