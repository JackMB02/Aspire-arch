import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaLinkedin,
    FaInstagram,
    FaEnvelope,
    FaWhatsapp,
    FaVimeoV,
    FaPinterest,
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
        padding: 0.8rem 1rem;
        flex-direction: column;
        gap: 0.5rem;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.5) 60%,
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

// Updated LogoImage - Reduced size
const LogoImage = styled.img`
    height: 80px;
    width: auto;
    object-fit: contain;
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));

    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
    }

    @media (max-width: 1024px) {
        height: 70px;
    }

    @media (max-width: 768px) {
        height: 50px;
    }

    @media (max-width: 480px) {
        height: 40px;
    }
`;

// Social Media Icons
const SocialMediaContainer = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;

    @media (max-width: 768px) {
        gap: 0.6rem;
        justify-content: center;
    }

    @media (max-width: 480px) {
        gap: 0.5rem;
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
    &.pinterest:hover {
        background: rgba(230, 0, 35, 0.3);
    }
    &.email:hover {
        background: rgba(234, 67, 53, 0.3);
    }
    &.whatsapp:hover {
        background: rgba(37, 211, 102, 0.3);
    }
    &.vimeo:hover {
        background: rgba(26, 183, 234, 0.3);
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0.4rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        padding: 0.35rem;
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

// Individual slide with improved animation
const Slide = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => `url("${props.bgImage}")`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    /* Fallback background color if image fails to load */
    background-color: #2c3e50;
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

    @media (max-width: 768px) {
        justify-content: space-between;
        padding: 0;
        padding-top: 6rem;
    }

    @media (max-width: 480px) {
        padding-top: 5rem;
    }
`;

// Category Tag (top-left) - Title case, Futura font
const CategoryTag = styled(motion.h1)`
    position: absolute;
    top: 10rem;
    left: 2.5rem;
    right: 2.5rem;
    color: #ffffff;
    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
    font-size: 3rem;
    font-weight: normal;
    text-transform: capitalize;
    letter-spacing: 3px;
    margin: 0;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
    line-height: 1.2;
    z-index: 3;

    @media (max-width: 1024px) {
        font-size: 2.5rem;
        top: 9rem;
        left: 2rem;
        right: 2rem;
        letter-spacing: 2px;
    }

    @media (max-width: 768px) {
        top: 9rem;
        left: 1.5rem;
        right: 1.5rem;
        font-size: 1.6rem;
        letter-spacing: 1.5px;
        line-height: 1.3;
    }

    @media (max-width: 480px) {
        top: 8rem;
        left: 1rem;
        right: 1rem;
        font-size: 1.3rem;
        letter-spacing: 1px;
        line-height: 1.4;
    }

    @media (max-width: 375px) {
        top: 6rem;
        font-size: 1.1rem;
        letter-spacing: 0.5px;
    }
`;

// Description Card (bottom-right) - Reduced font size to 0.9rem
const DescriptionCard = styled(motion.div)`
    position: absolute;
    bottom: 5rem;
    right: 3rem;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 1.5rem;
    border-radius: 10px;
    font-family: "Futura PT", "Futura", "Century Gothic", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
    max-width: 400px;
    text-align: left;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 3;

    @media (max-width: 1024px) {
        bottom: 4.5rem;
        right: 2rem;
        max-width: 350px;
        font-size: 0.85rem;
        padding: 1.3rem;
    }

    @media (max-width: 768px) {
        position: static;
        margin: auto 1.5rem 5.5rem;
        max-width: calc(100% - 3rem);
        width: auto;
        font-size: 0.8rem;
        padding: 1.2rem;
        line-height: 1.5;
    }

    @media (max-width: 480px) {
        margin: auto 1rem 5rem;
        max-width: calc(100% - 2rem);
        font-size: 0.75rem;
        padding: 1rem;
        line-height: 1.4;
    }

    @media (max-width: 375px) {
        margin: auto 0.8rem 4.5rem;
        max-width: calc(100% - 1.6rem);
        font-size: 0.7rem;
        padding: 0.9rem;
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
    background: rgba(0, 0, 0, 0.4);
    padding: 0.8rem 1.2rem;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
        bottom: 1.8rem;
        padding: 0.6rem 1rem;
        gap: 0.4rem;
    }

    @media (max-width: 480px) {
        bottom: 1.5rem;
        padding: 0.5rem 0.8rem;
        gap: 0.35rem;
    }

    @media (max-width: 375px) {
        bottom: 1.2rem;
        padding: 0.4rem 0.7rem;
        gap: 0.3rem;
    }
`;

const Indicator = styled(motion.button)`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    background: ${(props) =>
        props.active ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)"};

    &:hover {
        background: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 768px) {
        display: none;
    }

    @media (max-width: 375px) {
        display: none;
    }
`;

// Improved animation variants for smoother transitions
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1 },
    },
};

// New slide variants for right-to-left fade animation
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    }),
};

// Updated slideshow data with corrected file paths
const slides = [
    {
        id: 1,
        image: "/images/Hallway with Sky.png",
        category: "Space As Connection",
        description:
            "Transition Space | Social Area For The Family. Is a dignified house defined by its walls, or by the safety and connection it fosters? As UN-Habitat (2021) affirms, 'Adequate housing is not just four walls it is the right to security, privacy, and cultural expression.'",
    },
    {
        id: 2,
        image: "/images/Living.png",
        category: "Day Light Admittance",
        description:
            "Mu nzu (Inside The House) | Mu uruganiriro (Living room), reflect a culturally embedded perception of privacy shaped by transitions, thresholds, and make meaning!",
    },
    {
        id: 3,
        image: "/images/MoneyShoot%20with%20sky%201.png",
        category: "The A-House Case Study",
        description:
            "A Dignified Dwelling in Kabacuzi, Muhanga, Rwanda. A-House re-imagines the Rwandan single-family home by restoring privacy as a layered, culturally embedded, and environmentally responsive condition. Inspired by traditional thresholds such as Irembo (gateway), Igikari (courtyard), and Urugo (fence), the proposal uses spatial sequencing, vernacular materials, and climate-sensitive strategies to create a dignified home that nurtures identity, autonomy, and comfort.",
    },
    {
        id: 4,
        image: "/images/M2WW.png",
        category: "Tiny House",
        description:
            "Urban Density and Dignity, Kigali, Nyarugenge. This project explores how compact housing can address Rwanda's growing urban population and land scarcity. Designed on a tight urban plot, each of the three two-story units prioritizes vertical space, functional zoning, and shared walls to reduce land use while maintaining livability. The goal was to maximize land efficiency without sacrificing privacy, daylight, or dignity showcasing how micro-scale solutions can contribute to Rwanda's broader urban housing strategy.",
    },
];

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1); // Moving forward
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 30000); // Change slide every 30 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        const newDirection = index > currentSlide ? 1 : -1;
        setDirection(newDirection);
        setCurrentSlide(index);
    };

    // Debug: Log current slide and image path
    useEffect(() => {
        console.log('Current slide:', currentSlide, 'Image path:', slides[currentSlide].image);
    }, [currentSlide]);

    return (
        <HeroSection>
            {/* Top Header with Logo and Social Media */}
            <TopHeader
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <LogoSection>
                    <LogoImage
                        src="/images/hero%20logo.png"
                        alt="ASPIRE Design Lab"
                    />
                </LogoSection>

                <SocialMediaContainer>
                    <SocialIcon
                        href="https://x.com/ArseneMugeni?t=iFqTTHWtGsULUd9pCGNNgw&s=09"
                        target="_blank"
                        className="twitter"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaXTwitter />
                    </SocialIcon>
                    <SocialIcon
                        href="https://www.linkedin.com/company/aspire-design-lab/"
                        target="_blank"
                        className="linkedin"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaLinkedin />
                    </SocialIcon>
                    <SocialIcon
                        href="https://www.instagram.com/aspiredesignlab?igsh=Y3lnZTgzNDNkcGIw"
                        target="_blank"
                        className="instagram"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaInstagram />
                    </SocialIcon>
                    <SocialIcon
                        href="https://www.pinterest.com/aspiredesignlab/"
                        target="_blank"
                        className="pinterest"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaPinterest />
                    </SocialIcon>
                    <SocialIcon
                        href="https://vimeo.com/user249123844?fl=pp&fe=sh"
                        target="_blank"
                        className="vimeo"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaVimeoV />
                    </SocialIcon>
                    <SocialIcon
                        href="mailto:aspiredesignlab@gmail.com"
                        target="_blank"
                        className="email"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaEnvelope />
                    </SocialIcon>
                    <SocialIcon
                        href="https://wa.me/250789924343"
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
                        custom={direction}
                        bgImage={slide.image}
                        variants={slideVariants}
                        initial="enter"
                        animate={index === currentSlide ? "center" : "exit"}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.5 },
                        }}
                        onError={(e) => {
                            console.error(`Failed to load image: ${slide.image}`);
                            e.target.style.backgroundColor = '#2c3e50'; // Fallback color
                        }}
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
            </HeroOverlay>
        </HeroSection>
    );
}

export default Hero;
