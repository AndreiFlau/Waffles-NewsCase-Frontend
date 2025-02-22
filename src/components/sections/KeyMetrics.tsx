import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
import StatCard from "../ui/statCard";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function KeyMetrics() {
  const { jwtToken } = useUserData();
  const [openedEmails, setOpenedEmails] = useState([]);
  const [users, setUsers] = useState([]);
  const [streakAvg, setStreakAvg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;
    setLoading(true);
    async function fetchStats(token: string) {
      try {
        const emailResponse = await fetch(`${API_URL}/dashboard/stats`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const activeUsersResponse = await fetch(`${API_URL}/dashboard/users`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const streakAvgResponse = await fetch(`${API_URL}/streaks/average`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (emailResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const emailData = await emailResponse.json();
        const activeUsersData = await activeUsersResponse.json();
        const avgData = await streakAvgResponse.json();

        if (emailResponse.ok && activeUsersResponse.ok && streakAvgResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setOpenedEmails(emailData.formattedStats);
        setUsers(activeUsersData.formattedStats);
        setStreakAvg(Number(Number(avgData.streaksAvg).toFixed()));

        console.log(emailData, activeUsersData, avgData);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats(jwtToken);
  }, [jwtToken, navigate]);

  const stats = {
    email: {
      title: "Total de emails abertos",
      value: openedEmails.length,
      icon: "📬",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
    users: {
      title: "Total de usuários",
      value: users.length,
      icon: "🧑",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    streaks: {
      title: "A streak média dura",
      value: streakAvg,
      icon: "🔥",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
    },
  };

  return (
    <section>
      <div className="flex gap-10">
        <StatCard stat={stats.email} loading={loading} message={message}></StatCard>
        <StatCard stat={stats.users} loading={loading} message={message}></StatCard>
        <StatCard stat={stats.streaks} loading={loading} message={message}></StatCard>
      </div>
    </section>
  );
}

export default KeyMetrics;
