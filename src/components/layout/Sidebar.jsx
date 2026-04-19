import { NavLink } from 'react-router-dom';
import {
  Archive,
  Boxes,
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',   icon: LayoutDashboard, to: '/' },
  { label: 'Customers',   icon: Users,           to: '/customers', badge: '128' },
  { label: 'Customer Assets', icon: Boxes,       to: '/customer-assets', badge: '84' },
  { label: 'Archived Assets', icon: Archive,     to: '/archived-assets', badge: '42' },
  { label: 'Onboarding',  icon: UserPlus,        to: '/onboarding', badge: '3' },
  { label: 'Reports',     icon: BarChart3,       to: '/reports' },
  { label: 'Settings',    icon: Settings,        to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="logo-icon">C</div>
          <div>
            <div className="logo-text">ClarityIQ</div>
            <div className="logo-sub">CRM Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {NAV_ITEMS.map((item) => {
          const NavIcon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <NavIcon className="nav-icon" size={18} />
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavLink>
          );
        })}

        <div className="nav-section-label" style={{ marginTop: 8 }}>Support</div>
        <button className="nav-item">
          <Bell className="nav-icon" size={18} />
          Notifications
          <span className="nav-badge">5</span>
        </button>
        <button className="nav-item">
          <HelpCircle className="nav-icon" size={18} />
          Help Center
        </button>
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">JB</div>
          <div className="user-info">
            <div className="user-name">Jake Barrett</div>
            <div className="user-role">Account Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
