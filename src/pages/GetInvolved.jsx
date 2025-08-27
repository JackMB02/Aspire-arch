import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { useState } from 'react';

/* Modern Styled Components */
const ModernSectionWrapper = styled.div`
  padding: 8rem 1.5rem 4rem;
  background: ${(props) => props.bg || 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 2.5rem;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 45px rgba(0, 0, 0, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 0.9);
  }
`;

const ModernButton = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: ${(props) => (props.variant === 'outline' ? '1px solid rgba(156, 163, 175, 0.5)' : 'none')};
  background: ${(props) => {
    if (props.variant === 'outline') return 'rgba(255, 255, 255, 0.7)';
    if (props.variant === 'ghost') return 'transparent';
    return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
  }};
  color: ${(props) => {
    if (props.variant === 'outline') return '#1f2937';
    if (props.variant === 'ghost') return '#4b5563';
    return 'white';
  }};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: ${(props) => {
      if (props.variant === 'outline') return 'rgba(255, 255, 255, 0.9)';
      if (props.variant === 'ghost') return 'rgba(243, 244, 246, 0.7)';
      return 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)';
    }};
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${(props) => props.variant !== 'ghost' ? '0 10px 25px rgba(37, 99, 235, 0.2)' : 'none'};
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  background: ${props => props.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  border: 1px solid ${props => props.active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(229, 231, 235, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.7);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin: 1rem 0 0.5rem;
    font-weight: 700;
    color: #1e40af;
  }
  
  p {
    color: #6b7280;
    flex-grow: 1;
  }
  
  .tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    margin-bottom: 1rem;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  
  h2 {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-weight: 500;
  }
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '✓';
      color: #10b981;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const FormContainer = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  
  input, textarea, select {
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(229, 231, 235, 0.7);
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const PartnerLogo = styled.div`
  height: 100px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6b7280;
  border: 1px solid rgba(229, 231, 235, 0.7);
`;

/* Get Involved Sections */
function MembershipPartnerships() {
  // ...existing code...
  // (No changes needed here)
  // ...existing code...
}

function DonateSupport() {
  // ...existing code...
  // (No changes needed here)
  // ...existing code...
}

function CommunityFeedback() {
  const [activeTab, setActiveTab] = useState('feedback');

  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)">
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Community Feedback & Ideas
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Your voice matters. Help us improve our programs, suggest new initiatives, and share your ideas for 
            how we can better serve the architectural community. We're listening.
          </p>
          
          <TabContainer>
            <TabButton 
              active={activeTab === 'feedback'}
              onClick={() => setActiveTab('feedback')}
            >
              Share Feedback
            </TabButton>
            <TabButton 
              active={activeTab === 'ideas'}
              onClick={() => setActiveTab('ideas')}
            >
              Submit Ideas
            </TabButton>
            <TabButton 
              active={activeTab === 'testimonials'}
              onClick={() => setActiveTab('testimonials')}
            >
              Community Stories
            </TabButton>
          </TabContainer>
          
          {activeTab === 'feedback' && (
            <div>
              <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Share Your Feedback</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                We're constantly working to improve our programs and services. Your honest feedback helps us understand 
                what's working well and where we can do better.
              </p>
              
              <FormContainer>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                </div>
                
                <select>
                  <option value="">Select Program Category</option>
                  <option value="workshops">Workshops & Training</option>
                  <option value="resources">Learning Resources</option>
                  <option value="events">Events & Exhibitions</option>
                  <option value="membership">Membership</option>
                  <option value="website">Website Experience</option>
                  <option value="other">Other</option>
                </select>
                
                <textarea placeholder="Please share your feedback, suggestions, or concerns..."></textarea>
                
                <ModernButton type="submit">Submit Feedback</ModernButton>
              </FormContainer>
            </div>
          )}
          
          {activeTab === 'ideas' && (
            <div>
              <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Submit Your Ideas</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Have an idea for a workshop, event, or initiative? We're always looking for fresh perspectives 
                and innovative concepts from our community.
              </p>
              
              <FormContainer>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                </div>
                
                <input type="text" placeholder="Idea Title" />
                
                <select>
                  <option value="">Select Idea Category</option>
                  <option value="workshop">Workshop Idea</option>
                  <option value="event">Event Idea</option>
                  <option value="resource">Learning Resource</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="technology">Technology Solution</option>
                  <option value="other">Other</option>
                </select>
                
                <textarea placeholder="Describe your idea in detail..."></textarea>
                
                <ModernButton type="submit">Submit Idea</ModernButton>
              </FormContainer>
            </div>
          )}
          
          {activeTab === 'testimonials' && (
            <div>
              <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Community Stories</h2>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Read how our community members have benefited from our programs and initiatives.
              </p>
              
              <CardGrid>
                <ContentCard>
                  <IconWrapper>🌟</IconWrapper>
                  <h3>Transformed My Practice</h3>
                  <p>"The sustainable design workshop completely changed how I approach projects. I've implemented eco-friendly practices that reduced energy costs by 40% for my clients."</p>
                  <p style={{ fontWeight: '600', color: '#6b7280', marginTop: '1rem' }}>— Maria L., Architect</p>
                </ContentCard>
                
                <ContentCard>
                  <IconWrapper>🌟</IconWrapper>
                  <h3>Career Advancement</h3>
                  <p>"Through the mentorship program, I connected with an experienced architect who guided me through my licensure process. I'm now a project lead at my firm."</p>
                  <p style={{ fontWeight: '600', color: '#6b7280', marginTop: '1rem' }}>— James T., Designer</p>
                </ContentCard>
                
                <ContentCard>
                  <IconWrapper>🌟</IconWrapper>
                  <h3>Invaluable Network</h3>
                  <p>"The connections I've made through membership have led to collaborative projects and friendships with architects from around the world. It's truly a global community."</p>
                  <p style={{ fontWeight: '600', color: '#6b7280', marginTop: '1rem' }}>— Sofia K., Urban Planner</p>
                </ContentCard>
              </CardGrid>
              
              <ModernButton variant="outline" style={{ marginTop: '2rem' }}>Share Your Story</ModernButton>
            </div>
          )}
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function GetInvolvedOverview() {
  return (
    <AnimatedSection>
      <ModernSectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
        >
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Get Involved
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4b5563', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Join our movement to advance sustainable architecture and design education. Whether through membership, 
            donations, or sharing your ideas, there are many ways to contribute to our community and mission.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="membership-partnerships"><ModernButton>Membership</ModernButton></Link>
            <Link to="donate-support"><ModernButton variant="outline">Donate</ModernButton></Link>
            <Link to="community-feedback"><ModernButton variant="outline">Share Feedback</ModernButton></Link>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>2.5K+</h2>
              <p>Community Members</p>
            </StatCard>
            <StatCard>
              <h2>$1.2M</h2>
              <p>Annual Scholarships</p>
            </StatCard>
            <StatCard>
              <h2>120</h2>
              <p>Partner Organizations</p>
            </StatCard>
            <StatCard>
              <h2>450</h2>
              <p>Volunteers</p>
            </StatCard>
          </StatsContainer>
          
          <GlassCard style={{ marginTop: '4rem', textAlign: 'left' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Why Get Involved?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Make an Impact</h3>
                <p style={{ color: '#6b7280' }}>Your support directly contributes to sustainable architecture education and innovation.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Expand Your Network</h3>
                <p style={{ color: '#6b7280' }}>Connect with professionals, thought leaders, and organizations in the architecture community.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Access Resources</h3>
                <p style={{ color: '#6b7280' }}>Gain exclusive access to learning materials, workshops, and research findings.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Shape the Future</h3>
                <p style={{ color: '#6b7280' }}>Your ideas and feedback help guide our programs and initiatives.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function GetInvolved() {
  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <Routes>
        <Route path="membership-partnerships" element={<MembershipPartnerships />} />
        <Route path="donate-support" element={<DonateSupport />} />
        <Route path="community-feedback" element={<CommunityFeedback />} />
        <Route path="*" element={<GetInvolvedOverview />} />
      </Routes>
    </div>
  );
}

export default GetInvolved;