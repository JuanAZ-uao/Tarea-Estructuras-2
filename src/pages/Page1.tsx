import { useAuth } from "../context/AuthContext";

export default function Page1() {
  const { email } = useAuth();

  return (
    <div className="page-container">
      <h1>Página 1 - Panel Principal</h1>
      <p className="welcome-text">
        Bienvenido, <strong>{email}</strong>!
      </p>
      <div className="card">
        <h3>Ejercicio 1</h3>
        <p>
          Esta es una página privada accesible solo para usuarios autenticados.
          Actualmente has iniciado sesión como <strong>{email}</strong>.
        </p>
        <p>
          Esta página demuestra el uso de <code>Context</code>,{" "}
          <code>Provider</code> y <code>State</code> para manejar los datos de
          autenticación en toda la aplicación.
        </p>
      </div>
    </div>
  );
}
