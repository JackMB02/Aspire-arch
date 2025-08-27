import AnimatedSection from '../components/AnimatedSection';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 1.5rem 4rem;
  background: #f9f9f9; /* subtle light background */
  min-height: 80vh;
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 550px;
  width: 100%;
  background: white;
  padding: 3rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Lora', serif;

  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  input,
  textarea {
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    font-size: 1rem;
    font-family: inherit;
    transition: border 0.3s, box-shadow 0.3s;
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      outline: none;
    }
  }

  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem;
    font-size: 1.1rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s, transform 0.2s;
    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
  }
`;

function Contact() {
  return (
    <ContactWrapper>
      <AnimatedSection>
        <FormCard>
          <h1>Contact Us</h1>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" rows="6" required></textarea>
          <button type="submit">Send Message</button>
        </FormCard>
      </AnimatedSection>
    </ContactWrapper>
  );
}

export default Contact;
