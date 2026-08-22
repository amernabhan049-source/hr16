import { useState } from "react";
import type { LeaveRequest } from "../types";
import initialRequests from "../data/leaveRequests.json";
import styles from "./Leave.module.css";

export default function Leave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(
    initialRequests as LeaveRequest[]
  );
  const [form, setForm] = useState({
    employeeName: "",
    type: "Vacation",
    startDate: "",
    endDate: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.employeeName || !form.startDate || !form.endDate) return;

    const newRequest: LeaveRequest = {
      id: `l${Date.now()}`,
      employeeName: form.employeeName,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      status: "Pending",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setForm({ employeeName: "", type: "Vacation", startDate: "", endDate: "" });
  }

  return (
    <div>
      <h2 className={styles.pageTitle}>Leave</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.employeeName}</td>
                <td>{r.type}</td>
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status${r.status}`]
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className={styles.formCard}>
        <h3 className={styles.formTitle}>Request Leave</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Employee Name
              <input
                className={styles.input}
                type="text"
                value={form.employeeName}
                onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
                required
              />
            </label>
            <label className={styles.label}>
              Type
              <select
                className={styles.input}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Vacation</option>
                <option>Sick Leave</option>
                <option>Personal</option>
                <option>Parental Leave</option>
              </select>
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Start Date
              <input
                className={styles.input}
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </label>
            <label className={styles.label}>
              End Date
              <input
                className={styles.input}
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
}
