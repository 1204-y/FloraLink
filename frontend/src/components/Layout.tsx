import { PropsWithChildren, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Flower2,
  LogOut,
  MapPin,
  Menu,
  Sparkles,
  Sprout,
  Users,
  X
} from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

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
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading, logout, bootstrap } = useAuth();

  const initials = useMemo(() => {
    if (!user?.full_name) {
      return user?.email?.slice(0, 2)?.toUpperCase() ?? 'FL';
    }
    return user.full_name
      .split('')
      .filter((char) => /[A-Za-z\u4e00-\u9fa5]/.test(char))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }, [user]);

  const displayName = user?.full_name ?? user?.email ?? '花友';

  return (
    <div className={`layout ${collapsed ? 'layout--collapsed' : ''}`}>
      <div
        className={`sidebar-overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`sidebar ${menuOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
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
        <button
          className="sidebar-collapse"
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {collapsed ? <ChevronRight size={18} strokeWidth={1.6} /> : <ChevronLeft size={18} strokeWidth={1.6} />}
        </button>
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
            <span className="eyebrow">{loading ? '加载中…' : `欢迎回来，${displayName}`}</span>
            <h1>你的花园今天也很精彩</h1>
            <p>养护提醒、花期观测和智能助手都已同步最新内容。</p>
          </div>
          <div className="topbar-user">
            <div className="avatar">{initials}</div>
            <div className="topbar-user__meta">
              <p className="user-name">{displayName}</p>
              <p className="user-meta">{user?.city ?? '正在更新你的花友档案'}</p>
            </div>
            <button
              className="ghost-button"
              type="button"
              onClick={() => {
                logout();
                void bootstrap();
              }}
            >
              <LogOut size={18} strokeWidth={1.6} />
              重新连接
            </button>
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
