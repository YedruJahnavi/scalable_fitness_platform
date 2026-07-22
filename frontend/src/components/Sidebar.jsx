import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Flame, Activity, ClipboardEdit,
  Users, UserCircle, LogOut, Target, Zap, ShieldCheck,
  ChevronRight, Settings, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard',     accent: '#CCFF00' },
  { href: '/workouts',  icon: Flame,           label: 'Workouts',      accent: '#FF6B35' },
  { href: '/analytics', icon: Activity,        label: 'Analytics',     accent: '#34D399' },
  { href: '/plans',     icon: ClipboardEdit,   label: 'Plans',         accent: '#7C3AED' },
  { href: '/community', icon: Users,           label: 'Community',     accent: '#EC4899' },
  { href: '/profile',   icon: UserCircle,      label: 'Profile',       accent: '#CCFF00' },
];

function DesktopSidebar({ pathname, user, logout }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', expanded ? '260px' : '76px');
  }, [expanded]);

  return (
    <motion.aside
      animate={{ width: expanded ? 260 : 76 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="desktop-sidebar"
    >
      <div className="sidebar-glow-line" />

      {/* Logo */}
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-icon">
          <Zap size={20} fill="currentColor" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <div className="sidebar-logo-text">FitTrack</div>
              <div className="sidebar-logo-sub">ELITE CORE</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className="sidebar-label">
        <AnimatePresence>
          {expanded ? (
            <motion.div
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-label-text"
            >
              Navigation
            </motion.div>
          ) : (
            <div key="dot" className="sidebar-dot" />
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ href, icon: Icon, label, accent }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              to={href}
              title={!expanded ? label : undefined}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: '0 4px 4px 0', backgroundColor: accent }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <Icon
                className="sidebar-icon"
                style={isActive ? { color: accent } : {}}
              />

              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="sidebar-link-text"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {isActive && (
                <motion.div
                  style={{ position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none', boxShadow: `inset 0 0 20px ${accent}10` }}
                />
              )}
            </Link>
          );
        })}

        {user?.role === 'coach' && (
          <>
            <div className="sidebar-divider" />
            <Link
              to="/coach"
              title={!expanded ? "Roster" : undefined}
              className={`sidebar-link ${pathname.startsWith('/coach') ? 'active' : ''}`}
            >
              {pathname.startsWith('/coach') && (
                <motion.div layoutId="activeBar" style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: '0 4px 4px 0', backgroundColor: '#7C3AED' }} />
              )}
              <Target className="sidebar-icon" style={pathname.startsWith('/coach') ? { color: '#7C3AED' } : {}} />
              <AnimatePresence>
                {expanded && (
                  <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }} className="sidebar-link-text">
                    Roster
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </>
        )}
      </nav>

      <div className="sidebar-divider" />

      {/* User card */}
      <div className="sidebar-user">
        <div className="user-card">
          <div className="user-avatar-wrap">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="user-badge">
              <ShieldCheck size={7} color="#000" />
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="user-info"
              >
                <div className="user-name">{user?.name || 'Athlete'}</div>
                <div className="user-level">Lv. 42 · Elite</div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ flexShrink: 0 }}
              >
                <button onClick={logout} title="Sign out" className="user-logout">
                  <LogOut size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="xp-container">
                <div className="xp-header">
                  <span className="xp-label">XP Progress</span>
                  <span className="xp-value">84%</span>
                </div>
                <div className="xp-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="xp-fill"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-collapsed-actions"
          >
            <button className="sidebar-collapsed-btn" title="Settings"><Settings size={17} /></button>
            <button onClick={logout} className="sidebar-collapsed-btn danger" title="Sign out"><LogOut size={17} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

const MOBILE_TABS = NAV_ITEMS.slice(0, 5);

function MobileNav({ pathname, user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="mobile-nav">
        <div className="mobile-nav-content">
          {MOBILE_TABS.map(({ href, icon: Icon, label, accent }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link key={href} to={href} className="mobile-nav-item">
                {isActive && (
                  <motion.div
                    layoutId="mobileActive"
                    style={{ position: 'absolute', inset: 0, borderRadius: 12, backgroundColor: `${accent}12` }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  className="mobile-nav-icon"
                  style={{ color: isActive ? accent : 'rgba(255,255,255,0.3)' }}
                />
                <span
                  className="mobile-nav-label"
                  style={{ color: isActive ? accent : 'rgba(255,255,255,0.3)' }}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDot"
                    style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', width: 32, height: 2, borderRadius: 4, backgroundColor: accent }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}

          <button onClick={() => setMenuOpen(true)} className="mobile-nav-item">
            <Menu size={20} color="rgba(255,255,255,0.3)" />
            <span className="mobile-nav-label" style={{ color: 'rgba(255,255,255,0.3)' }}>More</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-menu-overlay"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="mobile-menu-sheet"
            >
              <div className="menu-handle" />

              <div className="menu-user">
                <div className="menu-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{user?.name || 'Athlete'}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#CCFF00' }}>Level 42 · Elite</div>
                </div>
              </div>

              <div className="menu-links">
                {[NAV_ITEMS[5], ...(user?.role === 'coach' ? [{ href: '/coach', icon: Target, label: 'Coach Roster', accent: '#7C3AED' }] : [])].map(({ href, icon: Icon, label, accent }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className="menu-link"
                  >
                    <Icon size={20} style={{ color: accent }} />
                    <span className="menu-link-label">{label}</span>
                    <ChevronRight size={14} className="menu-chevron" />
                  </Link>
                ))}
                <button className="menu-link" style={{ width: '100%', border: 'none', background: 'transparent' }}>
                  <Settings size={20} color="rgba(255,255,255,0.3)" />
                  <span className="menu-link-label">Settings</span>
                  <ChevronRight size={14} className="menu-chevron" />
                </button>
              </div>

              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="menu-logout"
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

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, loadFromStorage, logout } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

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
