import { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  Target, 
  Activity,
  Clock, 
  BrainCircuit, 
  Calendar, 
  ListChecks,
  ArrowRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Plans.css';

export default function Plans() {
  const [activePlan, setActivePlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchActivePlan = async () => {
    try {
      const { data } = await api.get('/plans/active');
      setActivePlan(data.plan);
    } catch (err) { 
      console.error('Failed to fetch plan', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivePlan();
  }, []);

  const handleGeneratePlan = async () => {
    setGenerating(true);
    try {
      const { data } = await api.post('/plans/generate', { duration_weeks: 4 });
      setActivePlan(data.plan);
    } catch (err) { 
      console.error('Failed to generate plan', err);
    }
    setGenerating(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ 
              width: 64, height: 64, borderRadius: 16, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' 
            }}
          >
            <BrainCircuit size={32} style={{ color: 'var(--color-accent-primary)' }} />
          </motion.div>
          <p className="loading-text" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Analyzing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plans-container">
      <main className="plans-main">
        <motion.header 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="plans-header"
        >
          <div>
            <div className="plans-title-wrap">
              <h1 className="plans-title">Training Plan</h1>
              <span className="ai-badge">AI-Powered</span>
            </div>
            <p className="plans-subtitle">
              Personalized intelligence-driven training programs.
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGeneratePlan} 
            disabled={generating}
            className="generate-btn"
          >
            {generating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            <span>{activePlan ? 'Re-optimize' : 'Generate Plan'}</span>
          </motion.button>
        </motion.header>

        <AnimatePresence mode="wait">
          {!activePlan ? (
            <motion.section 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="plans-empty"
            >
              <div className="empty-icon">
                <BrainCircuit size={40} />
              </div>
              <h3 className="empty-title">No Active Plan</h3>
              <p className="empty-desc">
                Let our intelligence engine analyze your goals and biometrics to generate a custom training schedule designed for elite results.
              </p>
              <button 
                onClick={handleGeneratePlan} 
                disabled={generating}
                className="generate-btn"
              >
                Generate First Plan
              </button>
            </motion.section>
          ) : (
            <motion.div 
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
            >
              {/* Mission Stats */}
              <motion.section variants={itemVariants} className="plans-stats">
                {[
                  { label: 'Focus Area', val: activePlan.planType.replace('_', ' '), icon: Target },
                  { label: 'Intensity', val: activePlan.difficulty, icon: Activity },
                  { label: 'Duration', val: `${activePlan.durationWeeks} Weeks`, icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="plan-stat-card">
                    <div className="plan-stat-icon">
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <span className="plan-stat-label">{stat.label}</span>
                      <h4 className="plan-stat-value">{stat.val}</h4>
                    </div>
                  </div>
                ))}
              </motion.section>

              {/* Tactical Directives */}
              <motion.section variants={itemVariants} className="plans-directives">
                <div className="section-header">
                  <div className="section-icon">
                    <ListChecks size={20} />
                  </div>
                  <h3 className="section-title">AI Recommendations</h3>
                </div>
                
                <div className="directive-grid">
                  {activePlan.recommendations?.map((rec, i) => (
                    <div key={i} className="directive-card">
                      <div className="directive-number">{i+1}</div>
                      <p className="directive-text">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Weekly Timeline */}
              <motion.section variants={itemVariants} className="schedule-container">
                <div className="section-header" style={{ marginBottom: 0 }}>
                  <div className="section-icon" style={{ backgroundColor: 'transparent' }}>
                    <Calendar size={20} />
                  </div>
                  <h3 className="section-title">Weekly Schedule</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {activePlan.schedule && Object.keys(activePlan.schedule).map((weekKey, idx) => (
                    <div key={weekKey} className="week-card">
                      <div className="week-header">
                        <div className="week-title-wrap">
                          <div className="week-indicator" />
                          <h4 className="week-title">{weekKey.replace('_', ' ')}</h4>
                        </div>
                        <span className="week-number">0{idx + 1}</span>
                      </div>

                      <div className="days-grid">
                        {activePlan.schedule[weekKey].map((day, i) => (
                          <div 
                            key={i} 
                            className={`day-card ${day.type === 'Rest' ? 'rest' : ''}`}
                          >
                            <div className="day-header">
                              <span className="day-name">{day.day}</span>
                              {day.duration > 0 && (
                                <div className="day-duration">
                                  <Clock size={12} />
                                  <span>{day.duration}m</span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <span className="day-type">{day.type}</span>
                              {day.type !== 'Rest' && (
                                <div className="day-action">
                                  <span>View Details</span>
                                  <ArrowRight size={12} className="day-action-icon" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
