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
    }
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
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log("Newsletter email:", e.target.email.value); // Placeholder
        e.target.reset();
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
                            Architecture for Society and Planet, Inspiring Resilient
                            Environments
                        </FooterText>
                        <FooterText>&copy; {new Date().getFullYear()}</FooterText>
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
                        <FooterLink to="/media-gallery">Media Gallery</FooterLink>
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
                            <SocialIcon href="https://twitter.com" target="_blank">
                                <FaXTwitter />
                            </SocialIcon>
                            <SocialIcon href="https://linkedin.com" target="_blank">
                                <FaLinkedin />
                            </SocialIcon>
                            <SocialIcon
                                href="https://instagram.com"
                                target="_blank"
                            >
                                <FaInstagram />
                            </SocialIcon>
                            <SocialIcon
                                href="mailto:info@aspirearchitecture.com"
                                target="_blank"
                            >
                                <FaEnvelope />
                            </SocialIcon>
                            <SocialIcon
                                href="https://wa.me/1234567890"
                                target="_blank"
                            >
                                <FaWhatsapp />
                            </SocialIcon>
                        </SocialIcons>
                        <FooterTitle>Visit Us</FooterTitle>
                        <MapContainer>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.475737568968!2d30.058889774997!3d-1.9535379980286423!2m3!1f0!2f0!3f0!3m2!1i1020!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8f3a3%3A0xf4e7c2f8e5f4b4e!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="ASPIRE Architecture Firm Location in Kigali"
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
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </NewsletterForm>
                    </FooterSection>
                </motion.div>
            </FooterContainer>
        </FooterWrapper>
    );
}

export default Footer;