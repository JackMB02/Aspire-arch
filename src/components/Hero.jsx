import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaLinkedin,
    FaInstagram,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Full-height Hero
const HeroSection = styled.section`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 100vh;
    }
`;

// Top Header with Logo and Social Media
const TopHeader = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.2) 50%,
        transparent 100%
    );

    @media (max-width: 768px) {
        padding: 1rem 1.5rem;
        flex-direction: column;
        gap: 1rem;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 70%,
            transparent 100%
        );
    }
`;

// Logo Section - Updated to center the logo
const LogoSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

// Updated LogoImage - Bigger and without circular border
const LogoImage = styled.img`
    height: 120px;
    width: auto;
    object-fit: contain;
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));

    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
    }

    @media (max-width: 1024px) {
        height: 100px;
    }

    @media (max-width: 768px) {
        height: 80px;
    }

    @media (max-width: 480px) {
        height: 60px;
    }
`;

// Social Media Icons
const SocialMediaContainer = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;

    @media (max-width: 768px) {
        gap: 1rem;
        justify-content: center;
    }
`;

const SocialIcon = styled(motion.a)`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.3rem;
    transition: all 0.3s ease;
    padding: 0.6rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.4);
    }

    &.twitter:hover {
        background: rgba(29, 161, 242, 0.3);
    }
    &.linkedin:hover {
        background: rgba(0, 119, 181, 0.3);
    }
    &.instagram:hover {
        background: rgba(225, 48, 108, 0.3);
    }
    &.email:hover {
        background: rgba(234, 67, 53, 0.3);
    }
    &.whatsapp:hover {
        background: rgba(37, 211, 102, 0.3);
    }

    @media (max-width: 768px) {
        font-size: 1.1rem;
        padding: 0.5rem;
    }
`;

// Slideshow container
const SlideshowContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

// Individual slide
const Slide = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => `url(${props.bgImage})`};
    background-size: cover;
    background-position: center;

    @media (max-width: 768px) {
        background-position: center;
        background-size: cover;
    }
`;

// Overlay - removed opacity
const HeroOverlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
`;

// Category Tag (top-left) - Reduced font size, white color, compressed font
const CategoryTag = styled(motion.h1)`
    position: absolute;
    top: 10rem;
    left: 2.5rem;
    color: #ffffff;
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);

    @media (max-width: 1024px) {
        font-size: 2.5rem;
        top: 8rem;
    }

    @media (max-width: 768px) {
        top: 10rem;
        left: 1.5rem;
        right: 1.5rem;
        font-size: 1.8rem;
        letter-spacing: 2px;
        max-width: calc(100% - 3rem);
    }

    @media (max-width: 480px) {
        top: 9rem;
        left: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        letter-spacing: 1.5px;
        max-width: calc(100% - 2rem);
    }
`;

// Description Card (bottom-right) - Reduced opacity to 0.4
const DescriptionCard = styled(motion.div)`
    position: absolute;
    bottom: 3rem;
    right: 3rem;
    background-color: rgba(0, 0, 0, 0.6); /* Black with increased opacity */
    padding: 1.5rem;
    border-radius: 10px;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    max-width: 380px;
    text-align: left;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);

    p {
        margin: 0 0 1rem 0;
        color: white;
    }

    @media (max-width: 768px) {
        bottom: 5.5rem;
        left: 1.5rem;
        right: 1.5rem;
        max-width: calc(100% - 3rem);
        font-size: 0.875rem;
        padding: 1.2rem;
        line-height: 1.5;
        background-color: rgba(0, 0, 0, 0.75);
    }

    @media (max-width: 480px) {
        bottom: 5rem;
        left: 1rem;
        right: 1rem;
        max-width: calc(100% - 2rem);
        font-size: 0.813rem;
        padding: 1rem;
        line-height: 1.4;
    }
`;

const ViewAlbumButton = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(
        135deg,
        var(--accent-light),
        var(--accent-medium)
    );
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
        background: linear-gradient(
            135deg,
            var(--accent-medium),
            var(--accent-light)
        );
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
    }
