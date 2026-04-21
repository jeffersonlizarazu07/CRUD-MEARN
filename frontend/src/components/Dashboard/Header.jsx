import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand" onClick={() => navigate("/dashboard")}>
          Dashboard
        </span>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Header;