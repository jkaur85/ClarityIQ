import { Mail, Phone, MessageSquare, Video } from 'lucide-react';

const CONTACT_METHODS = [
  { id: 'email',    label: 'Email',     icon: Mail },
  { id: 'phone',    label: 'Phone',     icon: Phone },
  { id: 'sms',      label: 'SMS',       icon: MessageSquare },
  { id: 'video',    label: 'Video Call',icon: Video },
];

const PRODUCTS = [
  'CRM Essentials',
  'Sales Pipeline',
  'Marketing Hub',
  'Customer Support',
  'Analytics & Reports',
  'Integrations',
  'AI Insights',
  'API Access',
];

const Step3Preferences = ({ data, onChange }) => {
  const toggleProduct = (product) => {
    const current = data.productInterests || [];
    const updated  = current.includes(product)
      ? current.filter((p) => p !== product)
      : [...current, product];
    onChange({ productInterests: updated });
  };

  const selectContact = (id) => onChange({ contactMethod: id });

  return (
    <div className="animate-slide-right">
      <h2>Preferences</h2>
      <p className="step-desc">
        Set communication preferences and identify which products this customer is interested in.
      </p>

      {/* Contact Method */}
      <div className="form-group" style={{ marginBottom: 28 }}>
        <label className="form-label">Preferred Contact Method</label>
        <div className="radio-group">
          {CONTACT_METHODS.map((method) => {
            const MethodIcon = method.icon;

            return (
              <div
                key={method.id}
                id={`contact-${method.id}`}
                className={`radio-option ${data.contactMethod === method.id ? 'selected' : ''}`}
                onClick={() => selectContact(method.id)}
                role="radio"
                aria-checked={data.contactMethod === method.id}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && selectContact(method.id)}
              >
                <MethodIcon className="radio-icon" size={16} />
                {method.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Interests */}
      <div className="form-group" style={{ marginBottom: 28 }}>
        <label className="form-label">Product Interests</label>
        <p className="form-hint" style={{ marginBottom: 8 }}>Select all that apply</p>
        <div className="tag-grid">
          {PRODUCTS.map((product) => (
            <div
              key={product}
              className={`tag-option ${(data.productInterests || []).includes(product) ? 'selected' : ''}`}
              onClick={() => toggleProduct(product)}
              role="checkbox"
              aria-checked={(data.productInterests || []).includes(product)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleProduct(product)}
            >
              {product}
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label className="form-label" htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="form-textarea"
          placeholder="Any special requirements, context, or notes about this customer…"
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
};

export default Step3Preferences;
