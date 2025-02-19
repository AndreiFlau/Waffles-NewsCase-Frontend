import { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthorizationContext.ts";
import { User } from "./types.ts";

export function MyProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

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

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
