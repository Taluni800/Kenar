import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to={"/greets"}>
          <h3>Home</h3>
        </Link>
      </div>
      <div className="topbar-center">
        <h1 className="topbar-title">Kenar</h1>
      </div>
      <div className="topbar-right">
        <Link to={"/create"}>
          <h3>Create</h3>
        </Link>
      </div>
    </header>
  );
}

export default Topbar;
