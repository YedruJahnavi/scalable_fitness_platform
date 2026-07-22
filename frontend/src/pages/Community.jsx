import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative font-lexend">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 md:pt-12 pb-24 px-6 sm:px-8 md:px-10 max-w-7xl mx-auto space-y-10 relative z-10"
      >
        {/* Header */}
        <motion.header 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6"
        >
          <div>
            <h1 className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Community
            </h1>
            <p className="text-slate-500 font-light text-lg mt-2 max-w-md">
              Connect, compete, and grow with elite athletes globally.
            </p>
          </div>
          
          <div className="flex bg-slate-200 p-1 rounded-xl self-start md:self-auto">
            {['leaderboard', 'feed', 'challenges'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2.5 rounded-[10px] font-lexend font-medium text-sm transition-all capitalize",
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
                )}
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
              className="flex h-[40vh] flex-col items-center justify-center gap-6"
            >
              <div className="w-12 h-12 border-2 border-transparent border-t-blue-600 rounded-full animate-spin" />
              <p className="font-lexend text-sm font-medium text-blue-600 animate-pulse uppercase tracking-widest">Syncing...</p>
            </motion.div>
          ) : activeTab === 'leaderboard' ? (
            <motion.section 
              key="leaderboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-space font-bold text-slate-900 tracking-tight">Global Rankings</h3>
                <div className="flex px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {leaderboard.length === 0 ? (
                  <div className="bg-white border border-slate-200 border-dashed p-12 text-center rounded-3xl flex flex-col items-center gap-4">
                    <Trophy className="text-slate-300" size={32} />
                    <p className="text-slate-500 font-light text-base">No rankings available yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {leaderboard.slice(0, 3).map((user, index) => (
                        <motion.div 
                          key={user._id}
                          variants={itemVariants}
                          className={cn(
                            "relative overflow-hidden p-8 rounded-3xl flex flex-col items-center text-center gap-4 bg-white border border-slate-200 shadow-md",
                          )}
                        >
                          <div className={cn(
                            "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-space font-bold text-lg shadow-sm border border-slate-100",
                            index === 0 ? "bg-[#FFF9E5] text-[#B8860B]" :
                            index === 1 ? "bg-slate-100 text-slate-600" :
                            "bg-[#FFF0E6] text-[#CD7F32]"
                          )}>
                            #{index + 1}
                          </div>
                          
                          <div className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center font-space font-bold text-3xl mb-2 shadow-sm border border-slate-100",
                            index === 0 ? "bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 text-[#B8860B]" :
                            index === 1 ? "bg-gradient-to-br from-slate-200 to-slate-100 text-slate-600" :
                            "bg-gradient-to-br from-[#CD7F32]/20 to-[#8B4513]/20 text-[#CD7F32]"
                          )}>
                            {user.name.charAt(0)}
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-space font-bold text-slate-900 mb-1">{user.name}</h4>
                            <div className="flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                              <ShieldCheck size={14} className="text-blue-500" /> Elite
                            </div>
                          </div>
                          
                          <div className="w-full flex justify-between border-t border-slate-100 pt-4 mt-2">
                            <div>
                              <p className="text-xs text-slate-400 uppercase mb-1">Sessions</p>
                              <p className="text-lg font-space font-bold text-slate-900">{user.workoutCount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 uppercase mb-1">Calories</p>
                              <div className="flex items-center gap-1 text-orange-500">
                                <Flame size={14} />
                                <p className="text-lg font-space font-bold">{user.totalCalories}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {leaderboard.slice(3).map((user, index) => (
                        <motion.div 
                          key={user._id} 
                          variants={itemVariants}
                          whileHover={{ x: 8 }}
                          className="group bg-white p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border border-slate-100 shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center font-space font-bold text-xl text-slate-400 border border-slate-100">
                              #{index + 4}
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-space font-bold text-lg text-slate-700">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-lg font-space font-bold text-slate-900">{user.name}</h4>
                              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                                <ShieldCheck size={12} className="text-blue-400" /> Member
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8 sm:gap-12 w-full sm:w-auto justify-between sm:justify-end">
                            <div>
                              <p className="text-[10px] font-medium text-slate-400 mb-1 uppercase tracking-wider">Sessions</p>
                              <p className="text-xl font-space font-bold text-slate-900">{user.workoutCount}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-slate-400 mb-1 uppercase tracking-wider">Calories</p>
                              <div className="flex items-center gap-1.5 text-orange-500">
                                <Flame size={16} />
                                <p className="text-xl font-space font-bold">{user.totalCalories}</p>
                              </div>
                            </div>
                            <div className="hidden sm:flex text-slate-300 group-hover:text-blue-500 transition-colors">
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
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-slate-700" />
                <h3 className="text-2xl font-space font-bold text-slate-900 tracking-tight">Activity Feed</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {posts.length === 0 ? (
                  <div className="bg-white border border-slate-200 border-dashed p-12 text-center rounded-3xl flex flex-col items-center gap-4">
                    <Users className="text-slate-300" size={32} />
                    <p className="text-slate-500 font-light text-base">No activity in the feed yet.</p>
                  </div>
                ) : posts.map((post) => (
                   <motion.div key={post._id} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-space font-bold flex items-center justify-center text-lg">
                          {post.userId?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <h4 className="text-lg font-space font-bold text-slate-900">{post.userId?.name}</h4>
                          <span className="text-xs font-medium text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                       <p className="text-slate-700 font-light text-[15px] leading-relaxed">{post.content}</p>
                     </div>
                     <div className="flex items-center gap-4 pt-1">
                        <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-red-500 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl border border-slate-200">
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
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <Target size={24} className="text-slate-700" />
                <h3 className="text-2xl font-space font-bold text-slate-900 tracking-tight">Active Challenges</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.length === 0 ? (
                  <div className="col-span-full bg-white border border-slate-200 border-dashed p-12 text-center rounded-3xl flex flex-col items-center gap-4">
                    <Target className="text-slate-300" size={32} />
                    <p className="text-slate-500 font-light text-base">No active challenges at the moment.</p>
                  </div>
                ) : challenges.map((challenge) => (
                  <motion.div 
                    key={challenge._id} 
                    variants={itemVariants}
                    className="bg-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden border border-slate-200 shadow-sm min-h-[340px] transition-all hover:shadow-md hover:border-slate-300"
                  >
                    <div className="relative z-10 mb-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
                          <Sparkles size={12} className="text-blue-600" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">Featured</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Users size={14} />
                          <span className="text-sm font-space font-bold">{challenge.participant_count || 0}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-space font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">{challenge.challengeName}</h4>
                      <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-3">
                        {challenge.description || `Reach ${challenge.goalValue} ${challenge.goalType} before the deadline.`}
                      </p>
                    </div>
                    
                    <div className="space-y-5 relative z-10 mt-auto">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <Calendar size={14} />
                        Ends: {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                      
                      {challenge.is_joined ? (
                        <div className="w-full bg-emerald-50 border border-emerald-200 py-3 rounded-xl flex items-center justify-center gap-2 text-emerald-700">
                          <ShieldCheck size={18} />
                          <span className="font-semibold text-sm">Enrolled</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleJoinChallenge(challenge._id)}
                          className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
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
