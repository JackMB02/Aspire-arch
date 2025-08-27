import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { useState } from 'react';

/* Modern Styled Components */
const ModernSectionWrapper = styled.div`
  padding: 8rem 1.5rem;
  background: ${(props) => props.bg || 'linear-gradient(135deg, #f9f9f9 0%, #f0f4ff 100%)'};
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMemberCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.7);
  
  h3 {
    margin: 1rem 0 0.5rem;
    font-weight: 700;
  }
  
  p {
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 4rem auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, transparent, #3b82f6, transparent);
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin-bottom: 4rem;
  width: 50%;
  
  &:nth-child(even) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
    left: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: #3b82f6;
    border-radius: 50%;
    top: 20px;
    right: -8px;
  }
  
  &:nth-child(even)::after {
    left: -8px;
  }
`;

const TimelineContent = styled(GlassCard)`
  width: 100%;
  padding: 1.5rem;
  
  h3 {
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.95rem;
  }
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

/* About Sections */
function Mission() {
  return (
    <AnimatedSection>
      <ModernSectionWrapper>
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Our Mission & Purpose
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            At Aspire Architecture, our mission is to design <strong>sustainable, functional, and inspiring spaces</strong> that serve communities while respecting the environment. We balance <em>innovation with tradition</em>, creating structures that stand the test of time while meeting contemporary needs.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Environmental Stewardship</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We champion eco-friendly materials and energy-efficient solutions, minimizing our carbon footprint while maximizing building performance and occupant comfort.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Human-Centered Design</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We prioritize user well-being and accessibility, creating spaces that promote health, happiness, and productivity for all who inhabit them.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Collaborative Innovation</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We foster creativity and collaboration at every stage, working closely with clients, communities, and craftspeople to realize visionary architectural solutions.
              </p>
            </div>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>350+</h2>
              <p>Projects Completed</p>
            </StatCard>
            <StatCard>
              <h2>98%</h2>
              <p>Client Satisfaction</p>
            </StatCard>
            <StatCard>
              <h2>85%</h2>
              <p>Energy Savings Average</p>
            </StatCard>
            <StatCard>
              <h2>27</h2>
              <p>International Awards</p>
            </StatCard>
          </StatsContainer>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function Vision() {
  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)">
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Our Vision for the Future
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Aspire Architecture envisions a world where built environments seamlessly connect people with nature, technology, and culture. We create <strong>resilient, adaptive spaces</strong> that inspire future generations while addressing urgent challenges of urban growth and climate change.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Regenerative Design</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                Moving beyond sustainability, our designs actively regenerate ecosystems, produce clean energy, and improve environmental conditions in their communities.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Smart Integration</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We seamlessly integrate cutting-edge technology with timeless design principles, creating responsive environments that adapt to changing needs.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Cultural Legacy</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                Our work honors cultural heritage while pioneering new architectural languages that speak to our evolving global community.
              </p>
            </div>
          </div>
          
          <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.5rem' }}>Our 2030 Goals</h3>
          <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li>Achieve net-zero carbon in all new projects by 2025</li>
            <li>Develop affordable housing solutions for 10,000 families</li>
            <li>Establish design education programs in 15 underserved communities</li>
            <li>Pioneer 3 new sustainable building materials</li>
            <li>Reduce construction waste by 75% across all projects</li>
          </ul>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function Values() {
  const [activeValue, setActiveValue] = useState(0);
  
  const values = [
    {
      title: "Sustainability",
      description: "We prioritize environmental responsibility in every project, employing cutting-edge sustainable practices and materials to minimize ecological impact while maximizing energy efficiency and resilience.",
      details: "From passive house design to renewable energy integration, we push the boundaries of sustainable architecture while maintaining aesthetic excellence and functionality."
    },
    {
      title: "Innovation",
      description: "We embrace emerging technologies and novel approaches to solve complex design challenges, constantly exploring new possibilities in form, function, and construction methodology.",
      details: "Our dedicated R&D team collaborates with material scientists and engineers to develop proprietary systems that enhance building performance and occupant experience."
    },
    {
      title: "Collaboration",
      description: "We believe the best designs emerge from diverse perspectives, fostering open dialogue between clients, communities, consultants, and builders throughout the creative process.",
      details: "Our collaborative studio environment encourages cross-pollination of ideas, ensuring each project benefits from our collective expertise and creative energy."
    },
    {
      title: "Excellence",
      description: "We pursue perfection in every detail, combining meticulous craftsmanship with rigorous quality control to deliver exceptional results that exceed client expectations.",
      details: "Our commitment to excellence extends beyond aesthetics to encompass structural integrity, building performance, and long-term value for our clients and their communities."
    }
  ];
  
  return (
    <AnimatedSection>
      <ModernSectionWrapper>
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Our Core Values
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Our values are the foundation of everything we do at Aspire Architecture. They guide our decisions, shape our culture, and define our approach to creating meaningful architecture.
          </p>
          
          <TabContainer>
            {values.map((value, index) => (
              <TabButton 
                key={index}
                active={activeValue === index}
                onClick={() => setActiveValue(index)}
              >
                {value.title}
              </TabButton>
            ))}
          </TabContainer>
          
          <motion.div
            key={activeValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1rem' }}>
              {values[activeValue].title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {values[activeValue].description}
            </p>
            <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
              {values[activeValue].details}
            </p>
          </motion.div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function Team() {
  const teamMembers = [
    { name: "Sarah Johnson", role: "Principal Architect", initial: "S" },
    { name: "Michael Chen", role: "Design Director", initial: "M" },
    { name: "Elena Rodriguez", role: "Sustainability Specialist", initial: "E" },
    { name: "David Kim", role: "Technical Lead", initial: "D" },
    { name: "Olivia Williams", role: "Project Manager", initial: "O" },
    { name: "James Wilson", role: "Urban Designer", initial: "J" }
  ];
  
  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)">
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Our Leadership Team
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Our diverse team of architects, designers, and specialists brings together decades of experience and fresh perspectives to create innovative architectural solutions.
          </p>
          
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar>{member.initial}</Avatar>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </TeamMemberCard>
            ))}
          </TeamGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Join Our Team</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              We're always looking for talented individuals who share our passion for innovative, sustainable design. Check our careers page for current opportunities.
            </p>
            <ModernButton>View Open Positions</ModernButton>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function History() {
  const timelineItems = [
    { year: "2005", title: "Foundation", description: "Aspire Architecture was founded with a vision to merge sustainable practices with innovative design." },
    { year: "2008", title: "First Major Project", description: "Completed the award-winning Green Tower, setting new standards for eco-friendly high-rises." },
    { year: "2012", title: "International Expansion", description: "Opened offices in Europe and Asia, bringing our design philosophy to global projects." },
    { year: "2016", title: "Research Division", description: "Established our dedicated R&D division to pioneer new sustainable building technologies." },
    { year: "2020", title: "Net-Zero Commitment", description: "Pledged to achieve net-zero carbon in all new projects by 2025." },
    { year: "2023", title: "Global Recognition", description: "Received the prestigious Global Sustainable Architecture Award for our holistic approach." }
  ];
  
  return (
    <AnimatedSection>
      <ModernSectionWrapper>
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem', color: '#1f2937', textAlign: 'center' }}
          >
            Our Journey Through Time
          </motion.h1>
          
          <TimelineContainer>
            {timelineItems.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineContent>
                  <h3>{item.year} - {item.title}</h3>
                  <p>{item.description}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Looking Forward</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
              As we continue to grow and evolve, our commitment to creating sustainable, human-centered architecture remains unwavering. The next chapter of our story will be defined by even more ambitious goals and groundbreaking innovations that push the boundaries of what's possible in architecture.
            </p>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function AboutIntro() {
  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)">
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
            Redefining Architecture for a Sustainable Future
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4b5563', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Aspire Architecture is more than a design firm — <strong>we are visionaries</strong> committed to shaping <em>sustainable, inspiring, and inclusive environments</em> that elevate the human experience while honoring our planet.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="mission"><ModernButton>Our Mission</ModernButton></Link>
            <Link to="vision"><ModernButton variant="outline">Our Vision</ModernButton></Link>
            <Link to="values"><ModernButton variant="outline">Our Values</ModernButton></Link>
            <Link to="team"><ModernButton variant="ghost">Our Team</ModernButton></Link>
            <Link to="history"><ModernButton variant="ghost">Our History</ModernButton></Link>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>18</h2>
              <p>Years of Excellence</p>
            </StatCard>
            <StatCard>
              <h2>24</h2>
              <p>Countries Served</p>
            </StatCard>
            <StatCard>
              <h2>150+</h2>
              <p>Creative Professionals</p>
            </StatCard>
            <StatCard>
              <h2>47</h2>
              <p>Industry Awards</p>
            </StatCard>
          </StatsContainer>
        </motion.div>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function About() {
  return (
    <div>
      <Routes>
        <Route path="mission" element={<Mission />} />
        <Route path="vision" element={<Vision />} />
        <Route path="values" element={<Values />} />
        <Route path="team" element={<Team />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<AboutIntro />} />
      </Routes>
    </div>
  );
}

export default About;