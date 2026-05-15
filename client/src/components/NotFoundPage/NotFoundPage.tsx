import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>404 Not found</h1>
      <Link to="/">
        <h2>Go back to homepage</h2>
      </Link>
    </>
  );
}

export default NotFoundPage;
