const Card = ({ children, className = '', glass = false, style }) => (
  <div
    className={`card ${glass ? 'card-glass' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
);

export default Card;
