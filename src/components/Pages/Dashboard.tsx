import KeyMetrics from "../sections/KeyMetrics";
import NewsletterStats from "../sections/NewsletterStats";
import NewsletterStatsByDate from "../sections/NewsletterStatsByDate";
import StreakRank from "../sections/StreakRank";
import StreakStats from "../sections/StreakStats";

function Dashboard() {
  return (
    <section>
      <h1 className="text-blue-800">Dashboard</h1>
      <KeyMetrics></KeyMetrics>
      <StreakRank></StreakRank>
      <NewsletterStats></NewsletterStats>
      <NewsletterStatsByDate></NewsletterStatsByDate>
      <StreakStats></StreakStats>
    </section>
  );
}

export default Dashboard;
