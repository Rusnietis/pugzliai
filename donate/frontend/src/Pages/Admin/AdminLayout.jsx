// src/pages/Admin/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "../../Style/AdminLayout.scss";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin panelė</h2>
        <nav>
          <NavLink to="/admin/dashboard">Pagrindinis</NavLink>
          <NavLink to="/admin/stories">Istorijos</NavLink>
          <NavLink to="/register/list">Vartotojai</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