`;

// Modern Slide Indicators
const SlideIndicators = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 3;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.8rem 1.2rem;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
        bottom: 1.5rem;
        padding: 0.6rem 1rem;
    }

    @media (max-width: 480px) {
        bottom: 1.2rem;
        padding: 0.5rem 0.8rem;
        gap: 0.4rem;
    }
`;

const Indicator = styled(motion.button)`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${(props) => (props.active ? "6px" : "4px")};
        height: ${(props) => (props.active ? "6px" : "4px")};
        border-radius: 50%;
        background: ${(props) =>
            props.active ? "#ffffff" : "rgba(255, 255, 255, 0.4)"};
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${(props) =>
            props.active ? "0 0 8px rgba(255, 255, 255, 0.5)" : "none"};
    }

    &:hover::before {
        background: #ffffff;
        width: 5px;
        height: 5px;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
        width: 5px;
        height: 5px;

        &::before {
            width: ${(props) => (props.active ? "8px" : "5px")};
            height: ${(props) => (props.active ? "8px" : "5px")};
        }

        &:hover::before {
            width: 7px;
            height: 7px;
        }
    }
`;

// Animation variants
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1 },
    },
};

const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
};

// Slideshow data with different categories
const slides = [
    {
        id: 1,
        image: "/images/office.jpg",
        category: "Commercial Excellence",
        description:
            "Our office designs prioritize both functionality and employee wellbeing. We create spaces that foster collaboration while incorporating sustainable materials and energy-efficient systems for a healthier work environment.",
    },
    {
        id: 2,
        image: "/images/villa.jpg",
        category: "Luxury Residential",
        description:
            "Experience the pinnacle of luxury living with our custom villa designs. We blend contemporary aesthetics with functional spaces, creating harmonious environments that reflect the unique personalities of modern families.",
    },
    {
        id: 3,
        image: "/images/park.jpg",
        category: "Community Spaces",
        description:
            "Our park designs reimagine public spaces to promote community interaction and environmental sustainability. We create inclusive recreational areas that serve people of all ages and backgrounds.",
    },
];

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <HeroSection>
            {/* Top Header with Logo and Social Media */}
            <TopHeader
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <LogoSection>
                    {/* Bigger logo without circular border and no text */}
                    <LogoImage
                        src="images/hero logo.png"
                        alt="ASPIRE Design Lab"
                    />
                </LogoSection>

                <SocialMediaContainer>
                    <SocialIcon
                        href="https://x.com/ArseneMugeni?t=iFqTTHWtGsULUd9pCGNNgw&s=09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twitter"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaXTwitter />
                    </SocialIcon>
                    <SocialIcon
                        href="https://www.linkedin.com/company/aspire-design-lab/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaLinkedin />
                    </SocialIcon>
                    <SocialIcon
                        href="https://www.instagram.com/aspiredesignlab?igsh=Y3lnZTgzNDNkcGIw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaInstagram />
                    </SocialIcon>
                    <SocialIcon
                        href="mailto:aspiredesignlab@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="email"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaEnvelope />
                    </SocialIcon>
                    <SocialIcon
                        href="https://wa.me/250789924343"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaWhatsapp />
                    </SocialIcon>
                </SocialMediaContainer>
            </TopHeader>

            <SlideshowContainer>
                {slides.map((slide, index) => (
                    <Slide
                        key={slide.id}
                        bgImage={slide.image}
                        variants={slideVariants}
                        initial="enter"
                        animate={index === currentSlide ? "center" : "exit"}
                        transition={{ duration: 1.2 }}
                    />
                ))}
            </SlideshowContainer>

            <HeroOverlay
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
            >
                <CategoryTag
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {slides[currentSlide].category}
                </CategoryTag>

                <DescriptionCard
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <p>{slides[currentSlide].description}</p>
                    <ViewAlbumButton to="/media-gallery">
                        View Album →
                    </ViewAlbumButton>
                </DescriptionCard>

                <SlideIndicators>
                    {slides.map((_, index) => (
                        <Indicator
                            key={index}
                            active={index === currentSlide}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </SlideIndicators>
            </HeroOverlay>
        </HeroSection>
    );
}

export default Hero;
