import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatWidget from "./ChatWidget";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>PeopleHub — HR Portal</h1>
      </header>
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
