import { BarChart3 } from 'lucide-react';
import Card from '../components/ui/Card';

const Reports = () => (
  <div>
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-title">Reports</h1>
        <p className="dashboard-subtitle">Analytics and performance insights.</p>
      </div>
    </div>
    <Card style={{ padding: 48, textAlign: 'center' }}>
      <BarChart3 size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
      <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        Reports and analytics coming soon.
      </p>
    </Card>
  </div>
);

export default Reports;
