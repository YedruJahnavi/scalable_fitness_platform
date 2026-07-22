import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, Eye, EyeOff, Zap, ArrowRight, ArrowLeft,
  User, Mail, Lock, Target, Shield, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const Input = ({ className, type, icon: Icon, rightElement, ...props }) => (
  <div className="relative group">
    {Icon && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300 z-10">
        <Icon className="w-4 h-4" />
      </span>
    )}
    <input
      type={type}
      className={cn(
        "w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-400 font-light",
        Icon ? "pl-11 pr-4" : "px-4",
        rightElement ? "pr-12" : "",
        className
      )}
      {...props}
    />
    {rightElement && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
    )}
  </div>
);

const Label = ({ children, className }) => (
  <label className={cn("block text-xs font-medium text-slate-500 uppercase tracking-widest mb-2", className)}>
    {children}
  </label>
);

const perks = [
  { icon: Zap, text: "AI-powered adaptive training plans" },
  { icon: Shield, text: "Biometric data encrypted end-to-end" },
  { icon: Target, text: "Real-time performance analytics" },
  { icon: CheckCircle, text: "Global community of 42K+ athletes" },
];

export default function SignupForm({ onSubmit, isLoading, error: externalError }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    role: "user", registrationKey: "", fitnessGoals: "general_fitness"
  });
  const [localError, setLocalError] = useState("");

  const nextStep = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setLocalError("Please fill in all required fields."); return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters."); return;
    }
    setLocalError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    try {
      await onSubmit({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email, password: form.password, role: form.role,
        fitnessGoals: form.fitnessGoals,
        registrationKey: form.role === "coach" ? form.registrationKey : undefined,
      });
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please try again.");
    }
  };

  const errorMsg = localError || externalError;

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-800/40" />
        
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-blue-400/30 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[10%] w-64 h-64 rounded-full bg-indigo-400/30 blur-[80px] pointer-events-none"
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-space font-bold tracking-tight text-white">FitTrack</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto p-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-medium text-white uppercase tracking-[0.2em]">Join 42,000+ Athletes</span>
            </div>
            <h2 className="text-4xl font-space font-bold tracking-tight text-white leading-[1.1] mb-4">
              Start your<br />
              elite journey.
            </h2>
            <p className="text-blue-100 text-base font-light max-w-sm leading-relaxed mb-10">
              Join the world's most advanced fitness tracking platform and unlock your full potential.
            </p>

            {/* Perks list */}
            <div className="space-y-4">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/40 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm text-blue-50 font-light">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[480px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden justify-center">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-space font-bold text-slate-900">FitTrack</span>
          </div>

          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8">
            {/* Header + progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-space font-bold tracking-tight text-slate-900">Create account</h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-light mr-2">Step {step} of 2</span>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2].map((s) => (
                      <motion.div
                        key={s}
                        animate={{
                          width: s === step ? "24px" : "8px",
                          backgroundColor: s <= step ? "#2563EB" : "#E2E8F0"
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm font-light">
                {step === 1 ? "Start with your personal details" : "Customize your experience"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input
                          placeholder="John"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          placeholder="Doe"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Email Address</Label>
                      <Input
                        icon={Mail}
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label>Password</Label>
                      <Input
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        rightElement={
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-blue-600 transition-colors">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        }
                      />
                      {/* Password strength bar */}
                      {form.password && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2.5 flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={cn(
                              "h-1 flex-1 rounded-full transition-colors duration-300",
                              form.password.length >= i * 2
                                ? i <= 2 ? "bg-red-400" : i === 3 ? "bg-amber-400" : "bg-emerald-500"
                                : "bg-slate-100"
                            )} />
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <p className="text-sm text-red-600 leading-relaxed font-medium">{errorMsg}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={nextStep}
                      className="w-full mt-4 py-3.5 rounded-xl bg-blue-600 text-white font-medium text-[15px] flex items-center justify-center gap-2 group shadow-sm hover:bg-blue-700 transition-all duration-300"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Account type */}
                    <div>
                      <Label>Account Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "user", label: "Athlete", icon: User, desc: "Train & track" },
                          { value: "coach", label: "Coach", icon: Activity, desc: "Guide & mentor" },
                        ].map(({ value, label, icon: Icon, desc }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm({ ...form, role: value })}
                            className={cn(
                              "py-4 px-3 rounded-xl font-medium text-sm transition-all flex flex-col items-center justify-center gap-1.5 border",
                              form.role === value
                                ? "bg-blue-50 text-blue-700 border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,1)]"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            <Icon size={20} className={form.role === value ? "text-blue-600" : "text-slate-400"} />
                            <span className="font-semibold">{label}</span>
                            <span className="text-[10px] opacity-70 uppercase tracking-wider">{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Coach key */}
                    <AnimatePresence>
                      {form.role === "coach" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-1">
                            <Label>Coach Invite Code</Label>
                            <Input
                              icon={Lock}
                              placeholder="e.g. COACH-123"
                              value={form.registrationKey}
                              onChange={(e) => setForm({ ...form, registrationKey: e.target.value })}
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Fitness Goal */}
                    <div>
                      <Label>Primary Goal</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                          <Target className="w-4 h-4" />
                        </span>
                        <select
                          className="w-full bg-white border border-slate-200 text-slate-900 h-[50px] rounded-xl pl-11 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none cursor-pointer transition-all font-light"
                          value={form.fitnessGoals}
                          onChange={(e) => setForm({ ...form, fitnessGoals: e.target.value })}
                        >
                          <option value="general_fitness">🏃 General Fitness</option>
                          <option value="weight_loss">🔥 Weight Loss</option>
                          <option value="muscle_gain">💪 Muscle Gain</option>
                          <option value="endurance">⚡ Endurance</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <p className="text-sm text-red-600 leading-relaxed font-medium">{errorMsg}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Back + Submit */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-14 h-[50px] rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-[50px] rounded-xl bg-blue-600 text-white font-medium text-[15px] flex items-center justify-center gap-2 group shadow-sm hover:bg-blue-700 transition-all duration-300 disabled:opacity-60 disabled:hover:bg-blue-600"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Creating...
                          </>
                        ) : (
                          "Complete Setup"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500 font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust */}
          <div className="mt-8 flex items-center justify-center gap-2 opacity-60">
            <Shield size={14} className="text-slate-400" />
            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">256-bit SSL encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
