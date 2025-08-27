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

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const ResearchCard = styled(motion.div)`
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

const PublicationList = styled.ul`
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

/* Research Sections */
function ArticlesCaseStudies() {
  const caseStudies = [
    {
      title: "Modular Housing for Climate Refugees",
      description: "A comprehensive study on adaptable housing solutions for populations displaced by climate events, featuring innovative construction techniques.",
      tag: "Housing",
      year: "2023"
    },
    {
      title: "Biophilic Design in Urban Hospitals",
      description: "Examining how nature-integrated design improves patient outcomes and staff wellbeing in high-density medical facilities.",
      tag: "Healthcare",
      year: "2023"
    },
    {
      title: "Adaptive Reuse of Industrial Heritage",
      description: "Case study on transforming a 19th-century factory complex into a mixed-use cultural hub while preserving historical integrity.",
      tag: "Adaptive Reuse",
      year: "2022"
    },
    {
      title: "Net-Zero Energy School Campus",
      description: "Documenting the design process and performance data of Indonesia's first net-zero energy educational facility.",
      tag: "Education",
      year: "2022"
    },
    {
      title: "Post-Occupancy Evaluation of High-Density Housing",
      description: "Longitudinal study measuring resident satisfaction and environmental performance in vertical communities.",
      tag: "Housing",
      year: "2021"
    },
    {
      title: "Parametric Design for Tropical Climates",
      description: "Exploring computational design approaches to optimize building forms for passive cooling in equatorial regions.",
      tag: "Computational Design",
      year: "2021"
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
            Articles & Case Studies
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            In-depth analyses of our innovative projects and research initiatives, documenting design processes, performance outcomes, and lessons learned for the architectural community.
          </p>
          
          <ResearchGrid>
            {caseStudies.map((study, index) => (
              <ResearchCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <IconWrapper>📊</IconWrapper>
                <span className="tag">{study.tag} • {study.year}</span>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <ModernButton variant="ghost" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                  Read Study
                </ModernButton>
              </ResearchCard>
            ))}
          </ResearchGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Research Methodology</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Our case studies employ mixed-methods approaches, combining quantitative data collection with qualitative insights. We utilize post-occupancy evaluations, environmental monitoring, and stakeholder interviews to develop comprehensive understanding of architectural performance and human experience.
            </p>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function SustainableDesign() {
  const practices = [
    {
      title: "Circular Material Strategies",
      description: "Implementing cradle-to-cradle approaches to minimize waste and maximize resource efficiency throughout building lifecycles.",
      icon: "♻️"
    },
    {
      title: "Bioclimatic Design Principles",
      description: "Harnessing local climate conditions to reduce energy demands through passive heating, cooling, and daylighting strategies.",
      icon: "🌤️"
    },
    {
      title: "Regenerative Energy Systems",
      description: "Integrating renewable energy generation with building design to create structures that give back to the grid.",
      icon: "⚡"
    },
    {
      title: "Water stewardship",
      description: "Implementing rainwater harvesting, greywater recycling, and sustainable drainage systems to minimize water footprint.",
      icon: "💧"
    },
    {
      title: "Biodiversity Enhancement",
      description: "Designing buildings and landscapes that support local ecosystems and promote urban biodiversity.",
      icon: "🌿"
    },
    {
      title: "Low-Carbon Construction",
      description: "Reducing embodied carbon through material selection, prefabrication, and efficient construction techniques.",
      icon: "🏗️"
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
            Sustainable Design Practices
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Our eco-friendly approaches to architecture integrate cutting-edge environmental strategies with timeless design principles, creating buildings that minimize ecological impact while maximizing human wellbeing.
          </p>
          
          <StatsContainer>
            <StatCard>
              <h2>62%</h2>
              <p>Average Energy Reduction</p>
            </StatCard>
            <StatCard>
              <h2>45%</h2>
              <p>Water Consumption Saved</p>
            </StatCard>
            <StatCard>
              <h2>78%</h2>
              <p>Construction Waste Diverted</p>
            </StatCard>
            <StatCard>
              <h2>350+</h2>
              <p>Native Plants Specified</p>
            </StatCard>
          </StatsContainer>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Our Sustainable Practice Areas</h2>
          
          <ResearchGrid>
            {practices.map((practice, index) => (
              <ResearchCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <IconWrapper>{practice.icon}</IconWrapper>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
                <ModernButton variant="ghost" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                  Learn More
                </ModernButton>
              </ResearchCard>
            ))}
          </ResearchGrid>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Certifications & Standards</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Our projects consistently achieve the highest sustainability certifications, including LEED Platinum, Living Building Challenge, WELL Building Standard, and Net Zero Energy verification. We go beyond checklist approaches to create truly regenerative environments.
            </p>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function ResilienceClimate() {
  const strategies = [
    {
      title: "Coastal Resilience Design",
      description: "Adapting to sea-level rise through amphibious architecture, flood-resistant materials, and strategic retreat planning.",
      icon: "🌊"
    },
    {
      title: "Wildfire-Resistant Communities",
      description: "Implementing defensible space, non-combustible materials, and community evacuation infrastructure in fire-prone regions.",
      icon: "🔥"
    },
    {
      title: "Heat-Resilient Urban Design",
      description: "Combating urban heat island effect through reflective surfaces, green infrastructure, and passive cooling strategies.",
      icon: "🌡️"
    },
    {
      title: "Earthquake-Resistant Structures",
      description: "Employing base isolation, damping systems, and flexible materials in seismic zones to protect lives and property.",
      icon: "🏢"
    },
    {
      title: "Stormwater Management",
      description: "Designing landscapes and buildings that absorb, store, and slowly release rainwater to prevent flooding.",
      icon: "🌧️"
    },
    {
      title: "Community Resilience Hubs",
      description: "Creating multi-functional spaces that provide resources and shelter during climate emergencies.",
      icon: "🏠"
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
            Resilience & Climate Adaptation
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Proactive design strategies for adapting to our changing climate, creating buildings and communities that can withstand and recover from environmental disruptions while maintaining functionality and comfort.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Climate Risk Assessment</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We begin each project with detailed analysis of site-specific climate vulnerabilities, using predictive modeling to anticipate future conditions and design appropriately.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Adaptive Capacity Building</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                Our designs incorporate flexibility and redundancy, allowing buildings to function under various climate scenarios and be modified as conditions change.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '1.3rem' }}>Community-Centered Approaches</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7' }}>
                We engage local communities in resilience planning, combining technical expertise with traditional knowledge to develop context-appropriate solutions.
              </p>
            </div>
          </div>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Adaptation Strategies</h2>
          
          <ResearchGrid>
            {strategies.map((strategy, index) => (
              <ResearchCard
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <IconWrapper>{strategy.icon}</IconWrapper>
                <h3>{strategy.title}</h3>
                <p>{strategy.description}</p>
                <ModernButton variant="ghost" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                  Explore Strategy
                </ModernButton>
              </ResearchCard>
            ))}
          </ResearchGrid>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function CulturalSocial() {
  const studies = [
    {
      title: "Indigenous Building Traditions",
      description: "Research on integrating traditional knowledge systems with contemporary design in collaboration with First Nations communities.",
      focus: "Cultural Preservation"
    },
    {
      title: "Design for Aging Populations",
      description: "Studying how architectural design can support dignity, independence, and social connection for elderly residents.",
      focus: "Social Equity"
    },
    {
      title: "Post-Disaster Community Recovery",
      description: "Documenting the role of participatory design in rebuilding social cohesion after natural disasters.",
      focus: "Community Resilience"
    },
    {
      title: "Migration and Housing Justice",
      description: "Examining architectural responses to global migration patterns and the right to adequate housing.",
      focus: "Social Justice"
    },
    {
      title: "Sacred Space in Secular Contexts",
      description: "Exploring how design can create opportunities for contemplation and meaning in diverse contemporary settings.",
      focus: "Cultural Expression"
    },
    {
      title: "Playful Cities for Child Development",
      description: "Research on how urban design impacts child development and intergenerational interaction.",
      focus: "Social Development"
    }
  ];

  return (
    <AnimatedSection>
      <ModernSectionWrapper bg="linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)">
        <GlassCard>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}
          >
            Cultural & Social Impact Studies
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
            Investigating how architecture shapes and is shaped by social structures, cultural practices, and human behavior, with a focus on creating inclusive, equitable spaces that strengthen community bonds and honor diverse cultural expressions.
          </p>
          
          <StatsContainer>
            <StatCard>
              <h2>28</h2>
              <p>Community Partnerships</p>
            </StatCard>
            <StatCard>
              <h2>14</h2>
              <p>Cultural Heritage Projects</p>
            </StatCard>
            <StatCard>
              <h2>650+</h2>
              <p>Community Members Engaged</p>
            </StatCard>
            <StatCard>
              <h2>9</h2>
              <p>Countries of Research</p>
            </StatCard>
          </StatsContainer>
          
          <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Research Projects</h2>
          
          <PublicationList>
            {studies.map((study, index) => (
              <li key={index}>
                <h4>{study.title}</h4>
                <p>{study.description}</p>
                <div className="meta">
                  <span>{study.focus}</span>
                  <span>2022-2023</span>
                </div>
              </li>
            ))}
          </PublicationList>
          
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Methodological Approach</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              Our social impact research employs participatory action research methods, working collaboratively with communities throughout the research process. We combine ethnographic observation, spatial analysis, and co-design workshops to develop nuanced understanding of how architecture affects social dynamics and cultural practices.
            </p>
            <ModernButton>Download Research Framework</ModernButton>
          </div>
        </GlassCard>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function ResearchOverview() {
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
            Research & Insights
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#4b5563', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            Advancing architectural knowledge through rigorous research, innovative methodologies, and collaborative inquiry. Our work spans technical, environmental, social, and cultural dimensions of the built environment.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link to="articles-case-studies"><ModernButton>Case Studies</ModernButton></Link>
            <Link to="sustainable-design"><ModernButton variant="outline">Sustainable Design</ModernButton></Link>
            <Link to="resilience-climate"><ModernButton variant="outline">Climate Adaptation</ModernButton></Link>
            <Link to="cultural-social"><ModernButton variant="ghost">Social Impact</ModernButton></Link>
          </div>
          
          <StatsContainer>
            <StatCard>
              <h2>42</h2>
              <p>Published Papers</p>
            </StatCard>
            <StatCard>
              <h2>18</h2>
              <p>Research Grants</p>
            </StatCard>
            <StatCard>
              <h2>9</h2>
              <p>PhD Researchers</p>
            </StatCard>
            <StatCard>
              <h2>6</h2>
              <p>International Collaborations</p>
            </StatCard>
          </StatsContainer>
          
          <GlassCard style={{ marginTop: '4rem' }}>
            <h2 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Research Partnerships</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
              We collaborate with leading universities, research institutions, and industry partners worldwide to advance architectural knowledge and practice. Our current partners include MIT Sustainable Design Lab, ETH Zurich Future Cities Laboratory, and the UN Habitat Research Office.
            </p>
            <ModernButton variant="outline">Become a Research Partner</ModernButton>
          </GlassCard>
        </motion.div>
      </ModernSectionWrapper>
    </AnimatedSection>
  );
}

function ResearchInsights() {
  return (
    <div style={{ padding: '8rem 2rem 2rem' }}>
      <Routes>
        <Route path="articles-case-studies" element={<ArticlesCaseStudies />} />
        <Route path="sustainable-design" element={<SustainableDesign />} />
        <Route path="resilience-climate" element={<ResilienceClimate />} />
        <Route path="cultural-social" element={<CulturalSocial />} />
        <Route path="*" element={<ResearchOverview />} />
      </Routes>
    </div>
  );
}

export default ResearchInsights;