import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';

// Full-height Hero
const HeroSection = styled.section`
  position: relative;
  width: 100vw;  /* Full viewport width */
  height: 100vh; /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 100vh; /* Still full height on mobile */
  }
`;

// Overlay
const HeroOverlay = styled(motion.div)`
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 1rem;
`;

// Title
const HeroTitle = styled(motion.h1)`
  font-family: 'Poppins', 'Futura PT', sans-serif;
  font-weight: 700;
  font-size: 4rem;
  line-height: 1.2;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

// Subtitle
const HeroSubtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 1.3rem;
  max-width: 800px;
  margin-top: 1rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 95%;
  }
`;

// Scroll indicator
const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;

// Animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

const textVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

function Hero() {
  return (
    <Parallax bgImage="/images/hero-bg.jpg" strength={300}>
      <HeroSection>
        <HeroOverlay variants={overlayVariants} initial="hidden" animate="visible">
          <HeroTitle variants={textVariants} initial="hidden" animate="visible">
            Welcome to ASPIRE
          </HeroTitle>
          <HeroSubtitle variants={textVariants} initial="hidden" animate="visible">
            Innovative architecture for a sustainable future. Explore our designs, research, and community initiatives.
          </HeroSubtitle>

          {/* Bouncing scroll indicator */}
          <ScrollIndicator
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </ScrollIndicator>
        </HeroOverlay>
      </HeroSection>
    </Parallax>
  );
}

export default Hero;
