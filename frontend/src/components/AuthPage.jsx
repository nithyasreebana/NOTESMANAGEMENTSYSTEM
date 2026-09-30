import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, BookOpen, ArrowRight, Sparkles, Pin, Archive, Trash2, Send, Tag, ShieldCheck, SunMoon, Sun, Moon, ArrowUpRight } from "lucide-react";
import heroIllustration from "../assets/aura_hero.png";

export default function AuthPage({ onLoginSuccess, showNotification, theme, onToggleTheme }) {
  const [authMode, setAuthMode] = useState(null); // 'login', 'signup', or null
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Contact Form Fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (authMode === "signup" && !name)) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);
    const endpoint = authMode === "login" ? "/user/login" : "/user/register";
    const payload = authMode === "login" ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message || "Success!", "success");
        if (authMode === "login") {
          localStorage.setItem("aura_user", JSON.stringify(data.user));
          onLoginSuccess(data.user);
          setAuthMode(null);
        } else {
          setAuthMode("login");
          setPassword("");
        }
      } else {
        showNotification(data.message || "An error occurred", "error");
      }
    } catch (error) {
      showNotification("Network error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showNotification("Please fill in all contact fields", "error");
      return;
    }
    showNotification("Message sent! We'll get back to you shortly.", "success");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-layout" style={{ position: "relative", overflowX: "hidden" }}>
      {/* Background Glow Elements */}
      <div className="glow-blob glow-blob-1"></div>
      <div className="glow-blob glow-blob-2"></div>
      <div className="glow-blob glow-blob-3"></div>

      {/* Sticky Header Nav */}
      <header className="landing-header glass-panel">
        <div className="landing-logo" onClick={() => scrollToSection("home")}>
          <BookOpen size={24} className="logo-spark" />
          <span>AuraNotes</span>
        </div>
        <nav className="landing-nav">
          <span className="landing-nav-link" onClick={() => scrollToSection("home")}>Home</span>
          <span className="landing-nav-link" onClick={() => scrollToSection("features")}>Features</span>
          <span className="landing-nav-link" onClick={() => scrollToSection("about")}>About</span>
          <span className="landing-nav-link" onClick={() => scrollToSection("contact")}>Contact</span>
        </nav>
        <div className="landing-header-actions">
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="landing-btn landing-btn-outline" onClick={() => setAuthMode("login")}>
            Login
          </button>
          <button className="landing-btn landing-btn-primary" onClick={() => setAuthMode("signup")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="landing-section landing-hero">
        <div className="landing-hero-left">
          <div className="auth-badge">
            <Sparkles size={14} style={{ color: "#a5b4fc" }} />
            <span>Productive Thought Spaces</span>
          </div>
          <h1 className="landing-hero-title">
            Where Thoughts Align,<br />Ideas Take Shape.
          </h1>
          <p className="landing-hero-subtitle">
            A premium, glassmorphic notes application tailored for creators, developers, and thinkers. Organize tasks, tag ideas in real-time, pin core concepts, and focus on what matters.
          </p>
          <div className="landing-hero-ctas">
            <button className="landing-btn landing-btn-primary landing-btn-large" onClick={() => setAuthMode("signup")}>
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </button>
            <button className="landing-btn landing-btn-outline landing-btn-large" onClick={() => scrollToSection("features")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="landing-hero-right">
          <div className="auth-hero-image-container">
            <img src={heroIllustration} alt="Futuristic Notebook illustration" className="auth-hero-image" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing-section">
        <div className="landing-section-header">
          <span className="landing-section-tag">Key Offerings</span>
          <h2 className="landing-section-title">Designed for Flow</h2>
          <p className="landing-section-subtitle">Experience utilities built to keep your workspace simple and clean.</p>
        </div>

        <div className="landing-features-grid">
          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <Pin size={24} />
            </div>
            <h3>Smart Pinning</h3>
            <p>Anchor core thoughts or hot projects at the top of your dashboard. Access them instantly without digging.</p>
          </div>

          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <Archive size={24} />
            </div>
            <h3>Thought Archiving</h3>
            <p>Archive notes you no longer actively use to maintain a distraction-free layout, while keeping search intact.</p>
          </div>

          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <Trash2 size={24} />
            </div>
            <h3>Soft Deletes</h3>
            <p>Safely delete notes. Review or restore items from your trash folder with one simple action before deleting.</p>
          </div>

          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <Tag size={24} />
            </div>
            <h3>Dynamic Tagging</h3>
            <p>Tag notes on the fly. The sidebar automatically aggregates and compiles active tag filters dynamically.</p>
          </div>

          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <SunMoon size={24} />
            </div>
            <h3>Dual Theme Modes</h3>
            <p>Toggle between Light and Dark mode settings instantly. Tailored colors match any environment.</p>
          </div>

          <div className="landing-feature-card glass-panel">
            <div className="feature-card-icon">
              <ShieldCheck size={24} />
            </div>
            <h3>Secure Auth Session</h3>
            <p>Industry-standard secure user registration and cookie-based logins guard your information.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="landing-section landing-about-section">
        <div className="landing-about-content">
          <div className="landing-about-left">
            <span className="landing-section-tag">Our Vision</span>
            <h2 className="landing-section-title" style={{ textAlign: "left" }}>Decluttering Your Digital Mind</h2>
            <p className="landing-section-text">
              We believe great ideas get lost in heavy, complicated tools. AuraNotes removes the noise. Inspired by glassmorphic layouts, we create interfaces that behave like real sheets of glass—translucent, layered, and visual.
            </p>
            <p className="landing-section-text">
              Whether you are an engineer writing API specs, a writer drafting chapters, or a student organizing classes, AuraNotes provides a fluid workspace that helps you focus.
            </p>
          </div>
          <div className="landing-about-right glass-panel">
            <span className="quote-mark">“</span>
            <p className="quote-text">
              Simplicity is the ultimate sophistication. AuraNotes lets my thoughts flow with glass-like clarity.
            </p>
            <div className="quote-author">
              <div className="quote-author-dot"></div>
              <span>Aura Design Guild</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="landing-section">
        <div className="landing-section-header">
          <span className="landing-section-tag">Get in Touch</span>
          <h2 className="landing-section-title">We'd Love to Hear From You</h2>
          <p className="landing-section-subtitle">Reach out with suggestions, business ideas, or simply to say hello.</p>
        </div>

        <div className="landing-contact-wrapper">
          <form className="landing-contact-form glass-panel" onSubmit={handleContactSubmit}>
            <div className="contact-form-row">
              <div className="modal-input-group">
                <label className="auth-label">Name</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-input-group">
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  className="modal-input"
                  placeholder="name@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-input-group">
              <label className="auth-label">Message</label>
              <textarea
                className="modal-textarea"
                placeholder="Write your thoughts..."
                style={{ minHeight: "120px" }}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="landing-btn landing-btn-primary" style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}>
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-logo">
            <BookOpen size={20} />
            <span>AuraNotes</span>
          </div>
          <div className="footer-links">
            <span onClick={() => scrollToSection("home")}>Home</span>
            <span onClick={() => scrollToSection("features")}>Features</span>
            <span onClick={() => scrollToSection("about")}>About</span>
            <span onClick={() => scrollToSection("contact")}>Contact</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AuraNotes. All rights reserved. Created for premium productivity.</span>
        </div>
      </footer>

      {/* Backdrop Blurred Auth Modal (Login / Sign Up) */}
      {authMode && (
        <div className="modal-overlay" onClick={() => setAuthMode(null)}>
          <div className="modal-content glass-panel auth-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px", padding: "40px" }}>
            <div className="auth-form-header">
              <div className="auth-logo" style={{ justifyContent: "center" }}>
                <BookOpen size={28} />
                <span>AuraNotes</span>
              </div>
              <h2 className="auth-form-title">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="auth-form-subtitle">
                {authMode === "login"
                  ? "Enter details to access your dashboard"
                  : "Sign up to configure your notes"}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit}>
              {/* Name Field (Sign Up Only) */}
              {authMode === "signup" && (
                <div className="auth-form-group">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrapper">
                    <User size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={authMode === "signup"}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="auth-form-group">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="auth-form-group">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "14px",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, #a21caf 100%)",
                  border: "none"
                }}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <span>{authMode === "login" ? "Sign In" : "Register"}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="auth-switch-prompt" style={{ marginTop: "24px" }}>
              {authMode === "login" ? "New to AuraNotes? " : "Already have an account? "}
              <span
                className="auth-switch-link"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  showPassword && setShowPassword(false);
                }}
              >
                {authMode === "login" ? "Create Account" : "Login Here"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
