import announcements from "../data/announcements.json";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div>
      <div className={styles.greetingCard}>
        <h2 className={styles.greetingTitle}>Welcome back, Alex 👋</h2>
        <p className={styles.greetingSubtitle}>
          Here's what's happening across PeopleHub today.
        </p>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Leave Balance</span>
          <span className={styles.statValue}>12 days</span>
        </div>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Pending Requests</span>
          <span className={styles.statValue}>2</span>
        </div>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Next Payday</span>
          <span className={styles.statValue}>Sept 5, 2026</span>
        </div>
      </div>

      <section>
        <h3 className={styles.sectionTitle}>Recent Announcements</h3>
        <ul className={styles.announcementList}>
          {announcements.map((a) => (
            <li key={a.id} className={styles.announcementItem}>
              <div className={styles.announcementHeader}>
                <span className={styles.announcementTitle}>{a.title}</span>
                <span className={styles.announcementDate}>{a.date}</span>
              </div>
              <p className={styles.announcementBody}>{a.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
