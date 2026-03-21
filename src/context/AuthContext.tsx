import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const VALID_EMAIL = "user@mail.com";
const VALID_PASSWORD = "123";

interface StoredUser {
  email: string;
  password: string;
}

function getStoredUsers(): StoredUser[] {
  const data = localStorage.getItem("registeredUsers");
  return data ? JSON.parse(data) : [];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    email: null,
  });

  const login = (email: string, password: string): boolean => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setAuth({ isAuthenticated: true, email });
      return true;
    }
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setAuth({ isAuthenticated: true, email });
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): { success: boolean; message: string } => {
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Este correo ya está registrado." };
    }
    if (email === VALID_EMAIL) {
      return { success: false, message: "Este correo ya está registrado." };
    }
    users.push({ email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    return { success: true, message: "Registro exitoso. Ahora puede iniciar sesión." };
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, email: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
