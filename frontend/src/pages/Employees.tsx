import { useMemo, useState } from "react";
import employees from "../data/employees.json";
import styles from "./Employees.module.css";

export default function Employees() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) =>
      [e.name, e.role, e.department, e.email].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <div>
      <h2 className={styles.pageTitle}>Employees</h2>

      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by name, role, department, or email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.role}</td>
                <td>{e.department}</td>
                <td>{e.email}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.emptyRow}>
                  No employees match "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
