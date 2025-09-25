import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaBook, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import AnimatedSection from "../components/AnimatedSection";

function UniAbout() {
    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">About TheAchi.ColleaguesLab</h1>
                    <p className="uni-description">
                        Curious About What Rwandan (In) Architecture Really Is?
                    </p>
                    <p className="uni-description">
                        Program of Rwandan architecture students passionate about learning, working, and
                        studying together. Through the lens of culture, society, and practice, we explore how
                        architecture can respond to today's challenges and give communities a stronger voice in
                        shaping their spaces.
                    </p>
                    <p className="uni-description">
                        We welcome architecture students, architects, professionals (engineers, sociologists,
                        anthropologist) and anyone even without an architecture background who believes in
                        design that speaks for the people.
                    </p>
                    <p className="uni-description">
                        Let's connect and shape a future where architecture speaks for everyone.
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaBook />
                            </div>
                            <h3>Our Story</h3>
                            <p>
                                Founded in 2025 by Arsène MANZI MUGENI — the founder of ASPIRE Design Lab — during his
                                second year of architecture school, TheArchi.ColleaguesLab began as a project within ASPIRE
                                Design Lab. It was born out of a strong intention to bridge the gap between academia and
                                professional practice, creating a space where students could learn collaboratively, share
                                knowledge, and experiment with ideas that go beyond the classroom.
                            </p>
                            <p>
                                The initiative quickly evolved into a peer-driven platform for research, dialogue, and design
                                exploration, encouraging young architects to engage with culture, society, and the environment
                                in meaningful ways.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaBook />
                            </div>
                            <h3>Impact to Be Made</h3>
                            <p>
                                As students, we are not just preparing for the future — we are shaping it. We experiment,
                                question, and collaborate to influence how spaces are designed to reflect culture, support
                                communities, and solve real-world challenges.
                            </p>
                            <p>
                                As Aldo Rossi reminds us, "Architecture is the fixed stage for human events." By rethinking how
                                these "stages" are designed, we aim to create environments that nurture human dignity,
                                belonging, and possibility.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaStar />
                            </div>
                            <h3>Why This Matters</h3>
                            <p>
                                Architecture is more than buildings — it is a tool for change. As Le Corbusier said, "Architecture
                                is the learned game, correct and magnificent, of forms assembled in the light." If this is true, then
                                as students, we have the freedom to play, test bold ideas, and reimagine what that game could
                                be in our cultural and social context.
                            </p>
                            <p>
                                Our student years are the perfect laboratory for innovation — a space where failure becomes a
                                teacher and ideas can be fearlessly explored. This is why we choose to act now: to lay the
                                foundation for a more thoughtful, inclusive, and responsive built environment.
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </AnimatedSection>
    );
}

