import Link from "next/link";
import { HiOutlineSparkles, HiOutlineBolt, HiOutlineDocumentText, HiOutlinePaintBrush, HiOutlineLanguage, HiOutlineChartBarSquare, HiOutlineCheckCircle, HiOutlineArrowRight } from "react-icons/hi2";

export default function HomePage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="hero-content">

          <h1 className="hero-title">
            Build Your Perfect Resume{" "}
            <span className="gradient-text">in Minutes</span>
          </h1>
          <p className="hero-description">
            Let AI craft your professional resume. Tailored to job descriptions,
            optimized for ATS systems, and designed to land interviews.
          </p>
          <div className="hero-actions">
            <Link href="/builder" className="btn btn-primary btn-lg">
              <HiOutlineSparkles />
              Create Your Resume — Free
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary btn-lg">
              How It Works
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">50K+</div>
              <div className="hero-stat-label">Resumes Created</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">92%</div>
              <div className="hero-stat-label">Interview Rate</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4.9★</div>
              <div className="hero-stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section" id="features">
        <div className="container">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">
            Powerful AI tools to create resumes that stand out and get you hired.
          </p>
          <div className="features-grid">
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlineSparkles />
              </div>
              <h3 className="feature-title">AI Content Generation</h3>
              <p className="feature-desc">
                Describe your experience in simple words. Our AI transforms them into
                professional, impactful bullet points that recruiters love.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlineBolt />
              </div>
              <h3 className="feature-title">ATS Optimization</h3>
              <p className="feature-desc">
                Every resume is automatically optimized for Applicant Tracking Systems.
                Never get filtered out by automated screening again.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlineDocumentText />
              </div>
              <h3 className="feature-title">Job Tailoring</h3>
              <p className="feature-desc">
                Paste any job description and our AI adapts your resume to match
                exactly what the employer is looking for.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlinePaintBrush />
              </div>
              <h3 className="feature-title">Beautiful Templates</h3>
              <p className="feature-desc">
                Choose from professionally designed templates — modern, classic, or
                creative. Each one carefully crafted by designers.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlineLanguage />
              </div>
              <h3 className="feature-title">Multi-Language</h3>
              <p className="feature-desc">
                Create resumes in English, Ukrainian, German, Polish, and 10+ other
                languages. AI adapts to each language's conventions.
              </p>
            </div>
            <div className="glass-card feature-card">
              <div className="feature-icon">
                <HiOutlineChartBarSquare />
              </div>
              <h3 className="feature-title">Cover Letters</h3>
              <p className="feature-desc">
                Generate tailored cover letters that complement your resume. AI crafts
                compelling narratives for each application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section" id="how-it-works" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Create a professional resume in 3 simple steps
          </p>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Enter Your Info</h3>
              <p className="step-desc">
                Fill in your basic details — name, experience, education, and skills. Keep it simple, AI handles the rest.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">AI Enhances It</h3>
              <p className="step-desc">
                Our AI transforms your input into professional, impactful content optimized for recruiters and ATS systems.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Download & Apply</h3>
              <p className="step-desc">
                Choose your template, preview your resume, and download as PDF. Start applying to your dream jobs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" id="pricing">
        <div className="container">
          <h2 className="section-title">Simple Pricing</h2>
          <p className="section-subtitle">
            Start for free. Upgrade when you need more.
          </p>
          <div className="pricing-grid">
            <div className="glass-card pricing-card">
              <h3 className="pricing-name">Free</h3>
              <div className="pricing-price">
                $0 <span>/ forever</span>
              </div>
              <p className="pricing-desc">Perfect for getting started</p>
              <div className="pricing-features">
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>1 resume</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>2 templates</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>AI enhancement (3/day)</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>PDF export</span>
                </div>
              </div>
              <Link href="/builder" className="btn btn-secondary" style={{ width: "100%" }}>
                Get Started Free
              </Link>
            </div>

            <div className="glass-card pricing-card popular">
              <div className="pricing-popular-badge">Most Popular</div>
              <h3 className="pricing-name">Pro</h3>
              <div className="pricing-price">
                $12 <span>/ month</span>
              </div>
              <p className="pricing-desc">For active job seekers</p>
              <div className="pricing-features">
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Unlimited resumes</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>All templates</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Unlimited AI enhancement</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Job tailoring</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Cover letter generator</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>ATS score checker</span>
                </div>
              </div>
              <Link href="/builder" className="btn btn-primary" style={{ width: "100%" }}>
                Start Pro Trial
              </Link>
            </div>

            <div className="glass-card pricing-card">
              <h3 className="pricing-name">Premium</h3>
              <div className="pricing-price">
                $25 <span>/ month</span>
              </div>
              <p className="pricing-desc">Maximum career boost</p>
              <div className="pricing-features">
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Everything in Pro</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>LinkedIn optimization</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Interview prep AI</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Priority support</span>
                </div>
                <div className="pricing-feature">
                  <span className="check">✓</span>
                  <span>Resume analytics</span>
                </div>
              </div>
              <Link href="/builder" className="btn btn-secondary" style={{ width: "100%" }}>
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <h2 className="section-title">Loved by Job Seekers</h2>
          <p className="section-subtitle">
            Join thousands who landed their dream jobs with ResumeAI
          </p>
          <div className="testimonials-grid">
            <div className="glass-card testimonial-card">
              <p className="testimonial-text">
                &quot;I was struggling with my resume for weeks. ResumeAI transformed my
                bland descriptions into powerful bullet points. Got 3 interview
                calls in the first week!&quot;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SK</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Sarah K.</span>
                  <span className="testimonial-role">Software Engineer</span>
                </div>
              </div>
            </div>
            <div className="glass-card testimonial-card">
              <p className="testimonial-text">
                &quot;The job tailoring feature is a game-changer. I customize my
                resume for each application in seconds instead of hours.
                Absolutely worth every penny.&quot;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MB</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Michael B.</span>
                  <span className="testimonial-role">Product Manager</span>
                </div>
              </div>
            </div>
            <div className="glass-card testimonial-card">
              <p className="testimonial-text">
                &quot;As a career-changer, I didn't know how to present my experience.
                ResumeAI's suggestions were spot-on. Landed my dream role in
                2 weeks!&quot;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">AL</div>
                <div className="testimonial-info">
                  <span className="testimonial-name">Anna L.</span>
                  <span className="testimonial-role">UX Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">
              Ready to Land Your Dream Job?
            </h2>
            <p className="cta-desc">
              Create your AI-powered resume in minutes. No credit card required.
            </p>
            <Link href="/builder" className="btn btn-primary btn-lg" style={{ position: "relative" }}>
              <HiOutlineSparkles />
              Create Your Resume Now
              <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-name">
                <HiOutlineSparkles style={{ color: "var(--accent-secondary)" }} />
                ResumeAI
              </div>
              <p className="footer-brand-desc">
                AI-powered resume builder that helps you create professional,
                ATS-optimized resumes and cover letters. Land your dream job faster.
              </p>
            </div>
            <div>
              <h4 className="footer-col-title">Product</h4>
              <div className="footer-links">
                <Link href="/builder">Resume Builder</Link>
                <Link href="/cover-letter">Cover Letter</Link>
                <Link href="/#pricing">Pricing</Link>
                <Link href="/templates">Templates</Link>
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Resources</h4>
              <div className="footer-links">
                <Link href="/blog">Resume Tips</Link>
                <Link href="/blog">Career Blog</Link>
                <Link href="/blog">Interview Guide</Link>
                <Link href="/faq">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Company</h4>
              <div className="footer-links">
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ResumeAI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
