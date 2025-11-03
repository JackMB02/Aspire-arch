import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
        top: 6rem;
        left: 1.5rem;
        font-size: 2rem;
        letter-spacing: 2px;
    }

    @media (max-width: 480px) {
        top: 5rem;
        left: 1rem;
        font-size: 1.6rem;
        letter-spacing: 1.5px;
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

    @media (max-width: 768px) {
        bottom: 2rem;
        right: 2rem;
        max-width: 280px;
        font-size: 0.9rem;
        padding: 1.2rem;
    }

    @media (max-width: 480px) {
        max-width: 220px;
        font-size: 0.8rem;
        padding: 1rem;
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
`;

const Indicator = styled(motion.button)`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${props => props.active ? '16px' : '8px'};
        height: ${props => props.active ? '16px' : '8px'};
        border-radius: 50%;
        background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'};
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${props => props.active ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'};
    }

    &:hover::before {
        background: #ffffff;
        width: 12px;
        height: 12px;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
        width: 6px;
        height: 6px;
        
        &::before {
            width: ${props => props.active ? '12px' : '6px'};
            height: ${props => props.active ? '12px' : '6px'};
        }

        &:hover::before {
            width: 10px;
            height: 10px;
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
                    <LogoImage src="images/hero logo.png" alt="ASPIRE Design Lab" />
                </LogoSection>

                <SocialMediaContainer>
                    <SocialIcon
                        href="https://twitter.com"
                        target="_blank"
                        className="twitter"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaXTwitter />
                    </SocialIcon>
                    <SocialIcon
                        href="https://linkedin.com"
                        target="_blank"
                        className="linkedin"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaLinkedin />
                    </SocialIcon>
                    <SocialIcon
                        href="https://instagram.com"
                        target="_blank"
                        className="instagram"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaInstagram />
                    </SocialIcon>
                    <SocialIcon
                        href="mailto:info@architecturedesignlab.com"
                        target="_blank"
                        className="email"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaEnvelope />
                    </SocialIcon>
                    <SocialIcon
                        href="https://wa.me/1234567890"
                        target="_blank"
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
                    {slides[currentSlide].description}
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