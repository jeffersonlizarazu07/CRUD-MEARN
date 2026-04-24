import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => navigate("/dashboard")}>
        Dashboard
      </span>
      <button className="btn-outline-danger" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Header;