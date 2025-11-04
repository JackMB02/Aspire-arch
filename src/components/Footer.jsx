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
    background: var(--primary-dark);
    color: white;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 200; /* Ultra Light weight */
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FooterTitle = styled.h3`
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.1rem;
    font-weight: 300; /* Slightly bolder for titles */
    margin-bottom: 0.5rem;
    letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
    font-size: 0.9rem;
    font-weight: 200;
    transition: color 0.3s;
    letter-spacing: 0.3px;

    &:hover {
        color: var(--accent-light);
    }
`;

const FooterText = styled.p`
    font-weight: 200;
    line-height: 1.5;
    letter-spacing: 0.3px;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
    color: white;
    font-size: 1.3rem;
    transition: color 0.3s, transform 0.3s;

    &:hover {
        color: var(--accent-light);
        transform: scale(1.1);
    }
`;

const NewsletterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
        padding: 0.5rem;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 200;
        border: none;
        border-radius: 4px;
        font-size: 0.9rem;
        letter-spacing: 0.3px;
        background: rgba(255, 255, 255, 0.9);
    }

    button {
        background: var(--accent-light);
        color: white;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 0.9rem;
        font-weight: 300;
        border-radius: 4px;
        transition: background 0.3s;
        letter-spacing: 0.5px;

        &:hover {
            background: var(--accent-medium);
        }

        &:disabled {
            background: #999;
            cursor: not-allowed;
        }
    }
`;

const SuccessMessage = styled.p`
    color: #4ade80;
    font-size: 0.85rem;
    margin: 0;
    font-weight: 300;
`;

const ErrorMessage = styled.p`
    color: #f87171;
    font-size: 0.85rem;
    margin: 0;
    font-weight: 300;
`;

const MapContainer = styled.div`
    iframe {
        border-radius: 8px;
        border: none;
        width: 100%;
        height: 150px;
        opacity: 0.9;
        transition: opacity 0.3s ease;

        @media (min-width: 768px) {
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
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
                        <FooterLink to="/about">About</FooterLink>
                        <FooterLink to="/design">Design</FooterLink>
                        <FooterLink to="/research-insights">
                            Research & Insights
                        </FooterLink>
                        <FooterLink to="/the-colleague-uni">
                            TheArchi.Co. Lab
                        </FooterLink>
                        <FooterLink to="/education">Education</FooterLink>
                        <FooterLink to="/media-gallery">
                            Media Gallery
                        </FooterLink>
                        <FooterLink to="/get-involved">Get Involved</FooterLink>
                        <FooterLink to="/news-events">News & Events</FooterLink>
                        <FooterLink to="/contact">Contact</FooterLink>
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5116543926594!2d30.0602284!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca425b3b91e85%3A0x31e7a9f1a1a24b46!2sNyarugenge%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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