function UniMission() {
    const values = [
        {
            title: "Collaborative Learning",
            description:
                "We believe that the most powerful learning happens through collaboration, not competition.",
        },
        {
            title: "Accessibility",
            description:
                "Making high-quality learning resources available to professionals at all stages of their careers.",
        },
        {
            title: "Innovation",
            description:
                "Continuously evolving to incorporate the latest research in learning science and technology.",
        },
        {
            title: "Community",
            description:
                "Building supportive, inclusive communities where members feel valued and empowered.",
        },
    ];

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Our Mission & Vision</h1>

                    <div className="mission-section">
                        <h2>Our Mission</h2>
                        <p>
                            To democratize professional education by creating a
                            global platform where colleagues can learn from each
                            other, regardless of geographic, economic, or
                            hierarchical barriers.
                        </p>
                    </div>

                    <div className="mission-section">
                        <h2>Our Vision</h2>
                        <p>
                            We envision a world where professional development
                            is continuous, collaborative, and integrated into
                            daily work life through peer connections and organic
                            learning.
                        </p>
                    </div>

                    <h2 className="values-title">Our Values</h2>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="initiatives-section">
                        <h2>2025 Initiatives</h2>
                        <ul className="initiatives-list">
                            <li>
                                Launch mentorship program connecting emerging
                                professionals with industry leaders
                            </li>
                            <li>
                                Develop 50 new micro-certifications in
                                high-demand skills
                            </li>
                            <li>
                                Expand language support to include 10 additional
                                languages
                            </li>
                            <li>
                                Establish partnerships with 100 organizations
                            </li>
                            <li>
                                Create accessibility features for universal
                                usability
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function UniTeam() {
    const teamMembers = [
        {
            name: "Dr. Elena Rodriguez",
            role: "Founder & CEO",
            initial: "ER",
            bio: "Former professor of educational technology with 15+ years experience in digital learning platforms.",
        },
        {
            name: "Marcus Chen",
            role: "CTO",
            initial: "MC",
            bio: "Software engineer specializing in scalable learning management systems and AI-driven recommendations.",
        },
        {
            name: "Olivia Johnson",
            role: "Head of Learning",
            initial: "OJ",
            bio: "Curriculum designer focused on adult learning principles and professional development pathways.",
        },
        {
            name: "David Kim",
            role: "Community Director",
            initial: "DK",
            bio: "Expert in building engaged online communities and fostering meaningful professional connections.",
        },
    ];

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Our Team</h1>
                    <p className="uni-description">
                        Meet the passionate individuals behind TheAchi.ColleaguesLab.
                        Our diverse team brings together expertise in education,
                        technology, community building, and design to create
                        transformative learning experiences.
                    </p>

                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">
                                    {member.initial}
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <AnimatedSection>
            <div className="uni-page-wrapper">
                <div className="uni-content">
                    <h1 className="uni-title">Contact Us</h1>
                    <p className="uni-description">
                        Have questions about TheAchi.ColleaguesLab? Want to explore
                        partnership opportunities? We'd love to hear from you.
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
                                General: +250 (788) 123-456
                                <br />
                                Support: +250 (788) 654-321
                            </p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <h3>Email</h3>
                            <p>
                                hello@theachi.colleagueslab.com
                                <br />
                                support@theachi.colleagueslab.com
                                <br />
                                partners@theachi.colleagueslab.com
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
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
                            <button type="submit" className="submit-btn">
                                Send Message
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
                    <h1 className="uni-main-title">TheAchi.ColleaguesLab</h1>
                    <p className="uni-main-description">
                        Curious About What Rwandan (In) Architecture Really Is?
                    </p>
                    <p className="uni-main-description">
                        Program of Rwandan architecture students passionate about learning, working, and
                        studying together. Through the lens of culture, society, and practice, we explore how
                        architecture can respond to today's challenges and give communities a stronger voice in
                        shaping their spaces.
                    </p>
                    <p className="uni-main-description">
                        We welcome architecture students, architects, professionals (engineers, sociologists,
                        anthropologist) and anyone even without an architecture background who believes in
                        design that speaks for the people.
                    </p>
                    <p className="uni-main-description">
                        Let's connect and shape a future where architecture speaks for everyone.
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
        .uni-container {
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .uni-page-wrapper {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .uni-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .overview-content {
          text-align: center;
        }

        .uni-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .uni-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
        }

        .uni-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .uni-main-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
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
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .feature-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }



        .mission-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mission-section h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .mission-section p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .values-title {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.4rem;
          margin: 2.5rem 0 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .value-card h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .value-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .initiatives-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .initiatives-section h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .initiatives-list {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          padding-left: 1.2rem;
          font-size: 0.9rem;
        }

        .initiatives-list li {
          margin-bottom: 0.5rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
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
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--accent-light);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .team-card h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .team-role {
          color: var(--accent-light);
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .team-bio {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .contact-info {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
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
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .contact-info p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .contact-form-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-form-section h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
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
          background: var(--accent-light);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.3);
        }

        .uni-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.9rem;
        }

        .nav-link:hover {
          background: var(--accent-light);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(176, 140, 77, 0.3);
          border-color: var(--accent-light);
        }

        .how-it-works {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .how-it-works h2 {
          color: rgba(255, 255, 255, 0.95);
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
          font-weight: 600;
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
        }

        .process-step h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .process-step p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
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
          
          .stats-grid, .overview-stats {
            grid-template-columns: repeat(2, 1fr);
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
