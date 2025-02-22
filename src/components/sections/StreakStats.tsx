import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function StreakStats() {
  const { jwtToken } = useUserData();
  const [streaks, setStreaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;

    setLoading(true);

    async function fetchRank(token: string) {
      try {
        const statResponse = await fetch(`${API_URL}/dashboard/streakstats`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (statResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const streakData = await statResponse.json();

        if (statResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setStreaks(streakData);
        console.log(streakData);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchRank(jwtToken);
  }, [jwtToken, navigate]);

  // Configuração do gráfico de pizza
  const chartData = {
    labels: streaks.map((streak) => streak.streakCategory),
    datasets: [
      {
        data: streaks.map((streak) => streak.totalUsers),
        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4", "#E0E0E0"],
        hoverBackgroundColor: ["#388E3C", "#F57C00", "#0288D1", "#BDBDBD"],
      },
    ],
  };

  return (
    <section>
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-semibold mb-4">Status do Streak</h1>

        {message.message && !message.success && <p className={`mb-4 text-sm font-medium text-red-600`}>{message.message}</p>}

        {loading ? (
          <p className="text-gray-500 animate-pulse">Carregando estatísticas...</p>
        ) : streaks.length > 0 ? (
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={chartData} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma estatística disponível.</p>
        )}
      </div>
    </section>
  );
}

export default StreakStats;
