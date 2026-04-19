import { User, Mail, Phone } from 'lucide-react';
import FormField from '../ui/FormField';

const Step1BasicInfo = ({ data, onChange }) => {
  const handle = (e) => onChange({ [e.target.name]: e.target.value });

  return (
    <div className="animate-slide-right">
      <h2>Basic Information</h2>
      <p className="step-desc">
        Let's start with the customer's personal contact details.
      </p>

      <div className="form-grid">
        <FormField id="firstName" label="First Name" required icon={User}>
          <div className="form-input-wrapper">
            <User className="form-input-icon" size={16} />
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-input has-icon"
              placeholder="e.g. Sarah"
              value={data.firstName}
              onChange={handle}
            />
          </div>
        </FormField>

        <FormField id="lastName" label="Last Name" required>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-input"
            placeholder="e.g. Johnson"
            value={data.lastName}
            onChange={handle}
          />
        </FormField>

        <FormField id="email" label="Email Address" required>
          <div className="form-input-wrapper">
            <Mail className="form-input-icon" size={16} />
            <input
              id="email"
              name="email"
              type="email"
              className="form-input has-icon"
              placeholder="sarah@company.com"
              value={data.email}
              onChange={handle}
            />
          </div>
        </FormField>

        <FormField id="phone" label="Phone Number">
          <div className="form-input-wrapper">
            <Phone className="form-input-icon" size={16} />
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input has-icon"
              placeholder="+1 (555) 000-0000"
              value={data.phone}
              onChange={handle}
            />
          </div>
        </FormField>

        <FormField
          id="jobTitle"
          label="Job Title"
          className="full-width"
        >
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            className="form-input"
            placeholder="e.g. Head of Operations"
            value={data.jobTitle}
            onChange={handle}
          />
        </FormField>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
