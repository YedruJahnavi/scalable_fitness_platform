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
import './Dashboard.css';

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
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner" />
          <p className="loading-text">Syncing metrics...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Heart Rate', value: data?.summary?.avgHR || 124, unit: 'bpm', color: '#FF3B30', icon: Activity, trend: '+4%', isPositive: false },
    { label: 'Energy Burn', value: data?.summary?.totalCalories || 842, unit: 'kcal', color: '#FF9500', icon: Flame, trend: '-2%', isPositive: false },
    { label: 'Active Mins', value: data?.summary?.activeMinutes || 45, unit: 'min', color: '#34C759', icon: Timer, trend: '+12%', isPositive: true },
    { label: 'Total Steps', value: (data?.summary?.totalSteps || 8432).toLocaleString(), unit: 'steps', color: '#007AFF', icon: Footprints, trend: '+5%', isPositive: true },
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
    <div className="dashboard-container">
      <div className="dashboard-gradient-bg" />

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="dashboard-main"
      >
        {/* Welcome Section */}
        <motion.section variants={itemVariants} className="welcome-section">
          <div className="welcome-text-wrap">
            <h1 className="welcome-title">
              {getGreeting()}, <br />
              <span style={{ color: 'var(--color-accent-primary)' }}>
                {user?.name?.split(' ')[0] || 'Athlete'}
              </span>
            </h1>
            <p className="welcome-subtitle">
              You are on track to beat your weekly activity goal by 15%.
            </p>
          </div>
          
          <div className="readiness-card">
            <div className="readiness-dot-wrap">
              <div className="readiness-dot" />
            </div>
            <div className="readiness-info">
              <span className="readiness-label">Readiness Score</span>
              <span className="readiness-value">94<span className="readiness-max">/100</span></span>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={itemVariants} className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.section>

        {/* Charts and Recommendations */}
        <motion.section variants={itemVariants} className="charts-grid">
          <ActivityChart itemVariants={itemVariants} />
          <WorkoutRecommendation itemVariants={itemVariants} />
        </motion.section>
      </motion.main>
    </div>
  );
}
