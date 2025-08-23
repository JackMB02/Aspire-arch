import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function UniAbout() {
  return <AnimatedSection><h1>About TheColleagueUni</h1><p>Overview.</p></AnimatedSection>;
}

function UniMission() {
  return <AnimatedSection><h1>Mission</h1><p>Our goals.</p></AnimatedSection>;
}

function UniTeam() {
  return <AnimatedSection><h1>Team</h1><p>Meet the team.</p></AnimatedSection>;
}

function UniContact() {
  return <AnimatedSection><h1>Contact</h1><p>Get in touch.</p></AnimatedSection>;
}

function TheColleagueUni() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="about" element={<UniAbout />} />
        <Route path="mission" element={<UniMission />} />
        <Route path="team" element={<UniTeam />} />
        <Route path="contact" element={<UniContact />} />
        <Route path="*" element={<AnimatedSection><h1>TheColleagueUni Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default TheColleagueUni;