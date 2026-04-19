import { useNavigate } from 'react-router-dom';
import { Boxes, Plus, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Customers = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Customers</h1>
          <p className="dashboard-subtitle">Manage customer accounts and jump into the dedicated asset register when you need lifecycle and coverage details.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="secondary"
            size="sm"
            icon={Boxes}
            onClick={() => navigate('/customer-assets')}
          >
            View Assets
          </Button>
          <Button variant="primary" size="sm" icon={Plus}>Add Customer</Button>
        </div>
      </div>

      <Card style={{ padding: 48, textAlign: 'center' }}>
        <Users size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 520, margin: '0 auto 20px' }}>
          Customer records stay here, while the full customer asset tracker now lives in its own page for inventory, renewals, and support coverage.
        </p>
        <Button
          variant="primary"
          size="sm"
          icon={Boxes}
          onClick={() => navigate('/customer-assets')}
        >
          Open Customer Assets
        </Button>
      </Card>
    </div>
  );
};

export default Customers;
