import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--secondary-dark); /* Changed to lighter, modern color */
  color: white;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  font-family: 'Lora', serif;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem; /* Slightly smaller for modern look */
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  font-size: 0.9rem; /* Smaller font for elegance */
  transition: color 0.3s;
  &:hover {
    color: var(--accent-light);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.3rem; /* Slightly smaller for refinement */
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
    font-family: 'Lora', serif;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem; /* Smaller font */
  }
  button {
    background: var(--accent-light);
    color: white;
    border: nothing;
    padding: 0.5rem;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem; /* Smaller font */
    border-radius: 4px;
    transition: background 0.3s;
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
    console.log('Newsletter email:', e.target.email.value); // Placeholder
    e.target.reset();
  };

  return (
    <FooterContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FooterSection>
          <FooterTitle>ASPIRE Architecture Firm</FooterTitle>
          <p>Architecture for Society and Planet, Inspiring Resilient Environments</p>
          <p>&copy; {new Date().getFullYear()}</p>
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
          <FooterLink to="/research-insights">Research & Insights</FooterLink>
          <FooterLink to="/the-colleague-uni">TheColleagueUni</FooterLink>
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
            <SocialIcon href="https://twitter.com" target="_blank"><FaXTwitter /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank"><FaInstagram /></SocialIcon>
            <SocialIcon href="mailto:info@aspirearchitecture.com" target="_blank"><FaEnvelope /></SocialIcon>
            <SocialIcon href="https://wa.me/1234567890" target="_blank"><FaWhatsapp /></SocialIcon>
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
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </motion.div>
    </FooterContainer>
  );
}

export default Footer;