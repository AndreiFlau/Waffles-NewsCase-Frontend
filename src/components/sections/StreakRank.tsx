import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
import RankDiv from "../ui/RankDiv";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Streak {
  id: number;
  currentStreak: number;
  email: string;
}

function StreakRank() {
  const { jwtToken } = useUserData();
  const [streakRank, setStreakRank] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;
    setLoading(true);
    async function fetchRank(token: string) {
      try {
        const rankResponse = await fetch(`${API_URL}/dashboard/streakrank`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (rankResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const rankData = await rankResponse.json();

        if (rankResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setStreakRank(rankData);
        console.log(rankData);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchRank(jwtToken);
  }, [jwtToken, navigate]);

  function getRankStyle(index: unknown) {
    switch (index) {
      case 0:
        return {
          icon: "🥇",
          message: "Best Streak!",
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          textColor2: "text-purple-700",
          textColor3: "text-purple-700",
        };
      case 1:
        return {
          icon: "🥈",
          message: "Top Contender",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          textColor2: "text-blue-700",
          textColor3: "text-blue-700",
        };
      case 2:
        return {
          icon: "🥉",
          message: "Rising Star",
          bgColor: "bg-orange-100",
          textColor: "text-orange-700",
          textColor2: "text-orange-700",
          textColor3: "text-orange-700",
        };
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-700", textColor2: "text-gray-700", textColor3: "text-gray-700" };
    }
  }

  return (
    <section className="h-full">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Streaks</h2>
        <div className="space-y-4">
          {streakRank.map((streak, index) => {
            const rankStyle = getRankStyle(index);
            return (
              <RankDiv
                rank={rankStyle}
                streak={streak.currentStreak}
                spot={index + 1}
                email={streak.email}
                loading={loading}
                message={message}
                key={streak.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StreakRank;
