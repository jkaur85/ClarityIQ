import { Settings as SettingsIcon } from 'lucide-react';
import Card from '../components/ui/Card';

const Settings = () => (
  <div>
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-title">Settings</h1>
        <p className="dashboard-subtitle">Configure your CRM preferences and integrations.</p>
      </div>
    </div>
    <Card style={{ padding: 48, textAlign: 'center' }}>
      <SettingsIcon size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
      <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        Settings panel coming soon.
      </p>
    </Card>
  </div>
);

export default Settings;
