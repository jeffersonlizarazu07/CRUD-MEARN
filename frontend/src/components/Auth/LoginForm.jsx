import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../auth/api";
import "../../styles/Login.css";

const LoginForm = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico, user_password }),
        credentials: "include",
      });
      if (response.ok) navigate("/dashboard");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  const btnRegister = () => navigate("/");

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {error && (
          <div className="alert alert-danger" role="alert">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Usuario</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Ingresar
          </button>
          <button type="button" className="btn btn-secundary btn-block w-100" onClick={btnRegister}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;