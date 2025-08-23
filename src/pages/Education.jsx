import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function WorkshopsTraining() {
  return <AnimatedSection><h1>Workshops & Training</h1><p>Upcoming sessions.</p></AnimatedSection>;
}

function TutorialsGuides() {
  return <AnimatedSection><h1>Tutorials & Guides</h1><p>Resources.</p></AnimatedSection>;
}

function Exhibitions() {
  return <AnimatedSection><h1>Exhibitions</h1><p>Current shows.</p></AnimatedSection>;
}

function Education() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="workshops-training" element={<WorkshopsTraining />} />
        <Route path="tutorials-guides" element={<TutorialsGuides />} />
        <Route path="exhibitions" element={<Exhibitions />} />
        <Route path="*" element={<AnimatedSection><h1>Education Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default Education;