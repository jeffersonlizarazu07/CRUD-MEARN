import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/users";

const RutasProtegidas = () => {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const verificarAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/verify`, {
          credentials: "include",
        });
        if (!cancelado && response.ok) setAutenticado(true);
        else if (!cancelado) setAutenticado(false);
      } catch (error) {
        if (!cancelado) {
          console.warn("Sesión expirada o usuario no autenticado.");
          setAutenticado(false);
        }
      }
    };

    verificarAuth();

    return () => {
      cancelado = true;
    };
  }, []);

  if (autenticado === null) return <p>Cargando...</p>;
  
  return autenticado ? <Outlet /> : <Navigate to="/login" />;
};

export default RutasProtegidas;
