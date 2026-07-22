import { useState, useEffect } from 'react';
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
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});

  const WEARABLES = [
    { id: 'apple_health', name: 'Apple Health', icon: <Sun size={20} />, iconClass: 'dev-icon-1' },
    { id: 'google_fit', name: 'Google Fit', icon: <TrendingUp size={20} />, iconClass: 'dev-icon-2' },
    { id: 'fitbit', name: 'Fitbit', icon: <Watch size={20} />, iconClass: 'dev-icon-3' },
    { id: 'garmin', name: 'Garmin Connect', icon: <Trophy size={20} />, iconClass: 'dev-icon-4' }
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
      <div className="loading-state">
        <div className="loading-spinner" />
        <p className="loading-text">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="profile-main"
      >
        {/* Profile Hero Section */}
        <motion.section variants={itemVariants} className="hero-section">
          <div className="profile-info">
            <div className="avatar-wrapper">
              <div className="avatar-img-container">
                <img 
                  className="avatar-img" 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80" 
                  alt="Profile" 
                />
              </div>
              <div className="elite-badge">
                Elite Level
              </div>
            </div>
            
            <div className="profile-text-center">
              <h2 className="profile-name">{user.name}</h2>
              <div className="profile-meta">
                <span className="pro-member-badge">
                  <ShieldCheck size={14}/> Pro Member
                </span>
                <span className="meta-dot" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <Activity size={24} className="stat-icon blue" />
              <div className="stat-val">142</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="hero-stat-card">
              <FlameIcon size={24} className="stat-icon red" />
              <div className="stat-val">84.2k</div>
              <div className="stat-label">Kcal Burned</div>
            </div>
            <div className="hero-stat-card">
              <Clock size={24} className="stat-icon emerald" />
              <div className="stat-val">248</div>
              <div className="stat-label">Hours Active</div>
            </div>
          </div>
        </motion.section>

        {/* Bio-Benchmarks Section */}
        <motion.section variants={itemVariants}>
          <div className="section-header">
            <Trophy size={24} className="section-icon" />
            <h3 className="section-title">Bio-Benchmarks</h3>
          </div>
          
          <div className="benchmarks-grid">
            {[
              { label: 'Bench Press', value: '120', unit: 'kg' },
              { label: 'Deadlift', value: '180', unit: 'kg' },
              { label: 'Squat', value: '150', unit: 'kg' }
            ].map((pr, i) => (
              <div key={i} className="benchmark-card">
                <div className="benchmark-val-wrap">
                  <span className="benchmark-val">{pr.value}</span>
                  <span className="benchmark-unit">{pr.unit}</span>
                </div>
                <p className="benchmark-label">{pr.label} • Personal Record</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section variants={itemVariants}>
          <div className="section-header">
            <Sparkles size={24} className="section-icon" />
            <h3 className="section-title">Achievements</h3>
          </div>
          
          <div className="achievements-grid">
            {[
              { id: 'early_bird', name: 'Early Bird', icon: <Sun size={24} />, cls: 'ach-icon-1' },
              { id: 'century', name: 'Century Club', icon: <Cpu size={24} />, cls: 'ach-icon-2' },
              { id: 'streak', name: '5-Day Streak', icon: <Flame size={24} />, cls: 'ach-icon-3' },
              { id: 'guardian', name: 'Secure Core', icon: <Shield size={24} />, cls: 'ach-icon-4' }
            ].map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <div className={`achievement-icon-wrap ${achievement.cls}`}>
                  {achievement.icon}
                </div>
                <div>
                  <p className="achievement-name">{achievement.name}</p>
                  <p className="achievement-status">Unlocked</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Settings Section */}
        <motion.section variants={itemVariants}>
          <div className="section-header">
            <Settings size={24} style={{ color: 'var(--color-text-secondary)' }} />
            <h3 className="section-title">Settings & Devices</h3>
          </div>
          
          <div className="settings-grid">
            {/* General Settings */}
            <div className="settings-list">
              {[
                { id: 'profile', label: 'Edit Profile Info', icon: <User size={20} />, cls: 'set-icon-1' },
                { id: 'security', label: 'Security & Privacy', icon: <ShieldCheck size={20} />, cls: 'set-icon-2' },
                { id: 'notifications', label: 'Notifications', icon: <Target size={20} />, cls: 'set-icon-3' }
              ].map(item => (
                <button key={item.id} className="settings-btn">
                  <div className="settings-btn-left">
                    <div className={`settings-icon-wrap ${item.cls}`}>
                      {item.icon}
                    </div>
                    <span className="settings-label">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="settings-arrow" />
                </button>
              ))}
            </div>
            
            {/* Connected Apps */}
            <div className="devices-card">
               <div className="devices-header">
                 <div>
                   <h4 className="devices-title">Connected Apps</h4>
                   <p className="devices-subtitle">Sync your bio-data automatically.</p>
                 </div>
                 <div className="devices-icon">
                   <Zap size={20} />
                 </div>
               </div>
               
               <div className="devices-list">
                 {WEARABLES.map(wearable => {
                   const isActive = profile.deviceConnections?.some((d) => d.deviceType === wearable.id && d.isActive);
                   return (
                     <div key={wearable.id} className={`device-row ${isActive ? 'active' : ''}`}>
                       <div className="device-left">
                         <div className={`device-icon-wrap ${wearable.iconClass}`}>
                           {wearable.icon}
                         </div>
                         <span className="device-name">{wearable.name}</span>
                       </div>
                       <button
                         onClick={() => handleDeviceToggle(wearable.id)}
                         className={`device-action-btn ${isActive ? 'connected' : 'connect'}`}
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
        <motion.section variants={itemVariants} className="logout-section">
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} /> Sign Out
          </button>
        </motion.section>

      </motion.div>
    </div>
  );
}
