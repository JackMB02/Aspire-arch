import { Routes, Route } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function MembershipPartnerships() {
  return <AnimatedSection><h1>Membership & Partnerships</h1><p>Join us.</p></AnimatedSection>;
}

function DonateSupport() {
  return <AnimatedSection><h1>Donate or Support</h1><p>Contribute.</p></AnimatedSection>;
}

function CommunityFeedback() {
  return <AnimatedSection><h1>Community Feedback & Ideas</h1><p>Share your thoughts.</p></AnimatedSection>;
}

function GetInvolved() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <Routes>
        <Route path="membership-partnerships" element={<MembershipPartnerships />} />
        <Route path="donate-support" element={<DonateSupport />} />
        <Route path="community-feedback" element={<CommunityFeedback />} />
        <Route path="*" element={<AnimatedSection><h1>Get Involved Overview</h1></AnimatedSection>} />
      </Routes>
    </div>
  );
}

export default GetInvolved;