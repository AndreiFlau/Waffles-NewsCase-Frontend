import { createContext, useState, ReactNode, useEffect } from "react";
import { UserContextType, UserData } from "./types.ts";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const UserContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [jwtToken, setJwtToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<object>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData(token: string) {
      setLoading(true);

      try {
        const newsletterResponse = await fetch(`${API_URL}/user/newsletter`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const streakResponse = await fetch(`${API_URL}/streaks/me`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (newsletterResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const newsletterData = await newsletterResponse.json();
        const streakData = await streakResponse.json();

        if (newsletterResponse.ok && streakResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        const userData = {
          streak: streakData,
          newsletterHistory: newsletterData.formattedStats,
        };

        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    const stored = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setJwtToken(storedToken);
      fetchUserData(storedToken);
    }

    if (stored) {
      try {
        const storedUserData = JSON.parse(stored) as UserData;
        setUserData(storedUserData);
        setJwtToken(storedToken);
      } catch (err) {
        console.error("Erro ao processar os dados do usuário armazenados:", err);
      }
    }

    setLoading(false);
  }, [navigate]);

  return <UserContext.Provider value={{ userData, jwtToken, loading, message }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
