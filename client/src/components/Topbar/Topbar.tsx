import { useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";

function Topbar() {
  const [showSearch, setSearch] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
      </div>
      <div className="topbar-center">
        <h1 className="topbar-title">Kenar</h1>
      </div>
      <div className="topbar-right">
        {showSearch && (
          <input type="text" className="search-input" placeholder="Search..." />
        )}
        <button
          className="search-btn"
          onClick={() => setSearch((prev) => !prev)}
        >
          🔍
        </button>
      </div>
    </header>
  );
}

export default Topbar;
