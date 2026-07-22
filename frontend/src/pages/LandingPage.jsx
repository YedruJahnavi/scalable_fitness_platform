import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Activity, 
  Target, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  BarChart3,
  Flame,
  Dumbbell
} from "lucide-react";
import './LandingPage.css';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="landing-page">
      {/* Dynamic Background */}
      <div className="landing-bg">
        <div className="landing-noise"></div>
        <motion.div style={{ y, opacity }} className="glow-orb-1" />
        <motion.div style={{ y, opacity }} className="glow-orb-2" />
      </div>

      {/* Navigation */}
      <nav className="nav-header container">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <span className="logo-text">FitTrack</span>
          </div>
          
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#tech" className="nav-link">Technology</a>
            <a href="#community" className="nav-link">Community</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-grid">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-content"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="badge badge-glow"
            >
              Platform v3.0 Early Access
            </motion.div>
            
            <h1 className="hero-title">
              Redefine your<br />
              <span className="text-gradient">potential.</span>
            </h1>
            
            <p className="hero-subtitle">
              Experience the pinnacle of fitness intelligence. Sync your devices, analyze metrics in real-time, and achieve your goals with elite algorithmic precision.
            </p>

            <div className="hero-actions">
              <Link to="/register">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary"
                >
                  Start Training
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <a href="#features">
                <button className="btn btn-outline">
                  View Features
                </button>
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">42K+</span>
                <span className="stat-label">Active Athletes</span>
              </div>
              <div className="stat-item">
                <span className="stat-value" style={{ color: "var(--color-accent-primary)" }}>1.2M</span>
                <span className="stat-label">Workouts Logged</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">99%</span>
                <span className="stat-label">Goal Success Rate</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hero-visual"
          >
            {/* Main Interactive Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-panel main-card animate-pulse-glow"
              style={{ position: "absolute", right: 0, zIndex: 20 }}
            >
               <div className="card-header">
                 <div>
                   <h3 className="session-title font-display">Current Session</h3>
                   <div className="session-status">
                     <span className="status-dot animate-pulse"></span>
                     High Intensity Interval
                   </div>
                 </div>
                 <div className="icon-box">
                   <Zap size={24} />
                 </div>
               </div>
               
               <div>
                 <div className="metrics-large">
                   <div>
                     <div className="metric-value-huge text-gradient">164</div>
                     <div className="stat-label" style={{ marginTop: 8 }}>BPM Average</div>
                   </div>
                 </div>
                 
                 <div className="metrics-grid">
                   <div className="metric-small">
                     <div className="metric-icon-red"><Flame size={20} /></div>
                     <div>
                       <div className="metric-value">842</div>
                       <div className="stat-label">Calories</div>
                     </div>
                   </div>
                   <div className="metric-small">
                     <div className="metric-icon-green"><Activity size={20} /></div>
                     <div>
                       <div className="metric-value">45m</div>
                       <div className="stat-label">Duration</div>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15], rotate: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glass-panel"
              style={{ position: "absolute", left: 0, top: "25%", padding: "20px", display: "flex", gap: "16px", alignItems: "center", zIndex: 30 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-accent-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Dumbbell size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>New PR Achieved!</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Deadlift: 315 lbs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="features-section container">
        <div className="section-header">
          <h2 className="section-title text-gradient">Engineered for elite performance.</h2>
          <p className="hero-subtitle" style={{ margin: "0 auto" }}>Everything you need to track, analyze, and optimize your fitness journey in one unified, intelligent platform.</p>
        </div>
        
        <div className="feature-grid">
          <motion.div whileHover={{ y: -5 }} className="glass-panel feature-card feat-large">
            <div>
              <div className="feature-icon bg-primary-light"><Activity size={32} /></div>
              <h3 className="feature-title">Biometric Intelligence</h3>
              <p className="feature-desc">Connect wearables and let our advanced algorithms analyze your heart rate variability, sleep debt, and recovery status in real-time.</p>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -5 }} className="glass-panel feature-card feat-small">
            <div>
              <div className="feature-icon bg-purple-light"><Target size={32} /></div>
              <h3 className="feature-title">Adaptive AI Plans</h3>
              <p className="feature-desc">Workouts that dynamically evolve based on your daily recovery metrics and performance history.</p>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -5 }} className="glass-panel feature-card feat-small">
            <div>
              <div className="feature-icon bg-pink-light"><ShieldCheck size={32} /></div>
              <h3 className="feature-title">Secure Coaching</h3>
              <p className="feature-desc">Direct, encrypted communication channels to elite fitness coaches and nutritionists worldwide.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="glass-panel feature-card feat-large">
            <div>
              <div className="feature-icon bg-white-light"><Activity size={32} /></div>
              <h3 className="feature-title">Global Community Hub</h3>
              <p className="feature-desc">Join specialized groups, climb the global leaderboard, and interact with fellow athletes in real-time. Your tribe is waiting.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
