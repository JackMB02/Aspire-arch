import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* Full viewport height */
  background-image: url('/images/hero-image.jpg'); /* Placeholder path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  @media (max-width: 768px) {
    height: 60vh; /* Shorter on mobile */
  }
`;

const HeroOverlay = styled(motion.div)`
  background: rgba(18, 35, 36, 0.5); /* Semi-transparent --primary-dark */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Futura PT', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  max-width: 600px;
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

function Hero() {
  return (
    <HeroSection>
      <HeroOverlay variants={overlayVariants} initial="hidden" animate="visible">
        <HeroTitle variants={textVariants} initial="hidden" animate="visible">
          Welcome to ASPIRE
        </HeroTitle>
        <HeroSubtitle variants={textVariants} initial="hidden" animate="visible">
          Innovative architecture for a sustainable future. Explore our designs, research, and community initiatives.
        </HeroSubtitle>
      </HeroOverlay>
    </HeroSection>
  );
}

export default Hero;