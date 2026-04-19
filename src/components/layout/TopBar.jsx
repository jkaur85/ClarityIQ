import { useLocation } from 'react-router-dom';
import { Bell, Search, Settings } from 'lucide-react';

const ROUTE_LABELS = {
  '/':            { crumb: ['Dashboard'] },
  '/customers':   { crumb: ['Customers'] },
  '/customer-assets': { crumb: ['Customer Assets'] },
  '/onboarding':  { crumb: ['Onboarding', 'New Customer'] },
  '/reports':     { crumb: ['Reports'] },
  '/settings':    { crumb: ['Settings'] },
};

const TopBar = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_LABELS[pathname] ?? { crumb: ['Page'] };

  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        <span className="breadcrumb-item">ClarityIQ</span>
        {meta.crumb.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="breadcrumb-sep">/</span>
            <span className={`breadcrumb-item ${i === meta.crumb.length - 1 ? 'active' : ''}`}>
              {item}
            </span>
          </span>
        ))}
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Search" id="topbar-search">
          <Search size={16} />
        </button>
        <button className="icon-btn notif-dot" aria-label="Notifications" id="topbar-notifications">
          <Bell size={16} />
        </button>
        <button className="icon-btn" aria-label="Settings" id="topbar-settings">
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
