const Button = ({ children, className, onClick, type = "button" }) => (
  <button type={type} className={className} onClick={onClick}>
    {children}
  </button>
);

export default Button;