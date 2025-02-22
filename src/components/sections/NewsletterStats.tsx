import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function NewsletterStats() {
  const { jwtToken } = useUserData();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;
    setLoading(true);
    async function fetchRank(token: string) {
      try {
        const statsResponse = await fetch(`${API_URL}/dashboard/newsletterviews`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (statsResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const newsletterData = await statsResponse.json();

        if (statsResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setStats(newsletterData.formattedStats);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchRank(jwtToken);
  }, [jwtToken, navigate]);

  return (
    <section>
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-semibold mb-4">Estatísticas de Abertura de Newsletters</h1>

        {message.message && !message.success && <p className={`mb-4 text-sm font-medium text-red-600`}>{message.message}</p>}

        {loading ? (
          <p className="text-gray-500 animate-pulse">Carregando estatísticas...</p>
        ) : stats.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Newsletter ID</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-600">Total de Aberturas</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.newsletterId} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-800">{stat.newsletterId}</td>
                  <td className="px-6 py-3 text-sm text-gray-800">{stat.timesOpened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Nenhuma estatística disponível.</p>
        )}
      </div>
    </section>
  );
}

export default NewsletterStats;
