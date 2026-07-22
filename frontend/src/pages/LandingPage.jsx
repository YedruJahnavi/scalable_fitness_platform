import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Activity, 
  Target, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  BarChart3,
  Flame,
  Dumbbell
} from "lucide-react";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#CCFF00]/30 selection:text-black font-lexend overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CCFF00]/15 via-[#CCFF00]/5 to-transparent blur-[120px]" 
        />
        <motion.div 
          style={{ y, opacity }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7C3AED]/20 via-[#7C3AED]/5 to-transparent blur-[120px]" 
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-6 transition-all duration-300 backdrop-blur-xl border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-shadow">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-space font-bold tracking-tight">FitTrack</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 font-medium text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all after:duration-300">Features</a>
            <a href="#tech" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all after:duration-300">Technology</a>
            <a href="#community" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#CCFF00] hover:after:w-full after:transition-all after:duration-300">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="hidden sm:block px-6 py-2.5 rounded-full font-medium text-sm text-white hover:bg-white/10 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 hover:bg-[#CCFF00] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 sm:px-12 z-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
              </span>
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-[0.2em]">Platform v3.0 Early Access</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[85px] font-space font-bold tracking-tighter leading-[1.05]">
              Redefine your<br />
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-[#CCFF00] to-[#7C3AED]">potential.</span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-2 left-0 h-4 bg-[#CCFF00]/20 -z-10 skew-x-[-12deg]"
                ></motion.span>
              </span>
            </h1>
            
            <p className="max-w-xl text-lg sm:text-xl text-white/50 leading-relaxed font-light">
              Experience the pinnacle of fitness intelligence. Sync your devices, analyze metrics in real-time, and achieve your goals with elite algorithmic precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <Link to="/register" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#CCFF00", color: "#000" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:px-10 py-4 rounded-full bg-white text-black font-semibold text-lg flex items-center justify-center gap-3 group transition-colors shadow-xl"
                >
                  Start Training
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:px-10 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium text-lg flex items-center justify-center transition-colors"
                >
                  View Features
                </motion.button>
              </a>
            </div>
            
            <div className="pt-10 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-3xl font-space font-bold">42K+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Active Athletes</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-space font-bold text-[#CCFF00]">1.2M</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Workouts Logged</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-space font-bold">99%</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Goal Success Rate</p>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative hidden lg:block h-full min-h-[600px]"
          >
            {/* Main Interactive Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] backdrop-blur-2xl bg-white/[0.03] border border-white/10 p-8 rounded-[40px] shadow-2xl z-20"
            >
               <div className="flex justify-between items-start mb-10">
                 <div>
                   <h3 className="text-2xl font-space font-bold mb-1">Current Session</h3>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                     <p className="text-white/50 text-sm">High Intensity Interval</p>
                   </div>
                 </div>
                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#7C3AED] text-black flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                   <Zap size={24} className="fill-current text-white" />
                 </div>
               </div>
               
               <div className="space-y-8">
                 <div className="flex justify-between items-end bg-black/40 p-6 rounded-3xl border border-white/5">
                   <div>
                     <p className="text-6xl font-space font-bold tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">164</p>
                     <p className="text-sm text-white/40 uppercase tracking-widest font-medium mt-1">BPM Average</p>
                   </div>
                   <div className="h-16 w-32 flex items-end gap-1.5">
                     {[40, 60, 45, 80, 100, 85, 95].map((h, i) => (
                       <motion.div 
                         key={i}
                         animate={{ height: [`${h}%`, `${h * 0.4}%`, `${h}%`] }}
                         transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                         className="flex-1 bg-[#CCFF00] rounded-sm"
                         style={{ opacity: 0.3 + (h / 100) * 0.7 }}
                       />
                     ))}
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30]">
                       <Flame size={20} />
                     </div>
                     <div>
                       <p className="text-2xl font-space font-bold">842</p>
                       <p className="text-white/40 text-[10px] uppercase tracking-widest">Calories</p>
                     </div>
                   </div>
                   <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#34C759]/20 flex items-center justify-center text-[#34C759]">
                       <Activity size={20} />
                     </div>
                     <div>
                       <p className="text-2xl font-space font-bold">45m</p>
                       <p className="text-white/40 text-[10px] uppercase tracking-widest">Duration</p>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>

            {/* Floating Element 1 */}
            <motion.div 
              animate={{ y: [15, -15, 15], rotate: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-0 top-1/4 backdrop-blur-xl bg-white/[0.05] border border-white/10 p-5 rounded-2xl shadow-xl z-30 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center">
                <Dumbbell size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">New PR Achieved!</p>
                <p className="text-xs text-white/50">Deadlift: 315 lbs</p>
              </div>
            </motion.div>

            {/* Floating Element 2 */}
            <motion.div 
              animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute left-10 bottom-1/4 backdrop-blur-xl bg-white/[0.05] border border-white/10 p-5 rounded-2xl shadow-xl z-10 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={16} className="text-[#CCFF00]" />
                <p className="text-xs font-semibold uppercase tracking-wider">Weekly Progress</p>
              </div>
              <div className="flex items-end gap-1.5 h-10 w-32">
                {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/20 rounded-sm"></div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-space font-bold tracking-tighter mb-6">Engineered for elite performance.</h2>
          <p className="text-lg text-white/50 font-light">Everything you need to track, analyze, and optimize your fitness journey in one unified, intelligent platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          {/* Large Feature 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 backdrop-blur-xl bg-white/[0.02] border border-white/5 p-10 rounded-[32px] flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-[80px] group-hover:bg-[#CCFF00]/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 group-hover:scale-110 transition-transform duration-500">
                <Activity size={32} />
              </div>
              <h3 className="text-3xl font-space font-bold mb-3">Biometric Intelligence</h3>
              <p className="text-white/50 text-lg max-w-md font-light leading-relaxed">Connect wearables and let our advanced algorithms analyze your heart rate variability, sleep debt, and recovery status in real-time.</p>
            </div>
            
            {/* Decorative background graph */}
            <svg className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-700" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 L0,50 Q25,80 50,40 T100,60 L100,100 Z" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="1" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Small Feature 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-10 rounded-[32px] flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] mb-8 group-hover:rotate-12 transition-transform duration-500">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-space font-bold mb-3">Adaptive AI Plans</h3>
              <p className="text-white/50 font-light leading-relaxed">Workouts that dynamically evolve based on your daily recovery metrics and performance history.</p>
            </div>
          </motion.div>
          
          {/* Small Feature 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-white/[0.02] border border-white/5 p-10 rounded-[32px] flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/0 to-[#EC4899]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899] mb-8 group-hover:-rotate-12 transition-transform duration-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-space font-bold mb-3">Secure Coaching</h3>
              <p className="text-white/50 font-light leading-relaxed">Direct, encrypted communication channels to elite fitness coaches and nutritionists worldwide.</p>
            </div>
          </motion.div>

          {/* Large Feature 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 p-10 rounded-[32px] flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-20">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 shadow-inner">
                <Activity size={32} />
              </div>
              <h3 className="text-3xl font-space font-bold mb-3">Global Community Hub</h3>
              <p className="text-white/60 text-lg max-w-md font-light leading-relaxed">Join specialized groups, climb the global leaderboard, and interact with fellow athletes in real-time. Your tribe is waiting.</p>
            </div>
            {/* Abstract visual */}
            <div className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[150%] bg-gradient-to-l from-white/10 to-transparent skew-x-[-20deg] group-hover:translate-x-4 transition-transform duration-700 pointer-events-none"></div>
            <div className="absolute right-[10%] bottom-[-20%] w-[20%] h-[150%] bg-gradient-to-l from-white/10 to-transparent skew-x-[-20deg] group-hover:translate-x-8 transition-transform duration-1000 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 sm:px-12 border-t border-white/5 relative z-10 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black">
              <Activity size={20} strokeWidth={3} />
            </div>
            <span className="text-xl font-space font-bold tracking-tight">FitTrack</span>
          </div>
          
          <div className="flex gap-10 font-medium text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>

          <p className="text-sm text-white/30">
            © 2026 FitTrack Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
