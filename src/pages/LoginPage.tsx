import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/page1", { replace: true });
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate("/page1");
    } else {
      setError("Correo electrónico o contraseña inválidos.");
    }
  };

  const handleRegister = () => {
    setError("");
    setSuccessMsg("");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const result = register(email, password);
    if (result.success) {
      setSuccessMsg(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
          <button type="button" className="btn-register" onClick={handleRegister}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
