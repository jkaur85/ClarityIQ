import { useState } from 'react';
import {
  Archive,
  ArchiveRestore,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Laptop,
  MapPin,
  PackageX,
  Search,
  Server,
  Smartphone,
  Trash2,
  Wifi,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/* ─── Static Data ─────────────────────────────────────────── */

const ARCHIVE_SUMMARY = [
  {
    label: 'Total Archived',
    value: '42',
    detail: '11 added this quarter',
    icon: Archive,
    tone: 'var(--blue)',
    toneBg: 'var(--blue-subtle)',
  },
  {
    label: 'Pending Disposal',
    value: '7',
    detail: 'Awaiting sign-off',
    icon: PackageX,
    tone: 'var(--amber)',
    toneBg: 'var(--amber-subtle)',
  },
  {
    label: 'Recovered / Reused',
    value: '18',
    detail: '43% recovery rate',
    icon: ArchiveRestore,
    tone: 'var(--green)',
    toneBg: 'var(--green-subtle)',
  },
];

const ARCHIVED_INVENTORY = [
  {
    id: 'AST-1021',
    name: 'ThinkPad X1 Carbon',
    owner: 'Orbit Retail',
    category: 'Devices',
    location: 'Sydney HQ',
    archivedOn: 'Jan 12, 2026',
    reason: 'End of life',
    status: 'disposed',
    icon: Laptop,
  },
  {
    id: 'AST-1035',
    name: 'HP ProBook 450 G9',
    owner: 'BuildRight Co.',
    category: 'Devices',
    location: 'Melbourne DC',
    archivedOn: 'Feb 03, 2026',
    reason: 'Hardware failure',
    status: 'pending',
    icon: Laptop,
  },
  {
    id: 'AST-1048',
    name: 'Dell PowerEdge R740',
    owner: 'MedCore Inc.',
    category: 'Infrastructure',
    location: 'Perth Branch',
    archivedOn: 'Feb 18, 2026',
    reason: 'Replaced by upgrade',
    status: 'recovered',
    icon: Server,
  },
  {
    id: 'AST-1056',
    name: 'Cisco Meraki Z3',
    owner: 'Novastream',
    category: 'Network',
    location: 'Remote',
    archivedOn: 'Mar 01, 2026',
    reason: 'Contract ended',
    status: 'disposed',
    icon: Wifi,
  },
  {
    id: 'AST-1067',
    name: 'iPhone 13 Pro Fleet (×6)',
    owner: 'Sarah Mitchell',
    category: 'Devices',
    location: 'Sydney HQ',
    archivedOn: 'Mar 22, 2026',
    reason: 'Upgraded to iPhone 16',
    status: 'recovered',
    icon: Smartphone,
  },
  {
    id: 'AST-1074',
    name: 'Synology NAS DS3622xs+',
    owner: 'Orbit Retail',
    category: 'Infrastructure',
    location: 'Adelaide Office',
    archivedOn: 'Apr 05, 2026',
    reason: 'End of life',
    status: 'pending',
    icon: Server,
  },
];

const ARCHIVE_TIMELINE = [
  {
    date: 'Apr 05, 2026',
    event: 'Synology NAS archived — Orbit Retail',
    type: 'archived',
  },
  {
    date: 'Mar 22, 2026',
    event: 'iPhone 13 fleet recovered for resale — Mitchell',
    type: 'recovered',
  },
  {
    date: 'Mar 01, 2026',
    event: 'Cisco Meraki Z3 disposed — Novastream',
    type: 'disposed',
  },
  {
    date: 'Feb 18, 2026',
    event: 'Dell PowerEdge redeployed internally — MedCore',
    type: 'recovered',
  },
  {
    date: 'Feb 03, 2026',
    event: 'HP ProBook flagged for pending disposal',
    type: 'pending',
  },
  {
    date: 'Jan 12, 2026',
    event: 'ThinkPad X1 Carbon disposed — Orbit Retail',
    type: 'disposed',
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */

const STATUS_CLASS = {
  disposed: 'archived-status-disposed',
  pending: 'archived-status-pending',
  recovered: 'archived-status-recovered',
};

const STATUS_LABEL = {
  disposed: 'Disposed',
  pending: 'Pending',
  recovered: 'Recovered',
};

const TIMELINE_ICON = {
  archived: Archive,
  recovered: ArchiveRestore,
  disposed: Trash2,
  pending: Clock,
};

const TIMELINE_CLASS = {
  archived: 'tl-archived',
  recovered: 'tl-recovered',
  disposed: 'tl-disposed',
  pending: 'tl-pending',
};

/* ─── Component ───────────────────────────────────────────── */

const ArchivedAssets = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const categories = ['All', 'Devices', 'Infrastructure', 'Network'];
  const statuses = ['All', 'Disposed', 'Pending', 'Recovered'];

  const filteredAssets = ARCHIVED_INVENTORY.filter((asset) => {
    const matchesCategory =
      activeCategory === 'All' || asset.category === activeCategory;
    const matchesStatus =
      activeStatus === 'All' ||
      STATUS_LABEL[asset.status] === activeStatus;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      asset.name.toLowerCase().includes(query) ||
      asset.owner.toLowerCase().includes(query) ||
      asset.id.toLowerCase().includes(query) ||
      asset.reason.toLowerCase().includes(query);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Archived Assets</h1>
          <p className="dashboard-subtitle">
            View decommissioned, retired, or disposed customer equipment and infrastructure.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm" icon={Download}>
            Export
          </Button>
          <Button variant="primary" size="sm" icon={ArchiveRestore}>
            Restore Asset
          </Button>
        </div>
      </div>

      <div className="archived-page">
        {/* Summary Cards */}
        <div className="archived-summary-grid">
          {ARCHIVE_SUMMARY.map((item) => {
            const SummaryIcon = item.icon;
            return (
              <Card key={item.label} className="assets-summary-card">
                <div className="assets-summary-head">
                  <div
                    className="assets-summary-icon"
                    style={{ background: item.toneBg, color: item.tone }}
                  >
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

        {/* Main content layout */}
        <div className="archived-layout">
          {/* Asset Table */}
          <Card className="archived-main-card">
            <div className="assets-toolbar">
              <div>
                <div className="section-title">Archive Registry</div>
                <div className="section-title-sub">
                  All decommissioned assets across active customer accounts.
                </div>
              </div>

              <div className="assets-toolbar-actions">
                <div className="assets-search">
                  <Search size={16} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search asset, owner, reason, or ID"
                    aria-label="Search archived assets"
                  />
                </div>
              </div>
            </div>

            {/* Category & Status filters */}
            <div className="archived-filter-bar">
              <div className="archived-filter-group">
                <span className="archived-filter-label">Category</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`asset-filter-chip ${
                        activeCategory === cat ? 'active' : ''
                      }`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="archived-filter-group">
                <span className="archived-filter-label">Status</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {statuses.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`asset-filter-chip ${
                        activeStatus === s ? 'active' : ''
                      }`}
                      onClick={() => setActiveStatus(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            {filteredAssets.length === 0 ? (
              <div className="archived-empty">
                <Archive size={40} style={{ opacity: 0.3 }} />
                <p>No archived assets match your current filters.</p>
              </div>
            ) : (
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Customer</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Archived On</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => {
                      const Icon = asset.icon;
                      return (
                        <tr key={asset.id}>
                          <td>
                            <div className="asset-name-cell">
                              <div className="asset-mini-icon archived-mini-icon">
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
                          <td>
                            <span className="asset-inline-meta">
                              <Calendar size={13} />
                              {asset.archivedOn}
                            </span>
                          </td>
                          <td className="archived-reason">{asset.reason}</td>
                          <td>
                            <span
                              className={`status-badge ${STATUS_CLASS[asset.status]}`}
                            >
                              {STATUS_LABEL[asset.status]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Side Panel — Archive Timeline */}
          <div className="archived-side-column">
            <Card className="archived-timeline-card">
              <div className="archived-timeline-header">
                <div>
                  <div className="section-title">Archive Timeline</div>
                  <div className="section-title-sub">
                    Recent archival activity.
                  </div>
                </div>
                <CheckCircle2
                  size={16}
                  style={{ color: 'var(--green)', flexShrink: 0 }}
                />
              </div>

              <div className="archived-timeline-list">
                {ARCHIVE_TIMELINE.map((entry, i) => {
                  const TlIcon = TIMELINE_ICON[entry.type];
                  return (
                    <div key={i} className="archived-tl-item">
                      <div
                        className={`archived-tl-icon ${TIMELINE_CLASS[entry.type]}`}
                      >
                        <TlIcon size={14} />
                      </div>
                      <div className="archived-tl-body">
                        <div className="archived-tl-event">{entry.event}</div>
                        <div className="archived-tl-date">{entry.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="archived-stats-card">
              <div className="section-title" style={{ marginBottom: 16 }}>
                Disposal Breakdown
              </div>
              <div className="archived-bar-list">
                {[
                  { label: 'End of Life', pct: 45, cls: 'bar-blue' },
                  { label: 'Hardware Failure', pct: 26, cls: 'bar-red' },
                  { label: 'Contract Ended', pct: 19, cls: 'bar-amber' },
                  { label: 'Upgraded', pct: 10, cls: 'bar-green' },
                ].map((bar) => (
                  <div key={bar.label} className="archived-bar-row">
                    <div className="archived-bar-meta">
                      <span>{bar.label}</span>
                      <span>{bar.pct}%</span>
                    </div>
                    <div className="archived-bar-track">
                      <div
                        className={`archived-bar-fill ${bar.cls}`}
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedAssets;
