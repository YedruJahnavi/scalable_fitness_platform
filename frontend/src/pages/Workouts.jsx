import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import { 
  Plus, 
  Dumbbell,
  Zap,
  Activity,
  Search, 
  RotateCcw,
  ArrowRight,
  X
} from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import './Workouts.css';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('running');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { loadFromStorage } = useAuthStore();
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(105); // 01:45

  const fetchWorkouts = useCallback(async () => {
    try {
      const { data } = await api.get('/workouts');
      setWorkouts(data.workouts || []);
    } catch (err) { 
      console.error('Failed to fetch workouts', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
    fetchWorkouts();
  }, [loadFromStorage, fetchWorkouts]);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimeout(() => setTimerActive(false), 0);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/workouts', {
        title,
        type,
        duration: Number(duration),
        caloriesBurned: Number(calories),
      });
      setTitle(''); setDuration(''); setCalories('');
      setIsModalOpen(false);
      fetchWorkouts();
    } catch (err) { 
      console.error('Failed to add workout', err);
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="workouts-container">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="workouts-main"
      >
        {/* Top Header */}
        <motion.header 
          variants={itemVariants}
          className="workouts-header"
        >
          <div>
            <h1 className="workouts-title">Workouts</h1>
            <p className="workouts-subtitle">
              Track and log your training sessions with precision.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="log-btn"
          >
            <Plus size={20} />
            <span>Log Session</span>
          </motion.button>
        </motion.header>

        <div className="widgets-grid">
          {/* AI Form Analysis */}
          <motion.section 
            variants={itemVariants} 
            className="widget-card"
          >
            <div className="widget-header">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="widget-icon-label">
                  <Activity size={16} />
                  <span>AI Vision</span>
                </div>
                <h3 className="widget-title">Form Analysis</h3>
              </div>
            </div>
            <p className="widget-quote">
              "Your running cadence has improved by 4%. Maintain current stride length for optimal energy efficiency during your next long run."
            </p>
            <div className="tracking-status">
              <div className="status-dot" />
              <span className="status-text">Tracking Active</span>
            </div>
          </motion.section>

          {/* Recovery Timer */}
          <motion.section 
            variants={itemVariants} 
            className="widget-card timer-widget"
          >
            <h3 className="timer-label">Recovery Timer</h3>
            
            <div className="timer-circle-wrap" onClick={() => setTimerActive(!timerActive)}>
              <svg className="timer-svg">
                <circle className="timer-bg" strokeWidth="4" stroke="currentColor" fill="transparent" r="90" cx="96" cy="96" />
                <motion.circle 
                  initial={{ strokeDashoffset: 565 }}
                  animate={{ strokeDashoffset: 565 - (565 * (timeLeft / 105)) }}
                  className="timer-progress" 
                  strokeWidth="6" 
                  strokeDasharray="565" 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="90" 
                  cx="96" 
                  cy="96" 
                />
              </svg>
              <div className="timer-text-wrap">
                <span className="timer-text">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="timer-controls">
              <button 
                onClick={() => { setTimeLeft(105); setTimerActive(false); }}
                className="timer-reset"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={`timer-toggle ${timerActive ? 'active' : 'inactive'}`}
              >
                {timerActive ? 'Pause' : 'Start'}
              </button>
            </div>
          </motion.section>
        </div>

        {/* Activity Log */}
        <motion.section variants={itemVariants} className="activity-section">
          <div className="activity-header">
            <h2 className="activity-title">Recent Activity</h2>
            <button className="search-btn">
              <Search size={18} />
            </button>
          </div>

          <div className="workouts-list">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner" />
              </div>
            ) : workouts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Activity size={28} />
                </div>
                <h3 className="empty-title">No Sessions Yet</h3>
                <p className="empty-desc">Log your first session to start tracking your progress.</p>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="log-btn" style={{ margin: '0 auto' }}
                >
                  Log First Session
                </button>
              </div>
            ) : (
              <div className="workouts-list">
                {workouts.map((workout, idx) => {
                  let dateStr = 'Unknown Date';
                  try {
                    const d = workout.date ? new Date(workout.date) : new Date();
                    dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  } catch { /* ignore date parsing errors */ }
                  
                  const isRunning = workout.type === 'running';

                  return (
                    <motion.div 
                      key={workout._id || idx}
                      variants={itemVariants}
                      className="workout-row"
                    >
                      <div className="workout-info-left">
                        <div className={`workout-icon ${isRunning ? 'running' : 'strength'}`}>
                          {isRunning ? <Zap size={20} /> : <Dumbbell size={20} />}
                        </div>
                        <div>
                          <h4 className="workout-title">
                            {workout.title || 'Training Session'}
                          </h4>
                          <div className="workout-meta">
                            <span className={`workout-badge ${isRunning ? 'running' : 'strength'}`}>
                              {workout.type}
                            </span>
                            <span className="workout-date">{dateStr}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="workout-info-right">
                        <div>
                          <p className="stat-label">Duration</p>
                          <p className="stat-value">{workout.duration}<span className="stat-unit">m</span></p>
                        </div>
                        <div>
                          <p className="stat-label">Burn</p>
                          <p className="stat-value">{workout.caloriesBurned || 0}<span className="stat-unit">kcal</span></p>
                        </div>
                        <div className="row-arrow">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>
      </motion.main>

      {/* Log Session Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="modal-content"
            >
              <div className="modal-header">
                <h2 className="modal-title">Log Session</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="close-btn"
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleAddWorkout} className="modal-form">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-input"
                    placeholder="e.g. Morning Run"
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select 
                      value={type} 
                      onChange={e => setType(e.target.value)}
                      className="form-select"
                    >
                      <option value="running">Running</option>
                      <option value="strength">Strength</option>
                      <option value="yoga">Yoga</option>
                      <option value="hiit">HIIT</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (min)</label>
                    <input 
                      type="number" 
                      value={duration} 
                      onChange={e => setDuration(e.target.value)} 
                      className="form-input"
                      placeholder="45"
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Calories (optional)</label>
                  <input 
                    type="number" 
                    value={calories} 
                    onChange={e => setCalories(e.target.value)} 
                    className="form-input"
                    placeholder="350"
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Save Session
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
