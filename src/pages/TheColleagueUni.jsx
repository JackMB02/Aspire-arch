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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const TeamMemberCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.7);
  
  h3 {
    margin: 1rem 0 0.5rem;
    font-weight: 700;
    color: #1e40af;
  }
  
  p {
    color: #6b7280;
    margin-bottom: 1rem;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    
    a {
      color: #6b7280;
      transition: color 0.3s ease;
      
      &:hover {
        color: #3b82f6;
      }
    }
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  text-align: center;
  
  h3 {
    color: #1e40af;
    margin-bottom: 1rem;
  }
  
  p {
    color: #6b7280;
    line-height: 1.7;
  }
`;

const ContactForm = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  
  input, textarea {
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
`;

/* TheColleagueUni Sections */
function UniAbout() {
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
            About TheColleagueUni
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            TheColleagueUni is a revolutionary educational platform that connects professionals, fosters collaboration, 
            and transforms how we learn and work together. We believe in the power of collective intelligence and 
            peer-to-peer knowledge sharing to drive innovation and personal growth.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Our Story</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                Founded in 2018 by a team of educators and tech innovators, TheColleagueUni emerged from a simple idea: 
                learning shouldn't be confined to traditional institutions. We've grown from a small community of 
                50 professionals to a global network of over 50,000 members.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Our Philosophy</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We believe that everyone has something to teach and something to learn. By breaking down hierarchical 
                barriers to education, we create spaces where knowledge flows freely between colleagues, regardless 
                of title, experience, or background.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Our Impact</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                Through our platform, professionals have formed meaningful connections, developed new skills, 
                and advanced their careers. 89% of our members report increased job satisfaction and 76% have 
                achieved career milestones through connections made on our platform.
              </p>
            </div>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>50K+</h2>
              <p>Active Members</p>
            </StatCard>
            <StatCard>
              <h2>120+</h2>
              <p>Countries</p>
            </StatCard>
            <StatCard>
              <h2>2.5K</h2>
              <p>Learning Modules</p>
            </StatCard>
            <StatCard>
              <h2>96%</h2>
              <p>Satisfaction Rate</p>
            </StatCard>
          </StatsContainer>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function UniMission() {
  const values = [
    {
      title: "Collaborative Learning",
      description: "We believe that the most powerful learning happens through collaboration, not competition. Our platform is designed to foster meaningful connections and knowledge exchange."
    },
    {
      title: "Accessibility",
      description: "We're committed to breaking down barriers to education by making high-quality learning resources available to professionals at all stages of their careers."
    },
    {
      title: "Innovation",
      description: "We continuously evolve our platform and offerings to incorporate the latest research in learning science and technology."
    },
    {
      title: "Community",
      description: "We prioritize building supportive, inclusive communities where members feel valued, heard, and empowered to grow."
    }
  ];

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
            Our Mission & Vision
          </motion.h1>
          
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8' }}>
              To democratize professional education by creating a global platform where colleagues can learn from each other, 
              regardless of geographic, economic, or hierarchical barriers. We're building a future where everyone has access 
              to the knowledge they need to thrive in their careers.
            </p>
          </div>
          
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1rem' }}>Our Vision</h2>
            <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8' }}>
              We envision a world where professional development is continuous, collaborative, and integrated into 
              daily work life. Where learning happens organically through peer connections and where every professional 
              has both the opportunity to teach and the humility to learn.
            </p>
          </div>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Our Values</h2>
          
          <FeatureGrid>
            {values.map((value, index) => (
              <FeatureCard key={index}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>2025 Initiatives</h2>
            <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Launch mentorship program connecting emerging professionals with industry leaders</li>
              <li>Develop 50 new micro-certifications in high-demand skills</li>
              <li>Expand language support to include 10 additional languages</li>
              <li>Establish partnerships with 100 organizations committed to employee development</li>
              <li>Create accessibility features to ensure our platform is usable by everyone</li>
            </ul>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function UniTeam() {
  const teamMembers = [
    { 
      name: "Dr. Elena Rodriguez", 
      role: "Founder & CEO", 
      initial: "ER",
      bio: "Former professor of educational technology with 15+ years experience in digital learning platforms."
    },
    { 
      name: "Marcus Chen", 
      role: "CTO", 
      initial: "MC",
      bio: "Software engineer specializing in scalable learning management systems and AI-driven recommendations."
    },
    { 
      name: "Olivia Johnson", 
      role: "Head of Learning", 
      initial: "OJ",
      bio: "Curriculum designer focused on adult learning principles and professional development pathways."
    },
    { 
      name: "David Kim", 
      role: "Community Director", 
      initial: "DK",
      bio: "Expert in building engaged online communities and fostering meaningful professional connections."
    },
    { 
      name: "Sophie Williams", 
      role: "Product Designer", 
      initial: "SW",
      bio: "UX specialist passionate about creating intuitive, accessible learning experiences."
    },
    { 
      name: "James Wilson", 
      role: "Partnerships Manager", 
      initial: "JW",
      bio: "Connects organizations with learning opportunities that drive employee growth and retention."
    }
  ];
  
  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)">
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Our Team
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Meet the passionate individuals behind TheColleagueUni. Our diverse team brings together expertise in 
            education, technology, community building, and design to create transformative learning experiences.
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
                <p style={{ fontWeight: '600', color: '#3b82f6' }}>{member.role}</p>
                <p>{member.bio}</p>
                <div className="social-links">
                  <a href="#" aria-label="LinkedIn">📱</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="Email">✉️</a>
                </div>
              </TeamMemberCard>
            ))}
          </TeamGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Join Our Team</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              We're always looking for talented individuals who share our passion for transforming professional education. 
              Check our careers page for current opportunities to help us build the future of learning.
            </p>
            <ModernButton>View Open Positions</ModernButton>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function UniContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
            Contact Us
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Have questions about TheColleagueUni? Want to explore partnership opportunities? 
            We'd love to hear from you. Get in touch with our team using the form below or through 
            any of our contact channels.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>📍 Location</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                123 Innovation Drive<br />
                Tech Hub, CA 94103<br />
                United States
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>📞 Phone</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                General Inquiries: +1 (555) 123-4567<br />
                Support: +1 (555) 765-4321
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>✉️ Email</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                General: hello@thecolleagueuni.com<br />
                Support: support@thecolleagueuni.com<br />
                Partnerships: partners@thecolleagueuni.com
              </p>
            </div>
          </div>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send Us a Message</h2>
          
          <ContactForm onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <ModernButton type="submit">Send Message</ModernButton>
          </ContactForm>
          
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Office Hours</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
              Monday - Friday: 9:00 AM - 6:00 PM PST<br />
              Saturday: 10:00 AM - 4:00 PM PST<br />
              Sunday: Closed
            </p>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function UniOverview() {
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
            TheColleagueUni
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4b5563', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Transforming professional education through collaborative learning, peer connections, 
            and accessible knowledge sharing. Join a global community of professionals who learn and grow together.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="about"><ModernButton>About Us</ModernButton></Link>
            <Link to="mission"><ModernButton variant="outline">Our Mission</ModernButton></Link>
            <Link to="team"><ModernButton variant="outline">Our Team</ModernButton></Link>
            <Link to="contact"><ModernButton variant="ghost">Contact Us</ModernButton></Link>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>50K+</h2>
              <p>Professionals Connected</p>
            </StatCard>
            <StatCard>
              <h2>95%</h2>
              <p>Completion Rate</p>
            </StatCard>
            <StatCard>
              <h2>2.5K</h2>
              <p>Learning Resources</p>
            </StatCard>
            <StatCard>
              <h2>120+</h2>
              <p>Countries</p>
            </StatCard>
          </StatsContainer>
          
          <GlassCard style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>How It Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>1. Create Profile</h3>
                <p style={{ color: '#6b7280' }}>Build your professional profile and identify your skills and interests.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>2. Find Colleagues</h3>
                <p style={{ color: '#6b7280' }}>Connect with professionals who have complementary skills and knowledge.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>3. Learn Together</h3>
                <p style={{ color: '#6b7280' }}>Participate in learning circles, workshops, and knowledge exchanges.</p>
              </div>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>4. Grow Career</h3>
                <p style={{ color: '#6b7280' }}>Apply new skills, earn micro-credentials, and advance your career.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function TheColleagueUni() {
  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <Routes>
        <Route path="about" element={<UniAbout />} />
        <Route path="mission" element={<UniMission />} />
        <Route path="team" element={<UniTeam />} />
        <Route path="contact" element={<UniContact />} />
        <Route path="*" element={<UniOverview />} />
      </Routes>
    </div>
  );
}

export default TheColleagueUni;