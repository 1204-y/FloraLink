import { PropsWithChildren, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Flower2,
  MapPin,
  Menu,
  Sparkles,
  Sprout,
  Users,
  X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: '总览', icon: Flower2 },
  { to: '/garden', label: '我的花园', icon: Sprout },
  { to: '/observations', label: '花期观测', icon: MapPin },
  { to: '/communities', label: '社区圈子', icon: Users },
  { to: '/encyclopedia', label: '植物百科', icon: BookOpen },
  { to: '/assistant', label: '智能助手', icon: Sparkles }
];

const Layout = ({ children }: PropsWithChildren) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      <div
        className={`sidebar-overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">🌿</span>
          <div>
            <span className="brand-name">FloraLink</span>
            <p className="brand-subtitle">花友生活方式社区</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              onClick={() => setMenuOpen(false)}
            >
              <item.icon size={20} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-card">
            <h4>今日灵感</h4>
            <p>关注附近花友的花期动态，收集属于你的赏花地图。</p>
          </div>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="切换导航"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
          <div className="topbar-info">
            <span className="eyebrow">欢迎回来，小羊</span>
            <h1>你的花园今天也很精彩</h1>
            <p>已为你准备新的养护提醒与圈子活动，别忘了向 AI 提问。</p>
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
        <nav className="bottom-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'bottom-nav__item active' : 'bottom-nav__item'
              }
            >
              <item.icon size={20} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
