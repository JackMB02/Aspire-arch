import { motion } from "framer-motion";
import {
    FaLinkedin,
    FaInstagram,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const FooterWrapper = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 4rem;
`;

const FooterContainer = styled.footer`
    background: #122324;
    padding: 3rem 2rem 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
    
    /* Horizontal layout */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const FooterTitle = styled.h3`
    font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    letter-spacing: 0.5px;
    color: var(--accent-light);
    text-transform: uppercase;
`;

const FooterLink = styled.a`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    font-weight: 300;
    transition: color 0.3s;
    letter-spacing: 0.3px;
    text-decoration: none;
    padding: 0.25rem 0;

    &:hover {
        color: var(--accent-light);
        padding-left: 5px;
    }
`;

const FooterLinkRouter = styled(Link)`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    font-weight: 300;
    transition: all 0.3s;
    letter-spacing: 0.3px;
    text-decoration: none;
    padding: 0.25rem 0;

    &:hover {
        color: var(--accent-light);
        padding-left: 5px;
    }
`;

const FooterText = styled.p`
    font-weight: 300;
    line-height: 1.6;
    letter-spacing: 0.3px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0.25rem 0;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 0.75rem;
    margin: 0.5rem 0;
`;

const SocialIcon = styled.a`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    transition: color 0.3s, transform 0.3s;

    &:hover {
        color: var(--accent-light);
        transform: translateY(-3px);
    }
`;

const NewsletterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
        padding: 0.6rem;
        font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
        font-weight: 300;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        font-size: 0.85rem;
        letter-spacing: 0.3px;
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.9);
        transition: all 0.3s;

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        &:focus {
            outline: none;
            border-color: var(--accent-light);
            background: rgba(255, 255, 255, 0.08);
        }
    }

    button {
        background: var(--accent-light);
        color: white;
        border: none;
        padding: 0.6rem;
        cursor: pointer;
        font-family: "Futura", "Trebuchet MS", Arial, sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        border-radius: 4px;
        transition: all 0.3s;
        letter-spacing: 0.5px;
        text-transform: uppercase;

        &:hover {
            background: var(--accent-medium);
            transform: translateY(-2px);
        }

        &:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
        }
    }
`;

const SuccessMessage = styled.p`
    color: #4ade80;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 400;
`;

const ErrorMessage = styled.p`
    color: #f87171;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 400;
`;

const MapContainer = styled.div`
    margin-top: 0.5rem;
    
    iframe {
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        height: 120px;
        opacity: 0.8;
        transition: opacity 0.3s ease;

        &:hover {
            opacity: 1;
        }
    }
`;

function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        try {
            // Get API base URL
            const API_BASE_URL =
                window.location.hostname === "localhost"
                    ? "http://localhost:4000/api"
                    : "https://aspire-arch-server.onrender.com/api";

            const response = await fetch(
                `${API_BASE_URL}/newsletter/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage({
                    type: "success",
                    text: "Thank you for subscribing!",
                });
                setEmail("");
                e.target.reset();
            } else {
                setMessage({
                    type: "error",
                    text:
                        data.message ||
                        "Subscription failed. Please try again.",
                });
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setMessage({
                type: "error",
                text: "An error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
            // Clear message after 5 seconds
            setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        }
    };

    return (
        <FooterWrapper>
            <FooterContainer>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FooterSection>
                        <FooterTitle>ASPIRE Design Lab</FooterTitle>
                        <FooterText>
                            Architecture for Society and Planet, Inspiring
                            Resilient Environments
                        </FooterText>
                        <FooterText>
                            &copy; {new Date().getFullYear()}
                        </FooterText>
                    </FooterSection>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <FooterSection>
                        <FooterTitle>Navigation</FooterTitle>
                        <FooterLinkRouter to="/about">About</FooterLinkRouter>
                        <FooterLinkRouter to="/design">Design</FooterLinkRouter>
                        <FooterLinkRouter to="/research-insights">
                            Research & Insights
                        </FooterLinkRouter>
                        <FooterLinkRouter to="/the-colleague-uni">
                            TheArchi.Co. Lab
                        </FooterLinkRouter>
                        <FooterLinkRouter to="/education">Education</FooterLinkRouter>
                        <FooterLinkRouter to="/media-gallery">
                            Media Gallery
                        </FooterLinkRouter>
                        <FooterLinkRouter to="/get-involved">Get Involved</FooterLinkRouter>
                        <FooterLinkRouter to="/news-events">News & Events</FooterLinkRouter>
                        <FooterLinkRouter to="/contact">Contact</FooterLinkRouter>
                    </FooterSection>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <FooterSection>
                        <FooterTitle>Connect</FooterTitle>
                        <SocialIcons>
                            <SocialIcon
                                href="https://x.com/ArseneMugeni?t=iFqTTHWtGsULUd9pCGNNgw&s=09"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaXTwitter />
                            </SocialIcon>
                            <SocialIcon
                                href="https://www.linkedin.com/company/aspire-design-lab/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </SocialIcon>
                            <SocialIcon
                                href="https://www.instagram.com/aspiredesignlab?igsh=Y3lnZTgzNDNkcGIw"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </SocialIcon>
                            <SocialIcon
                                href="mailto:aspiredesignlab@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaEnvelope />
                            </SocialIcon>
                            <SocialIcon
                                href="https://wa.me/250789924343"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp />
                            </SocialIcon>
                        </SocialIcons>
                        <FooterTitle>Visit Us</FooterTitle>
                        <MapContainer>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5116637795253!2d30.060228400000003!3d-1.944072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca68f5f8b1f89%3A0x7a0d0f0e0f0e0f0e!2sKN%203%20Ave%2C%20Kigali!5e0!3m2!1sen!2srw!4v1730736000000!5m2!1sen!2srw"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="ASPIRE Design Lab - Kigali, Nyarugenge, Rwanda"
                            ></iframe>
                        </MapContainer>
                    </FooterSection>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <FooterSection>
                        <FooterTitle>Newsletter</FooterTitle>
                        <NewsletterForm onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isSubmitting}
                            />
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </button>
                            {message.text &&
                                (message.type === "success" ? (
                                    <SuccessMessage>
                                        {message.text}
                                    </SuccessMessage>
                                ) : (
                                    <ErrorMessage>{message.text}</ErrorMessage>
                                ))}
                        </NewsletterForm>
                    </FooterSection>
                </motion.div>
            </FooterContainer>
        </FooterWrapper>
    );
}

export default Footer;
