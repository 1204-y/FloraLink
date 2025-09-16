import { PropsWithChildren, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: '总览' },
  { to: '/garden', label: '我的花园' },
  { to: '/observations', label: '花期观测' },
  { to: '/communities', label: '社区圈子' },
  { to: '/encyclopedia', label: '植物百科' },
  { to: '/assistant', label: '智能助手' }
];

const Layout = ({ children }: PropsWithChildren) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">🌿</span>
          <span className="brand-name">FloraLink</span>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-caption">让花友与花期连接</p>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)}>
            <span className="menu-icon">☰</span>
          </button>
          <div className="topbar-info">
            <h1>欢迎回来，小羊</h1>
            <p>花期提醒、圈子互动和智能助手都在这里等你 🌸</p>
          </div>
          <div className="topbar-user">
            <div className="avatar">XY</div>
            <div>
              <p className="user-name">小羊</p>
              <p className="user-meta">今日累计养护 2 项</p>
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
