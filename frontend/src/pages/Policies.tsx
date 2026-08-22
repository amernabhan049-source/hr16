import { useState } from "react";
import policies from "../data/policies.json";
import styles from "./Policies.module.css";

export default function Policies() {
  const [openId, setOpenId] = useState<string | null>(policies[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      <h2 className={styles.pageTitle}>Policies</h2>

      <div className={styles.accordion}>
        {policies.map((p) => {
          const isOpen = openId === p.id;
          return (
            <div key={p.id} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggle(p.id)}
                aria-expanded={isOpen}
              >
                <span>{p.title}</span>
                <span className={styles.chevron}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className={styles.accordionBody}>{p.body}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
