import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Employees from "./pages/Employees";
import Policies from "./pages/Policies";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="leave" element={<Leave />} />
        <Route path="employees" element={<Employees />} />
        <Route path="policies" element={<Policies />} />
      </Route>
    </Routes>
  );
}
