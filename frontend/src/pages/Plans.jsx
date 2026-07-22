import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
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
      <div className="flex h-screen items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6 relative z-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 border border-blue-200 shadow-sm"
          >
            <BrainCircuit className="w-8 h-8 text-blue-600" />
          </motion.div>
          <div className="space-y-2 text-center">
            <p className="font-lexend text-sm font-semibold text-blue-600 tracking-widest uppercase animate-pulse">Analyzing...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative font-lexend selection:bg-blue-200 selection:text-blue-900">
      <main className="pt-8 md:pt-12 pb-24 px-6 sm:px-8 md:px-10 max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Top Header */}
        <motion.header 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Training Plan
              </h1>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                AI-Powered
              </span>
            </div>
            <p className="text-slate-500 font-light text-lg max-w-md">
              Personalized intelligence-driven training programs.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGeneratePlan} 
            disabled={generating}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            )}
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
              className="w-full bg-slate-50/50 border border-slate-300 border-dashed rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="relative z-10 max-w-lg space-y-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                  <BrainCircuit className="w-10 h-10 text-slate-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-space font-bold text-slate-700 tracking-tight">No Active Plan</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed">
                    Let our intelligence engine analyze your goals and biometrics to generate a custom training schedule designed for elite results.
                  </p>
                </div>
                <button 
                  onClick={handleGeneratePlan} 
                  disabled={generating}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  Generate First Plan
                </button>
              </div>
            </motion.section>
          ) : (
            <motion.div 
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              {/* Mission Stats */}
              <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Focus Area', val: activePlan.planType.replace('_', ' '), icon: Target },
                  { label: 'Intensity', val: activePlan.difficulty, icon: Activity },
                  { label: 'Duration', val: `${activePlan.durationWeeks} Weeks`, icon: Clock },
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">{stat.label}</span>
                      <h4 className="text-lg font-space font-semibold text-slate-900 capitalize mt-0.5">{stat.val}</h4>
                    </div>
                  </div>
                ))}
              </motion.section>

              {/* Tactical Directives */}
              <motion.section variants={itemVariants} className="bg-blue-50 p-6 sm:p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-blue-100 shadow-sm">
                    <ListChecks size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-space font-semibold text-slate-900">AI Recommendations</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {activePlan.recommendations?.map((rec, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-4 p-4 bg-white border border-blue-50 rounded-2xl shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-space font-bold">{i+1}</span>
                      </div>
                      <p className="text-sm text-slate-700 font-light leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Weekly Timeline */}
              <motion.section variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-space font-semibold text-slate-900">Weekly Schedule</h3>
                </div>
                
                <div className="space-y-6">
                  {activePlan.schedule && Object.keys(activePlan.schedule).map((weekKey, idx) => (
                    <div key={weekKey} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-end mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-6 bg-blue-600 rounded-full" />
                          <h4 className="text-lg font-space font-medium text-slate-900 capitalize">{weekKey.replace('_', ' ')}</h4>
                        </div>
                        <span className="text-4xl font-space font-bold text-slate-100">0{idx + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {activePlan.schedule[weekKey].map((day, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "p-5 rounded-2xl transition-all flex flex-col justify-between min-h-[140px] group",
                              day.type === 'Rest' 
                                ? 'bg-slate-50 border border-slate-200 opacity-60' 
                                : 'bg-white border border-slate-200 shadow-sm hover:border-blue-400'
                            )}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{day.day}</span>
                              {day.duration > 0 && (
                                <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                  <Clock size={12} className="text-slate-500" />
                                  <span className="text-[10px] font-medium">{day.duration}m</span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <span className={cn(
                                "text-lg font-space font-semibold block leading-tight mb-2",
                                day.type === 'Rest' ? 'text-slate-500' : 'text-slate-900'
                              )}>
                                {day.type}
                              </span>
                              {day.type !== 'Rest' && (
                                <div className="flex items-center gap-1.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider">View Details</span>
                                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
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
