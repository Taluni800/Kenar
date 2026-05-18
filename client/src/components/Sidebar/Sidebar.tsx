import "./Sidebar.css";
import { Link } from "react-router-dom";
import NotesList from "../NotesList/NotesList";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <p className="sidebar-item active">Dashboard</p>
      </Link>
      <nav className="navbar">
        <ul className="nav-list">
          <NotesList />
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
