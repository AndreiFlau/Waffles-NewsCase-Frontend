import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";

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
        <h1>User</h1>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>User</h1>
      <h1>{quote}</h1>
      {newsletter.map((item) => {
        return <div key={item.id}>{item.newsletterId}</div>;
      })}
      <h3>{streak?.currentStreak}</h3>
    </section>
  );
}

export default User;
