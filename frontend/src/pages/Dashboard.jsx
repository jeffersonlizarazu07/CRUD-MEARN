import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { API_URL } from "../auth/api";
import EditarUsuarioModal from "./ActualizarUsuario";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    try {
      const response = await fetch(API_URL, { credentials: "include" });
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    const confirmacion = window.confirm("¿Desea eliminar este usuario?");
    if (!confirmacion) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
      alert("Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const actualizarUsuario = async (usuarioActualizado) => {
    if (!usuarioActualizado?._id) {
      alert("Error: No se encontró el ID del usuario.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${usuarioActualizado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: usuarioActualizado.nombre,
          correo_electronico: usuarioActualizado.correo_electronico,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario._id === usuarioActualizado._id ? usuarioActualizado : usuario
          )
        );

        setUsuarioSeleccionado(null);
        setModalOpen(false);
        console.log(`Usuario actualizado.`);
      } else {
        throw new Error("Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un problema al actualizar el usuario. Intenta nuevamente.");
    }
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalOpen(true);
  };

  const cerrarSesion = useCallback(async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      alert("Sesión cerrada exitosamente.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  }, [navigate]);

  return (
    <div className="d-flex">
      <div className="sidebar">
        <h4>Panel Administrativo</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <span className="nav-link">
              <DashboardIcon className="dashboard-icon" /> Dashboard
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <AccountCircleIcon className="user-icon" /> Usuario
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <SettingsIcon className="settings-icon" /> Configuración
            </span>
          </li>
        </ul>
      </div>

      <div className="container-fluid p-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand" onClick={() => navigate("/dashboard")}>
              Dashboard
            </span>
            <button className="btn btn-outline-danger" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </div>
        </nav>

        <h2 className="mb-3">Gestión de Usuarios</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success">Agregar Usuario</button>
          <input type="text" className="form-control w-25" placeholder="Buscar..." />
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario._id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo_electronico}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditarUsuario(usuario)}>
                        ✏️
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(usuario._id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de edición */}
      {modalOpen && (
        <EditarUsuarioModal
          usuario={usuarioSeleccionado}
          onClose={() => setModalOpen(false)}
          onSave={actualizarUsuario}
        />
      )}
    </div>
  );
};

export default Dashboard;