import { Link } from "react-router-dom";
import "./Greetingpage.css";

function Greetingpage() {
  return (
    <div className="welcome-container">
      <h1>Welcome to the app!</h1>
      <h3>
        Start <Link to={"/create"}>creating</Link> your notes and todos now!
      </h3>
      <h3>
        Or manage them in <Link to={"/dashboard"}>Dashboard</Link>
      </h3>
    </div>
  );
}

export default Greetingpage;
