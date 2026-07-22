import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck,
  Flame,
  CheckCircle2,
  LineChart,
  Smartphone,
  Dumbbell
} from "lucide-react";
import logoUrl from '../assets/logo.png';
import './LandingPage.css';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="landing-page">
      {/* Background Decor */}
      <div className="landing-bg">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="nav-header">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon-wrap">
              <img src={logoUrl} alt="FitTrack Logo" className="logo-img" />
            </div>
            <span className="logo-text">FitTrack<span className="text-primary">.</span></span>
          </div>
          
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#platform" className="nav-link">Platform</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-login">Sign In</Link>
            <Link to="/register" className="btn btn-primary nav-cta">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div style={{ y: heroY, opacity }} className="hero-container">
          <div className="hero-content">
            <motion.div 
              custom={0} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="hero-badge"
            >
              <span className="badge-pulse"></span>
              FitTrack OS 3.0 is now live
            </motion.div>
            
            <motion.h1 
              custom={1} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="hero-title"
            >
              The intelligent way to <br />
              <span className="text-gradient">transform your body.</span>
            </motion.h1>
            
            <motion.p 
              custom={2} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="hero-subtitle"
            >
              Stop guessing. Start tracking. FitTrack connects your health data, generates AI-driven workout plans, and accelerates your fitness journey like never before.
            </motion.p>

            <motion.div 
              custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="hero-actions"
            >
              <Link to="/register" className="btn btn-primary btn-lg group">
                Start Training Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="btn btn-outline btn-lg">
                Explore Features
              </a>
            </motion.div>
            
            <motion.div 
              custom={4} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="hero-social-proof"
            >
              <div className="avatar-group">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User" />
              </div>
              <div className="proof-text">
                <div className="stars">★★★★★</div>
                <p>Trusted by <strong>42,000+</strong> athletes worldwide</p>
              </div>
            </motion.div>
          </div>


        </motion.div>
      </section>

      {/* Logos Section */}
      <section className="logos-section">
        <p className="logos-title">Integrates seamlessly with your favorite health platforms</p>
        <div className="logos-track">
          <span>Apple Health</span>
          <span className="dot">•</span>
          <span>Google Fit</span>
          <span className="dot">•</span>
          <span>Garmin Connect</span>
          <span className="dot">•</span>
          <span>Fitbit</span>
          <span className="dot">•</span>
          <span>Strava</span>
          <span className="dot">•</span>
          <span>Oura</span>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="features-section">
        <div className="section-header text-center">
          <h2 className="section-title">Everything you need to <br/>succeed. Nothing you don't.</h2>
          <p className="section-desc">A unified ecosystem designed for athletes who demand the best.</p>
        </div>

        <div className="bento-grid">
          {/* Feature 1: Large */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card col-span-2 row-span-2 bg-gradient-blue"
          >
            <div className="bento-content">
              <div className="bento-icon"><Smartphone size={24} /></div>
              <h3 className="bento-title">Adaptive AI Plans</h3>
              <p className="bento-desc">Our proprietary algorithm analyzes your recovery, past performance, and biometric data to generate the perfect workout for you, every single day.</p>
            </div>
            <div className="bento-image-wrapper">
              <div className="mock-ui">
                <div className="mock-header">Today's Protocol</div>
                <div className="mock-item"><CheckCircle2 size={16} className="text-green"/> Heavy Squats 5x5</div>
                <div className="mock-item"><CheckCircle2 size={16} className="text-green"/> RDLs 3x8</div>
                <div className="mock-item"><div className="circle-empty"></div> Leg Press 3x12</div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Small */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card"
          >
            <div className="bento-content">
              <div className="bento-icon text-orange"><Flame size={24} /></div>
              <h3 className="bento-title">Advanced Metrics</h3>
              <p className="bento-desc">Track macros, calories, and volume load in real-time.</p>
            </div>
          </motion.div>

          {/* Feature 3: Small */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card"
          >
            <div className="bento-content">
              <div className="bento-icon text-purple"><LineChart size={24} /></div>
              <h3 className="bento-title">Visual Progress</h3>
              <p className="bento-desc">Beautiful charts that map your journey and predict your plateau.</p>
            </div>
          </motion.div>

          {/* Feature 4: Wide */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card col-span-2 flex-row-card"
          >
            <div className="bento-content">
              <div className="bento-icon text-green"><ShieldCheck size={24} /></div>
              <h3 className="bento-title">Elite Coaching Access</h3>
              <p className="bento-desc">Connect with certified professionals who can monitor your stats, adjust your programming, and provide direct feedback through our secure platform.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works / Steps */}
      <section id="platform" className="steps-section">
        <div className="steps-container">
          <div className="steps-content">
            <h2 className="section-title">From day one to day one hundred.</h2>
            <p className="section-desc text-left">We've streamlined the entire process so you can focus on putting in the work.</p>
            
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">01</div>
                <div>
                  <h4 className="step-title">Connect your devices</h4>
                  <p className="step-desc">Sync your Apple Watch, Garmin, or Oura ring in one click.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">02</div>
                <div>
                  <h4 className="step-title">Set your target</h4>
                  <p className="step-desc">Tell us if you want to lose weight, build muscle, or increase endurance.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">03</div>
                <div>
                  <h4 className="step-title">Execute the plan</h4>
                  <p className="step-desc">Follow the daily generated protocols and watch the results compound.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="steps-visual">
             <div className="circle-graphic">
               <div className="pulse-ring"></div>
               <div className="center-icon"><Dumbbell size={48} /></div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container glass-panel">
          <h2 className="cta-title">Ready to unlock your potential?</h2>
          <p className="cta-desc">Join thousands of athletes who have already transformed their training.</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg" style={{ background: 'white' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon-wrap">
                <img src={logoUrl} alt="FitTrack Logo" className="logo-img" />
              </div>
              <span className="logo-text">FitTrack</span>
            </div>
            <p className="footer-desc">The ultimate operating system for athletes, coaches, and fitness enthusiasts.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Integrations</a>
              <a href="#">Pricing</a>
              <a href="#">Changelog</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FitTrack Elite Core. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
