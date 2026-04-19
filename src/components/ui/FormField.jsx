const FormField = ({
  id,
  label,
  required,
  hint,
  error,
  icon: Icon,
  children,
  type = 'text',
  className = '',
  ...inputProps
}) => {
  const isCustom = !!children;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {isCustom ? (
        children
      ) : (
        <div className="form-input-wrapper">
          {Icon && (
            <Icon className="form-input-icon" size={16} />
          )}
          <input
            id={id}
            type={type}
            className={`form-input ${Icon ? 'has-icon' : ''} ${error ? 'error' : ''}`}
            {...inputProps}
          />
        </div>
      )}
      {hint && !error && <p className="form-hint">{hint}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormField;
