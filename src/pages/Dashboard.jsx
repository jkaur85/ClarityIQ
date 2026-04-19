import { useNavigate } from 'react-router-dom';
import {
  Users, UserCheck, UserPlus, TrendingUp,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Plus, ExternalLink,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const KPI_DATA = [
  {
    label: 'Total Customers',
    value: '1,284',
    change: '+12.4%',
    direction: 'up',
    icon: Users,
    iconBg: 'var(--accent-subtle)',
    iconColor: 'var(--accent)',
  },
  {
    label: 'Active',
    value: '942',
    change: '+8.1%',
    direction: 'up',
    icon: UserCheck,
    iconBg: 'var(--green-subtle)',
    iconColor: 'var(--green)',
  },
  {
    label: 'Pending Onboarding',
    value: '37',
    change: '-4.2%',
    direction: 'down',
    icon: UserPlus,
    iconBg: 'var(--amber-subtle)',
    iconColor: 'var(--amber)',
  },
  {
    label: 'Converted (30d)',
    value: '218',
    change: '+21.7%',
    direction: 'up',
    icon: TrendingUp,
    iconBg: 'var(--blue-subtle)',
    iconColor: 'var(--blue)',
  },
];

const RECENT_CUSTOMERS = [
  { name: 'Sarah Mitchell',   company: 'Synapse Labs',      industry: 'Technology',       status: 'active',    date: 'Today, 9:14 AM' },
  { name: 'Marcus Webb',      company: 'Vanta Capital',     industry: 'Financial Services', status: 'pending',   date: 'Today, 7:52 AM' },
  { name: 'Priya Sharma',     company: 'MedCore Inc.',      industry: 'Healthcare',        status: 'converted', date: 'Yesterday' },
  { name: 'David Chen',       company: 'Orbit Retail',      industry: 'Retail',            status: 'active',    date: 'Yesterday' },
  { name: 'Amara Osei',       company: 'BuildRight Co.',    industry: 'Manufacturing',     status: 'active',    date: 'Apr 17' },
  { name: 'Luca Ferrari',     company: 'Novastream',        industry: 'Media',             status: 'inactive',  date: 'Apr 16' },
];

const statusClass = (s) =>
  ({ active: 'status-active', pending: 'status-pending', converted: 'status-converted', inactive: 'status-inactive' }[s]);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Good morning, Jake 👋</h1>
          <p className="dashboard-subtitle">Here's what's happening with your customers today.</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate('/onboarding')}
          id="dashboard-new-onboarding"
        >
          New Onboarding
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {KPI_DATA.map((item) => {
          const KPIcon = item.icon;

          return (
            <Card key={item.label} className="kpi-card card-glass">
              <div className="kpi-header">
                <div className="kpi-icon-wrap" style={{ background: item.iconBg }}>
                  <KPIcon size={22} style={{ color: item.iconColor }} />
                </div>
                <span className={`kpi-change ${item.direction}`}>
                  {item.direction === 'up'
                    ? <ArrowUpRight size={12} style={{ display: 'inline' }} />
                    : <ArrowDownRight size={12} style={{ display: 'inline' }} />
                  }
                  {' '}{item.change}
                </span>
              </div>
              <div>
                <div className="kpi-value">{item.value}</div>
                <div className="kpi-label">{item.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Customers Table */}
      <Card>
        <div style={{ padding: '24px 28px 0' }}>
          <div className="section-header">
            <div>
              <div className="section-title">Recent Onboardings</div>
              <div className="section-title-sub">Customers added in the last 7 days</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                variant="secondary"
                size="sm"
                icon={ExternalLink}
                onClick={() => navigate('/customers')}
              >
                View All
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => navigate('/onboarding')}
                id="table-new-onboarding"
              >
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 0 8px' }}>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {RECENT_CUSTOMERS.map((c) => (
                  <tr key={c.name}>
                    <td className="td-name">{c.name}</td>
                    <td className="td-company">{c.company}</td>
                    <td>{c.industry}</td>
                    <td>
                      <span className={`status-badge ${statusClass(c.status)}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td>{c.date}</td>
                    <td>
                      <button
                        className="icon-btn"
                        aria-label={`Options for ${c.name}`}
                        style={{ width: 28, height: 28 }}
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
