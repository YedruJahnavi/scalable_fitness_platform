import { useState } from "react";
import { LogIn, Lock, Mail, Activity, ArrowRight, Zap, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SignIn2 = ({ onSubmit, isLoading = false, error: externalError = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(externalError);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) { setError("Please provide both email and password."); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    if (onSubmit) {
      try { await onSubmit(email, password); }
      catch (err) { setError(err instanceof Error ? err.message : "Authentication failed. Please try again."); }
    }
  };

  const stats = [
    { value: "42K+", label: "Active Athletes" },
    { value: "1.2M", label: "Workouts Logged" },
    { value: "99%", label: "Goal Success" },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#050505]">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/auth-panel-bg.jpg')" }}
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80" />

        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-[#CCFF00]/10 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-[#7C3AED]/15 blur-[80px] pointer-events-none"
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]">
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-space font-bold tracking-tight text-white">FitTrack</span>
          </div>
        </div>

        {/* Bottom text content */}
        <div className="relative z-10 mt-auto p-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#CCFF00]/20 bg-[#CCFF00]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-[10px] font-medium text-[#CCFF00]/80 uppercase tracking-[0.2em]">Elite Performance Platform</span>
            </div>
            <h2 className="text-4xl font-space font-bold tracking-tight text-white leading-[1.1] mb-4">
              Welcome back,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#7C3AED]">champion.</span>
            </h2>
            <p className="text-white/50 text-base font-light max-w-sm leading-relaxed mb-10">
              Your performance data, AI-powered insights, and training history are waiting for you.
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-space font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle bg glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#CCFF00]/5 blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-space font-bold text-white">FitTrack</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-space font-bold tracking-tight text-white mb-2">Sign in</h1>
            <p className="text-white/40 text-sm font-light">Enter your credentials to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Email</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[#CCFF00] transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-white/8 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#CCFF00]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(204,255,0,0.06)] transition-all placeholder:text-white/20 font-light tracking-wide"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs text-[#CCFF00]/60 hover:text-[#CCFF00] transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[#CCFF00] transition-colors duration-300">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-4 rounded-2xl border border-white/8 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#CCFF00]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(204,255,0,0.06)] transition-all placeholder:text-white/20 font-light tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#CCFF00] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {(error || externalError) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 bg-red-500/8 border border-red-500/20 rounded-xl flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <p className="text-sm text-red-300/90 leading-relaxed font-light">{error || externalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full mt-2 py-4 rounded-2xl bg-[#CCFF00] text-black font-semibold text-[15px] flex items-center justify-center gap-2.5 group relative overflow-hidden shadow-[0_8px_32px_rgba(204,255,0,0.25)] hover:shadow-[0_12px_40px_rgba(204,255,0,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-white/35 font-light">
            New to FitTrack?{" "}
            <Link to="/register" className="text-white font-medium hover:text-[#CCFF00] transition-colors">
              Create your account
            </Link>
          </p>

          {/* Trust badge */}
          <div className="mt-10 flex items-center justify-center gap-2 opacity-40">
            <Zap size={12} className="text-[#CCFF00]" />
            <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">256-bit SSL encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { SignIn2 };
