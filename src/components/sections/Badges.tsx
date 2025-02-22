import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import { Message } from "../context/types";
import BadgeCard from "../ui/BadgeCard";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Badge {
  id: number;
  title: string;
  description: string | number;
  icon: React.ReactNode;
}

function Badges() {
  const { jwtToken } = useUserData();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message>({ message: "", success: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return;
    setLoading(true);
    async function fetchRank(token: string) {
      try {
        const badgeResponse = await fetch(`${API_URL}/user/badges`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (badgeResponse.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

        const badgeData = await badgeResponse.json();

        if (badgeResponse.ok) {
          setMessage({ message: "Dados recebidos com sucesso!", success: true });
        } else {
          setMessage({ message: "Dados não foram recebidos.", success: false });
        }

        setBadges(badgeData);
        console.log(badgeData);
      } catch (error) {
        const err = error as Error;
        console.error(`Erro ao recuperar dados do usuário: `, err);
      } finally {
        setLoading(false);
      }
    }

    fetchRank(jwtToken);
  }, [jwtToken, navigate]);

  function getBadgeIcon(index: number) {
    switch (index) {
      case 0:
        return "📖";
      case 1:
        return "📚";
      default:
        return "🏅";
    }
  }

  return (
    <section className="h-full w-full">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Suas conquistas!</h2>
        <div className="space-y-4">
          {!badges ? (
            <p className="text-center text-gray-500">
              Você ainda não tem nenhuma conquista. Continue lendo para colecionar todas!
            </p>
          ) : (
            badges.map((badge, index) => {
              const badgeIcon = getBadgeIcon(index);
              return <BadgeCard badge={badge} badgeIcon={badgeIcon} loading={loading} message={message} key={badge.id} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Badges;
