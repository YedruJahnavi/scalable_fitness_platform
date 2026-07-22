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
import { cn } from '../lib/utils';

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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
        >
          <div>
            <h1 className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Performance
            </h1>
            <p className="text-slate-500 font-light text-lg mt-2 max-w-md">
              Deep dive into your physiological data and recovery metrics.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-700 px-5 py-3 rounded-xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold">Trend <span className="ml-1">+12.4%</span></span>
            </div>
            <button className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600">
              <Settings size={20} />
            </button>
          </div>
        </motion.header>

        {/* Metric Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m) => {
            const isActive = metricType === m.id;
            return (
              <motion.button 
                key={m.id}
                whileHover={{ y: -2 }}
                onClick={() => setMetricType(m.id)}
                className={cn(
                  "relative p-8 rounded-3xl text-left transition-all overflow-hidden group cursor-pointer",
                  isActive 
                    ? "bg-white shadow-md border-2" 
                    : "bg-white border border-slate-100 shadow-sm text-slate-500 hover:bg-slate-50"
                )}
                style={{ 
                  borderColor: isActive ? m.color : undefined,
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="metricSelector"
                    className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" 
                      style={{ backgroundColor: `${m.color}15`, color: m.color }}
                    >
                      <m.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className={cn("text-2xl font-space font-bold mb-1", isActive ? "text-slate-900" : "text-slate-700")}>{m.label}</h3>
                  <p className="text-sm font-medium text-slate-500">{m.sub}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.section>

        {/* Chart Visualization */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm p-8 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-space font-bold text-slate-900">Weekly Trends</h2>
                <p className="text-sm text-slate-500 font-light mt-1">Analyzing {metrics.find(m => m.id === metricType)?.label.toLowerCase()} over 7 days</p>
              </div>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {['1W', '1M', '3M', 'YTD'].map((p) => (
                  <button key={p} className={cn(
                    "px-4 py-1.5 rounded-lg font-medium text-xs transition-all",
                    p === '1W' ? "bg-white text-blue-600 shadow" : "text-slate-500 hover:text-slate-900"
                  )}>{p}</button>
                ))}
              </div>
            </div>

            <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metrics.find(m => m.id === metricType)?.color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={metrics.find(m => m.id === metricType)?.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontFamily: 'inherit', fill: '#64748b', fontWeight: 400 }} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontFamily: 'inherit', fill: '#64748b', fontWeight: 400 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '16px', 
                      padding: '12px 16px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: '#0f172a', fontSize: '14px', fontWeight: 600 }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
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

          <div className="flex flex-col h-full gap-6">
            {/* AI Intelligence Card */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl relative overflow-hidden flex flex-col group h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-space font-bold text-slate-900 mb-2">AI Coach</h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                Your cardiovascular strain indicates elevated exertion during Thursday sessions. Consider shifting Friday to active recovery to maintain optimal readiness.
              </p>
              
              <div className="mt-auto space-y-6 relative z-10 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Current Readiness</span>
                  <span className="text-slate-900 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    92%
                  </span>
                </div>
                <button className="w-full bg-transparent border-2 border-blue-600 text-blue-600 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
                  Adjust Training Plan
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Global Stats Footer */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {[
            { label: 'Total Active Time', val: '242 hrs', icon: Timer, color: '#10B981' },
            { label: 'VO2 Max Estimate', val: '52.4', icon: Activity, color: '#8B5CF6' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -2 }}
              className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl flex items-center gap-6 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-space font-bold text-slate-900">{stat.val}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-slate-900" />
              </div>
            </motion.div>
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
}
