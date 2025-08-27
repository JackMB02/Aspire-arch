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
  
  .meta {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    color: #9ca3af;
    font-size: 0.9rem;
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

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const CalendarItem = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  border-left: 4px solid #3b82f6;
  
  .date {
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 0.5rem;
  }
  
  h4 {
    margin: 0 0 0.5rem;
    color: #1f2937;
  }
  
  p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(59, 130, 246, 0.05);
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    h4 {
      margin: 0 0 0.5rem;
      color: #1f2937;
    }
    
    p {
      color: #6b7280;
      margin: 0;
      font-size: 0.9rem;
    }
    
    .meta {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: #9ca3af;
    }
  }
`;

/* Education Sections */
function WorkshopsTraining() {
  const workshops = [
    {
      title: "Sustainable Design Principles",
      description: "Learn how to integrate eco-friendly practices into your architectural projects from concept to completion.",
      tag: "Beginner",
      duration: "2 Days",
      date: "June 15-16, 2023",
      instructor: "Dr. Elena Martinez"
    },
    {
      title: "BIM Implementation Masterclass",
      description: "Advanced training on Building Information Modeling workflows for complex architectural projects.",
      tag: "Advanced",
      duration: "3 Days",
      date: "July 5-7, 2023",
      instructor: "Marcus Johnson"
    },
    {
      title: "Parametric Design with Rhino & Grasshopper",
      description: "Hands-on workshop exploring computational design techniques for innovative architectural forms.",
      tag: "Intermediate",
      duration: "2 Days",
      date: "June 22-23, 2023",
      instructor: "Sophie Chen"
    },
    {
      title: "Architectural Photography",
      description: "Master the art of capturing buildings and spaces with professional architectural photographer.",
      tag: "All Levels",
      duration: "1 Day",
      date: "July 12, 2023",
      instructor: "David Wilson"
    },
    {
      title: "Passive House Design Certification",
      description: "Comprehensive training on passive house standards and certification process.",
      tag: "Intermediate",
      duration: "4 Days",
      date: "August 8-11, 2023",
      instructor: "Olivia Zhang"
    },
    {
      title: "Urban Planning for Sustainable Communities",
      description: "Learn strategies for creating resilient, sustainable urban environments.",
      tag: "Advanced",
      duration: "3 Days",
      date: "July 19-21, 2023",
      instructor: "Robert Kim"
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
            Workshops & Training Programs
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Expand your skills and knowledge through our hands-on workshops and professional training programs. 
            Learn from industry experts and connect with fellow architects and designers.
          </p>
          
          <StatsContainer>
            <StatCard>
              <h2>42</h2>
              <p>Workshops Offered</p>
            </StatCard>
            <StatCard>
              <h2>98%</h2>
              <p>Satisfaction Rate</p>
            </StatCard>
            <StatCard>
              <h2>2,500+</h2>
              <p>Participants Trained</p>
            </StatCard>
            <StatCard>
              <h2>16</h2>
              <p>Expert Instructors</p>
            </StatCard>
          </StatsContainer>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Upcoming Workshops</h2>
          
          <CardGrid>
            {workshops.map((workshop, index) => (
              <ContentCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <IconWrapper>📚</IconWrapper>
                <span className="tag">{workshop.tag}</span>
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="meta">
                  <span>{workshop.duration}</span>
                  <span>{workshop.date}</span>
                </div>
                <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                  Instructor: <strong>{workshop.instructor}</strong>
                </p>
                <ModernButton variant="outline" style={{ marginTop: '1.5rem' }}>
                  Register Now
                </ModernButton>
              </ContentCard>
            ))}
          </CardGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Custom Corporate Training</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              We offer customized training programs for architecture firms and design teams. Our programs can be tailored 
              to your specific needs and delivered at your location or virtually. Topics range from software proficiency 
              to sustainable design practices and project management.
            </p>
            <ModernButton>Request Information</ModernButton>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function TutorialsGuides() {
  const tutorials = [
    {
      title: "Revit for Architectural Documentation",
      description: "Complete guide to creating professional architectural documentation using Autodesk Revit.",
      category: "Software",
      level: "Beginner",
      format: "Video Series"
    },
    {
      title: "Sustainable Material Selection",
      description: "Handbook for choosing eco-friendly materials that meet performance and aesthetic requirements.",
      category: "Materials",
      level: "Intermediate",
      format: "PDF Guide"
    },
    {
      title: "Architectural Rendering with V-Ray",
      description: "Step-by-step tutorial for creating photorealistic architectural visualizations.",
      category: "Visualization",
      level: "Advanced",
      format: "Video Tutorial"
    },
    {
      title: "Building Code Compliance",
      description: "Comprehensive reference for navigating building codes and regulations.",
      category: "Regulations",
      level: "All Levels",
      format: "Interactive Guide"
    },
    {
      title: "Parametric Facade Design",
      description: "Advanced techniques for designing complex building envelopes using computational tools.",
      category: "Design",
      level: "Advanced",
      format: "Video Series"
    },
    {
      title: "Client Presentation Techniques",
      description: "Strategies for effectively communicating design concepts to clients and stakeholders.",
      category: "Communication",
      level: "Intermediate",
      format: "Guidebook"
    }
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Software', 'Design', 'Materials', 'Visualization', 'Regulations', 'Communication'];

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
            Tutorials & Learning Resources
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Access our comprehensive library of tutorials, guides, and learning materials designed to help architects 
            at all stages of their career develop new skills and deepen their expertise.
          </p>
          
          <TabContainer>
            {categories.map((category, index) => (
              <TabButton 
                key={index}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabButton>
            ))}
          </TabContainer>
          
          <ResourceList>
            {tutorials
              .filter(tutorial => activeCategory === 'All' || tutorial.category === activeCategory)
              .map((tutorial, index) => (
                <li key={index}>
                  <h4>{tutorial.title}</h4>
                  <p>{tutorial.description}</p>
                  <div className="meta">
                    <span>{tutorial.category}</span>
                    <span>{tutorial.level}</span>
                    <span>{tutorial.format}</span>
                  </div>
                </li>
              ))
            }
          </ResourceList>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Learning Pathways</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Our structured learning pathways help you build skills systematically. Whether you're focusing on sustainable 
              design, computational methods, or project management, we have curated collections of resources to guide your 
              learning journey.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <ModernButton variant="outline">Sustainable Design Path</ModernButton>
              <ModernButton variant="outline">BIM Specialist Path</ModernButton>
              <ModernButton variant="outline">Project Management Path</ModernButton>
              <ModernButton variant="outline">Digital Fabrication Path</ModernButton>
            </div>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function Exhibitions() {
  const exhibitions = [
    {
      title: "Future Cities: Sustainable Urban Futures",
      description: "Exploring innovative approaches to urban design that address climate change and population growth.",
      date: "June 1 - August 31, 2023",
      location: "Main Gallery",
      curator: "Dr. Amanda Chen"
    },
    {
      title: "Material Innovations in Architecture",
      description: "Showcasing cutting-edge materials and their applications in contemporary architecture.",
      date: "July 15 - September 15, 2023",
      location: "Materials Gallery",
      curator: "Prof. Michael Rodriguez"
    },
    {
      title: "Digital Fabrication: From Concept to Construction",
      description: "Exhibition of projects demonstrating advanced digital fabrication techniques.",
      date: "September 1 - November 30, 2023",
      location: "Technology Pavilion",
      curator: "Alexandra Wong"
    },
    {
      title: "Women in Architecture: Pioneers and Innovators",
      description: "Celebrating the contributions of women architects throughout history and today.",
      date: "October 10 - December 20, 2023",
      location: "Heritage Hall",
      curator: "Sarah Johnson"
    },
    {
      title: "Adaptive Reuse: Transforming Existing Structures",
      description: "Exhibition featuring innovative adaptive reuse projects from around the world.",
      date: "November 5, 2023 - January 15, 2024",
      location: "Main Gallery",
      curator: "David Kim"
    },
    {
      title: "Biomimicry in Architecture",
      description: "Exploring how nature-inspired design leads to more sustainable and efficient buildings.",
      date: "January 20 - March 30, 2024",
      location: "Nature & Design Pavilion",
      curator: "Elena Martinez"
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
            Current & Upcoming Exhibitions
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Explore our rotating exhibitions that showcase innovative architectural projects, emerging trends, 
            and groundbreaking research in the field of architecture and design.
          </p>
          
          <StatsContainer>
            <StatCard>
              <h2>6</h2>
              <p>Current Exhibitions</p>
            </StatCard>
            <StatCard>
              <h2>12</h2>
              <p>Featured Architects</p>
            </StatCard>
            <StatCard>
              <h2>150+</h2>
              <p>Exhibition Pieces</p>
            </StatCard>
            <StatCard>
              <h2>4</h2>
              <p>Interactive Installations</p>
            </StatCard>
          </StatsContainer>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Exhibition Schedule</h2>
          
          <CardGrid>
            {exhibitions.map((exhibition, index) => (
              <ContentCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <IconWrapper>🎨</IconWrapper>
                <h3>{exhibition.title}</h3>
                <p>{exhibition.description}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>Dates:</strong> {exhibition.date}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>Location:</strong> {exhibition.location}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>Curated by:</strong> {exhibition.curator}
                  </p>
                </div>
                <ModernButton variant="outline" style={{ marginTop: '1.5rem' }}>
                  View Details
                </ModernButton>
              </ContentCard>
            ))}
          </CardGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Virtual Tours</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Can't visit in person? Explore our exhibitions through immersive virtual tours that allow you to 
              experience the displays from anywhere in the world. Our virtual tours include curator commentary, 
              additional resources, and interactive elements.
            </p>
            <ModernButton>Explore Virtual Tours</ModernButton>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function EducationOverview() {
  const upcomingEvents = [
    { date: "Jun 15", title: "Sustainable Design Workshop", time: "10:00 AM" },
    { date: "Jun 22", title: "Parametric Design Masterclass", time: "2:00 PM" },
    { date: "Jul 5", title: "BIM Implementation Training", time: "9:00 AM" },
    { date: "Jul 12", title: "Architectural Photography Workshop", time: "1:00 PM" }
  ];

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
            Education & Learning
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4b5563', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Expand your knowledge, develop new skills, and stay at the forefront of architectural innovation 
            through our comprehensive educational programs, resources, and exhibitions.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="workshops-training"><ModernButton>Workshops</ModernButton></Link>
            <Link to="tutorials-guides"><ModernButton variant="outline">Tutorials</ModernButton></Link>
            <Link to="exhibitions"><ModernButton variant="outline">Exhibitions</ModernButton></Link>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>200+</h2>
              <p>Learning Resources</p>
            </StatCard>
            <StatCard>
              <h2>42</h2>
              <p>Workshops per Year</p>
            </StatCard>
            <StatCard>
              <h2>6</h2>
              <p>Annual Exhibitions</p>
            </StatCard>
            <StatCard>
              <h2>98%</h2>
              <p>Satisfaction Rate</p>
            </StatCard>
          </StatsContainer>
          
          <GlassCard style={{ marginTop: '4rem', textAlign: 'left' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Upcoming Events</h2>
            <CalendarGrid>
              {upcomingEvents.map((event, index) => (
                <CalendarItem key={index}>
                  <div className="date">{event.date}</div>
                  <h4>{event.title}</h4>
                  <p>{event.time}</p>
                </CalendarItem>
              ))}
            </CalendarGrid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <ModernButton variant="outline">View Full Calendar</ModernButton>
            </div>
          </GlassCard>

          <GlassCard style={{ marginTop: '2rem', textAlign: 'left' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Learning Membership</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Join our learning membership program for unlimited access to all resources, exclusive workshops, 
              and priority registration for exhibitions and events. Choose from individual or organizational 
              membership options.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <ModernButton>Individual Membership</ModernButton>
              <ModernButton variant="outline">Organizational Membership</ModernButton>
            </div>
          </GlassCard>
        </motion.div>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function Education() {
  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <Routes>
        <Route path="workshops-training" element={<WorkshopsTraining />} />
        <Route path="tutorials-guides" element={<TutorialsGuides />} />
        <Route path="exhibitions" element={<Exhibitions />} />
        <Route path="*" element={<EducationOverview />} />
      </Routes>
    </div>
  );
}

export default Education;