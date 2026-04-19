const Button = ({
  children,
  variant = 'primary',
  size = '',
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  const cls = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {Icon && <Icon size={16} />}
      {children}
      {IconRight && <IconRight size={16} />}
    </button>
  );
};

export default Button;
