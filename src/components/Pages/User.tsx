import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import Badges from "../sections/Badges";

interface NewsletterItem {
  id: number;
  userId: number;
  email: string;
  newsletterId: string;
  openedAt: Date;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmChannel: string;
}

interface StreakItem {
  createdAt: Date;
  currentStreak: number;
  id: number;
  longestStreak: number;
  updatedAt: Date;
  userId: number;
}

const quotes = [
  "Todo grande progresso começa com pequenos passos. Continue.",
  "Continue lendo as nossas notícias!",
  "A disciplina é o caminho para o sucesso.",
];

function User() {
  const { userData, loading } = useUserData();
  const [streak, setStreak] = useState<StreakItem | null>(loading ? null : (userData?.streak as StreakItem));
  const [newsletter, setNewsletter] = useState<NewsletterItem[]>(
    loading ? [] : (userData?.newsletterHistory as NewsletterItem[])
  );
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    if (!loading && userData) {
      setStreak((userData.streak as StreakItem) ?? {});
      setNewsletter((userData.newsletterHistory as NewsletterItem[]) ?? []);
    }
  }, [userData, loading]);

  if (loading) {
    return (
      <section>
        <p>Carregando...</p>
      </section>
    );
  }

  return (
    <section className="container grid grid-cols-2 gap-10">
      <div className="mt-4 mb-8 col-span-full">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <blockquote className="text-xl italic text-gray-800">{quote}</blockquote>
        </div>
      </div>

      <div className=" p-6 bg-green-50 rounded-lg shadow-md text-center row-start-2 col-start-2 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-green-700">Você está em uma sequência de {streak?.currentStreak} dias!</h3>
        <p className="text-sm text-green-600 mt-2">Continue assim, cada dia conta para alcançar seus objetivos!</p>
      </div>

      <Badges></Badges>

      <div className="mb-8 row-start-3 col-span-full h-full">
        {loading ? (
          <div className="p-6  bg-gray-50 flex items-center justify-center transition-all duration-300">
            <p className="text-gray-500 animate-pulse">Carregando...</p>
          </div>
        ) : (
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Newsletters Lidas:</h2>
            <div className="space-y-2">
              {newsletter.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-lg font-medium text-gray-600 w-12">{index + 1}</span>
                  <span className="text-gray-700 flex-1">{item.newsletterId}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default User;
