import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <li className="sidebar-item active">Dashboard</li>
      </Link>
      <nav className="sidebar-nav">
        <ul></ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
