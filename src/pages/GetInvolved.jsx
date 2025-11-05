import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import { API_ENDPOINTS, apiRequest } from "../config/api";
import { FaUser, FaBuilding, FaGraduationCap, FaStar } from "react-icons/fa";

// Dynamic backend base URL for images
const getBackendBaseUrl = () => {
    return window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://aspire-arch-server.onrender.com";
};

const BACKEND_BASE_URL = getBackendBaseUrl();

function MembershipPartnerships() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        membership_type: "",
        organization: "",
        position: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const membershipOptions = [
        {
            title: "Individual Membership",
            description:
                "Perfect for architects, designers, and students looking to expand their knowledge and network.",
            benefits: [
                "Access to all workshops",
                "Learning resources library",
                "Networking events",
                "Career development",
            ],
            price: "Free",
            icon: FaUser,
            value: "individual",
        },
        {
            title: "Firm Membership",
            description:
                "Designed for architecture firms seeking team development and industry connections.",
            benefits: [
                "Team training packages",
                "Company profile listing",
                "Recruitment opportunities",
                "Custom workshops",
            ],
            price: "Free",
            icon: FaBuilding,
            value: "firm",
        },
        {
            title: "Student Membership",
            description:
                "Affordable access for students pursuing careers in architecture and design.",
            benefits: [
                "Discounted workshops",
                "Mentorship programs",
                "Portfolio reviews",
                "Career guidance",
            ],
            price: "Free",
            icon: FaGraduationCap,
            value: "student",
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMembershipSelect = (membershipType) => {
        setFormData((prev) => ({
            ...prev,
            membership_type: membershipType,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await apiRequest(API_ENDPOINTS.GET_INVOLVED.MEMBERSHIP, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            setMessage("✅ Membership application submitted successfully!");
            setFormData({
                full_name: "",
                email: "",
                membership_type: "",
                organization: "",
                position: "",
                message: "",
            });
        } catch (error) {
            console.error("Failed to submit membership application:", error);
            setMessage("❌ Failed to submit application: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="involved-page-wrapper">
                <div className="involved-content">
                    <h1 className="involved-title">
                        Membership & Partnerships
                    </h1>
                    <p className="involved-description">
                        Join our community of architects, designers, and
                        sustainability advocates. Choose the membership that
                        fits your needs or explore partnership opportunities to
                        collaborate on meaningful projects.
                    </p>

                    <div className="membership-grid">
                        {membershipOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`membership-card ${
                                    formData.membership_type === option.value
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleMembershipSelect(option.value)
                                }
                            >
                                <div className="membership-icon">
                                    <option.icon />
                                </div>
                                <h3>{option.title}</h3>
                                <p className="membership-price">
                                    {option.price}
                                </p>
                                <p>{option.description}</p>
                                <ul className="benefits-list">
                                    {option.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Membership Application Form */}
                    <div className="membership-form-section">
                        <h2>Apply for Membership</h2>

                        {message && (
                            <div
                                className={`form-message ${
                                    message.includes("✅") ? "success" : "error"
                                }`}
                            >
                                {message}
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit}
                            className="membership-form"
                        >
                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="full_name">
                                        Full Name *
                                    </label>
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">
                                        Email Address *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="organization">
                                        Organization
                                    </label>
                                    <input
                                        id="organization"
                                        name="organization"
                                        type="text"
                                        placeholder="Your company or institution"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="position">Position</label>
                                    <input
                                        id="position"
                                        name="position"
                                        type="text"
                                        placeholder="Your role or position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="message">
                                    Additional Information
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your interests or why you want to join..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-membership-btn"
                                    disabled={
                                        loading || !formData.membership_type
                                    }
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="partnerships-section">
                        <h2>Partnership Opportunities</h2>
                        <p>
                            We collaborate with organizations, educational
                            institutions, and industry partners to advance
                            sustainable architecture. Partner with us to
                            co-create programs, sponsor events, or develop
                            research initiatives.
                        </p>

                        <div className="partnership-types">
                            <div className="partnership-type">
                                <h3>Educational Partnerships</h3>
                                <p>
                                    Collaborate on curriculum development,
                                    student exchanges, and joint research
                                    projects.
                                </p>
                            </div>

                            <div className="partnership-type">
                                <h3>Corporate Sponsorship</h3>
                                <p>
                                    Support our initiatives while gaining
                                    visibility among architecture professionals.
                                </p>
                            </div>

                            <div className="partnership-type">
                                <h3>Research Collaboration</h3>
                                <p>
                                    Partner on innovative research projects
                                    addressing sustainability challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function DonateSupport() {
    const donationOptions = [1, 2, 3, 4, 5];
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        amount: 1,
        currency: "USD",
        payment_method: "mtn_mobile",
        mtn_mobile_number: "",
        payment_proof: null,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            payment_proof: e.target.files[0],
        }));
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setFormData((prev) => ({
            ...prev,
            amount: amount,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "payment_proof" && formData[key]) {
                    submitData.append(key, formData[key]);
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            const response = await fetch(
                `${BACKEND_BASE_URL}/api/get-involved/donations`,
                {
                    method: "POST",
                    body: submitData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit donation");
            }

            setMessage(
                "✅ Donation submitted successfully! Thank you for your support."
            );
            setFormData({
                full_name: "",
                email: "",
                amount: 1,
                currency: "USD",
                payment_method: "mtn_mobile",
                mtn_mobile_number: "",
                payment_proof: null,
            });
            setSelectedAmount(100);
        } catch (error) {
            console.error("Failed to submit donation:", error);
            setMessage("❌ Failed to submit donation: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="involved-page-wrapper">
                <div className="involved-content">
                    <h1 className="involved-title">Donate & Support</h1>
                    <p className="involved-description">
                        Your support enables us to provide scholarships, develop
                        free educational resources, and advance sustainable
                        architecture research. Every contribution makes a
                        difference.
                    </p>

                    <div className="impact-stats">
                        <div className="impact-stat">
                            <span className="stat-number">$1.2M</span>
                            <span className="stat-label">
                                Annual Scholarships
                            </span>
                        </div>
                        <div className="impact-stat">
                            <span className="stat-number">85%</span>
                            <span className="stat-label">Program Funding</span>
                        </div>
                        <div className="impact-stat">
                            <span className="stat-number">2,300+</span>
                            <span className="stat-label">
                                Students Supported
                            </span>
                        </div>
                    </div>

                    <div className="donation-section">
                        <h2>Make a Donation</h2>

                        {message && (
                            <div
                                className={`form-message ${
                                    message.includes("✅") ? "success" : "error"
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="donation-options">
                                {donationOptions.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        className={`donation-option ${
                                            selectedAmount === amount
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleAmountSelect(amount)
                                        }
                                    >
                                        ${amount}
                                    </button>
                                ))}

                                <div className="custom-amount">
                                    <input
                                        type="number"
                                        placeholder="Custom amount"
                                        value={selectedAmount}
                                        onChange={(e) =>
                                            handleAmountSelect(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="donation-form">
                                <div className="form-row">
                                    <div className="input-group">
                                        <label htmlFor="donation-name">
                                            Full Name *
                                        </label>
                                        <input
                                            id="donation-name"
                                            name="full_name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.full_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="donation-email">
                                            Email Address *
                                        </label>
                                        <input
                                            id="donation-email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <h3>Payment Information</h3>

                                    <div className="payment-method">
                                        <h4>MTN Mobile Money (MoMo Pay)</h4>
                                        <p>
                                            Send your donation to:{" "}
                                            <strong>*182*8*1*150000#</strong>
                                        </p>
                                        <p>Use this code for donations</p>
                                        <div className="input-group">
                                            <label htmlFor="mtn-number">
                                                MTN Mobile Number *
                                            </label>
                                            <input
                                                id="mtn-number"
                                                name="mtn_mobile_number"
                                                type="text"
                                                placeholder="Your MTN number (e.g., 078XXXXXXX)"
                                                value={
                                                    formData.mtn_mobile_number
                                                }
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="payment-proof">
                                        <h4>Payment Proof (Optional)</h4>
                                        <p>
                                            Upload a screenshot or proof of your
                                            payment to help us process it faster
                                        </p>
                                        <div className="file-upload">
                                            <input
                                                type="file"
                                                id="payment-proof"
                                                accept="image/*,.pdf"
                                                onChange={handleFileChange}
                                            />
                                            <label
                                                htmlFor="payment-proof"
                                                className="upload-btn"
                                            >
                                                Choose File
                                            </label>
                                            <span className="upload-note">
                                                PNG, JPG, or PDF files accepted
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="submit-donation-btn"
                                    type="submit"
                                    disabled={
                                        loading || !formData.payment_method
                                    }
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Donation"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="other-ways">
                        <h2>Other Ways to Support</h2>
                        <div className="support-options">
                            <div className="support-option">
                                <h3>Corporate Matching</h3>
                                <p>
                                    Many employers match charitable
                                    contributions. Check if your company offers
                                    matching gifts.
                                </p>
                            </div>

                            <div className="support-option">
                                <h3>In-Kind Donations</h3>
                                <p>
                                    Donate materials, software licenses, or
                                    professional services to support our
                                    programs.
                                </p>
                            </div>

                            <div className="support-option">
                                <h3>Legacy Giving</h3>
                                <p>
                                    Include us in your estate planning to create
                                    a lasting impact on architectural education.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

function CommunityFeedback() {
    const [activeTab, setActiveTab] = useState("feedback");
    const [feedbackForm, setFeedbackForm] = useState({
        full_name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
        rating: 0,
    });
    const [ideasForm, setIdeasForm] = useState({
        full_name: "",
        email: "",
        idea_title: "",
        category: "",
        description: "",
        target_audience: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setFeedbackForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIdeasChange = (e) => {
        const { name, value } = e.target;
        setIdeasForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await apiRequest(API_ENDPOINTS.GET_INVOLVED.FEEDBACK, {
                method: "POST",
                body: JSON.stringify(feedbackForm),
            });

            setMessage(
                "✅ Feedback submitted successfully! Thank you for your input."
            );
            setFeedbackForm({
                full_name: "",
                email: "",
                category: "",
                subject: "",
                message: "",
                rating: 0,
            });
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            setMessage("❌ Failed to submit feedback: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleIdeasSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await apiRequest(API_ENDPOINTS.GET_INVOLVED.IDEAS, {
                method: "POST",
                body: JSON.stringify(ideasForm),
            });

            setMessage(
                "✅ Idea submitted successfully! We appreciate your creativity."
            );
            setIdeasForm({
                full_name: "",
                email: "",
                idea_title: "",
                category: "",
                description: "",
                target_audience: "",
            });
        } catch (error) {
            console.error("Failed to submit idea:", error);
            setMessage("❌ Failed to submit idea: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="involved-page-wrapper">
                <div className="involved-content">
                    <div className="feedback-header">
                        <h1 className="involved-title">
                            Community Feedback & Ideas
                        </h1>
                        <p className="involved-description">
                            Your voice matters. Help us improve our programs,
                            suggest new initiatives, and share your ideas for
                            how we can better serve the architectural community.
                        </p>
                    </div>

                    {message && (
                        <div
                            className={`form-message ${
                                message.includes("✅") ? "success" : "error"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="feedback-container">
                        <div className="feedback-tabs">
                            <button
                                className={`feedback-tab ${
                                    activeTab === "feedback" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("feedback")}
                            >
                                Share Feedback
                            </button>
                            <button
                                className={`feedback-tab ${
                                    activeTab === "ideas" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("ideas")}
                            >
                                Submit Ideas
                            </button>
                            <button
                                className={`feedback-tab ${
                                    activeTab === "stories" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("stories")}
                            >
                                Community Stories
                            </button>
                        </div>

                        {activeTab === "feedback" && (
                            <div className="feedback-form">
                                <h2>Share Your Feedback</h2>
                                <p>
                                    We're constantly working to improve our
                                    programs and services. Your honest feedback
                                    helps us understand what's working well and
                                    where we can do better.
                                </p>

                                <form
                                    className="feedback-form-inner"
                                    onSubmit={handleFeedbackSubmit}
                                >
                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Contact Information
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="feedback-name">
                                                Full Name *
                                            </label>
                                            <input
                                                id="feedback-name"
                                                name="full_name"
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={feedbackForm.full_name}
                                                onChange={handleFeedbackChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="feedback-email">
                                                Email Address *
                                            </label>
                                            <input
                                                id="feedback-email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={feedbackForm.email}
                                                onChange={handleFeedbackChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Feedback Category
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="feedback-category">
                                                Select Program Category *
                                            </label>
                                            <select
                                                id="feedback-category"
                                                name="category"
                                                value={feedbackForm.category}
                                                onChange={handleFeedbackChange}
                                                required
                                            >
                                                <option value="">
                                                    Choose a category...
                                                </option>
                                                <option value="workshops">
                                                    Workshops & Training
                                                </option>
                                                <option value="resources">
                                                    Learning Resources
                                                </option>
                                                <option value="events">
                                                    Events & Exhibitions
                                                </option>
                                                <option value="membership">
                                                    Membership
                                                </option>
                                                <option value="website">
                                                    Website Experience
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Your Feedback
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="feedback-message">
                                                Share your thoughts,
                                                suggestions, or concerns *
                                            </label>
                                            <textarea
                                                id="feedback-message"
                                                name="message"
                                                placeholder="Please provide detailed feedback about your experience..."
                                                value={feedbackForm.message}
                                                onChange={handleFeedbackChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            className="submit-feedback-btn"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Submitting..."
                                                : "Submit Feedback"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "ideas" && (
                            <div className="ideas-form">
                                <h2>Submit Your Ideas</h2>
                                <p>
                                    Have an idea for a workshop, event, or
                                    initiative? We're always looking for fresh
                                    perspectives and innovative concepts from
                                    our community.
                                </p>

                                <form
                                    className="ideas-form-inner"
                                    onSubmit={handleIdeasSubmit}
                                >
                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Contact Information
                                        </h3>
                                        <div className="form-row">
                                            <div className="input-group">
                                                <label htmlFor="ideas-name">
                                                    Full Name *
                                                </label>
                                                <input
                                                    id="ideas-name"
                                                    name="full_name"
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={ideasForm.full_name}
                                                    onChange={handleIdeasChange}
                                                    required
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label htmlFor="ideas-email">
                                                    Email Address *
                                                </label>
                                                <input
                                                    id="ideas-email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    value={ideasForm.email}
                                                    onChange={handleIdeasChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Your Idea
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="idea-title">
                                                Idea Title *
                                            </label>
                                            <input
                                                id="idea-title"
                                                name="idea_title"
                                                type="text"
                                                placeholder="Give your idea a compelling title"
                                                value={ideasForm.idea_title}
                                                onChange={handleIdeasChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Category
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="idea-category">
                                                Select Idea Category *
                                            </label>
                                            <select
                                                id="idea-category"
                                                name="category"
                                                value={ideasForm.category}
                                                onChange={handleIdeasChange}
                                                required
                                            >
                                                <option value="">
                                                    Choose a category...
                                                </option>
                                                <option value="workshop">
                                                    Workshop Idea
                                                </option>
                                                <option value="event">
                                                    Event Idea
                                                </option>
                                                <option value="resource">
                                                    Learning Resource
                                                </option>
                                                <option value="partnership">
                                                    Partnership Opportunity
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="form-section-title">
                                            Detailed Description
                                        </h3>
                                        <div className="input-group">
                                            <label htmlFor="idea-description">
                                                Describe your idea in detail *
                                            </label>
                                            <textarea
                                                id="idea-description"
                                                name="description"
                                                placeholder="Provide a comprehensive description of your idea, including objectives, target audience, and expected outcomes..."
                                                value={ideasForm.description}
                                                onChange={handleIdeasChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            className="submit-ideas-btn"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Submitting..."
                                                : "Submit Idea"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "stories" && (
                            <div className="community-stories">
                                <h2>Community Stories</h2>
                                <p>
                                    Read how our community members have
                                    benefited from our programs and initiatives.
                                </p>

                                <div className="stories-grid">
                                    <div className="story-card">
                                        <div className="story-icon">
                                            <FaStar />
                                        </div>
                                        <h3>Transformed My Practice</h3>
                                        <p>
                                            "The sustainable design workshop
                                            completely changed how I approach
                                            projects. I've implemented
                                            eco-friendly practices that reduced
                                            energy costs by 40% for my clients."
                                        </p>
                                        <p className="story-author">
                                            — Maria L., Architect
                                        </p>
                                    </div>

                                    <div className="story-card">
                                        <div className="story-icon">
                                            <FaStar />
                                        </div>
                                        <h3>Career Advancement</h3>
                                        <p>
                                            "Through the mentorship program, I
                                            connected with an experienced
                                            architect who guided me through my
                                            licensure process. I'm now a project
                                            lead at my firm."
                                        </p>
                                        <p className="story-author">
                                            — James T., Designer
                                        </p>
                                    </div>

                                    <div className="story-card">
                                        <div className="story-icon">
                                            <FaStar />
                                        </div>
                                        <h3>Invaluable Network</h3>
                                        <p>
                                            "The connections I've made through
                                            membership have led to collaborative
                                            projects and friendships with
                                            architects from around the world."
                                        </p>
                                        <p className="story-author">
                                            — Sofia K., Urban Planner
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
                        Join our movement to advance sustainable architecture
                        and design education. Whether through membership,
                        donations, or sharing your ideas, there are many ways to
                        contribute to our community and mission.
                    </p>

                    <div className="involved-navigation">
                        <Link to="membership-partnerships" className="nav-link">
                            Membership
                        </Link>
                        <Link to="donate-support" className="nav-link">
                            Donate
                        </Link>
                        <Link to="community-feedback" className="nav-link">
                            Share Feedback
                        </Link>
                    </div>

                    <div className="why-involved">
                        <h2>Why Get Involved?</h2>
                        <div className="reasons-grid">
                            <div className="reason">
                                <h3>Make an Impact</h3>
                                <p>
                                    Your support directly contributes to
                                    sustainable architecture education and
                                    innovation.
                                </p>
                            </div>

                            <div className="reason">
                                <h3>Shape the Future</h3>
                                <p>
                                    Your ideas help guide our programs and
                                    ensure we meet community needs.
                                </p>
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
        <div
            className="involved-container"
            style={{
                background: "var(--primary-dark)",
                minHeight: "100vh",
                color: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <Routes>
                <Route
                    path="membership-partnerships"
                    element={<MembershipPartnerships />}
                />
                <Route path="donate-support" element={<DonateSupport />} />
                <Route
                    path="community-feedback"
                    element={<CommunityFeedback />}
                />
                <Route path="*" element={<GetInvolvedOverview />} />
            </Routes>

            <style>
                {`
        /* Add these new styles for form messages and selected states */
        .form-message {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .form-message.success {
          background: rgba(40, 167, 69, 0.2);
          border: 1px solid rgba(40, 167, 69, 0.3);
          color: #28a745;
        }

        .form-message.error {
          background: rgba(220, 53, 69, 0.2);
          border: 1px solid rgba(220, 53, 69, 0.3);
          color: #dc3545;
        }

        .info-message {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-weight: 500;
          background: rgba(122, 158, 217, 0.2);
          border: 1px solid rgba(122, 158, 217, 0.3);
          color: var(--accent-light);
          text-align: center;
        }

        .membership-card.selected {
          border-color: var(--accent-light);
          background: rgba(122, 158, 217, 0.1);
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(122, 158, 217, 0.3);
        }

        .membership-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .membership-card:hover {
          transform: translateY(-5px);
          border-color: rgba(122, 158, 217, 0.5);
        }

        .payment-select-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 0.5rem;
        }

        .payment-select-btn:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
        }

        .submit-membership-btn {
          padding: 12px 32px;
          background: var(--accent-light);
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
          color: white;
          font-weight: 600;
          min-width: 180px;
          box-shadow: 0 2px 8px rgba(122, 158, 217, 0.3);
        }

        .submit-membership-btn:hover:not(:disabled) {
          background: rgba(122, 158, 217, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(122, 158, 217, 0.4);
        }

        .submit-membership-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .membership-form-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 0;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .membership-form-section h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .membership-form .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        /* Keep all your existing CSS styles from before */
        .involved-container {
          min-height: 100vh;
        }

        .involved-page-wrapper {
          padding: 8rem 2rem 2rem;
          min-height: 100vh;
          background: var(--primary-dark);
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
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .involved-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
        }

        .involved-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .involved-main-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
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
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .membership-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--accent-light);
          margin-bottom: 1rem;
        }

        .membership-card p {
          color: rgba(255, 255, 255, 0.8);
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .benefits-list li:last-child {
          border-bottom: none;
        }

        .benefits-list li::before {
          content: '✓';
          color: var(--accent-light);
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .partnerships-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .partnerships-section h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .partnerships-section p {
          color: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .partnership-type h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .partnership-type p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-size: 0.9rem;
          margin: 0;
        }

        .donation-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          margin: 2.5rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .donation-section h2 {
          color: rgba(255, 255, 255, 0.95);
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
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        .donation-option.selected {
          background: var(--accent-light);
          color: white;
          border-color: var(--accent-light);
        }

        .donation-option:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
        }

        .custom-amount input {
          padding: 0.8rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 0;
          width: 120px;
          text-align: center;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .custom-amount input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .donation-form {
          margin-top: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
          max-width: 600px;
        }

        .donation-form input,
        .donation-form select,
        .donation-form textarea {
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .donation-form input::placeholder,
        .donation-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .payment-details {
          margin-top: 1.5rem;
        }

        .payment-details h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .payment-method {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border-radius: 0;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .payment-method h4 {
          color: var(--accent-light);
          margin-bottom: 0.8rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .payment-method p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0.3rem 0;
          font-size: 0.9rem;
        }

        .bank-options {
          display: grid;
          gap: 0.8rem;
          margin-top: 0.8rem;
        }

        .bank-option {
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem;
          border-radius: 0;
          border-left: 3px solid var(--accent-light);
        }

        .bank-option strong {
          color: rgba(255, 255, 255, 0.95);
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .payment-proof {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border-radius: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 1rem;
        }

        .payment-proof h4 {
          color: var(--accent-light);
          margin-bottom: 0.8rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .payment-proof p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .file-upload {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .file-upload input[type="file"] {
          display: none;
        }

        .upload-btn {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          display: inline-block;
          width: fit-content;
        }

        .upload-btn:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
          transform: translateY(-2px);
        }

        .upload-note {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .submit-donation-btn {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          margin-top: 1.5rem;
          width: 100%;
        }

        .submit-donation-btn:hover:not(:disabled) {
          border-color: var(--accent-light);
          color: var(--accent-light);
          transform: translateY(-2px);
        }

        .submit-donation-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-feedback-btn,
        .submit-ideas-btn {
          padding: 12px 32px;
          background: var(--accent-light);
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
          color: white;
          font-weight: 600;
          min-width: 180px;
          box-shadow: 0 2px 8px rgba(122, 158, 217, 0.3);
        }

        .submit-feedback-btn:hover:not(:disabled),
        .submit-ideas-btn:hover:not(:disabled) {
          background: rgba(122, 158, 217, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(122, 158, 217, 0.4);
        }

        .submit-feedback-btn:disabled,
        .submit-ideas-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .other-ways {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .other-ways h2 {
          color: rgba(255, 255, 255, 0.95);
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
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border-radius: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .support-option:hover {
          transform: translateY(-3px);
          border-color: var(--accent-light);
          background: rgba(255, 255, 255, 0.08);
        }

        .support-option h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .support-option p {
          color: rgba(255, 255, 255, 0.8);
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
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .feedback-tab.active {
          background: var(--accent-light);
          color: white;
          border-color: var(--accent-light);
        }

        .feedback-tab:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
        }

        .feedback-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .feedback-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .feedback-form,
        .ideas-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 0;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          margin-top: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feedback-form-inner,
        .ideas-form-inner {
          padding: 2.5rem;
        }

        .feedback-form h2,
        .ideas-form h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          padding: 2rem 2.5rem 0;
        }

        .feedback-form p,
        .ideas-form p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
          padding: 0 2.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
        }

        .form-section-title {
          color: var(--accent-light);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-section-title::before {
          content: '';
          width: 3px;
          height: 20px;
          background: var(--accent-light);
          border-radius: 2px;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group:last-child {
          margin-bottom: 0;
        }

        .input-group label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          font-size: 0.95rem;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.2s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
          outline: none;
          border-color: var(--accent-light);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(122, 158, 217, 0.1);
        }

        .input-group select {
          cursor: pointer;
        }

        .input-group textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          font-size: 0.95rem;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.9);
          min-height: 120px;
          resize: vertical;
          font-family: inherit;
          line-height: 1.5;
          transition: all 0.2s ease;
        }

        .input-group textarea:focus {
          outline: none;
          border-color: var(--accent-light);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(122, 158, 217, 0.1);
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }

        .form-actions {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: flex-end;
        }

        .community-stories {
          margin-top: 2rem;
        }

        .community-stories h2 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .community-stories p {
          color: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .story-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent-light);
          background: rgba(255, 255, 255, 0.08);
        }

        .story-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .story-card h3 {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .story-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin: 0;
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
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 600;
        }

        .nav-link:hover {
          border-color: var(--accent-light);
          color: var(--accent-light);
        }

        .why-involved {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          margin-top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .why-involved h2 {
          color: rgba(255, 255, 255, 0.95);
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
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .reason p {
          color: rgba(255, 255, 255, 0.8);
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
          
          .involved-navigation {
            flex-direction: column;
            align-items: center;
          }
          
          .donation-options {
            flex-direction: column;
            align-items: center;
          }

          .bank-options {
            grid-template-columns: 1fr;
          }

          .upload-btn {
            width: 100%;
          }
          
          .feedback-tabs {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .feedback-form-inner,
          .ideas-form-inner {
            padding: 1.5rem;
          }

          .feedback-form h2,
          .ideas-form h2 {
            padding: 1.5rem 1.5rem 0;
            font-size: 1.3rem;
          }

          .feedback-form p,
          .ideas-form p {
            padding: 0 1.5rem;
            font-size: 0.9rem;
          }

          .form-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .submit-feedback-btn,
          .submit-ideas-btn {
            width: 100%;
            min-width: auto;
          }
        }

        /* Dark theme overrides */
        .involved-container {
          background: var(--primary-dark) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .involved-container *:not(img):not(svg) {
          color: inherit !important;
        }
        
        .involved-container h1,
        .involved-container h2,
        .involved-container h3,
        .involved-container h4 {
          color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .involved-container .nav-link,
        .involved-container .membership-card,
        .involved-container .donation-option,
        .involved-container .feedback-tab,
        .involved-container input,
        .involved-container textarea,
        .involved-container select {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .involved-container .nav-link:hover,
        .involved-container .membership-card:hover,
        .involved-container .donation-option:hover,
        .involved-container .feedback-tab:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }
        
        .involved-container .nav-link.active,
        .involved-container .donation-option.selected,
        .involved-container .feedback-tab.active,
        .involved-container .donate-btn,
        .involved-container .submit-btn {
          background: var(--accent-light) !important;
          color: white !important;
        }
        `}
            </style>
        </div>
    );
}

export default GetInvolved;
