import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";
import {
    FaChartBar,
    FaHospital,
    FaIndustry,
    FaGraduationCap,
    FaBuilding,
    FaLaptop,
    FaRecycle,
    FaSun,
    FaBolt,
    FaTint,
    FaLeaf,
    FaHardHat,
    FaWater,
    FaFire,
    FaTemperatureHigh,
    FaHome,
    FaCloudRain,
    FaUsers,
    FaHeart,
    FaHandsHelping,
    FaBalanceScale,
    FaPray,
    FaChild,
} from "react-icons/fa";

// Dynamic API base URL that works in both development and production
const API_BASE =
    window.location.hostname === "localhost"
        ? "http://localhost:4000/api/research"
        : "https://aspire-arch-server.onrender.com/api/research";

// Icon component mapping
const iconComponents = {
    FaChartBar,
    FaHospital,
    FaIndustry,
    FaGraduationCap,
    FaBuilding,
    FaLaptop,
    FaRecycle,
    FaSun,
    FaBolt,
    FaTint,
    FaLeaf,
    FaHardHat,
    FaWater,
    FaFire,
    FaTemperatureHigh,
    FaHome,
    FaCloudRain,
    FaUsers,
    FaHeart,
    FaHandsHelping,
    FaBalanceScale,
    FaPray,
    FaChild,
};

// Loading component
function LoadingSpinner() {
    return <SkeletonLoader type="card" count={4} />;
}

// Error component
function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-message">
            <p>Error: {message}</p>
            <button onClick={onRetry} className="retry-btn">
                Try Again
            </button>
        </div>
    );
}

