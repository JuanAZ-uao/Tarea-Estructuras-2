import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Challenge 8
      </Link>
      {user && (
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="navbar-text text-light">{user.email}</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <FiLogOut className="me-1" />
            Salir
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
