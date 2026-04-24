const UserTable = ({ usuarios, onEdit, onDelete, onAdd, searchBar }) => (
  <section className="table-section">
    <div className="table-header">
      <h2>Usuarios</h2>
      <div className="table-actions">
        <button className="btn-agregar" onClick={onAdd}>
          + Agregar usuario
        </button>
        {searchBar}
      </div>
    </div>
    
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td className="id-cell">{usuario._id.slice(-6)}</td>
                <td className="nombre-cell">{usuario.nombre}</td>
                <td className="email-cell">{usuario.correo_electronico}</td>
                <td>{usuario.name_rol || "—"}</td>
                <td className="acciones-cell">
                  <button 
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(usuario)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(usuario._id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-state">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);

export default UserTable;
