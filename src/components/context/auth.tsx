import { createContext, useState, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "./types.ts";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<object>({ message: "", success: false });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const storedUser = JSON.parse(stored) as User;
        setUser(storedUser);
      } catch (err) {
        console.error("Erro na hora de armazenar o usuário:", err);
      }
    }
    setLoading(false);
  }, []);

  async function login(email: string) {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const { jwtToken, ...userData } = await response.json();

      if (response.ok) {
        setMessage({ message: "Logado com sucesso!", success: true });
      } else {
        setMessage({ message: userData.message || "Login falhou. Tente novamente.", success: false });
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
    } catch (error) {
      const err = error as Error;
      console.error(`Erro ao logar: `, err);
      setMessage({ message: err.message, success: false });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return <AuthContext.Provider value={{ user, loading, message, setUser, login, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
