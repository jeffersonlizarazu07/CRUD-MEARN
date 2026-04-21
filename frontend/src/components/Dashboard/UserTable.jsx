const UserTable = ({ usuarios, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table table-hover table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
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
                <button className="btn btn-warning btn-sm" onClick={() => onEdit(usuario)}>
                  ✏️
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(usuario._id)}>
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
);

export default UserTable;