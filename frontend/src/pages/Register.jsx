import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/api';
import '../styles/Login.css';
import '../styles/Register.css';


const Register = () => {

  const [nombre, setNombre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const btnLogin = () => {
    navigate("/login"); // Redirige a la página de login
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Datos enviados al backend", { nombre, correo_electronico: correoElectronico, user_password });

    // Validación campos
    if (!nombre || !correoElectronico || !user_password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo_electronico: correoElectronico, user_password }),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);

      // Redirigir al login si el registro fue exitoso
      if (response.ok) {
        return navigate('/login');
      }
    } catch (err) {
      console.error('Error en el registro', err);
      setError('Error al registrarse. Intente nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center mb-4">Registro</h3>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group mb-2">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="email">Correo</label>
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

          <button type="submit" className="btn btn-secundary btn-block w-100" onClick={btnLogin}>Iniciar Sesión</button>

          <button type="submit" className="btn btn-primary btn-block w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;