import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { 
  HeartPulse, 
  Activity, 
  Flame, 
  TrendingUp, 
  ArrowUpRight,
  Settings,
  Timer
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Analytics.css';

export default function Analytics() {
  const [metricType, setMetricType] = useState('heartRate');

  const chartData = [
    { day: 'Mon', heartRate: 110, steps: 6000, calories: 1800 },
    { day: 'Tue', heartRate: 125, steps: 8500, calories: 2300 },
    { day: 'Wed', heartRate: 115, steps: 7200, calories: 2100 },
    { day: 'Thu', heartRate: 140, steps: 11000, calories: 2800 },
    { day: 'Fri', heartRate: 120, steps: 6500, calories: 1950 },
    { day: 'Sat', heartRate: 145, steps: 14000, calories: 3100 },
    { day: 'Sun', heartRate: 118, steps: 5800, calories: 1750 },
  ];

  const metrics = [
    { id: 'heartRate', label: 'Heart Rate', icon: HeartPulse, color: '#EF4444', sub: 'Cardio Load' },
    { id: 'steps', label: 'Daily Volume', icon: Activity, color: '#10B981', sub: 'Movement Tracking' },
    { id: 'calories', label: 'Metabolic', icon: Flame, color: '#F59E0B', sub: 'Energy Burn' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="analytics-container">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-main"
      >
        {/* Top Header */}
        <motion.header 
          variants={itemVariants}
          className="analytics-header"
        >
          <div>
            <h1 className="analytics-title">Performance</h1>
            <p className="analytics-subtitle">
              Deep dive into your physiological data and recovery metrics.
            </p>
          </div>
          <div className="header-actions">
            <div className="trend-badge">
              <div className="trend-dot" />
              <span className="trend-text">Trend <span className="trend-val">+12.4%</span></span>
            </div>
            <button className="settings-btn">
              <Settings size={20} />
            </button>
          </div>
        </motion.header>

        {/* Metric Grid */}
        <motion.section variants={itemVariants} className="metrics-grid">
          {metrics.map((m) => {
            const isActive = metricType === m.id;
            return (
              <button 
                key={m.id}
                onClick={() => setMetricType(m.id)}
                className={`metric-btn ${isActive ? 'active' : ''}`}
                style={{ 
                  borderColor: isActive ? m.color : undefined,
                }}
              >
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div 
                    className="metric-icon-wrap" 
                    style={{ backgroundColor: `${m.color}15`, color: m.color }}
                  >
                    <m.icon size={24} />
                  </div>
                  <h3 className="metric-title" style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                    {m.label}
                  </h3>
                  <p className="metric-sub">{m.sub}</p>
                </div>
              </button>
            );
          })}
        </motion.section>

        {/* Chart Visualization */}
        <motion.section variants={itemVariants} className="viz-section">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2 className="chart-title">Weekly Trends</h2>
                <p className="chart-subtitle">Analyzing {metrics.find(m => m.id === metricType)?.label.toLowerCase()} over 7 days</p>
              </div>
              <div className="time-filters">
                {['1W', '1M', '3M', 'YTD'].map((p) => (
                  <button key={p} className={`time-filter-btn ${p === '1W' ? 'active' : ''}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metrics.find(m => m.id === metricType)?.color} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={metrics.find(m => m.id === metricType)?.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="var(--color-text-tertiary)" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontWeight: 400 }} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="var(--color-text-tertiary)" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontWeight: 400 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-bg-elevated)', 
                      border: '1px solid var(--color-border)', 
                      borderRadius: '16px', 
                      padding: '12px 16px',
                      color: 'var(--color-text-primary)'
                    }}
                    itemStyle={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: 600 }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={metricType} 
                    stroke={metrics.find(m => m.id === metricType)?.color} 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorMetric)" 
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* AI Intelligence Card */}
            <div className="ai-coach-card">
              <div className="coach-icon">
                <TrendingUp size={24} />
              </div>
              
              <h3 className="coach-title">AI Coach</h3>
              
              <p className="coach-text">
                Your cardiovascular strain indicates elevated exertion during Thursday sessions. Consider shifting Friday to active recovery to maintain optimal readiness.
              </p>
              
              <div className="coach-footer">
                <div className="readiness-info">
                  <span className="readiness-label">Current Readiness</span>
                  <span className="readiness-val">
                    <span className="readiness-dot" />
                    92%
                  </span>
                </div>
                <button className="adjust-btn">
                  Adjust Training Plan
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Global Stats Footer */}
        <motion.section variants={itemVariants} className="stats-footer">
          {[
            { label: 'Total Active Time', val: '242 hrs', icon: Timer, color: '#10B981' },
            { label: 'VO2 Max Estimate', val: '52.4', icon: Activity, color: '#8B5CF6' },
          ].map((stat, i) => (
            <div key={i} className="footer-stat-card">
              <div className="footer-stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={28} />
              </div>
              <div className="footer-stat-content">
                <p className="footer-stat-label">{stat.label}</p>
                <p className="footer-stat-val">{stat.val}</p>
              </div>
              <div className="footer-stat-arrow">
                <ArrowUpRight size={20} />
              </div>
            </div>
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
}
