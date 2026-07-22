import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import api from '../lib/api';
import { 
  Sparkles,
  User, 
  Shield, 
  Watch, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  Trophy, 
  Sun, 
  Flame,
  Target,
  Settings,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  Flame as FlameIcon,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});

  const WEARABLES = [
    { id: 'apple_health', name: 'Apple Health', icon: <Sun size={20} />, color: 'text-emerald-500' },
    { id: 'google_fit', name: 'Google Fit', icon: <TrendingUp size={20} />, color: 'text-blue-500' },
    { id: 'fitbit', name: 'Fitbit', icon: <Watch size={20} />, color: 'text-rose-500' },
    { id: 'garmin', name: 'Garmin Connect', icon: <Trophy size={20} />, color: 'text-amber-500' }
  ];

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/user/profile');
      setUser(data.user);
      setProfile(data.profile || { deviceConnections: [] });
    } catch (err) { 
      console.error('Failed to load profile', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  const handleDeviceToggle = async (deviceId) => {
    const existingConnections = profile.deviceConnections || [];
    const isConnected = existingConnections.some((d) => d.deviceType === deviceId && d.isActive);
    
    let newConnections;
    if (isConnected) {
      newConnections = existingConnections.map((d) => 
        d.deviceType === deviceId ? { ...d, isActive: false } : d
      );
    } else {
      const exists = existingConnections.some((d) => d.deviceType === deviceId);
      if (exists) {
        newConnections = existingConnections.map((d) => 
          d.deviceType === deviceId ? { ...d, isActive: true } : d
        );
      } else {
        newConnections = [
           ...existingConnections, 
           { 
             deviceType: deviceId, 
             accessToken: `pending_auth_${deviceId}`,
             connectedAt: new Date(), 
             isActive: true,
             status: 'awaiting_auth'
           }
        ];
      }
    }

    try {
      await api.put('/user/profile', { deviceConnections: newConnections });
      setProfile({ ...profile, deviceConnections: newConnections });
    } catch (err) { 
      console.error('Failed to toggle device sync', err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="font-lexend text-sm font-medium text-blue-600 animate-pulse uppercase tracking-widest">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative font-lexend selection:bg-blue-100 selection:text-blue-900">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 md:pt-12 pb-24 px-6 sm:px-8 md:px-10 max-w-5xl mx-auto space-y-10"
      >
        {/* Profile Hero Section */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-6">
            <div className="relative">
              <div className="w-40 h-40 rounded-3xl bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative z-10 shadow-sm border border-slate-200">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80" 
                  alt="Profile" 
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-lexend font-bold uppercase tracking-wider shadow-md z-20 whitespace-nowrap">
                Elite Level
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-2 mt-4">
              <h2 className="font-space text-4xl sm:text-5xl font-bold text-slate-900">{user.name}</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center justify-center md:justify-start gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-xs">
                  <ShieldCheck size={14}/> Pro Member
                </span>
                <span className="hidden md:inline-block w-1 h-1 rounded-full bg-slate-300" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-center">
              <Activity size={24} className="text-blue-600 mb-4" />
              <div className="text-3xl font-space font-bold text-slate-900 mb-1">142</div>
              <div className="text-xs font-lexend text-slate-500 uppercase tracking-wide">Sessions</div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-center">
              <FlameIcon size={24} className="text-red-500 mb-4" />
              <div className="text-3xl font-space font-bold text-slate-900 mb-1">84.2k</div>
              <div className="text-xs font-lexend text-slate-500 uppercase tracking-wide">Kcal Burned</div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-center">
              <Clock size={24} className="text-emerald-500 mb-4" />
              <div className="text-3xl font-space font-bold text-slate-900 mb-1">248</div>
              <div className="text-xs font-lexend text-slate-500 uppercase tracking-wide">Hours Active</div>
            </div>
          </div>
        </motion.section>

        {/* Bio-Benchmarks Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-blue-600" />
            <h3 className="font-space text-2xl font-bold text-slate-900">Bio-Benchmarks</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Bench Press', value: '120', unit: 'kg' },
              { label: 'Deadlift', value: '180', unit: 'kg' },
              { label: 'Squat', value: '150', unit: 'kg' }
            ].map((pr, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-space font-bold text-slate-900 tracking-tighter">{pr.value}</span>
                  <span className="text-xl font-space font-medium text-slate-500">{pr.unit}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{pr.label} • Personal Record</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles size={24} className="text-blue-600" />
            <h3 className="font-space text-2xl font-bold text-slate-900">Achievements</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'early_bird', name: 'Early Bird', icon: <Sun size={24} />, color: 'text-amber-500', bg: 'bg-amber-50' },
              { id: 'century', name: 'Century Club', icon: <Cpu size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'streak', name: '5-Day Streak', icon: <Flame size={24} />, color: 'text-red-500', bg: 'bg-red-50' },
              { id: 'guardian', name: 'Secure Core', icon: <Shield size={24} />, color: 'text-emerald-500', bg: 'bg-emerald-50' }
            ].map(achievement => (
              <motion.div 
                key={achievement.id} 
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 transition-all hover:shadow-md text-center"
              >
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", achievement.bg, achievement.color)}>
                  {achievement.icon}
                </div>
                <div>
                  <p className="text-sm font-space font-bold text-slate-900 mb-1">{achievement.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Unlocked</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Settings Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <Settings size={24} className="text-slate-700" />
            <h3 className="font-space text-2xl font-bold text-slate-900">Settings & Devices</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden h-fit flex flex-col">
              {[
                { id: 'profile', label: 'Edit Profile Info', icon: <User size={20} />, color: 'text-slate-600', bg: 'bg-slate-100' },
                { id: 'security', label: 'Security & Privacy', icon: <ShieldCheck size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { id: 'notifications', label: 'Notifications', icon: <Target size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' }
              ].map(item => (
                <button key={item.id} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-0 group">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", item.bg)}>
                      <span className={item.color}>{item.icon}</span>
                    </div>
                    <span className="font-lexend font-medium text-sm text-slate-900">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
              ))}
            </div>
            
            {/* Connected Apps */}
            <div className="bg-white border border-slate-200 shadow-sm p-6 sm:p-8 rounded-3xl space-y-6">
               <div className="flex items-center justify-between">
                 <div>
                   <h4 className="text-xl font-space font-bold text-slate-900 mb-1">Connected Apps</h4>
                   <p className="text-xs font-lexend text-slate-500">Sync your bio-data automatically.</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                   <Zap size={20} />
                 </div>
               </div>
               
               <div className="space-y-3">
                 {WEARABLES.map(wearable => {
                   const isActive = profile.deviceConnections?.some((d) => d.deviceType === wearable.id && d.isActive);
                   return (
                     <div 
                       key={wearable.id}
                       className={cn(
                         "w-full flex items-center justify-between p-4 rounded-2xl transition-all border",
                         isActive 
                           ? 'bg-slate-50 border-slate-200' 
                           : 'bg-white border-slate-100 hover:border-slate-200'
                       )}
                     >
                       <div className="flex items-center gap-4">
                         <div className={cn(
                           "w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50",
                           wearable.color
                         )}>
                           {wearable.icon}
                         </div>
                         <span className="font-lexend font-medium text-sm text-slate-900 block">
                           {wearable.name}
                         </span>
                       </div>
                       <button
                         onClick={() => handleDeviceToggle(wearable.id)}
                         className={cn(
                           "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                           isActive 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-transparent text-slate-600 border border-slate-200 hover:bg-slate-50'
                         )}
                       >
                         {isActive ? 'Connected' : 'Connect'}
                       </button>
                     </div>
                   );
                 })}
               </div>
            </div>
          </div>
        </motion.section>

        {/* Sign Out Section */}
        <motion.section variants={itemVariants} className="pt-4 flex justify-center md:justify-end">
          <button 
            onClick={logout} 
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 text-red-600 font-lexend font-semibold text-sm uppercase tracking-wider hover:bg-red-100 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </motion.section>

      </motion.div>
    </div>
  );
}
