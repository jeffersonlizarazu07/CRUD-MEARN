import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => (
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
);

export default Sidebar;