import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StepIndicator from './StepIndicator';
import Step1BasicInfo from './Step1_BasicInfo';
import Step2Company from './Step2_Company';
import Step3Preferences from './Step3_Preferences';
import Step4Review from './Step4_Review';

const TOTAL_STEPS = 4;

const defaultData = {
  basicInfo: {
    firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
  },
  company: {
    companyName: '', industry: '', companySize: '', website: '', address: '',
  },
  preferences: {
    contactMethod: '',
    productInterests: [],
    notes: '',
  },
};

const generateId = () =>
  'CRM-' + Math.random().toString(36).toUpperCase().slice(2, 8);

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1);
  const [formData, setFormData] = useState(defaultData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [customerId, setCustomerId] = useState('');

  const updateSection = (section) => (updates) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1600));
    setCustomerId(generateId());
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="wizard-container">
        <Card className="wizard-body success-screen">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Customer Successfully Onboarded!</h2>
          <p className="success-sub">
            <strong style={{ color: 'var(--text-primary)' }}>
              {formData.basicInfo.firstName} {formData.basicInfo.lastName}
            </strong>{' '}
            from <strong style={{ color: 'var(--text-primary)' }}>
              {formData.company.companyName || 'their organisation'}
            </strong>{' '}
            has been added to ClarityIQ CRM.
          </p>
          <div className="customer-id-pill">Customer ID: {customerId}</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button
              variant="secondary"
              onClick={() => {
                setFormData(defaultData);
                setStep(1);
                setSubmitted(false);
              }}
            >
              Onboard Another
            </Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const stepProps = [
    null,
    <Step1BasicInfo
      key="s1"
      data={formData.basicInfo}
      onChange={updateSection('basicInfo')}
    />,
    <Step2Company
      key="s2"
      data={formData.company}
      onChange={updateSection('company')}
    />,
    <Step3Preferences
      key="s3"
      data={formData.preferences}
      onChange={updateSection('preferences')}
    />,
    <Step4Review
      key="s4"
      data={formData}
    />,
  ];

  return (
    <div className="wizard-container">
      {/* Header */}
      <div className="wizard-header">
        <h1 className="wizard-title">New Customer Onboarding</h1>
        <p className="wizard-subtitle">
          Complete all steps to create the customer profile in ClarityIQ.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={step} />

      {/* Step Body */}
      <Card className="wizard-body">
        {stepProps[step]}
      </Card>

      {/* Footer */}
      <div className="wizard-footer">
        <div className="wizard-footer-left">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={step === 1 ? () => navigate('/') : back}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
        </div>

        <span className="step-count">Step {step} of {TOTAL_STEPS}</span>

        <div className="wizard-footer-right">
          {step < TOTAL_STEPS ? (
            <Button
              variant="primary"
              iconRight={ArrowRight}
              onClick={next}
              id={`wizard-next-step-${step}`}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={submitting ? Loader2 : CheckCircle}
              onClick={handleSubmit}
              disabled={submitting}
              id="wizard-submit"
            >
              {submitting ? 'Creating Profile…' : 'Create Customer'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
