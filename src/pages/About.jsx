import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function Mission() {
  return (
    <AnimatedSection>
      <h1>Mission</h1>
      <p>Our mission is to create architecture that benefits society and the planet.</p>
    </AnimatedSection>
  );
}

function Vision() {
  return (
    <AnimatedSection>
      <h1>Vision</h1>
      <p>We envision resilient environments that inspire generations.</p>
    </AnimatedSection>
  );
}

function About() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="*" element={<AnimatedSection><h1>About ASPIRE</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default About;