import AnimatedSection from '../components/AnimatedSection';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  input, textarea {
    padding: 0.5rem;
    font-family: 'Lora', serif;
  }
  button {
    background: var(--accent-light);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background: var(--accent-medium);
    }
  }
`;

function Contact() {
  return (
    <div style={{ padding: '6rem 2rem 2rem' }}>
      <AnimatedSection>
        <h1>Contact Us</h1>
        <Form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit">Send</button>
        </Form>
      </AnimatedSection>
    </div>
  );
}

export default Contact;