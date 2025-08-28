import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function ArticlesCaseStudies() {
  const caseStudies = [
    {
      title: "Modular Housing for Climate Refugees",
      description: "A comprehensive study on adaptable housing solutions for populations displaced by climate events, featuring innovative construction techniques.",
      tag: "Housing",
      year: "2023",
      icon: "📊"
    },
    {
      title: "Biophilic Design in Urban Hospitals",
      description: "Examining how nature-integrated design improves patient outcomes and staff wellbeing in high-density medical facilities.",
      tag: "Healthcare",
      year: "2023",
      icon: "🏥"
    },
    {
      title: "Adaptive Reuse of Industrial Heritage",
      description: "Case study on transforming a 19th-century factory complex into a mixed-use cultural hub while preserving historical integrity.",
      tag: "Adaptive Reuse",
      year: "2022",
      icon: "🏭"
    },
    {
      title: "Net-Zero Energy School Campus",
      description: "Documenting the design process and performance data of Indonesia's first net-zero energy educational facility.",
      tag: "Education",
      year: "2022",
      icon: "🎓"
    },
    {
      title: "Post-Occupancy Evaluation of High-Density Housing",
      description: "Longitudinal study measuring resident satisfaction and environmental performance in vertical communities.",
      tag: "Housing",
      year: "2021",
      icon: "🏢"
    },
    {
      title: "Parametric Design for Tropical Climates",
      description: "Exploring computational design approaches to optimize building forms for passive cooling in equatorial regions.",
      tag: "Computational Design",
      year: "2021",
      icon: "💻"
    }
  ];

  return (
    <AnimatedSection>
      <div className="research-page-wrapper">
        <div className="research-content">
          <h1 className="research-title">Articles & Case Studies</h1>
          <p className="research-description">
            In-depth analyses of our innovative projects and research initiatives, documenting design processes, performance outcomes, and lessons learned for the architectural community.
          </p>
          
          <div className="research-grid">
            {caseStudies.map((study, index) => (
              <div key={index} className="research-card">
                <div className="research-icon">{study.icon}</div>
                <span className="research-tag">{study.tag} • {study.year}</span>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
              </div>
            ))}
          </div>
          
          <div className="methodology-section">
            <h2>Research Methodology</h2>
            <p>
              Our case studies employ mixed-methods approaches, combining quantitative data collection with qualitative insights. We utilize post-occupancy evaluations, environmental monitoring, and stakeholder interviews to develop comprehensive understanding of architectural performance and human experience.
            </p>
          </div>
        </div>
      </div>
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
      title: "Water Stewardship",
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
      <div className="research-page-wrapper sustainable-bg">
        <div className="research-content">
          <h1 className="research-title">Sustainable Design Practices</h1>
          <p className="research-description">
            Our eco-friendly approaches to architecture integrate cutting-edge environmental strategies with timeless design principles, creating buildings that minimize ecological impact while maximizing human wellbeing.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">62%</span>
              <span className="stat-label">Average Energy Reduction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45%</span>
              <span className="stat-label">Water Consumption Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">78%</span>
              <span className="stat-label">Construction Waste Diverted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">350+</span>
              <span className="stat-label">Native Plants Specified</span>
            </div>
          </div>
          
          <h2 className="section-subtitle">Our Sustainable Practice Areas</h2>
          
          <div className="research-grid">
            {practices.map((practice, index) => (
              <div key={index} className="research-card">
                <div className="research-icon">{practice.icon}</div>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
              </div>
            ))}
          </div>
          
          <div className="certifications-section">
            <h2>Certifications & Standards</h2>
            <p>
              Our projects consistently achieve the highest sustainability certifications, including LEED Platinum, Living Building Challenge, WELL Building Standard, and Net Zero Energy verification. We go beyond checklist approaches to create truly regenerative environments.
            </p>
          </div>
        </div>
      </div>
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
      <div className="research-page-wrapper resilience-bg">
        <div className="research-content">
          <h1 className="research-title">Resilience & Climate Adaptation</h1>
          <p className="research-description">
            Proactive design strategies for adapting to our changing climate, creating buildings and communities that can withstand and recover from environmental disruptions while maintaining functionality and comfort.
          </p>
          
          <div className="approach-grid">
            <div className="approach-item">
              <h3>Climate Risk Assessment</h3>
              <p>We begin each project with detailed analysis of site-specific climate vulnerabilities, using predictive modeling to anticipate future conditions.</p>
            </div>
            
            <div className="approach-item">
              <h3>Adaptive Capacity Building</h3>
              <p>Our designs incorporate flexibility and redundancy, allowing buildings to function under various climate scenarios.</p>
            </div>
            
            <div className="approach-item">
              <h3>Community-Centered Approaches</h3>
              <p>We engage local communities in resilience planning, combining technical expertise with traditional knowledge.</p>
            </div>
          </div>
          
          <h2 className="section-subtitle">Adaptation Strategies</h2>
          
          <div className="research-grid">
            {strategies.map((strategy, index) => (
              <div key={index} className="research-card">
                <div className="research-icon">{strategy.icon}</div>
                <h3>{strategy.title}</h3>
                <p>{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
      <div className="research-page-wrapper cultural-bg">
        <div className="research-content">
          <h1 className="research-title">Cultural & Social Impact Studies</h1>
          <p className="research-description">
            Investigating how architecture shapes and is shaped by social structures, cultural practices, and human behavior, with a focus on creating inclusive, equitable spaces that strengthen community bonds.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">28</span>
              <span className="stat-label">Community Partnerships</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">14</span>
              <span className="stat-label">Cultural Heritage Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">650+</span>
              <span className="stat-label">Community Members Engaged</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">9</span>
              <span className="stat-label">Countries of Research</span>
            </div>
          </div>
          
          <h2 className="section-subtitle">Research Projects</h2>
          
          <div className="studies-list">
            {studies.map((study, index) => (
              <div key={index} className="study-item">
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <div className="study-meta">
                  <span className="study-focus">{study.focus}</span>
                  <span className="study-year">2022-2023</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="methodology-section">
            <h2>Methodological Approach</h2>
            <p>
              Our social impact research employs participatory action research methods, working collaboratively with communities throughout the research process. We combine ethnographic observation, spatial analysis, and co-design workshops to develop nuanced understanding of how architecture affects social dynamics and cultural practices.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ResearchOverview() {
  return (
    <AnimatedSection>
      <div className="research-page-wrapper overview-bg">
        <div className="research-content overview-content">
          <h1 className="research-main-title">Research & Insights</h1>
          <p className="research-main-description">
            Advancing architectural knowledge through rigorous research, innovative methodologies, and collaborative inquiry. Our work spans technical, environmental, social, and cultural dimensions of the built environment.
          </p>

          <div className="research-navigation">
            <Link to="articles-case-studies" className="nav-link primary">Case Studies</Link>
            <Link to="sustainable-design" className="nav-link">Sustainable Design</Link>
            <Link to="resilience-climate" className="nav-link">Climate Adaptation</Link>
            <Link to="cultural-social" className="nav-link">Social Impact</Link>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Published Papers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18</span>
              <span className="stat-label">Research Grants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">9</span>
              <span className="stat-label">PhD Researchers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">International Collaborations</span>
            </div>
          </div>
          
          <div className="partnerships-section">
            <h2>Research Partnerships</h2>
            <p>
              We collaborate with leading universities, research institutions, and industry partners worldwide to advance architectural knowledge and practice. Our current partners include MIT Sustainable Design Lab, ETH Zurich Future Cities Laboratory, and the UN Habitat Research Office.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ResearchInsights() {
  return (
    <div className="research-container">
      <Routes>
        <Route path="articles-case-studies" element={<ArticlesCaseStudies />} />
        <Route path="sustainable-design" element={<SustainableDesign />} />
        <Route path="resilience-climate" element={<ResilienceClimate />} />
        <Route path="cultural-social" element={<CulturalSocial />} />
        <Route path="*" element={<ResearchOverview />} />
      </Routes>

      <style>
        {`
        .research-container {
          min-height: 100vh;
        }

        .research-page-wrapper {
          padding: 6rem 2rem 4rem;
          background: #f8f9fa;
        }

        .sustainable-bg {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
        }

        .resilience-bg {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }

        .cultural-bg {
          background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%);
        }

        .overview-bg {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }

        .research-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .overview-content {
          text-align: center;
        }

        .research-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .research-main-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .research-description {
          font-size: 1.2rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .research-main-description {
          font-size: 1.3rem;
          color: #6b7280;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .research-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .research-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .research-card:hover {
          transform: translateY(-5px);
        }

        .research-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .research-tag {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: #ffedd5;
          color: #f97316;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .research-card h3 {
          font-size: 1.3rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .research-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: #f97316;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }

        .section-subtitle {
          color: #1f2937;
          font-size: 1.8rem;
          margin: 3rem 0 1.5rem;
          text-align: center;
        }

        .methodology-section, .certifications-section, .partnerships-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          margin-top: 3rem;
        }

        .methodology-section h2, .certifications-section h2, .partnerships-section h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .methodology-section p, .certifications-section p, .partnerships-section p {
          color: #6b7280;
          line-height: 1.7;
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .approach-item {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .approach-item h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .approach-item p {
          color: #6b7280;
          line-height: 1.6;
        }

        .studies-list {
          margin: 3rem 0;
        }

        .study-item {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .study-item h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .study-item p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .study-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .study-focus {
          background: #ffedd5;
          color: #f97316;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-weight: 600;
        }

        .study-year {
          color: #9ca3af;
        }

        .research-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-link.primary {
          background: #f97316;
          color: white;
        }

        .nav-link:not(.primary) {
          background: white;
          color: #6b7280;
          border: 1px solid #e5e7eb;
        }

        .nav-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }

        @media (max-width: 768px) {
          .research-page-wrapper {
            padding: 5rem 1rem 2rem;
          }
          
          .research-main-title {
            font-size: 2.2rem;
          }
          
          .research-title {
            font-size: 2rem;
          }
          
          .research-grid, .approach-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .research-navigation {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .study-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
        `}
      </style>
    </div>
  );
}

export default ResearchInsights;