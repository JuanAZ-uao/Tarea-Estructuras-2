import { useAuth } from "../context/AuthContext";

export default function Page2() {
  const { email } = useAuth();

  return (
    <div className="page-container">
      <h1>Página 2 - Perfil</h1>
      <p className="welcome-text">
        Bienvenido, <strong>{email}</strong>!
      </p>
      <div className="card">
        <h3>Ejercicio 2</h3>
        <p>
          Esta es la segunda página privada. Muestra la información del perfil
          del usuario obtenida del Contexto de Autenticación.
        </p>
        <table className="profile-table">
          <tbody>
            <tr>
              <td><strong>Correo:</strong></td>
              <td>{email}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>Autenticado ✅</td>
            </tr>
            <tr>
              <td><strong>Rol:</strong></td>
              <td>Usuario Demo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
