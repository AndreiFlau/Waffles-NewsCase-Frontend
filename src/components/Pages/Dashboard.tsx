import KeyMetrics from "../sections/KeyMetrics";
import NewsletterStats from "../sections/NewsletterStats";
import NewsletterStatsByDate from "../sections/NewsletterStatsByDate";
import StreakRank from "../sections/StreakRank";
import StreakStats from "../sections/StreakStats";

function Dashboard() {
  return (
    <section>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <div className="col-span-full">
          <KeyMetrics></KeyMetrics>
        </div>
        <div className="col-end-4">
          <StreakRank></StreakRank>
        </div>
        <div className="row-start-2 col-start-1 col-end-3 h-full">
          <NewsletterStats></NewsletterStats>
        </div>
        <div className="row-start-3 col-start-1 col-end-3">
          <NewsletterStatsByDate></NewsletterStatsByDate>
        </div>
        <div className="row-start-3 col-start-3">
          <StreakStats></StreakStats>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
