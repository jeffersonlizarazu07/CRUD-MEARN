import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // hook para navegación

  const btnRegister = () => {
    navigate("/"); // Redirige a la página de registro
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Datos enviados al backend", { email: correoElectronico, user_password });

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: correoElectronico, user_password }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      // Redirigir al dashboard si el login es exitoso
      if (response.ok) {
        return navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error en login", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="btn btn-secundary btn-block w-100"
            onClick={btnRegister}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
