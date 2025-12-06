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
                    <p style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif", fontWeight: "normal" }}>
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
                            both society and the planet, framing our work in a
                            practice of deep listening that allows the voices of
                            the communities we serve to guide and shape every
                            design decision.
                        </p>
                        <p>
                            ASPIRE Design Lab is a factory of architectural
                            ideas and decisions, where design becomes a process
                            of inquiry, collaboration, and co-creation. We seek
                            to craft spaces that go beyond solving functional
                            needs — spaces that celebrate identity, foster
                            belonging, and embody cultural and environmental
                            consciousness.
                        </p>
                        <p>
                            Our mission extends beyond building forms; it is
                            about shaping environments that respond to people's
                            lived experiences, their aspirations, and their
                            relationship with place. Through this, we aim to
                            inspire an architecture that is grounded in empathy,
                            driven by purpose, and dedicated to the shared
                            well-being of both people and planet.
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
                <Route path="/" element={<Mission />} />
            </Routes>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Futura&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
                
                .about-container {
                    min-height: 100vh;
                    background: var(--primary-dark);
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-weight: 300;
                }
                
                .about-container * {
                    color: inherit;
                }
                
                /* Typography */
                .about-container h1,
                .about-container h2, 
                .about-container h3 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.95);
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }
                
                .about-container p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    text-align: justify;
                    text-align-last: left;
                }

                .about-hero {
                    padding: 4rem 2rem 2rem;
                    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/Hallway with Sky.png') center/cover no-repeat;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 3.5rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    line-height: 1.1;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    letter-spacing: -0.5px;
                }

                .hero-text p {
                    font-family: 'Lora', 'Georgia', serif;
                    font-size: 1.4rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }

                /* Navigation Buttons - Updated Design */
                .about-navigation {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                    padding: 0 2rem;
                }

                .nav-link {
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-weight: 100;
                    letter-spacing: 0.5px;
                }

                .nav-link:hover {
                    border-color: var(--accent-light);
                    color: var(--accent-light);
                }

                .nav-link.active {
                    background: var(--accent-light);
                    color: white;
                    border-color: var(--accent-light);
                }

                .about-page-wrapper {
                    padding: 3rem 2rem;
                    background: var(--primary-dark);
                }

                .about-content {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                }

                .mission-section h2,
                .vision-section h2,
                .goals-section h2,
                .approach-section h2 {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 2rem;
                    letter-spacing: -0.5px;
                }

                .mission-statement {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.2rem;
                    font-style: normal;
                    color: rgba(255, 255, 255, 0.9);
                    border-left: 3px solid var(--accent-light);
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    text-align: justify;
                    text-align-last: left;
                }

                .mission-section p,
                .vision-section p,
                .approach-section p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                    text-align: justify;
                    text-align-last: left;
                }

                .vision-quote,
                .approach-quote {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1.3rem;
                    font-style: normal;
                    color: var(--accent-light);
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    text-align: justify;
                    text-align-last: left;
                }

                .goal-item:before {
                    content: "•";
                    color: var(--accent-light);
                    font-size: 1.3rem;
                    position: absolute;
                    left: 1rem;
                    top: 1rem;
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
                        gap: 0.5rem;
                        padding: 0 1rem;
                    }
                    
                    .nav-link {
                        padding: 8px 16px;
                        font-size: 0.9rem;
                    }
                    
                    .goals-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .goal-item {
                        padding: 1rem;
                        padding-left: 2rem;
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
                        width: 200px;
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
            `}</style>
        </div>
    );
}

export default About;