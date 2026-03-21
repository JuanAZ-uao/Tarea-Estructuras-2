import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, email, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Desafío 06</div>
      {isAuthenticated && (
        <div className="navbar-links">
          <Link to="/page1">Página 1</Link>
          <Link to="/page2">Página 2</Link>
          <span className="navbar-user">👤 {email}</span>
          <button onClick={logout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
