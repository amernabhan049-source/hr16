import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/leave", label: "Leave", end: false },
  { to: "/employees", label: "Employees", end: false },
  { to: "/policies", label: "Policies", end: false },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
