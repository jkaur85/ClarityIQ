import { Building2, Globe } from 'lucide-react';

const INDUSTRIES = [
  'Select industry…',
  'Technology & Software',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Retail & E-commerce',
  'Manufacturing',
  'Real Estate',
  'Education',
  'Media & Entertainment',
  'Logistics & Supply Chain',
  'Other',
];

const SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees',
];

const Step2Company = ({ data, onChange }) => {
  const handle = (e) => onChange({ [e.target.name]: e.target.value });

  return (
    <div className="animate-slide-right">
      <h2>Company Details</h2>
      <p className="step-desc">
        Tell us about the customer's organisation to tailor their experience.
      </p>

      <div className="form-grid">
        <FormField id="companyName" label="Company Name" className="full-width" required>
          <div className="form-input-wrapper">
            <Building2 className="form-input-icon" size={16} />
            <input
              id="companyName"
              name="companyName"
              type="text"
              className="form-input has-icon"
              placeholder="e.g. Acme Corporation"
              value={data.companyName}
              onChange={handle}
            />
          </div>
        </FormField>

        <div className="form-group">
          <label className="form-label" htmlFor="industry">
            Industry <span className="required">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            className="form-select"
            value={data.industry}
            onChange={handle}
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind === 'Select industry…' ? '' : ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="companySize">
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            className="form-select"
            value={data.companySize}
            onChange={handle}
          >
            <option value="">Select size…</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <FormField id="website" label="Website URL" className="full-width">
          <div className="form-input-wrapper">
            <Globe className="form-input-icon" size={16} />
            <input
              id="website"
              name="website"
              type="url"
              className="form-input has-icon"
              placeholder="https://www.company.com"
              value={data.website}
              onChange={handle}
            />
          </div>
        </FormField>

        <FormField id="address" label="Business Address" className="full-width">
          <input
            id="address"
            name="address"
            type="text"
            className="form-input"
            placeholder="123 Main St, City, State, Country"
            value={data.address}
            onChange={handle}
          />
        </FormField>
      </div>
    </div>
  );
};

// Quick helper to avoid re-exporting FormField inline
const FormField = ({ id, label, required, className, children }) => (
  <div className={`form-group ${className ?? ''}`}>
    {label && (
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
    )}
    {children}
  </div>
);

export default Step2Company;
