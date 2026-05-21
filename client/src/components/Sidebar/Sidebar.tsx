import "./Sidebar.css";
import { Link } from "react-router-dom";
import NotesList from "../NotesList/NotesList";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <h1 className="sidebar-item active">Dashboard</h1>
      </Link>
      <nav className="navbar">
        <h1>ToDo</h1>
        <ul className="nav-list">
          <NotesList />
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
