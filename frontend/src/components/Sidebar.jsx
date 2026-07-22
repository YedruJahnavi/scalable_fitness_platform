import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Flame, Activity, ClipboardEdit,
  Users, UserCircle, LogOut, Target, Zap, ShieldCheck,
  ChevronRight, Settings, Menu, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard',     accent: '#CCFF00' },
  { href: '/workouts',  icon: Flame,           label: 'Workouts',      accent: '#FF6B35' },
  { href: '/analytics', icon: Activity,        label: 'Analytics',     accent: '#34D399' },
  { href: '/plans',     icon: ClipboardEdit,   label: 'Plans',         accent: '#7C3AED' },
  { href: '/community', icon: Users,           label: 'Community',     accent: '#EC4899' },
  { href: '/profile',   icon: UserCircle,      label: 'Profile',       accent: '#CCFF00' },
];

/* ─── Desktop Sidebar ───────────────────────────────────────── */
function DesktopSidebar({ pathname, user, logout }) {
  const [expanded, setExpanded] = useState(false);

  // keep CSS variable in sync
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', expanded ? '260px' : '76px'
    );
  }, [expanded]);

  return (
    <motion.aside
      animate={{ width: expanded ? 260 : 76 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="hidden md:flex fixed left-0 top-0 h-screen flex-col bg-[#080808] border-r border-white/[0.06] z-[100] overflow-hidden"
    >
      {/* Subtle vertical glow line on right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#CCFF00]/20 to-transparent" />

      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-[18px] py-7 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black shadow-[0_0_24px_rgba(204,255,0,0.35)] shrink-0">
          <Zap className="w-5 h-5" fill="currentColor" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="text-[17px] font-space font-bold tracking-tight text-white leading-none">FitTrack</p>
              <p className="text-[9px] font-space font-bold text-[#CCFF00] tracking-[0.35em] mt-0.5">ELITE CORE</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Section label ── */}
      <div className="px-[18px] mb-3">
        <AnimatePresence>
          {expanded ? (
            <motion.p
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-bold text-white/20 uppercase tracking-[0.35em]"
            >
              Navigation
            </motion.p>
          ) : (
            <div key="dot" className="w-1 h-1 rounded-full bg-white/20 mx-auto" />
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden py-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label, accent }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              to={href}
              title={!expanded ? label : undefined}
              className={cn(
                "relative flex items-center gap-3.5 rounded-xl h-11 px-[14px] group transition-all duration-200",
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-white/35 hover:text-white/80 hover:bg-white/[0.04]"
              )}
            >
              {/* Active left bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                  style={{ backgroundColor: accent }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <Icon
                className="w-[18px] h-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={isActive ? { color: accent } : {}}
              />

              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active glow dot */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: `inset 0 0 20px ${accent}10` }}
                />
              )}
            </Link>
          );
        })}

        {/* Coach section */}
        {user?.role === 'coach' && (
          <>
            <div className="h-px bg-white/[0.06] mx-2 my-3" />
            <Link
              to="/coach"
              title={!expanded ? "Roster" : undefined}
              className={cn(
                "relative flex items-center gap-3.5 rounded-xl h-11 px-[14px] transition-all duration-200",
                pathname.startsWith('/coach')
                  ? "bg-white/[0.06] text-white"
                  : "text-white/35 hover:text-white/80 hover:bg-white/[0.04]"
              )}
            >
              {pathname.startsWith('/coach') && (
                <motion.div layoutId="activeBar" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#7C3AED]" />
              )}
              <Target className="w-[18px] h-[18px] shrink-0" style={pathname.startsWith('/coach') ? { color: '#7C3AED' } : {}} />
              <AnimatePresence>
                {expanded && (
                  <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }} className="text-[13px] font-medium whitespace-nowrap">
                    Roster
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </>
        )}
      </nav>

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.06] mx-3 mb-3" />

      {/* ── User card ── */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-3 rounded-xl px-[10px] py-3 bg-white/[0.03] border border-white/[0.06]">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#CCFF00]/20 to-[#7C3AED]/20 border border-white/10 flex items-center justify-center font-space font-bold text-white text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#CCFF00] rounded-full border-2 border-[#080808] flex items-center justify-center">
              <ShieldCheck size={7} className="text-black" />
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="flex-1 min-w-0"
              >
                <p className="text-[13px] font-semibold text-white truncate">{user?.name || 'Athlete'}</p>
                <p className="text-[10px] text-[#CCFF00] font-medium tracking-wide">Lv. 42 · Elite</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* XP bar (only expanded) */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shrink-0"
              >
                <button
                  onClick={logout}
                  title="Sign out"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* XP bar */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 px-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest">XP Progress</span>
                  <span className="text-[9px] font-bold text-[#CCFF00]">84%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#CCFF00]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Settings + Logout (collapsed only) ── */}
      <AnimatePresence>
        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 pb-5 pt-2 space-y-1"
          >
            <button
              className="w-full h-10 rounded-xl flex items-center justify-center text-white/25 hover:text-white hover:bg-white/[0.04] transition-all"
              title="Settings"
            >
              <Settings size={17} />
            </button>
            <button
              onClick={logout}
              className="w-full h-10 rounded-xl flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Sign out"
            >
              <LogOut size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

/* ─── Mobile Bottom Tab Bar ─────────────────────────────────── */
const MOBILE_TABS = NAV_ITEMS.slice(0, 5); // show first 5

function MobileNav({ pathname, user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#080808]/95 backdrop-blur-2xl border-t border-white/[0.08]">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {MOBILE_TABS.map(({ href, icon: Icon, label, accent }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link key={href} to={href} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl group relative">
                {isActive && (
                  <motion.div
                    layoutId="mobileActive"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: `${accent}12` }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  className="w-5 h-5 relative z-10 transition-transform duration-200 group-active:scale-90"
                  style={{ color: isActive ? accent : 'rgba(255,255,255,0.3)' }}
                />
                <span
                  className="text-[10px] font-medium relative z-10 transition-colors"
                  style={{ color: isActive ? accent : 'rgba(255,255,255,0.3)' }}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDot"
                    className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ backgroundColor: accent }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl"
          >
            <Menu className="w-5 h-5 text-white/30" />
            <span className="text-[10px] font-medium text-white/30">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile "More" sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-[120] bg-[#0C0C0C] border-t border-white/10 rounded-t-3xl p-6"
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full bg-white/15 mx-auto mb-6" />

              {/* User info */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#CCFF00]/20 to-[#7C3AED]/20 border border-white/10 flex items-center justify-center font-space font-bold text-white text-base">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white">{user?.name || 'Athlete'}</p>
                  <p className="text-[11px] text-[#CCFF00] font-medium">Level 42 · Elite</p>
                </div>
              </div>

              {/* Extra nav (Profile + coach) */}
              <div className="space-y-1 mb-6">
                {[NAV_ITEMS[5], ...(user?.role === 'coach' ? [{ href: '/coach', icon: Target, label: 'Coach Roster', accent: '#7C3AED' }] : [])].map(({ href, icon: Icon, label, accent }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                    <span className="text-[14px] font-medium text-white/70">{label}</span>
                    <ChevronRight size={14} className="ml-auto text-white/20" />
                  </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <Settings className="w-5 h-5 text-white/30" />
                  <span className="text-[14px] font-medium text-white/50">Settings</span>
                  <ChevronRight size={14} className="ml-auto text-white/20" />
                </button>
              </div>

              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full py-3.5 rounded-xl border border-red-500/20 bg-red-500/8 text-red-400 font-medium text-sm flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Main Export ─────────────────────────────────────────────── */
export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, loadFromStorage, logout } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // initialise CSS var for SSR / first paint
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', window.innerWidth >= 768 ? '76px' : '0px');
  }, []);

  return (
    <>
      <DesktopSidebar pathname={pathname} user={user} logout={logout} />
      <MobileNav pathname={pathname} user={user} logout={logout} />
    </>
  );
}