function ArticlesCaseStudies() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/articles`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch articles");
            }

            setArticles(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching articles:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchArticles} />;

    return (
        <AnimatedSection>
            <div className="research-page-wrapper">
                <div className="research-content">
                    <h1 className="research-title">Articles & Case Studies</h1>
                    <p className="research-description">
                        In-depth analyses of our innovative projects and
                        research initiatives, documenting design processes,
                        performance outcomes, and lessons learned for the
                        architectural community.
                    </p>

                    <div className="research-grid">
                        {articles.map((article, index) => {
                            const IconComponent =
                                iconComponents[article.icon] || FaChartBar;
                            return (
                                <div
                                    key={article.id || index}
                                    className="research-card"
                                >
                                    <div className="research-icon">
                                        <IconComponent />
                                    </div>
                                    <span className="research-tag">
                                        {article.tag} • {article.year}
                                    </span>
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="methodology-section">
                        <h2>Research Methodology</h2>
                        <p>
                            Our case studies employ mixed-methods approaches,
                            combining quantitative data collection with
                            qualitative insights. We utilize post-occupancy
                            evaluations, environmental monitoring, and
                            stakeholder interviews to develop comprehensive
                            understanding of architectural performance and human
                            experience.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function SustainableDesign() {
    const [practices, setPractices] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSustainableData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/sustainable-practices`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch sustainable data"
                );
            }

            setPractices(data.data.practices);
            setStats(data.data.stats);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching sustainable data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSustainableData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error)
        return <ErrorMessage message={error} onRetry={fetchSustainableData} />;

    return (
        <AnimatedSection>
            <div className="research-page-wrapper">
                <div className="research-content">
                    <h1 className="research-title">
                        Sustainable Design Practices
                    </h1>
                    <p className="research-description">
                        Our eco-friendly approaches to architecture integrate
                        cutting-edge environmental strategies with timeless
                        design principles, creating buildings that minimize
                        ecological impact while maximizing human wellbeing.
                    </p>

                    <div className="stats-grid">
                        {stats.map((stat, index) => {
                            const IconComponent =
                                iconComponents[stat.icon_name] || FaChartBar;
                            return (
                                <div
                                    key={stat.id || index}
                                    className="stat-item"
                                >
                                    <div className="stat-icon">
                                        <IconComponent />
                                    </div>
                                    <span className="stat-label">
                                        {stat.stat_label}
                                    </span>
                                    {stat.stat_value && (
                                        <div className="stat-value">
                                            {stat.stat_value}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="section-subtitle">
                        Our Sustainable Practice Areas
                    </h2>

                    <div className="research-grid">
                        {practices.map((practice, index) => {
                            const IconComponent =
                                iconComponents[practice.icon] || FaRecycle;
                            return (
                                <div
                                    key={practice.id || index}
                                    className="research-card"
                                >
                                    <div className="research-icon">
                                        <IconComponent />
                                    </div>
                                    <h3>{practice.title}</h3>
                                    <p>{practice.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="certifications-section">
                        <h2>Certifications & Standards</h2>
                        <p>
                            Our projects consistently achieve the highest
                            sustainability certifications, including LEED
                            Platinum, Living Building Challenge, WELL Building
                            Standard, and Net Zero Energy verification. We go
                            beyond checklist approaches to create truly
                            regenerative environments.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function ResilienceClimate() {
    const [strategies, setStrategies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClimateStrategies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/climate-strategies`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch climate strategies"
                );
            }

            setStrategies(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching climate strategies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClimateStrategies();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error)
        return (
            <ErrorMessage message={error} onRetry={fetchClimateStrategies} />
        );

    return (
        <AnimatedSection>
            <div className="research-page-wrapper">
                <div className="research-content">
                    <h1 className="research-title">
                        Resilience & Climate Adaptation
                    </h1>
                    <p className="research-description">
                        Proactive design strategies for adapting to our changing
                        climate, creating buildings and communities that can
                        withstand and recover from environmental disruptions
                        while maintaining functionality and comfort.
                    </p>

                    <div className="approach-grid">
                        <div className="approach-item">
                            <h3>Climate Risk Assessment</h3>
                            <p>
                                We begin each project with detailed analysis of
                                site-specific climate vulnerabilities, using
                                predictive modeling to anticipate future
                                conditions.
                            </p>
                        </div>

                        <div className="approach-item">
                            <h3>Adaptive Capacity Building</h3>
                            <p>
                                Our designs incorporate flexibility and
                                redundancy, allowing buildings to function under
                                various climate scenarios.
                            </p>
                        </div>

                        <div className="approach-item">
                            <h3>Community-Centered Approaches</h3>
                            <p>
                                We engage local communities in resilience
                                planning, combining technical expertise with
                                traditional knowledge.
                            </p>
                        </div>
                    </div>

                    <h2 className="section-subtitle">Adaptation Strategies</h2>

                    <div className="research-grid">
                        {strategies.map((strategy, index) => {
                            const IconComponent =
                                iconComponents[strategy.icon] || FaWater;
                            return (
                                <div
                                    key={strategy.id || index}
                                    className="research-card"
                                >
                                    <div className="research-icon">
                                        <IconComponent />
                                    </div>
                                    <h3>{strategy.title}</h3>
                                    <p>{strategy.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function CulturalSocial() {
    const [studies, setStudies] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSocialStudies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/social-studies`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch social studies"
                );
            }

            setStudies(data.data.studies);
            setStats(data.data.stats);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching social studies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocialStudies();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error)
        return <ErrorMessage message={error} onRetry={fetchSocialStudies} />;

    return (
        <AnimatedSection>
            <div className="research-page-wrapper">
                <div className="research-content">
                    <h1 className="research-title">
                        Cultural & Social Impact Studies
                    </h1>
                    <p className="research-description">
                        Investigating how architecture shapes and is shaped by
                        social structures, cultural practices, and human
                        behavior, with a focus on creating inclusive, equitable
                        spaces that strengthen community bonds.
                    </p>

                    <div className="stats-grid">
                        {stats.map((stat, index) => {
                            const IconComponent =
                                iconComponents[stat.icon_name] || FaUsers;
                            return (
                                <div
                                    key={stat.id || index}
                                    className="stat-item"
                                >
                                    <div className="stat-icon">
                                        <IconComponent />
                                    </div>
                                    <span className="stat-label">
                                        {stat.stat_label}
                                    </span>
                                    {stat.stat_value && (
                                        <div className="stat-value">
                                            {stat.stat_value}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="section-subtitle">Research Projects</h2>

                    <div className="studies-list">
                        {studies.map((study, index) => {
                            const IconComponent =
                                iconComponents[study.icon] || FaUsers;
                            return (
                                <div
                                    key={study.id || index}
                                    className="study-item"
                                >
                                    <div className="study-icon">
                                        <IconComponent />
                                    </div>
                                    <div className="study-content">
                                        <h3>{study.title}</h3>
                                        <p>{study.description}</p>
                                        <div className="study-meta">
                                            <span className="study-focus">
                                                {study.focus_area}
                                            </span>
                                            <span className="study-year">
                                                2022-2023
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="methodology-section">
                        <h2>Methodological Approach</h2>
                        <p>
                            Our social impact research employs participatory
                            action research methods, working collaboratively
                            with communities throughout the research process. We
                            combine ethnographic observation, spatial analysis,
                            and co-design workshops to develop nuanced
                            understanding of how architecture affects social
                            dynamics and cultural practices.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function ResearchOverview() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOverviewData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/overview`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch overview data"
                );
            }

            setStats(data.data.stats);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching overview data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverviewData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error)
        return <ErrorMessage message={error} onRetry={fetchOverviewData} />;

    return (
        <AnimatedSection>
            <div className="research-page-wrapper">
                <div className="research-content overview-content">
                    <h1 className="research-main-title">Research & Insights</h1>
                    <p className="research-main-description">
                        Advancing architectural knowledge through rigorous
                        research, innovative methodologies, and collaborative
                        inquiry. Our work spans technical, environmental,
                        social, and cultural dimensions of the built
                        environment.
                    </p>

                    <div className="research-navigation">
                        <Link to="articles-case-studies" className="nav-link">
                            Case Studies
                        </Link>
                        <Link to="sustainable-design" className="nav-link">
                            Sustainable Design
                        </Link>
                        <Link to="resilience-climate" className="nav-link">
                            Climate Adaptation
                        </Link>
                        <Link to="cultural-social" className="nav-link">
                            Social Impact
                        </Link>
                    </div>

                    <div className="stats-grid">
                        {stats.map((stat, index) => {
                            const IconComponent =
                                iconComponents[stat.icon_name] || FaChartBar;
                            return (
                                <div
                                    key={stat.id || index}
                                    className="stat-item"
                                >
                                    <div className="stat-icon">
                                        <IconComponent />
                                    </div>
                                    <span className="stat-label">
                                        {stat.stat_label}
                                    </span>
                                    {stat.stat_value && (
                                        <div className="stat-value">
                                            {stat.stat_value}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="partnerships-section">
                        <h2>Research Partnerships</h2>
                        <p>
                            We collaborate with leading universities, research
                            institutions, and industry partners worldwide to
                            advance architectural knowledge and practice. Our
                            current partners include MIT Sustainable Design Lab,
                            ETH Zurich Future Cities Laboratory, and the UN
                            Habitat Research Office.
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
                <Route
                    path="articles-case-studies"
                    element={<ArticlesCaseStudies />}
                />
                <Route
                    path="sustainable-design"
                    element={<SustainableDesign />}
                />
                <Route
                    path="resilience-climate"
                    element={<ResilienceClimate />}
                />
                <Route path="cultural-social" element={<CulturalSocial />} />
                <Route path="*" element={<ResearchOverview />} />
            </Routes>

            <style jsx>{`
                @import url("https://fonts.googleapis.com/css2?family=Futura&family=Lora:ital,wght@0,400..700;1,400..700&display=swap");

                .research-container {
                    background: var(--primary-dark);
                    min-height: 100vh;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-weight: 300;
                }

                .research-page-wrapper {
                    padding: 8rem 2rem 2rem;
                    min-height: 100vh;
                    background: var(--primary-dark);
                }

                .research-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    text-align: center;
                }

                .overview-content {
                    text-align: center;
                }

                /* Typography */
                .research-title,
                .research-main-title {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1.5rem;
                    text-align: center;
                    letter-spacing: -0.5px;
                }

                .research-main-title {
                    font-size: 2.5rem;
                }

                .research-description,
                .research-main-description {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    max-width: 800px;
                    margin: 0 auto 2.5rem;
                    text-align: center;
                }

                .research-main-description {
                    font-size: 1.1rem;
                    max-width: 700px;
                }

                /* Navigation */
                .research-navigation {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
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
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-weight: 100;
                    letter-spacing: 0.5px;
                }

                .nav-link:hover {
                    border-color: var(--accent-light);
                    color: var(--accent-light);
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin: 3rem 0;
                }

                .stat-item {
                    text-align: center;
                    padding: 2rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-light);
                }

                .stat-icon {
                    font-size: 3rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                }

                .stat-label {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 300;
                    letter-spacing: 0.5px;
                }

                .stat-value {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    font-size: 1.5rem;
                    color: var(--accent-light);
                    font-weight: 600;
                    margin-top: 0.5rem;
                }

                /* Research Grid */
                .research-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .research-card {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .research-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-light);
                }

                .research-icon {
                    font-size: 2.5rem;
                    color: var(--accent-light);
                    margin-bottom: 1rem;
                }

                .research-tag {
                    display: inline-block;
                    padding: 8px 20px;
                    background: var(--accent-light);
                    color: white;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    font-weight: 300;
                }

                .research-card h3 {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    font-size: 1.3rem;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .research-card p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                /* Sections */
                .section-subtitle {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 1.6rem;
                    margin: 3rem 0 2rem;
                    text-align: center;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .methodology-section,
                .certifications-section,
                .partnerships-section {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: 3rem;
                    text-align: center;
                }

                .methodology-section h2,
                .certifications-section h2,
                .partnerships-section h2 {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-size: 1.4rem;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .methodology-section p,
                .certifications-section p,
                .partnerships-section p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 1rem;
                }

                /* Approach Grid */
                .approach-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }

                .approach-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                }

                .approach-item h3 {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .approach-item p {
                    font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                /* Studies List */
                .studies-list {
                    margin: 2.5rem 0;
                }

                .study-item {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    transition: all 0.3s ease;
                    text-align: left;
                }

                .study-item:hover {
                    border-color: var(--accent-light);
                    transform: translateX(5px);
                }

                .study-icon {
                    font-size: 2rem;
                    color: var(--accent-light);
                    margin-top: 0.5rem;
                    flex-shrink: 0;
                }

                .study-content {
                    flex: 1;
                }

                .study-item h3 {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.95);
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    letter-spacing: -0.3px;
                }

                .study-item p {
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                }

                .study-meta {
                    display: flex;
                    gap: 1.5rem;
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                }

                .study-focus {
                    background: var(--accent-light);
                    color: white;
                    padding: 0.5rem 1rem;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .study-year {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    font-weight: 100;
                }

                /* Loading and Error States */
                .loading-spinner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .loading-spinner .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-left: 4px solid var(--accent-light);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 1rem;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .error-message {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .retry-btn {
                    padding: 8px 20px;
                    background: var(--accent-light);
                    border: 1px solid var(--accent-light);
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                    color: white;
                    font-weight: 600;
                    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
                    font-weight: 100;
                    letter-spacing: 0.5px;
                    margin-top: 1rem;
                }

                .retry-btn:hover {
                    background: rgba(176, 140, 77, 0.9);
                    border-color: rgba(176, 140, 77, 0.9);
                    transform: translateY(-1px);
                }

                @media (max-width: 768px) {
                    .research-page-wrapper {
                        padding: 6rem 1rem 1rem;
                    }

                    .research-main-title {
                        font-size: 2rem;
                    }

                    .research-title {
                        font-size: 1.8rem;
                    }

                    .research-grid,
                    .approach-grid {
                        grid-template-columns: 1fr;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .research-navigation {
                        flex-direction: column;
                        align-items: center;
                    }

                    .nav-link {
                        width: 100%;
                        justify-content: center;
                    }

                    .study-item {
                        flex-direction: column;
                        text-align: center;
                    }

                    .study-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .research-content {
                        padding: 0 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

export default ResearchInsights;
