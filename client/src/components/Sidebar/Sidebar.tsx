import "./Sidebar.css";
import { Link } from "react-router-dom";
import NotesList from "../NotesList/NotesList";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <li className="sidebar-item active">Dashboard</li>
      </Link>
      <nav className="sidebar-nav">
        <ul>
          <NotesList />
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
