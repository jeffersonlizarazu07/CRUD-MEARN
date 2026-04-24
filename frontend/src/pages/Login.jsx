import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../auth/api";
import "../styles/Login.css";

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const btnRegister = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: correoElectronico, user_password }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        return navigate("/dashboard");
      }
      
      setError(data.message || "Credenciales incorrectas");
    } catch (err) {
      console.error("Error en login", err);
      setError("Error de conexión. Intenta más tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center">Bienvenido</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="tu@email.com"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>

          <button
            type="button"
            className="btn btn-secundary"
            onClick={btnRegister}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
