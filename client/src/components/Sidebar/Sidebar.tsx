import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <Link to="/dashboard">
            <li className="sidebar-item active">Dashboard</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
