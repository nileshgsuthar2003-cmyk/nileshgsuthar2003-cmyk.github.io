import { useState, useEffect, useRef } from 'react';

function Footer() {
  const watermarkRef = useRef(null);
  const footerRef = useRef(null);
  const emailInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  useEffect(() => {
    let footerTop = 0;
    let windowHeight = window.innerHeight;

    function cacheDimensions() {
      windowHeight = window.innerHeight;
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        footerTop = rect.top + window.scrollY;
      }
    }

    cacheDimensions();
    window.addEventListener('resize', cacheDimensions);
    setTimeout(cacheDimensions, 100);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (footerRef.current && watermarkRef.current) {
        if (scrollY > footerTop - windowHeight) {
          const offset = (scrollY - (footerTop - windowHeight)) * 0.15;
          watermarkRef.current.style.transform = `translateX(${offset - 100}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', cacheDimensions);
    };
  }, []);

  // Strict RFC-compliant email validation
  const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return 'Email address is required.';
    }
    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@domain.com).';
    }
    const parts = trimmed.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      const domainParts = domain.split('.');
      if (domainParts.length < 2 || domainParts.some((p) => p.length === 0) || domainParts[domainParts.length - 1].length < 2) {
        return 'Please enter a valid domain name with an extension.';
      }
    }
    return '';
  };

  const validateField = (name, value) => {
    if (name === 'email') {
      return validateEmail(value);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark email as touched
    setTouched((prev) => ({ ...prev, email: true }));

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    // Valid email - proceed with processing
    setErrors({});
    setSubmitStatus('submitting');

    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
    }, 600);
  };

  const handleResetSuccess = () => {
    setSubmitStatus('idle');
  };

  return (
    <footer className="footer-section" id="footer" ref={footerRef}>
      {/* Watermark Background */}
      <div className="footer-watermark">
        <div className="watermark-text" ref={watermarkRef} id="watermark">Nilesh Suthar</div>
      </div>

      {/* Main Content */}
      <div className="footer-content">
        <h2 className="footer-title" id="footerTitle">Let's build something</h2>
        <p className="footer-subtitle" id="footerSubtitle">meaningful and memorable</p>
        
        {/* Quick Contact Form with Client-Side Validation */}
        <div className="footer-form-container">
          {submitStatus === 'success' ? (
            <div className="footer-form-success" role="status" aria-live="polite">
              <div className="success-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="success-title">Message Received</h3>
              <p className="success-desc">
                Thank you for reaching out! I've received your inquiry and will get back to you shortly.
              </p>
              <button 
                type="button" 
                onClick={handleResetSuccess}
                className="footer-form-reset-btn"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form 
              className="footer-contact-form" 
              onSubmit={handleSubmit} 
              noValidate
              aria-label="Contact inquiry form"
            >
              <div className="form-fields-row">
                <div className="form-field-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name <span className="label-optional">(optional)</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-input"
                    autoComplete="name"
                    disabled={submitStatus === 'submitting'}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email address <span className="label-required">*</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@domain.com"
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''} ${touched.email && !errors.email && formData.email ? 'is-valid' : ''}`}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                    disabled={submitStatus === 'submitting'}
                  />
                  {touched.email && errors.email && (
                    <div id="contact-email-error" className="form-error-msg" role="alert">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field-group form-field-full">
                <label htmlFor="contact-message" className="form-label">
                  Message <span className="label-optional">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a project idea, question, or opportunity..."
                  className="form-textarea"
                  disabled={submitStatus === 'submitting'}
                />
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  className="footer-submit-btn"
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="footer-contacts-wrap">
          {/* Expanding Email circle */}
          <a href="mailto:nilesh.g.suthar.2003@gmail.com" className="email-expanding-circle" title="Direct Email">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
            </svg>
            <span className="email-text-label">nilesh.g.suthar.2003@gmail.com</span>
          </a>

          {/* LinkedIn (Social Icon) */}
          <a href="https://www.linkedin.com/in/nilesh-suthar-r484/" target="_blank" rel="noopener noreferrer" className="footer-social-link stroke-svg" title="LinkedIn Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2"></rect>
              <path d="M8 11v5" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M8 8v.01" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M12 16v-5" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M16 16v-3a2 2 0 1 0-4 0" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </a>

          {/* GitHub (Social Icon) */}
          <a href="https://github.com/nileshgsuthar2003-cmyk" target="_blank" rel="noopener noreferrer" className="footer-social-link stroke-svg" title="GitHub Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>

          {/* LeetCode (Social Icon) */}
          <a href="https://leetcode.com/nilesh-suthar" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LeetCode Profile">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.411L7.11 5.826a1.374 1.374 0 0 0-.014 1.945L12.2 12.875a2.75 2.75 0 0 0 3.882.01l5.51-5.508a1.375 1.375 0 0 0-1.944-1.944l-5.51 5.507a.687.687 0 0 1-.972-.003L8.56 6.302l4.896-4.898A1.376 1.376 0 0 0 13.483 0z" />
              <path d="M16.086 16.086a.687.687 0 0 1-.972-.003L10.51 11.48l-5.32 5.32a2.75 2.75 0 0 0-.009 3.885l4.897 4.897a1.376 1.376 0 0 0 1.944 0l8.077-8.077a1.375 1.375 0 0 0-1.944-1.944l-8.077 8.077a.687.687 0 0 1-.972-.003l-4.897-4.897a.688.688 0 0 1 .002-.972l5.32-5.32 4.604 4.604a2.75 2.75 0 0 0 3.882.01l2.062-2.062a1.375 1.375 0 0 0-1.944-1.944l-2.062 2.062z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Nilesh Suthar</span>
        <span>Pune, India · Open for Opportunities</span>
      </div>
    </footer>
  );
}

export default Footer;
