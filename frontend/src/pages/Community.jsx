import { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  Users, 
  Trophy, 
  Target, 
  Calendar, 
  Flame,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Community.css';

export default function Community() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'leaderboard') {
        const { data } = await api.get('/community/leaderboard');
        setLeaderboard(data.leaderboard || []);
      } else if (activeTab === 'challenges') {
        const { data } = await api.get('/community/challenges');
        setChallenges(data.challenges || []);
      } else if (activeTab === 'feed') {
        const { data } = await api.get('/community/feed');
        setPosts(data.posts || []);
      }
    } catch (error) { 
      console.error('Failed to fetch data', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleJoinChallenge = async (challengeId) => {
    try {
      await api.post(`/community/challenges/${challengeId}/join`);
      fetchData();
    } catch (error) { 
      console.error('Failed to join challenge', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="community-container">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="community-main"
      >
        {/* Header */}
        <motion.header 
          variants={itemVariants}
          className="community-header"
        >
          <div>
            <h1 className="community-title">Community</h1>
            <p className="community-subtitle">
              Connect, compete, and grow with elite athletes globally.
            </p>
          </div>
          
          <div className="tabs-container">
            {['leaderboard', 'feed', 'challenges'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'leaderboard' ? 'Rankings' : tab}
              </button>
            ))}
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-state"
            >
              <div className="loading-spinner" />
              <p className="loading-text">Syncing...</p>
            </motion.div>
          ) : activeTab === 'leaderboard' ? (
            <motion.section 
              key="leaderboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <div className="section-header">
                <h3 className="section-title">Global Rankings</h3>
                <div className="live-badge">
                  <div className="live-dot" />
                  <span className="live-text">Live</span>
                </div>
              </div>
              
              <div>
                {leaderboard.length === 0 ? (
                  <div className="empty-state">
                    <Trophy className="empty-icon" size={32} />
                    <p className="empty-text">No rankings available yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="top-3-grid">
                      {leaderboard.slice(0, 3).map((user, index) => (
                        <motion.div 
                          key={user._id}
                          variants={itemVariants}
                          className="top-card"
                        >
                          <div className={`rank-badge rank-${index + 1}`}>
                            #{index + 1}
                          </div>
                          
                          <div className={`avatar-large avatar-${index + 1}`}>
                            {user.name.charAt(0)}
                          </div>
                          
                          <div>
                            <h4 className="user-name">{user.name}</h4>
                            <div className="elite-badge" style={{ justifyContent: 'center' }}>
                              <ShieldCheck size={14} className="elite-icon" /> Elite
                            </div>
                          </div>
                          
                          <div className="card-stats">
                            <div className="stat-group" style={{ alignItems: 'flex-start' }}>
                              <p className="stat-group-label">Sessions</p>
                              <p className="stat-group-val">{user.workoutCount}</p>
                            </div>
                            <div className="stat-group" style={{ alignItems: 'flex-end' }}>
                              <p className="stat-group-label">Calories</p>
                              <div className="flame-val">
                                <Flame size={14} />
                                <p className="stat-group-val" style={{ color: 'var(--color-text-primary)' }}>{user.totalCalories}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="other-ranks">
                      {leaderboard.slice(3).map((user, index) => (
                        <motion.div 
                          key={user._id} 
                          variants={itemVariants}
                          className="rank-row"
                        >
                          <div className="rank-row-left">
                            <div className="rank-num-badge">
                              #{index + 4}
                            </div>
                            <div className="rank-avatar">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="rank-user-name">{user.name}</h4>
                              <div className="member-badge">
                                <ShieldCheck size={12} className="member-icon" /> Member
                              </div>
                            </div>
                          </div>
                          
                          <div className="rank-row-right">
                            <div className="stat-group">
                              <p className="stat-group-label">Sessions</p>
                              <p className="stat-group-val">{user.workoutCount}</p>
                            </div>
                            <div className="stat-group">
                              <p className="stat-group-label">Calories</p>
                              <div className="flame-val">
                                <Flame size={16} />
                                <p className="stat-group-val" style={{ color: 'var(--color-text-primary)' }}>{user.totalCalories}</p>
                              </div>
                            </div>
                            <div className="row-arrow">
                              <ArrowRight size={20} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.section>
          ) : activeTab === 'feed' ? (
            <motion.section 
              key="feed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="feed-container"
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <div className="section-header" style={{ marginBottom: 0 }}>
                <Globe size={24} style={{ color: 'var(--color-text-secondary)' }} />
                <h3 className="section-title">Activity Feed</h3>
              </div>
              
              <div className="feed-grid">
                {posts.length === 0 ? (
                  <div className="empty-state">
                    <Users className="empty-icon" size={32} />
                    <p className="empty-text">No activity in the feed yet.</p>
                  </div>
                ) : posts.map((post) => (
                   <motion.div key={post._id} variants={itemVariants} className="post-card">
                     <div className="post-header">
                        <div className="post-avatar">
                          {post.userId?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <h4 className="post-user">{post.userId?.name}</h4>
                          <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                     </div>
                     <div className="post-content">
                       <p>{post.content}</p>
                     </div>
                     <div className="post-actions">
                        <button className="respect-btn">
                          <Flame size={14} /> {post.likes?.length || 0} Respects
                        </button>
                     </div>
                   </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <div className="section-header">
                <Target size={24} style={{ color: 'var(--color-text-secondary)' }} />
                <h3 className="section-title">Active Challenges</h3>
              </div>

              <div className="challenges-grid">
                {challenges.length === 0 ? (
                  <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                    <Target className="empty-icon" size={32} />
                    <p className="empty-text">No active challenges at the moment.</p>
                  </div>
                ) : challenges.map((challenge) => (
                  <motion.div 
                    key={challenge._id} 
                    variants={itemVariants}
                    className="challenge-card"
                  >
                    <div style={{ zIndex: 10 }}>
                      <div className="challenge-header-info">
                        <div className="featured-badge">
                          <Sparkles size={12} />
                          <span>Featured</span>
                        </div>
                        <div className="participants-count">
                          <Users size={14} />
                          <span>{challenge.participant_count || 0}</span>
                        </div>
                      </div>
                      
                      <h4 className="challenge-name">{challenge.challengeName}</h4>
                      <p className="challenge-desc">
                        {challenge.description || `Reach ${challenge.goalValue} ${challenge.goalType} before the deadline.`}
                      </p>
                    </div>
                    
                    <div className="challenge-footer">
                      <div className="challenge-ends">
                        <Calendar size={14} />
                        Ends: {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                      
                      {challenge.is_joined ? (
                        <div className="enrolled-badge">
                          <ShieldCheck size={18} />
                          <span>Enrolled</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleJoinChallenge(challenge._id)}
                          className="join-btn"
                        >
                          Join Challenge
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
