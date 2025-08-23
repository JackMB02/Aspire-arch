import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
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
    border: none;
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
            <SocialIcon href="https://twitter.com" target="_blank"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank"><FaLinkedin /></SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank"><FaInstagram /></SocialIcon>
          </SocialIcons>
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