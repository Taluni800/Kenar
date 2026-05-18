import "./Sidebar.css";
import { Link } from "react-router-dom";
import NotesList from "../NotesList/NotesList";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <h1 className="sidebar-item active">Dashboard</h1>
      </Link>
      <h1>ToDo</h1>
      <nav className="navbar">
        <ul className="nav-list">
          <NotesList />
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
