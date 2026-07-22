import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-lexend">
      <Sidebar />
      {/* On desktop: margin-left follows --sidebar-width (76px collapsed, 260px expanded).
          On mobile:  pb-20 ensures content clears the bottom tab bar. */}
      <main
        className="flex-1 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] pb-20 md:pb-0"
        style={{ marginLeft: 'var(--sidebar-width, 0px)' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
