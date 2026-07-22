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
import { cn } from '../lib/utils';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative font-lexend">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 md:pt-12 pb-24 px-6 sm:px-8 md:px-10 max-w-7xl mx-auto space-y-10 relative z-10"
      >
        {/* Top Header */}
        <motion.header 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        >
          <div>
            <h1 className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Workouts
            </h1>
            <p className="text-slate-500 font-light text-base mt-2">
              Track and log your training sessions with precision.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Log Session</span>
          </motion.button>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Form Analysis */}
          <motion.section 
            variants={itemVariants} 
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-purple-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-500">AI Vision</span>
                </div>
                <h3 className="text-2xl font-space font-bold text-slate-900 tracking-tight">Form Analysis</h3>
              </div>
            </div>
            <p className="text-slate-500 italic font-light text-sm leading-relaxed mb-8">
              "Your running cadence has improved by 4%. Maintain current stride length for optimal energy efficiency during your next long run."
            </p>
            <div className="flex items-center gap-2.5 mt-auto">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-500">Tracking Active</span>
            </div>
          </motion.section>

          {/* Recovery Timer */}
          <motion.section 
            variants={itemVariants} 
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-500 mb-6 absolute top-8 left-8">Recovery Timer</h3>
            
            <div className="relative mb-8 mt-4 cursor-pointer group" onClick={() => setTimerActive(!timerActive)}>
              <svg className="w-48 h-48 transform -rotate-90">
                <circle className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" r="90" cx="96" cy="96" />
                <motion.circle 
                  initial={{ strokeDashoffset: 565 }}
                  animate={{ strokeDashoffset: 565 - (565 * (timeLeft / 105)) }}
                  className="text-blue-500" 
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
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-space font-bold text-slate-900 tracking-tighter">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-[240px]">
              <button 
                onClick={() => { setTimeLeft(105); setTimerActive(false); }}
                className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={cn(
                  "flex-1 rounded-xl font-medium text-sm transition-colors border",
                  timerActive 
                    ? "bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                )}
              >
                {timerActive ? 'Pause' : 'Start'}
              </button>
            </div>
          </motion.section>
        </div>

        {/* Activity Log */}
        <motion.section variants={itemVariants} className="pt-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-space font-bold text-slate-900">Recent Activity</h2>
            <button className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
              <Search size={18} />
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              </div>
            ) : workouts.length === 0 ? (
              <div className="bg-white border border-slate-200 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-12 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-5 border border-slate-100">
                  <Activity size={28} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-space font-bold text-slate-900 mb-2">No Sessions Yet</h3>
                <p className="text-slate-500 font-light text-sm mb-6">Log your first session to start tracking your progress.</p>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  Log First Session
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {workouts.map((workout, idx) => {
                  let dateStr = 'Unknown Date';
                  try {
                    const d = workout.date ? new Date(workout.date) : new Date();
                    dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  } catch (e) {}
                  
                  return (
                    <motion.div 
                      key={workout._id || idx}
                      variants={itemVariants}
                      className="bg-white shadow-sm border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 group cursor-pointer hover:border-blue-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center border",
                          workout.type === 'running' 
                            ? "bg-blue-50 border-blue-100 text-blue-500" 
                            : "bg-purple-50 border-purple-100 text-purple-500"
                        )}>
                          {workout.type === 'running' ? <Zap size={20} /> : <Dumbbell size={20} />}
                        </div>
                        <div>
                          <h4 className="text-base font-space font-bold text-slate-900 mb-1">
                            {workout.title || 'Training Session'}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider",
                              workout.type === 'running' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                            )}>
                              {workout.type}
                            </span>
                            <span className="text-xs text-slate-500">{dateStr}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 sm:gap-10 pl-16 sm:pl-0">
                        <div>
                          <p className="text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Duration</p>
                          <p className="text-lg font-space font-bold text-slate-900">{workout.duration}<span className="text-xs font-lexend text-slate-500 ml-1">m</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Burn</p>
                          <p className="text-lg font-space font-bold text-slate-900">{workout.caloriesBurned || 0}<span className="text-xs font-lexend text-slate-500 ml-1">kcal</span></p>
                        </div>
                        <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-slate-200 w-full max-w-md rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-space font-bold text-slate-900">Log Session</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleAddWorkout} className="p-6 space-y-5 bg-white">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-600 ml-1">Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none transition-colors placeholder:text-slate-400"
                    placeholder="e.g. Morning Run"
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-600 ml-1">Type</label>
                    <select 
                      value={type} 
                      onChange={e => setType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="running">Running</option>
                      <option value="strength">Strength</option>
                      <option value="yoga">Yoga</option>
                      <option value="hiit">HIIT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-600 ml-1">Duration (min)</label>
                    <input 
                      type="number" 
                      value={duration} 
                      onChange={e => setDuration(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none transition-colors placeholder:text-slate-400"
                      placeholder="45"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-600 ml-1">Calories (optional)</label>
                  <input 
                    type="number" 
                    value={calories} 
                    onChange={e => setCalories(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none transition-colors placeholder:text-slate-400"
                    placeholder="350"
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold text-sm py-4 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Save Session
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
