import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  background-image: ${props => `url(${props.bgImage})`};
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
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
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
  background-color: rgba(0, 0, 0, 0.4); /* Reduced from 0.85 to 0.4 */
  padding: 1.5rem;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 380px;
  text-align: left;
  backdrop-filter: blur(8px);
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

// Slide Indicators
const SlideIndicators = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 3;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
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
  exit: { opacity: 0 }
};

// Slideshow data with different categories
const slides = [
  {
    id: 1,
    image: "/images/office.jpg",
    category: "Commercial Excellence",
    description: "Our office designs prioritize both functionality and employee wellbeing. We create spaces that foster collaboration while incorporating sustainable materials and energy-efficient systems for a healthier work environment."
  },
  {
    id: 2,
    image: "/images/villa.jpg",
    category: "Luxury Residential",
    description: "Experience the pinnacle of luxury living with our custom villa designs. We blend contemporary aesthetics with functional spaces, creating harmonious environments that reflect the unique personalities of modern families."
  },
  {
    id: 3,
    image: "/images/park.jpg",
    category: "Community Spaces",
    description: "Our park designs reimagine public spaces to promote community interaction and environmental sustainability. We create inclusive recreational areas that serve people of all ages and backgrounds."
  }
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

      <HeroOverlay variants={overlayVariants} initial="hidden" animate="visible">
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </SlideIndicators>
      </HeroOverlay>
    </HeroSection>
  );
}

export default Hero;