import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
    FaBook,
    FaStar,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import AnimatedSection from "../components/AnimatedSection";
import SkeletonLoader from "../components/SkeletonLoader";

// Dynamic API base URL that works in both development and production
const API_BASE =
    window.location.hostname === "localhost"
        ? "http://localhost:4000/api/thecolleagueuni"
        : "https://aspire-arch-server.onrender.com/api/thecolleagueuni";

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

function UniAbout() {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAboutData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/about`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch about data");
            }

            setAboutData(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching about data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAboutData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchAboutData} />;

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">
                        {aboutData?.title ||
                            "The Archi. Colleagues Lab"}
                    </h1>
                    <p className="uni-description">
                        {aboutData?.description ||
                            "Curious About What Rwandan (In) Architecture Really Is?"}
                    </p>

                    {aboutData?.content?.map((paragraph, index) => (
                        <p key={index} className="uni-description">
                            {paragraph}
                        </p>
                    ))}

                    <div className="features-grid">
                        {aboutData?.features?.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    {index === 2 ? <FaStar /> : <FaBook />}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function UniMission() {
    const [missionData, setMissionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMissionData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/mission`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch mission data");
            }

            setMissionData(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching mission data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissionData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error)
        return <ErrorMessage message={error} onRetry={fetchMissionData} />;

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Our Mission & Vision</h1>

                    <div className="mission-section">
                        <h2>Our Mission</h2>
                        <p>{missionData?.mission}</p>
                    </div>

                    <div className="mission-section">
                        <h2>Our Vision</h2>
                        <p>{missionData?.vision}</p>
                    </div>

                    <h2 className="values-title">Our Drivers</h2>

                    <div className="values-grid">
                        {missionData?.values?.map((value, index) => (
                            <div key={index} className="value-card">
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>

                    <InitiativesSection />
                </div>
            </div>
        </AnimatedSection>
    );
}

// Separate component for initiatives to keep it reusable
function InitiativesSection() {
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInitiatives = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/initiatives`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch initiatives");
            }

            setInitiatives(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching initiatives:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitiatives();
    }, []);

    if (loading) return <SkeletonLoader type="list" count={5} />;
    if (error)
        return <ErrorMessage message={error} onRetry={fetchInitiatives} />;

    return (
        <div className="initiatives-section">
            <h2>2025 Initiatives</h2>
            <ul className="initiatives-list">
                {initiatives.map((initiative, index) => (
                    <li key={initiative.id || index}>
                        <strong>{initiative.title}:</strong>{" "}
                        {initiative.description}
                        {initiative.target_date && (
                            <span>
                                {" "}
                                (Target:{" "}
                                {new Date(
                                    initiative.target_date
                                ).toLocaleDateString()}
                                )
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function UniTeam() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeamData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/team`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch team data");
            }

            setTeamMembers(data.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching team data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchTeamData} />;

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Our Team</h1>
                    <p className="uni-description">
                        Meet the passionate individuals behind The Architecture
                        Colleagues Lab. Our diverse team brings together
                        expertise in education, technology, community building,
                        and design to create transformative learning
                        experiences.
                    </p>

                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={member.id || index} className="team-card">
                                <div className="team-avatar">
                                    {member.image_url ? (
                                        <img 
                                            src={member.image_url} 
                                            alt={member.name}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.textContent = member.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("");
                                            }}
                                        />
                                    ) : (
                                        member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                    )}
                                </div>
                                <h3>{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function UniContact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            if (data.success) {
                setSubmitStatus({
                    type: "success",
                    message: data.message,
                });
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message:
                    error.message ||
                    "Failed to send message. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Contact Us</h1>
                    <p className="uni-description">
                        Have questions about The Archi. Colleagues Lab?
                        Want to explore partnership opportunities? We'd love to
                        hear from you.
                    </p>

                    <div className="contact-info-grid">
                        <div className="contact-info">
                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <h3>Location</h3>
                            <p>
                                Kigali, Rwanda
                                <br />
                                East Africa
                            </p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-icon">
                                <FaPhone />
                            </div>
                            <h3>Phone</h3>
                            <p>
                                +250 789 924 343
                            </p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <h3>Email</h3>
                            <p>
                                thearchi.colleagueslab.aspire@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Send Us a Message</h2>

                        {submitStatus && (
                            <div
                                className={`submit-status ${submitStatus.type}`}
                            >
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                />
                            </div>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            ></textarea>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function UniOverview() {
    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content overview-content">
                    <h1 className="uni-main-title">
                        The Archi. Colleagues Lab
                    </h1>
                    <p className="uni-main-description">
                        Curious About What Rwandan (In) Architecture Really Is?
                    </p>
                    <p className="uni-main-description">
                        Program of Rwandan architecture students passionate
                        about learning, working, and studying together. Through
                        the lens of culture, society, and practice, we explore
                        how architecture can respond to today's challenges and
                        give communities a stronger voice in shaping their
                        spaces.
                    </p>
                    <p className="uni-main-description">
                        We welcome architecture students, architects,
                        professionals (engineers, sociologists, anthropologist)
                        and anyone even without an architecture background who
                        believes in design that speaks for the people.
                    </p>
                    <p className="uni-main-description">
                        Let's connect and shape a future where architecture
                        speaks for everyone.
                    </p>

                    <div className="uni-navigation">
                        <Link to="about" className="nav-link">
                            About Us
                        </Link>
                        <Link to="mission" className="nav-link">
                            Our Mission
                        </Link>
                        <Link to="team" className="nav-link">
                            Our Team
                        </Link>
                        <Link to="contact" className="nav-link">
                            Contact Us
                        </Link>
                    </div>

                    <div className="how-it-works">
                        <h2>How It Works</h2>
                        <div className="process-grid">
                            <div className="process-step">
                                <div className="step-number">1</div>
                                <h3>Create Profile</h3>
                                <p>
                                    Build your professional profile and identify
                                    your skills and interests.
                                </p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">2</div>
                                <h3>Find Colleagues</h3>
                                <p>
                                    Connect with professionals who have
                                    complementary skills and knowledge.
                                </p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">3</div>
                                <h3>Learn Together</h3>
                                <p>
                                    Participate in learning circles, workshops,
                                    and knowledge exchanges.
                                </p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">4</div>
                                <h3>Grow Career</h3>
                                <p>
                                    Apply new skills, earn micro-credentials,
                                    and advance your career.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function TheColleagueUni() {
    return (
        <div
            className="uni-container"
            style={{
                background: "var(--primary-dark)",
                minHeight: "100vh",
                color: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <Routes>
                <Route path="about" element={<UniAbout />} />
                <Route path="mission" element={<UniMission />} />
                <Route path="team" element={<UniTeam />} />
                <Route path="contact" element={<UniContact />} />
                <Route path="*" element={<UniOverview />} />
            </Routes>

            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Futura&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        
        .uni-container {
          min-height: 100vh;
          background: var(--primary-dark);
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
        }

        .uni-page-wrapper {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .uni-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .overview-content {
          text-align: center;
        }

        /* Font Styles */
        .uni-title, .uni-main-title {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          text-align: center;
          letter-spacing: -0.5px;
        }

        .uni-main-title {
          font-size: 2.5rem;
        }

        .uni-description, .uni-main-description {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .uni-main-description {
          font-size: 1.1rem;
          max-width: 700px;
          text-align: justify;
          text-align-last: left;
        }

        /* Navigation */
        .uni-navigation {
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

        /* Feature Cards */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--accent-light);
          display: flex;
          justify-content: center;
        }

        .feature-icon svg {
          width: 2.5rem;
          height: 2.5rem;
        }

        .feature-card h3 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .feature-card p {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 0.95rem;
          text-align: justify;
          text-align-last: left;
        }

        /* Mission Sections */
        .mission-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .mission-section h2 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .mission-section p {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 1rem;
        }

        /* Values */
        .values-title {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.6rem;
          margin: 2.5rem 0 1.5rem;
          text-align: center;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .value-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .value-card h3 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .value-card p {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 0.95rem;
          text-align: justify;
          text-align-last: left;
        }

        /* Initiatives */
        .initiatives-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .initiatives-section h2 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .initiatives-list {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          padding-left: 1.2rem;
          font-size: 0.95rem;
          text-align: left;
          display: inline-block;
        }

        .initiatives-list li {
          margin-bottom: 0.5rem;
        }

        /* Team */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .team-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--accent-light);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
          overflow: hidden;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .team-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .team-card h3 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .team-role {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: var(--accent-light);
          font-weight: 100;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .team-bio {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 0.9rem;
          text-align: justify;
          text-align-last: left;
        }

        /* Contact */
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .contact-info {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-info:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .contact-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-light);
          display: flex;
          justify-content: center;
        }

        .contact-icon svg {
          width: 2rem;
          height: 2rem;
        }

        .contact-info h3 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .contact-info p {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* Contact Form */
        .contact-form-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .contact-form-section h2 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0;
          font-size: 0.9rem;
          transition: border-color 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--accent-light);
          background: rgba(255, 255, 255, 0.08);
        }

        .contact-form textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-btn {
          padding: 8px 20px;
          background: var(--accent-light);
          border: 1px solid var(--accent-light);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: white;
          font-weight: 600;
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
          letter-spacing: 0.5px;
        }

        .submit-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          border-color: rgba(176, 140, 77, 0.9);
          transform: translateY(-1px);
        }

        /* How It Works */
        .how-it-works {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .how-it-works h2 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .process-step {
          text-align: center;
          padding: 1.2rem;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-light);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0 auto 1rem;
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 300;
        }

        .process-step h3 {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .process-step p {
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          font-size: 0.9rem;
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
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
          font-family: 'Futura', 'Trebuchet MS', Arial, sans-serif;
          font-weight: 100;
          letter-spacing: 0.5px;
          margin-top: 1rem;
        }

        .retry-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          border-color: rgba(176, 140, 77, 0.9);
          transform: translateY(-1px);
        }

        .submit-status {
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
        }

        .submit-status.success {
          background: rgba(76, 175, 80, 0.2);
          border: 1px solid rgba(76, 175, 80, 0.5);
          color: #4caf50;
        }

        .submit-status.error {
          background: rgba(244, 67, 54, 0.2);
          border: 1px solid rgba(244, 67, 54, 0.5);
          color: #f44336;
        }

        @media (max-width: 768px) {
          .uni-page-wrapper {
            padding: 7rem 1rem 1rem;
          }
          
          .uni-main-title {
            font-size: 2rem;
          }
          
          .uni-title {
            font-size: 1.8rem;
          }
          
          .features-grid, .values-grid, .team-grid, .process-grid {
            grid-template-columns: 1fr;
          }
          
          .uni-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
          
          .uni-content {
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid, .overview-stats {
            grid-template-columns: 1fr;
          }
        }
        `}
            </style>
        </div>
    );
}

export default TheColleagueUni;
