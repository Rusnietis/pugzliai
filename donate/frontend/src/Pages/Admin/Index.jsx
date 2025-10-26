import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";

export default function AdminIndex() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* gali pridėti kitus */}
      </Route>
    </Routes>
  );
}
