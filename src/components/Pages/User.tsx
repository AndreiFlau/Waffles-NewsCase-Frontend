import { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";

interface NewsletterItem {
  id: number;
  userId: number;
  email: string;
  newsletterId: number;
  openedAt: Date;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmChannel: string;
}

function User() {
  const { userData, message, loading } = useUserData();
  const [streaks, setStreaks] = useState(loading ? 0 : userData?.streak);
  const [newsletter, setNewsletter] = useState<NewsletterItem[]>(loading ? [] : userData?.newsletterHistory);

  useEffect(() => {
    if (!loading && userData) {
      setStreaks(userData.streak ?? 0);
      setNewsletter(userData.newsletterHistory ?? []);
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
      {newsletter.map((item) => {
        return <div key={item.id}>{item.newsletterId}</div>;
      })}
    </section>
  );
}

export default User;
