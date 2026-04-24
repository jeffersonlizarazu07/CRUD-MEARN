import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/api';
import '../styles/Login.css';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const btnLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userName || !email || !userPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: userName, correo_electronico: email, user_password: userPassword }),
        credentials: 'include',
      });

      if (response.ok) {
        return navigate('/login');
      }
      
      setError('Error al registrarse. Intenta nuevamente');
    } catch (err) {
      console.error('Error en registro', err);
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h3 className="text-center">Crear cuenta</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Juan Pérez"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>

          <button 
            type="button" 
            className="btn btn-secundary"
            onClick={btnLogin}
          >
            Ya tengo cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
