import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <main
        className="main-content"
        style={{ marginLeft: 'var(--sidebar-width, 0px)' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
