import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { Mail, Lock, Zap, AlertCircle, Eye, EyeOff, User, Activity, Shield, Target, CheckCircle } from 'lucide-react';
import logoUrl from '../assets/logo.png';
import './Register.css';

const PERKS = [
  { icon: Zap, text: "AI-powered adaptive training plans" },
  { icon: Shield, text: "Biometric data encrypted end-to-end" },
  { icon: Target, text: "Real-time performance analytics" },
  { icon: CheckCircle, text: "Global community of 42K+ athletes" },
];

export default function Register() {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    role: "user", registrationKey: "", fitnessGoals: "general_fitness"
  });

  const nextStep = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields."); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    setError("");
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email, 
        password: form.password, 
        role: form.role,
        fitnessGoals: form.fitnessGoals,
        registrationKey: form.role === "coach" ? form.registrationKey : undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message || 'Registration failed';
      setError(message);
    }
  };

  return (
    <div className="split-layout">
      <div className="split-left">
        <div className="split-left-glow" />
        
        <div className="split-brand">
          <div className="split-logo">
            <img src={logoUrl} alt="FitTrack Logo" style={{ width: 32, height: 32 }} />
          </div>
          <div className="split-brand-text">FitTrack</div>
        </div>

        <div className="split-content">
          <div className="split-badge">
            <div className="split-badge-dot" />
            <span className="split-badge-text">Join 42,000+ Athletes</span>
          </div>
          
          <h1 className="split-heading">Start your<br/>elite journey.</h1>
          <p className="split-desc">
            Join the world's most advanced fitness tracking platform and unlock your full potential.
          </p>

          <div className="perks-list">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="perk-item">
                <div className="perk-icon-wrap">
                  <Icon size={16} />
                </div>
                <span className="perk-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="split-right">
        <div className="register-card">
          <div className="auth-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">
              {step === 1 ? "Start with your personal details" : "Customize your experience"}
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            {step === 1 ? (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-input"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-input"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="form-input-wrap">
                    <Mail size={18} className="form-icon" />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="form-input-wrap">
                    <Lock size={18} className="form-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="button" onClick={nextStep} className="auth-button">
                  Continue
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Account Type</label>
                  <div className="role-selector">
                    <button
                      type="button"
                      className={`role-btn ${form.role === 'user' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, role: 'user' })}
                    >
                      <User size={24} className="role-icon" />
                      <span className="role-title">Athlete</span>
                      <span className="role-desc">Train & track</span>
                    </button>
                    <button
                      type="button"
                      className={`role-btn ${form.role === 'coach' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, role: 'coach' })}
                    >
                      <Activity size={24} className="role-icon" />
                      <span className="role-title">Coach</span>
                      <span className="role-desc">Guide & mentor</span>
                    </button>
                  </div>
                </div>

                {form.role === 'coach' && (
                  <div className="form-group">
                    <label className="form-label">Coach Invite Code</label>
                    <div className="form-input-wrap">
                      <Lock size={18} className="form-icon" />
                      <input
                        className="form-input"
                        placeholder="e.g. COACH-123"
                        value={form.registrationKey}
                        onChange={(e) => setForm({ ...form, registrationKey: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Primary Goal</label>
                  <div className="form-input-wrap">
                    <Target size={18} className="form-icon" />
                    <select
                      className="form-input"
                      value={form.fitnessGoals}
                      onChange={(e) => setForm({ ...form, fitnessGoals: e.target.value })}
                      style={{ appearance: 'none' }}
                    >
                      <option value="general_fitness">🏃 General Fitness</option>
                      <option value="weight_loss">🔥 Weight Loss</option>
                      <option value="muscle_gain">💪 Muscle Gain</option>
                      <option value="endurance">⚡ Endurance</option>
                    </select>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '8px' }}>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="auth-button"
                    style={{ flex: '0 0 60px', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  >
                    ←
                  </button>
                  <button type="submit" disabled={isLoading} className="auth-button" style={{ flex: 1 }}>
                    {isLoading ? 'Creating...' : 'Complete Setup'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="auth-footer">
            Already have an account? 
            <Link to="/login" className="auth-link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
