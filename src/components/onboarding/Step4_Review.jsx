import { User, Building2, Star, Edit3 } from 'lucide-react';

const ReviewGroup = ({ title, icon, fields }) => {
  const GroupIcon = icon;

  return (
    <div className="review-group">
      <div className="review-group-title">
        <GroupIcon size={14} />
        {title}
      </div>
      <div className="review-grid">
        {fields.map(({ label, value }) => (
          <div className="review-field" key={label}>
            <label>{label}</label>
            <span>{value || <span style={{ color: 'var(--text-muted)' }}>—</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Step4Review = ({ data }) => {
  const { firstName, lastName, email, phone, jobTitle } = data.basicInfo;
  const { companyName, industry, companySize, website, address } = data.company;
  const { contactMethod, productInterests, notes } = data.preferences;

  return (
    <div className="animate-slide-right">
      <h2>Review & Submit</h2>
      <p className="step-desc">
        Double-check everything before creating the customer profile. You can click any section to edit.
      </p>

      <div className="review-section">
        <ReviewGroup
          title="Basic Information"
          icon={User}
          fields={[
            { label: 'Full Name',  value: `${firstName} ${lastName}`.trim() },
            { label: 'Email',      value: email },
            { label: 'Phone',      value: phone },
            { label: 'Job Title',  value: jobTitle },
          ]}
        />

        <ReviewGroup
          title="Company Details"
          icon={Building2}
          fields={[
            { label: 'Company',   value: companyName },
            { label: 'Industry',  value: industry },
            { label: 'Size',      value: companySize },
            { label: 'Website',   value: website },
            { label: 'Address',   value: address },
          ]}
        />

        <ReviewGroup
          title="Preferences"
          icon={Star}
          fields={[
            { label: 'Preferred Contact', value: contactMethod
                ? contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)
                : null },
            { label: 'Product Interests', value: productInterests?.length
                ? productInterests.join(', ')
                : null },
            { label: 'Notes', value: notes },
          ]}
        />
      </div>

      <div style={{ marginTop: 20, padding: '14px 20px', borderRadius: 'var(--radius-md)', background: 'var(--accent-subtle)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Edit3 size={15} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Use the <strong style={{ color: 'var(--text-accent)' }}>Back</strong> button to return to any step and make changes.
        </span>
      </div>
    </div>
  );
};

export default Step4Review;
