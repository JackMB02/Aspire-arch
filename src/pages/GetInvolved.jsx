import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

function MembershipPartnerships() {
  const membershipOptions = [
    {
      title: "Individual Membership",
      description: "Perfect for architects, designers, and students looking to expand their knowledge and network.",
      benefits: ["Access to all workshops", "Learning resources library", "Networking events", "Career development"],
      price: "$199/year",
      icon: "👤"
    },
    {
      title: "Firm Membership",
      description: "Designed for architecture firms seeking team development and industry connections.",
      benefits: ["Team training packages", "Company profile listing", "Recruitment opportunities", "Custom workshops"],
      price: "$999/year",
      icon: "🏢"
    },
    {
      title: "Student Membership",
      description: "Affordable access for students pursuing careers in architecture and design.",
      benefits: ["Discounted workshops", "Mentorship programs", "Portfolio reviews", "Career guidance"],
      price: "$49/year",
      icon: "🎓"
    }
  ];

  return (
    <AnimatedSection>
      <div className="involved-page-wrapper">
        <div className="involved-content">
          <h1 className="involved-title">Membership & Partnerships</h1>
          <p className="involved-description">
            Join our community of architects, designers, and sustainability advocates. Choose the membership 
            that fits your needs or explore partnership opportunities to collaborate on meaningful projects.
          </p>
          
          <div className="membership-grid">
            {membershipOptions.map((option, index) => (
              <div key={index} className="membership-card">
                <div className="membership-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <p className="membership-price">{option.price}</p>
                <p>{option.description}</p>
                <ul className="benefits-list">
                  {option.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="partnerships-section">
            <h2>Partnership Opportunities</h2>
            <p>
              We collaborate with organizations, educational institutions, and industry partners to advance 
              sustainable architecture. Partner with us to co-create programs, sponsor events, or develop 
              research initiatives.
            </p>
            
            <div className="partnership-types">
              <div className="partnership-type">
                <h3>Educational Partnerships</h3>
                <p>Collaborate on curriculum development, student exchanges, and joint research projects.</p>
              </div>
              
              <div className="partnership-type">
                <h3>Corporate Sponsorship</h3>
                <p>Support our initiatives while gaining visibility among architecture professionals.</p>
              </div>
              
              <div className="partnership-type">
                <h3>Research Collaboration</h3>
                <p>Partner on innovative research projects addressing sustainability challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function DonateSupport() {
  const donationOptions = [50, 100, 250, 500, 1000];
  const [selectedAmount, setSelectedAmount] = useState(100);

  return (
    <AnimatedSection>
      <div className="involved-page-wrapper">
        <div className="involved-content">
          <h1 className="involved-title">Donate & Support</h1>
          <p className="involved-description">
            Your support enables us to provide scholarships, develop free educational resources, and advance 
            sustainable architecture research. Every contribution makes a difference.
          </p>
          
          <div className="impact-stats">
            <div className="impact-stat">
              <span className="stat-number">$1.2M</span>
              <span className="stat-label">Annual Scholarships</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">85%</span>
              <span className="stat-label">Program Funding</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">2,300+</span>
              <span className="stat-label">Students Supported</span>
            </div>
          </div>
          
          <div className="donation-section">
            <h2>Make a Donation</h2>
            
            <div className="donation-options">
              {donationOptions.map((amount) => (
                <button
                  key={amount}
                  className={`donation-option ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
              
              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="donation-form">
              <div className="form-row">
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
              </div>
              
              <div className="payment-details">
                <h3>Payment Information</h3>
                <input type="text" placeholder="Card Number" />
                <div className="card-details">
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVV" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="other-ways">
            <h2>Other Ways to Support</h2>
            <div className="support-options">
              <div className="support-option">
                <h3>Corporate Matching</h3>
                <p>Many employers match charitable contributions. Check if your company offers matching gifts.</p>
              </div>
              
              <div className="support-option">
                <h3>In-Kind Donations</h3>
                <p>Donate materials, software licenses, or professional services to support our programs.</p>
              </div>
              
              <div className="support-option">
                <h3>Legacy Giving</h3>
                <p>Include us in your estate planning to create a lasting impact on architectural education.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function CommunityFeedback() {
  const [activeTab, setActiveTab] = useState('feedback');

  return (
    <AnimatedSection>
      <div className="involved-page-wrapper">
        <div className="involved-content">
          <h1 className="involved-title">Community Feedback & Ideas</h1>
          <p className="involved-description">
            Your voice matters. Help us improve our programs, suggest new initiatives, and share your ideas for 
            how we can better serve the architectural community.
          </p>
          
          <div className="feedback-tabs">
            <button 
              className={`feedback-tab ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              Share Feedback
            </button>
            <button 
              className={`feedback-tab ${activeTab === 'ideas' ? 'active' : ''}`}
              onClick={() => setActiveTab('ideas')}
            >
              Submit Ideas
            </button>
            <button 
              className={`feedback-tab ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              Community Stories
            </button>
          </div>
          
          {activeTab === 'feedback' && (
            <div className="feedback-form">
              <h2>Share Your Feedback</h2>
              <p>We're constantly working to improve our programs and services. Your honest feedback helps us understand what's working well and where we can do better.</p>
              
              <form>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                </div>
                
                <select>
                  <option value="">Select Program Category</option>
                  <option value="workshops">Workshops & Training</option>
                  <option value="resources">Learning Resources</option>
                  <option value="events">Events & Exhibitions</option>
                  <option value="membership">Membership</option>
                  <option value="website">Website Experience</option>
                </select>
                
                <textarea placeholder="Please share your feedback, suggestions, or concerns..."></textarea>
              </form>
            </div>
          )}
          
          {activeTab === 'ideas' && (
            <div className="ideas-form">
              <h2>Submit Your Ideas</h2>
              <p>Have an idea for a workshop, event, or initiative? We're always looking for fresh perspectives and innovative concepts from our community.</p>
              
              <form>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                </div>
                
                <input type="text" placeholder="Idea Title" />
                
                <select>
                  <option value="">Select Idea Category</option>
                  <option value="workshop">Workshop Idea</option>
                  <option value="event">Event Idea</option>
                  <option value="resource">Learning Resource</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
                
                <textarea placeholder="Describe your idea in detail..."></textarea>
              </form>
            </div>
          )}
          
          {activeTab === 'stories' && (
            <div className="community-stories">
              <h2>Community Stories</h2>
              <p>Read how our community members have benefited from our programs and initiatives.</p>
              
              <div className="stories-grid">
                <div className="story-card">
                  <div className="story-icon">🌟</div>
                  <h3>Transformed My Practice</h3>
                  <p>"The sustainable design workshop completely changed how I approach projects. I've implemented eco-friendly practices that reduced energy costs by 40% for my clients."</p>
                  <p className="story-author">— Maria L., Architect</p>
                </div>
                
                <div className="story-card">
                  <div className="story-icon">🌟</div>
                  <h3>Career Advancement</h3>
                  <p>"Through the mentorship program, I connected with an experienced architect who guided me through my licensure process. I'm now a project lead at my firm."</p>
                  <p className="story-author">— James T., Designer</p>
                </div>
                
                <div className="story-card">
                  <div className="story-icon">🌟</div>
                  <h3>Invaluable Network</h3>
                  <p>"The connections I've made through membership have led to collaborative projects and friendships with architects from around the world."</p>
                  <p className="story-author">— Sofia K., Urban Planner</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

function GetInvolvedOverview() {
  return (
    <AnimatedSection>
      <div className="involved-page-wrapper">
        <div className="involved-content overview-content">
          <h1 className="involved-main-title">Get Involved</h1>
          <p className="involved-main-description">
            Join our movement to advance sustainable architecture and design education. Whether through membership, 
            donations, or sharing your ideas, there are many ways to contribute to our community and mission.
          </p>

          <div className="involved-navigation">
            <Link to="membership-partnerships" className="nav-link">Membership</Link>
            <Link to="donate-support" className="nav-link">Donate</Link>
            <Link to="community-feedback" className="nav-link">Share Feedback</Link>
          </div>
          
          <div className="impact-stats">
            <div className="impact-stat">
              <span className="stat-number">2.5K+</span>
              <span className="stat-label">Community Members</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">$1.2M</span>
              <span className="stat-label">Annual Scholarships</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">120</span>
              <span className="stat-label">Partner Organizations</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">450</span>
              <span className="stat-label">Volunteers</span>
            </div>
          </div>
          
          <div className="why-involved">
            <h2>Why Get Involved?</h2>
            <div className="reasons-grid">
              <div className="reason">
                <h3>Make an Impact</h3>
                <p>Your support directly contributes to sustainable architecture education and innovation.</p>
              </div>
              
              <div className="reason">
                <h3>Expand Your Network</h3>
                <p>Connect with professionals and thought leaders in the architecture community.</p>
              </div>
              
              <div className="reason">
                <h3>Access Resources</h3>
                <p>Gain exclusive access to learning materials, workshops, and research findings.</p>
              </div>
              
              <div className="reason">
                <h3>Shape the Future</h3>
                <p>Your ideas help guide our programs and ensure we meet community needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function GetInvolved() {
  return (
    <div className="involved-container">
      <Routes>
        <Route path="membership-partnerships" element={<MembershipPartnerships />} />
        <Route path="donate-support" element={<DonateSupport />} />
        <Route path="community-feedback" element={<CommunityFeedback />} />
        <Route path="*" element={<GetInvolvedOverview />} />
      </Routes>

      <style>
        {`
        .involved-container {
          min-height: 100vh;
        }

        .involved-page-wrapper {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .involved-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .overview-content {
          text-align: center;
        }

        .involved-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .involved-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .involved-description {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .involved-main-description {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .membership-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .membership-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .membership-card:hover {
          transform: translateY(-5px);
        }

        .membership-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .membership-card h3 {
          font-size: 1.2rem;
          color: #1f2937;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .membership-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .membership-card p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .benefits-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f5f9;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .benefits-list li:last-child {
          border-bottom: none;
        }

        .benefits-list li::before {
          content: '✓';
          color: #1f2937;
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .partnerships-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-top: 2.5rem;
          border: 1px solid #f3f4f6;
        }

        .partnerships-section h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .partnerships-section p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .partnership-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .partnership-type {
          background: #f8f9fa;
          padding: 1.2rem;
          border-radius: 8px;
        }

        .partnership-type h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .partnership-type p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin: 0;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .impact-stat {
          text-align: center;
          padding: 1.5rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        .donation-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin: 2.5rem 0;
          border: 1px solid #f3f4f6;
        }

        .donation-section h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .donation-options {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .donation-option {
          padding: 0.8rem 1.2rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .donation-option.selected {
          border-color: #1f2937;
          background: #1f2937;
          color: white;
        }

        .donation-option:hover {
          border-color: #1f2937;
        }

        .custom-amount input {
          padding: 0.8rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          width: 120px;
          text-align: center;
          font-size: 0.9rem;
        }

        .donation-form {
          margin-top: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .donation-form input,
        .donation-form select,
        .donation-form textarea {
          padding: 0.8rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .payment-details {
          margin-top: 1.5rem;
        }

        .payment-details h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        .other-ways {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .other-ways h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .support-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .support-option {
          background: #f8f9fa;
          padding: 1.2rem;
          border-radius: 8px;
        }

        .support-option h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .support-option p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin: 0;
        }

        .feedback-tabs {
          display: flex;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .feedback-tab {
          padding: 0.8rem 1.2rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .feedback-tab.active {
          background: #1f2937;
          color: white;
          border-color: #1f2937;
        }

        .feedback-tab:hover {
          border-color: #1f2937;
          color: #1f2937;
        }

        .feedback-form,
        .ideas-form {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-top: 1.5rem;
          border: 1px solid #f3f4f6;
        }

        .feedback-form h2,
        .ideas-form h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .feedback-form p,
        .ideas-form p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .community-stories {
          margin-top: 2rem;
        }

        .community-stories h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .community-stories p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .story-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
          border: 1px solid #f3f4f6;
        }

        .story-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .story-card h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .story-card p {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .story-author {
          font-weight: 600;
          color: #6b7280;
          font-style: italic;
          margin: 0;
          font-size: 0.9rem;
        }

        .involved-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .nav-link {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          font-size: 0.9rem;
        }

        .nav-link:hover {
          background: #1f2937;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .why-involved {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-top: 2.5rem;
          border: 1px solid #f3f4f6;
        }

        .why-involved h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .reason {
          text-align: center;
          padding: 1.2rem;
        }

        .reason h3 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .reason p {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .involved-page-wrapper {
            padding: 7rem 1rem 1rem;
          }
          
          .involved-main-title {
            font-size: 2rem;
          }
          
          .involved-title {
            font-size: 1.8rem;
          }
          
          .membership-grid,
          .stories-grid,
          .reasons-grid {
            grid-template-columns: 1fr;
          }
          
          .impact-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .involved-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .donation-options {
            flex-direction: column;
            align-items: center;
          }
          
          .feedback-tabs {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .impact-stats {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>
    </div>
  );
}

export default GetInvolved;