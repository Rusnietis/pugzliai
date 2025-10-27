import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminStories from './AdminStories';

export default function AdminIndex() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="stories" element={<AdminStories />} />
        {/* gali pridėti kitus */}
      </Route>
    </Routes>
  );
}
