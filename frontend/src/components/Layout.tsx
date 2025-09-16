import { PropsWithChildren, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        <div className="sidebar-header">
          <div className="brand">
            <span className="brand-mark" aria-hidden>🌿</span>
            <div className="brand-text">
              <span className="brand-name">FloraLink</span>
              <p className="brand-subtitle">花友生活方式社区</p>
            </div>
          </div>
          <div className="brand-orbit" aria-hidden />
          <p className="brand-caption">城市里的一隅绿意</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {({ isActive }) => (
                <motion.span
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  initial={false}
                  animate={isActive ? { scale: 1.02, x: 4 } : { scale: 1, x: 0 }}
                  whileHover={{ scale: 1.04, x: 8 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                >
                  <span className="nav-item__indicator" aria-hidden />
                  <span className="nav-item__icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="nav-item__label">{label}</span>
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-daily">
            <span className="sidebar-daily__eyebrow">每日花语</span>
            <p className="sidebar-daily__quote">清露拂枝头，愿你今日也与花草同频。</p>
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
