import { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Clock3,
  Download,
  Laptop,
  MapPin,
  Plus,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Wifi,
  Wrench,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ASSET_SUMMARY = [
  {
    label: 'Tracked Assets',
    value: '84',
    detail: '+6 added this month',
    icon: Laptop,
    tone: 'var(--blue)',
    toneBg: 'var(--blue-subtle)',
  },
  {
    label: 'Protected',
    value: '71',
    detail: '85% under coverage',
    icon: ShieldCheck,
    tone: 'var(--green)',
    toneBg: 'var(--green-subtle)',
  },
  {
    label: 'Needs Attention',
    value: '9',
    detail: 'Licenses or warranty gaps',
    icon: AlertTriangle,
    tone: 'var(--amber)',
    toneBg: 'var(--amber-subtle)',
  },
];

const ASSET_INVENTORY = [
  {
    id: 'AST-2048',
    name: 'MacBook Pro 16"',
    owner: 'Sarah Mitchell',
    category: 'Devices',
    location: 'Sydney HQ',
    value: '$4,800',
    status: 'healthy',
    renewal: 'Dec 14, 2026',
    icon: Laptop,
  },
  {
    id: 'AST-2051',
    name: 'Dell PowerEdge R760',
    owner: 'BuildRight Co.',
    category: 'Infrastructure',
    location: 'Melbourne DC',
    value: '$11,200',
    status: 'review',
    renewal: 'May 02, 2026',
    icon: Server,
  },
  {
    id: 'AST-2062',
    name: 'Cisco Meraki MX95',
    owner: 'Orbit Retail',
    category: 'Network',
    location: 'Perth Branch',
    value: '$3,350',
    status: 'healthy',
    renewal: 'Jul 21, 2026',
    icon: Wifi,
  },
  {
    id: 'AST-2074',
    name: 'Developer Workstation',
    owner: 'Novastream',
    category: 'Devices',
    location: 'Remote',
    value: '$2,600',
    status: 'maintenance',
    renewal: 'Apr 28, 2026',
    icon: Laptop,
  },
  {
    id: 'AST-2079',
    name: 'Backup Storage Cluster',
    owner: 'MedCore Inc.',
    category: 'Infrastructure',
    location: 'Sydney HQ',
    value: '$8,960',
    status: 'healthy',
    renewal: 'Aug 11, 2026',
    icon: Server,
  },
];

const UPCOMING_ACTIONS = [
  {
    title: 'Renew server warranty for BuildRight Co.',
    due: 'Due in 13 days',
    tone: 'warning',
  },
  {
    title: 'Schedule workstation inspection for Novastream',
    due: 'Due tomorrow',
    tone: 'neutral',
  },
  {
    title: 'Export Q2 customer asset register',
    due: 'Due this week',
    tone: 'success',
  },
];

const statusClass = {
  healthy: 'asset-status-healthy',
  review: 'asset-status-review',
  maintenance: 'asset-status-maintenance',
};

const CustomerAssetsTracker = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Devices', 'Infrastructure', 'Network'];
  const filteredAssets = ASSET_INVENTORY.filter((asset) => {
    const matchesCategory = activeCategory === 'All' || asset.category === activeCategory;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      asset.name.toLowerCase().includes(query) ||
      asset.owner.toLowerCase().includes(query) ||
      asset.id.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Customer Assets</h1>
          <p className="dashboard-subtitle">Track customer hardware, infrastructure, renewals, and support coverage in one place.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm" icon={SlidersHorizontal}>Asset Policies</Button>
          <Button variant="primary" size="sm" icon={Plus}>Add Asset</Button>
        </div>
      </div>

      <div className="assets-tracker">
        <div className="assets-summary-grid">
          {ASSET_SUMMARY.map((item) => {
            const SummaryIcon = item.icon;

            return (
              <Card key={item.label} className="assets-summary-card">
                <div className="assets-summary-head">
                  <div className="assets-summary-icon" style={{ background: item.toneBg, color: item.tone }}>
                    <SummaryIcon size={20} />
                  </div>
                  <span className="assets-summary-detail">{item.detail}</span>
                </div>
                <div className="assets-summary-value">{item.value}</div>
                <div className="assets-summary-label">{item.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="assets-layout">
          <Card className="assets-main-card">
            <div className="assets-toolbar">
              <div>
                <div className="section-title">Asset Registry</div>
                <div className="section-title-sub">Assigned equipment, infrastructure, and service commitments across customer accounts.</div>
              </div>

              <div className="assets-toolbar-actions">
                <div className="assets-search">
                  <Search size={16} />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search asset, owner, or ID"
                    aria-label="Search assets"
                  />
                </div>
                <Button variant="secondary" size="sm" icon={Boxes}>Group View</Button>
                <Button variant="primary" size="sm" icon={Plus}>Register Asset</Button>
              </div>
            </div>

            <div className="asset-filter-row">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`asset-filter-chip ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Customer</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Renewal</th>
                    <th>Status</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => {
                    const Icon = asset.icon;

                    return (
                      <tr key={asset.id}>
                        <td>
                          <div className="asset-name-cell">
                            <div className="asset-mini-icon">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="asset-name">{asset.name}</div>
                              <div className="asset-id">{asset.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="td-name">{asset.owner}</td>
                        <td>{asset.category}</td>
                        <td>
                          <span className="asset-inline-meta">
                            <MapPin size={13} />
                            {asset.location}
                          </span>
                        </td>
                        <td>{asset.renewal}</td>
                        <td>
                          <span className={`status-badge ${statusClass[asset.status]}`}>
                            {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                          </span>
                        </td>
                        <td className="td-name">{asset.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="assets-side-column">
            <Card className="assets-spotlight-card">
              <div className="assets-spotlight-header">
                <div>
                  <div className="section-title">Coverage Health</div>
                  <div className="section-title-sub">Support contracts and service posture.</div>
                </div>
                <ArrowUpRight size={16} style={{ color: 'var(--green)' }} />
              </div>

              <div className="coverage-ring">
                <div className="coverage-ring-inner">
                  <strong>85%</strong>
                  <span>covered</span>
                </div>
              </div>

              <div className="coverage-stats">
                <div className="coverage-stat">
                  <span>Under support</span>
                  <strong>71 assets</strong>
                </div>
                <div className="coverage-stat">
                  <span>Expiring soon</span>
                  <strong>9 assets</strong>
                </div>
                <div className="coverage-stat">
                  <span>Unassigned</span>
                  <strong>4 assets</strong>
                </div>
              </div>
            </Card>

            <Card className="assets-actions-card">
              <div className="section-title">Next Actions</div>
              <div className="asset-action-list">
                {UPCOMING_ACTIONS.map((action) => (
                  <div key={action.title} className="asset-action-item">
                    <div className={`asset-action-icon ${action.tone}`}>
                      {action.tone === 'success' ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}
                    </div>
                    <div>
                      <div className="asset-action-title">{action.title}</div>
                      <div className="asset-action-due">{action.due}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="asset-side-actions">
                <Button variant="secondary" size="sm" icon={Download}>Export</Button>
                <Button variant="ghost" size="sm" icon={Wrench}>Schedule Service</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAssetsTracker;
