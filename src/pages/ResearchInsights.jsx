import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function ArticlesCaseStudies() {
  return <AnimatedSection><h1>Articles & Case Studies</h1><p>In-depth analyses.</p></AnimatedSection>;
}

function SustainableDesign() {
  return <AnimatedSection><h1>Sustainable Design Practices</h1><p>Eco-friendly approaches.</p></AnimatedSection>;
}

function ResilienceClimate() {
  return <AnimatedSection><h1>Resilience & Climate Adaptation</h1><p>Adapting to change.</p></AnimatedSection>;
}

function CulturalSocial() {
  return <AnimatedSection><h1>Cultural & Social Impact Studies</h1><p>Societal influences.</p></AnimatedSection>;
}

function ResearchInsights() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="articles-case-studies" element={<ArticlesCaseStudies />} />
        <Route path="sustainable-design" element={<SustainableDesign />} />
        <Route path="resilience-climate" element={<ResilienceClimate />} />
        <Route path="cultural-social" element={<CulturalSocial />} />
        <Route path="*" element={<AnimatedSection><h1>Research & Insights Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default ResearchInsights;