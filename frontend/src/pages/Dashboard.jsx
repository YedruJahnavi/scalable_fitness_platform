import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuthStore } from '../lib/store';
import { 
  Activity, 
  Flame, 
  Timer, 
  Footprints 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { WorkoutRecommendation } from '../components/dashboard/WorkoutRecommendation';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { user, loadFromStorage } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
    api.get('/analytics/weekly')
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [loadFromStorage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-slate-200 border-[3px] border-t-blue-600 animate-spin" />
          <p className="font-lexend text-slate-500 text-sm">Syncing...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Heart Rate', value: data?.summary?.avgHR || 124, unit: 'bpm', color: '#EF4444', icon: Activity, trend: '+4%', isPositive: false },
    { label: 'Energy Burn', value: data?.summary?.totalCalories || 842, unit: 'kcal', color: '#F97316', icon: Flame, trend: '-2%', isPositive: false },
    { label: 'Active Mins', value: data?.summary?.activeMinutes || 45, unit: 'min', color: '#10B981', icon: Timer, trend: '+12%', isPositive: true },
    { label: 'Total Steps', value: (data?.summary?.totalSteps || 8432).toLocaleString(), unit: 'steps', color: '#3B82F6', icon: Footprints, trend: '+5%', isPositive: true },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-x-hidden font-lexend">
      {/* Subtle radial gradient at top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.05),transparent)] pointer-events-none" />

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 md:pt-12 pb-24 px-6 sm:px-8 md:px-10 max-w-7xl mx-auto relative z-10 space-y-12"
      >
        {/* Welcome Section */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              {getGreeting()}, <br />
              <span className="text-slate-900">
                {user?.name?.split(' ')[0] || 'Athlete'}
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-light">
              You are on track to beat your weekly activity goal by 15%.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-slate-200 shadow-sm px-5 py-3 rounded-2xl">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Readiness Score</span>
              <span className="text-xl font-space font-bold text-slate-900">94<span className="text-slate-400 text-sm">/100</span></span>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.section>

        {/* Charts and Recommendations */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-space text-xl font-semibold text-slate-900">Activity Overview</h2>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                {['1W', '1M', '3M', 'YTD'].map((tab, idx) => (
                  <button 
                    key={tab} 
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${idx === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <ActivityChart itemVariants={itemVariants} />
          </div>
          <div className="lg:col-span-1 bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
            <WorkoutRecommendation itemVariants={itemVariants} />
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
