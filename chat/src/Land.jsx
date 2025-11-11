import React, { useState, useEffect, useRef } from 'react';
import './Land.css';

const Land = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [faqOpen, setFaqOpen] = useState(null);

  // Updated features with AI chatting focus
  const features = [
    {
      title: "Secure Messaging",
      description: "End-to-end encrypted real-time messaging with AI-powered security protocols for seamless, private conversations.",
      icon: "🔒",
      color: "#0066ff"
    },
    {
      title: "HD Video Calls",
      description: "Crystal-clear video conferencing with AI auto-transcription, noise cancellation, and screen sharing.",
      icon: "📹",
      color: "#00cc88"
    },
    {
      title: "AI Assistant",
      description: "Smart automation with AI-driven replies, meeting summaries, and personalized chat suggestions powered by advanced models.",
      icon: "🤖",
      color: "#ff6b35"
    },
    {
      title: "File Collaboration",
      description: "Real-time document sharing and collaboration with AI-powered version control and intelligent insights.",
      icon: "📊",
      color: "#8b5cf6"
    },
    {
      title: "Intelligent Chatbots",
      description: "Custom AI chatbots for automated customer support, lead generation, and interactive workflows.",
      icon: "💬",
      color: "#f59e0b"
    },
    {
      title: "Sentiment Analysis",
      description: "AI-driven sentiment detection in chats to gauge user emotions and improve communication strategies.",
      icon: "📈",
      color: "#ef4444"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechNova Inc.",
      content: "TrueTalk's AI features revolutionized our team chats, saving 20+ hours weekly with smart automation.",
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      content: "Enterprise security meets AI innovation. Our teams adopted it instantly for better collaboration.",
      avatar: "👨‍💼"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      features: ["Up to 5 users", "Basic messaging", "1GB storage"],
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$19/month",
      features: ["Unlimited users", "HD video calls", "10GB storage", "AI summaries"],
      buttonText: "Start Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Pro", "Advanced security", "Unlimited storage", "Dedicated support"],
      buttonText: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "Is TrueTalk secure?",
      answer: "Yes, we use end-to-end encryption and comply with enterprise security standards, enhanced by AI monitoring."
    },
    {
      question: "Can I integrate with other tools?",
      answer: "Absolutely! TrueTalk supports integrations with Slack, Zoom, and AI platforms like OpenAI."
    },
    {
      question: "What platforms does it support?",
      answer: "Available on web, iOS, Android, and desktop apps with full AI chatting capabilities."
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI assistant uses machine learning to provide smart replies, summarize chats, and automate tasks in real-time."
    }
  ];

  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${contactForm.name}! We'll get back to you soon.`);
    setContactForm({ name: '', email: '', message: '' });
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">💎</div>
            <span className="logo-text">TrueTalk</span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features" onClick={() => scrollToSection(featuresRef)}>Features</a>
            <a href="#pricing" onClick={() => scrollToSection(pricingRef)}>Pricing</a>
            <a href="#contact" onClick={() => scrollToSection(contactRef)}>Contact</a>
            <div className="nav-buttons">
              <button className="login-btn">Sign In</button>
              <button className="demo-btn" onClick={() => setIsModalOpen(true)}>Get Demo</button>
            </div>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge">ENTERPRISE READY</div>
            <h1 className="hero-title">
              AI-Powered Communication
              <span className="gradient-text"> for Teams</span>
            </h1>
            <p className="hero-subtitle">
              TrueTalk combines enterprise-grade security with cutting-edge AI for intelligent chatting, seamless collaboration, and automated workflows.
            </p>
            <div className="hero-buttons">
              <button className="primary-button">
                <span>Start Free Trial</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="secondary-button" onClick={() => setIsModalOpen(true)}>
                <span>View Demo</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-number">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Users</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="chat-preview">
              <div className="chat-header">
                <div className="chat-info">
                  <div className="avatar-group">
                    <div className="avatar">👩‍💼</div>
                    <div className="avatar">👨‍💼</div>
                    <div className="avatar">🧑‍💼</div>
                  </div>
                  <span>AI Chat • Online</span>
                </div>
              </div>
              
              <div className="chat-messages">
                <div className="message incoming">
                  <div className="message-avatar">👩‍💼</div>
                  <div className="message-content">
                    <div className="message-text">Can you summarize the last meeting?</div>
                    <div className="message-time">10:24 AM</div>
                  </div>
                </div>
                
                <div className="message outgoing ai-response">
                  <div className="message-content">
                    <div className="message-text">AI Summary: Key points included project updates and Q4 goals. Action items: Follow up on deliverables.</div>
                    <div className="message-time">10:25 AM</div>
                  </div>
                  <div className="message-avatar">🤖</div>
                </div>
                <div className="typing-indicator">AI is typing...</div>
              </div>

              <div className="chat-input">
                <input type="text" placeholder="Ask AI or type a message..." />
                <button>Send</button>
              </div>
              
              <div className="chat-actions">
                <button className="chat-btn">📞 Call</button>
                <button className="chat-btn">🤖 AI Reply</button>
                <button className="chat-btn">📎 Share</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="features section">
        <div className="container">
          <div className="section-header">
            <div className="badge">AI FEATURES</div>
            <h2 className="section-title">Everything Your Team Needs</h2>
            <p className="section-subtitle">
              Powerful AI-driven features designed for intelligent team collaboration and chatting.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="pricing section">
        <div className="container">
          <div className="section-header">
            <div className="badge">PRICING</div>
            <h2 className="section-title">Choose the Right Plan</h2>
            <p className="section-subtitle">Flexible pricing for teams of all sizes with AI enhancements.</p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}</div>
                <ul>
                  {plan.features.map((feature, i) => <li key={i}>{feature}</li>)}
                </ul>
                <button className="pricing-btn">{plan.buttonText}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header">
            <div className="badge">TESTIMONIALS</div>
            <h2 className="section-title">Trusted by Teams Worldwide</h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">❝</div>
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="name">{testimonial.name}</div>
                    <div className="role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section">
        <div className="container">
          <div className="section-header">
            <div className="badge">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  aria-expanded={faqOpen === index}
                >
                  {faq.question}
                  <span className="faq-toggle">{faqOpen === index ? '−' : '+'}</span>
                </button>
                {faqOpen === index && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Communication?</h2>
            <p>Join thousands of teams using TrueTalk's AI for smarter chatting.</p>
            <div className="cta-buttons">
              <button className="primary-button large">
                <span>Start Free Trial</span>
              </button>
              <button className="secondary-button large">
                <span>Contact Sales</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" ref={contactRef} className="contact section">
        <div className="container">
          <div className="section-header">
            <div className="badge">CONTACT</div>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">Have questions about our AI chatting features? We'd love to hear from you.</p>
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="primary-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
                   <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">💎</div>
                <span className="logo-text">TrueTalk</span>
              </div>
              <p>AI-powered communication for teams</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2024 TrueTalk. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Demo */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h3>TrueTalk Demo</h3>
            <p>Here's a quick demo of our AI chatting features. (Placeholder for video/image)</p>
            <div className="demo-placeholder">🎥 Demo Video Placeholder</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Land;