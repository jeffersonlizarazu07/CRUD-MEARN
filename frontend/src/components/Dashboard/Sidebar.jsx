import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const navItems = [
  { icon: DashboardIcon, label: "Dashboard", active: true },
  { icon: PeopleIcon, label: "Usuarios", active: false },
  { icon: SettingsIcon, label: "Configuración", active: false },
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <div className="brand-icon">
        <SupervisorAccountIcon />
      </div>
      <span className="brand-text">Dashboard Administrativo</span>
    </div>
    
    <nav className="nav flex-column mt-4">
      {navItems.map((item) => (
        <li key={item.label} className={`nav-item ${item.active ? 'active' : ''}`}>
          <span className="nav-link">
            <div className="nav-avatar">
              <item.icon className="nav-icon" />
            </div>
            {item.label}
          </span>
        </li>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
