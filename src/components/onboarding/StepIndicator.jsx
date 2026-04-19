import { Check } from 'lucide-react';

const STEPS = [
  { label: 'Basic Info' },
  { label: 'Company' },
  { label: 'Preferences' },
  { label: 'Review' },
];

const StepIndicator = ({ currentStep }) => (
  <div className="step-indicator">
    {STEPS.map((step, index) => {
      const stepNum   = index + 1;
      const isActive  = stepNum === currentStep;
      const isDone    = stepNum < currentStep;

      return (
        <div
          key={step.label}
          className={`step-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
        >
          <div className="step-circle">
            {isDone ? <Check size={16} /> : stepNum}
          </div>
          <span className="step-label">{step.label}</span>
        </div>
      );
    })}
  </div>
);

export default StepIndicator;
