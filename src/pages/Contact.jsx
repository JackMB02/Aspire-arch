import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
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
        // Handle form submission here
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div
            className="contact-page"
            style={{
                background: "var(--primary-dark)",
                minHeight: "100vh",
                color: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <AnimatedSection>
                <div className="contact-container">
                    <div className="contact-content">
                        <div className="contact-info">
                            <h1>Get in Touch</h1>
                            <p className="contact-description">
                                Have a project in mind? Interested in our
                                services? We'd love to hear from you. Reach out
                                to start a conversation about your architectural
                                vision.
                            </p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <div className="contact-icon">📍</div>
                                    <div>
                                        <h3>Visit Us</h3>
                                        <p>
                                            123 Architecture Avenue
                                            <br />
                                            Design District, DC 10001
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">📞</div>
                                    <div>
                                        <h3>Call Us</h3>
                                        <p>
                                            +1 (555) 123-4567
                                            <br />
                                            Mon-Fri, 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">✉️</div>
                                    <div>
                                        <h3>Email Us</h3>
                                        <p>
                                            hello@aspirearchitecture.com
                                            <br />
                                            info@aspirearchitecture.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-section">
                            <div className="form-image">
                                <img
                                    src="/images/office.jpg"
                                    alt="Our office"
                                />
                            </div>

                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                            >
                                <h2>Send us a Message</h2>

                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project or inquiry"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn">
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <style>
                {`
        .contact-page {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: var(--primary-dark);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-info {
          padding: 3rem;
          background: var(--primary-dark);
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-info h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.95);
        }

        .contact-description {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .contact-icon {
          font-size: 1.5rem;
          margin-top: 0.25rem;
          color: var(--accent-light);
        }

        .contact-item h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.95);
        }

        .contact-item p {
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .contact-form-section {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          background: var(--primary-dark);
        }

        .form-image {
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .form-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .contact-form {
          flex: 1;
        }

        .contact-form h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-light);
          box-shadow: 0 0 0 3px rgba(176, 140, 77, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          background: var(--accent-light);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          background: rgba(176, 140, 77, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(176, 140, 77, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .contact-info {
            padding: 2rem;
          }
          
          .contact-form-section {
            padding: 2rem;
          }
        }

        @media (max-width: 640px) {
          .contact-page {
            padding: 7rem 1rem 1rem;
          }
          
          .contact-info h1 {
            font-size: 2rem;
          }
          
          .contact-form h2 {
            font-size: 1.4rem;
          }
          
          .contact-item {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        /* Animation for form elements */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-form > * {
          animation: fadeInUp 0.6s ease forwards;
        }

        .contact-form > *:nth-child(1) { animation-delay: 0.1s; }
        .contact-form > *:nth-child(2) { animation-delay: 0.2s; }
        .contact-form > *:nth-child(3) { animation-delay: 0.3s; }
        .contact-form > *:nth-child(4) { animation-delay: 0.4s; }
        .contact-form > *:nth-child(5) { animation-delay: 0.5s; }

        /* Dark theme overrides */
        .contact-page {
          background: var(--primary-dark) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .contact-page *:not(img):not(svg) {
          color: inherit !important;
        }
        
        .contact-page h1,
        .contact-page h2,
        .contact-page h3,
        .contact-page h4 {
          color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .contact-page .contact-item,
        .contact-page input,
        .contact-page textarea {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .contact-page input:focus,
        .contact-page textarea:focus {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: var(--accent-light) !important;
        }
        
        .contact-page .submit-btn {
          background: var(--accent-light) !important;
          color: white !important;
        }
        
        .contact-page .submit-btn:hover {
          background: rgba(122, 158, 217, 0.8) !important;
        }
        `}
            </style>
        </div>
    );
}

export default Contact;
