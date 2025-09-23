import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

function AboutHero() {
    return (
        <div className="about-hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1>ASPIRE Design Lab</h1>
                    <p>
                        Architecture for Society and Planet, Inspiring Resilient
                        Environment
                    </p>
                </div>
            </div>
        </div>
    );
}

function Mission() {
    return (
        <AnimatedSection>
            <div className="about-page-wrapper">
                <div className="about-content">
                    <div className="mission-section">
                        <h2>Mission</h2>
                        <p className="mission-statement">
                            "We believe architecture is a social art form that
                            requires active cultural engagement and community
                            participation. At ASPIRE Design Lab, we are grounded
                            in listening deeply to the energy of the communities
                            we serve, allowing their voices to guide and shape
                            every design decision."
                        </p>
                        <p>
                            With a mission of nurturing architecture as a social
                            and environmental art form, ASPIRE Design Lab is
                            grounded in research, advocacy, and action. We are
                            committed to studying and steadying architecture for
                            society and planet, framing our work in a practice
                            of deep listening, allowing the voices of the
                            communities we serve to guide and shape every design
                            decision.
                        </p>
                        <p>
                            ASPIRE Design Lab is a factory of architectural
                            ideas and decisions, co-creating spaces that go
                            beyond solving functional needs. We seek to
                            celebrate identity, foster belonging, and design
                            with an unwavering commitment to both people and
                            planet.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function Vision() {
    return (
        <AnimatedSection>
            <div className="about-page-wrapper">
                <div className="about-content">
                    <div className="vision-section">
                        <h2>Vision</h2>
                        <p>
                            We envision a future where architecture serves as a
                            catalyst for positive social and environmental
                            change. Our vision is to create spaces that not only
                            meet functional needs but also inspire, heal, and
                            connect communities while respecting the delicate
                            balance of our planet.
                        </p>
                        <p>
                            Through innovative design thinking and sustainable
                            practices, we aim to transform the built environment
                            into a harmonious extension of nature, where every
                            structure tells a story of cultural heritage,
                            ecological responsibility, and human connection.
                        </p>
                        <div className="vision-quote">
                            "Shaping a future where architecture and nature
                            coexist in perfect harmony."
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function Approach() {
    return (
        <AnimatedSection>
            <div className="about-page-wrapper">
                <div className="about-content">
                    <div className="approach-section">
                        <h2>Approach</h2>
                        <p>
                            Our approach is rooted in the belief that
                            architecture must study, steady, and boost decisions
                            that create a better world. Every project is guided
                            by the ambition to deliver sustainable,
                            human-centered, and collaborative design. We believe
                            in architecture that enriches daily life, honors
                            cultural diversity, and adapts to the evolving needs
                            of communities.
                        </p>
                        <p>
                            Material and light, scale and sustainability,
                            culture and co-disciplinary collaboration are at the
                            core of what we do. They form the language through
                            which we respond to context, celebrate culture, and
                            shape resilient environments that inspire and
                            endure.
                        </p>
                        <div className="approach-quote">
                            "Co-Creating in Symbiosis With People, Places, and
                            the Planet."
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function Goals() {
    return (
        <AnimatedSection>
            <div className="about-page-wrapper">
                <div className="about-content">
                    <div className="goals-section">
                        <h2>Our 2030 Goals</h2>
                        <div className="goals-grid">
                            <div className="goal-item">
                                Achieve net-zero carbon in all new projects by
                                2030
                            </div>
                            <div className="goal-item">
                                Develop affordable housing solutions for 5,000
                                families
                            </div>
                            <div className="goal-item">
                                Organize 15+ architectural exhibitions
                            </div>
                            <div className="goal-item">
                                Establish design education programs in 15
                                underserved communities
                            </div>
                            <div className="goal-item">
                                Pioneer 3 new sustainable building materials
                            </div>
                            <div className="goal-item">
                                Reduce construction waste by 75% across all
                                projects
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function AboutNavigation() {
    const location = useLocation();

    return (
        <div className="about-navigation">
            <Link
                to="/about"
                className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                }`}
            >
                Mission
            </Link>
            <Link
                to="/about/vision"
                className={`nav-link ${
                    location.pathname === "/about/vision" ? "active" : ""
                }`}
            >
                Vision
            </Link>
            <Link
                to="/about/approach"
                className={`nav-link ${
                    location.pathname === "/about/approach" ? "active" : ""
                }`}
            >
                Approach
            </Link>
            <Link
                to="/about/goals"
                className={`nav-link ${
                    location.pathname === "/about/goals" ? "active" : ""
                }`}
            >
                Goals
            </Link>
        </div>
    );
}

function DefaultContent() {
    return (
        <AnimatedSection>
            <div className="about-page-wrapper">
                <div className="about-content">
                    <div className="default-content">
                        <div className="intro-section">
                            <p>
                                ASPIRE Design Lab is a forward-thinking
                                architecture practice dedicated to creating
                                sustainable, meaningful spaces that serve both
                                people and planet. Our work is guided by a deep
                                commitment to environmental stewardship,
                                cultural preservation, and community engagement.
                            </p>
                        </div>

                        <div className="highlights-grid">
                            <div className="highlight-card">
                                <h3>Mission Driven</h3>
                                <p>
                                    Creating architecture that serves social and
                                    environmental purposes through deep
                                    community engagement.
                                </p>
                            </div>

                            <div className="highlight-card">
                                <h3>Sustainable Future</h3>
                                <p>
                                    Pioneering net-zero carbon projects and
                                    sustainable building practices for a better
                                    tomorrow.
                                </p>
                            </div>

                            <div className="highlight-card">
                                <h3>Community Focused</h3>
                                <p>
                                    Listening to and collaborating with
                                    communities to shape spaces that truly serve
                                    their needs.
                                </p>
                            </div>
                        </div>

                        <div className="goals-preview">
                            <h3>Our 2030 Commitment</h3>
                            <p>
                                We are committed to achieving significant
                                milestones by 2030, including net-zero carbon
                                projects, affordable housing solutions, and
                                sustainable material innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function About() {
    return (
        <div className="about-container">
            <AboutHero />
            <AboutNavigation />

            <Routes>
                <Route path="mission" element={<Mission />} />
                <Route path="vision" element={<Vision />} />
                <Route path="approach" element={<Approach />} />
                <Route path="goals" element={<Goals />} />
                <Route path="/" element={<DefaultContent />} />
            </Routes>

            <style>
                {`
        .about-container {
          min-height: 100vh;
          background: var(--primary-dark);
          color: rgba(255, 255, 255, 0.9);
        }
        
        .about-container * {
          color: inherit;
        }
        
        .about-container h1,
        .about-container h2, 
        .about-container h3 {
          color: rgba(255, 255, 255, 0.95);
        }
        
        .about-container p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .about-hero {
          padding: 4rem 2rem 2rem;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/park.jpg') center/cover no-repeat;
          text-align: center;
          position: relative;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1000px;
          margin: 0 auto;
          margin-top: 1rem;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-text p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .about-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          padding: 0 2rem;
        }

        .nav-link {
          padding: 0.6rem 1.2rem;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.9rem;
        }

        .nav-link:hover {
          background: #8A6D3B;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .nav-link.active {
          background: #8A6D3B;
          color: white;
        }

        .about-page-wrapper {
          padding: 3rem 2rem;
          background: var(--primary-dark);
        }

        .about-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .mission-section h2,
        .vision-section h2,
        .goals-section h2,
        .approach-section h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          text-align: center;
        }

        .mission-statement {
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          border-left: 3px solid #8A6D3B;
          padding-left: 1.5rem;
          margin: 2rem 0;
        }

        .mission-section p,
        .vision-section p,
        .approach-section p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .vision-quote,
        .approach-quote {
          font-size: 1.3rem;
          font-style: italic;
          color: #8A6D3B;
          text-align: center;
          margin: 3rem 0;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .goals-section {
          margin-top: 2rem;
        }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.2rem;
          margin-top: 2rem;
        }

        .goal-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
          padding-left: 2.2rem;
        }

        .goal-item:before {
          content: "•";
          color: #8A6D3B;
          font-size: 1.3rem;
          position: absolute;
          left: 1rem;
          top: 1rem;
        }

        /* Default Content Styles */
        .default-content {
          text-align: center;
        }

        .intro-section p {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          text-align: center;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .highlight-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .highlight-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }

        .highlight-card h3 {
          color: #8A6D3B;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .highlight-card p {
          font-size: 1rem;
          line-height: 1.5;
        }

        .goals-preview {
          background: rgba(255, 255, 255, 0.03);
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 3rem;
        }

        .goals-preview h3 {
          color: #8A6D3B;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .goals-preview p {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 3rem 1.5rem 2rem;
            min-height: 180px;
            max-width: 95%;
            margin-top: 0.5rem;
          }
          
          .hero-text h1 {
            font-size: 2.5rem;
          }
          
          .hero-text p {
            font-size: 1.1rem;
          }
          
          .about-page-wrapper {
            padding: 2rem 1.5rem;
          }
          
          .mission-section h2,
          .vision-section h2,
          .goals-section h2,
          .approach-section h2 {
            font-size: 1.8rem;
          }
          
          .about-navigation {
            gap: 0.8rem;
            padding: 0 1rem;
          }
          
          .nav-link {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          
          .goals-grid {
            grid-template-columns: 1fr;
          }
          
          .goal-item {
            padding: 1rem;
            padding-left: 2rem;
          }
          
          .highlights-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 2rem;
          }
          
          .about-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .nav-link {
            width: 180px;
            text-align: center;
          }
          
          .mission-statement {
            font-size: 1.1rem;
            padding-left: 1rem;
          }
          
          .vision-quote,
          .approach-quote {
            font-size: 1.1rem;
            padding: 1.5rem;
          }
        }
        `}
            </style>
        </div>
    );
}

export default About;
