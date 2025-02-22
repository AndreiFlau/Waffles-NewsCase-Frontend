import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Stats {
  day: string;
  timesOpened: number;
}

function NewsletterStatsByDate() {
  const { jwtToken } = useUserData();
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const [selectedDays, setSelectedDays] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;

    setLoading(true);

    async function fetchRank(token: string) {
      try {
        const statResponse = await fetch(`${API_URL}/dashboard/newsletterstatsbydate?days=${selectedDays}`, {
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

        const statData = await statResponse.json();

        if (statResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setStats(statData.formattedStats);
        console.log(statData);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchRank(jwtToken);
  }, [jwtToken, navigate, selectedDays]);

  return (
    <section className="h-full">
      <div className="p-6 rounded-lg shadow-lg bg-white h-full">
        <h1 className="text-2xl font-semibold mb-4">Estatísticas por Período</h1>

        {/* Dropdown para escolher o período */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Selecionar período:</label>
          <select
            value={selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={7}>Últimos 7 dias</option>
            <option value={14}>Últimos 14 dias</option>
            <option value={30}>Últimos 30 dias</option>
          </select>
        </div>

        {message.message && !message.success && <p className={`mb-4 text-sm font-medium text-red-600`}>{message.message}</p>}

        {loading ? (
          <p className="text-gray-500 animate-pulse">Carregando estatísticas...</p>
        ) : stats.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left ">
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Data</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Total de Aberturas</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => {
                const date = new Date(stat.day).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <tr key={stat.day} className="border-t border-gray-200 hover:shadow-md transition-shadow duration-200 ">
                    <td className="px-6 py-3 text-sm text-gray-800">{date}</td>
                    <td className="px-6 py-3 text-sm text-gray-800">{stat.timesOpened}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Nenhuma estatística disponível para este período.</p>
        )}
      </div>
    </section>
  );
}

export default NewsletterStatsByDate;
