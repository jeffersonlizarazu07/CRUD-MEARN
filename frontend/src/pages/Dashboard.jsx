import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../auth/api";
import { UserUpdate } from "./UserUpdate";
import { Sidebar, Header, UserTable, SearchBar } from "../components/Dashboard";
import "../styles/Dashboard.css";

const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userSelect, setUserSelect] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ============================================
  // EFECTO: Cargar usuarios al montar componente
  // ============================================
  useEffect(() => {
    usersSearch();
  }, []);

  // ============================================
  // FUNCIONES API
  // ============================================
  const usersSearch = async () => {
    try {
      const response = await fetch(API_URL, { credentials: "include" });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const userDelete = async (id) => {
    const confirmacion = window.confirm("¿Desea eliminar este usuario?");
    if (!confirmacion) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      alert("Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const userUpdate = async (userUpdated) => {
    if (!userUpdated?._id) {
      alert("Error: No se encontró el ID del usuario.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${userUpdated._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: userUpdated.nombre,
          correo_electronico: userUpdated.correo_electronico,
        }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al actualizar");

      setUsers((prev) =>
        prev.map((u) => (u._id === userUpdated._id ? userUpdated : u)),
      );
      setModalOpen(false);
      setUserSelect(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al actualizar. Intenta nuevamente.");
    }
  };

  // ============================================
  // HANDLERS
  // ============================================
  const handleEditar = (usuario) => {
    setUserSelect(usuario);
    setModalOpen(true);
  };

  const handleBuscar = useCallback((valor) => {
    setSearch(valor);
  }, []);

  const handleCerrarSesion = useCallback(async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      alert("Sesión cerrada.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }, [navigate]);

  // ============================================
  // RENDER
  // ============================================
  const usersFiltered = search
    ? users.filter(
        (u) =>
          u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          u.correo_electronico?.toLowerCase().includes(search.toLowerCase()),
      )
    : users;

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header onLogout={handleCerrarSesion} />

        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-content">
            <h1>Bienvenido de nuevo</h1>
            <p>Gestión de usuarios</p>
          </div>
          <div className="current-date">{getCurrentDate()}</div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="action-card add-user"
            onClick={() => alert("Crear usuario")}
          >
            <h3>Agregar</h3>
            <div className="action-value">+ Usuario</div>
          </button>
          <button className="action-card" onClick={() => navigate("/")}>
            <h3>Registros</h3>
            <div className="action-value">{users.length}</div>
          </button>
          <button className="action-card" onClick={() => alert("Exportar")}>
            <h3>Exportar</h3>
            <div className="action-value">CSV</div>
          </button>
        </div>

        <UserTable
          usuarios={usersFiltered}
          onEdit={handleEditar}
          onDelete={userDelete}
          onAdd={() => alert("Funcionalidad pendiente")}
          searchBar={
            <SearchBar value={search} onChange={handleBuscar} onSearch={true} />
          }
        />
      </div>

      {modalOpen && (
        <UserUpdate
          usuario={userSelect}
          onClose={() => setModalOpen(false)}
          onSave={userUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
