import styled from 'styled-components';
import AnimatedSection from '../components/AnimatedSection';
import Hero from '../components/Hero';

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

function Home() {
  return (
    <>
      <Hero />
      <ContentGrid>
        <AnimatedSection>
          <h2>Featured Designs</h2>
          <p>Explore our latest architectural projects.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h2>Research Highlights</h2>
          <p>Insights into sustainable architecture.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <h2>Upcoming Events</h2>
          <p>Join us for workshops and exhibitions.</p>
        </AnimatedSection>
      </ContentGrid>
    </>
  );
}

export default Home;