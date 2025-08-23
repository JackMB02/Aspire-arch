import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function Academic() {
  return <AnimatedSection><h1>Academic Designs</h1><p>Details on academic projects.</p></AnimatedSection>;
}

function Profession() {
  return <AnimatedSection><h1>Professional Designs</h1><p>Professional portfolio.</p></AnimatedSection>;
}

function Competition() {
  return <AnimatedSection><h1>Competition Entries</h1><p>Award-winning competitions.</p></AnimatedSection>;
}

function Design() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="academic" element={<Academic />} />
        <Route path="profession" element={<Profession />} />
        <Route path="competition" element={<Competition />} />
        <Route path="*" element={<AnimatedSection><h1>Design Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default Design;