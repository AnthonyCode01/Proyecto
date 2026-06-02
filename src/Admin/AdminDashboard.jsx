import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";
import AdminCursos from "./AdminCursos.jsx";
import AdminOfertas from "./AdminOfertas.jsx";
import AdminPublicaciones from "./AdminPublicaciones.jsx";
import AdminResumen from "./AdminResumen.jsx";

const TABS = [
  { id: "resumen",       label: "Resumen",        icon: "📊" },
  { id: "cursos",        label: "Cursos",          icon: "📚" },
  { id: "ofertas",       label: "Ofertas",         icon: "🔥" },
  { id: "publicaciones", label: "Publicaciones",   icon: "📢" },
];

function AdminDashboard() {
  const { logoutAdmin, cursos, ofertas, publicaciones } = useAdmin();
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState("resumen");

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-logo">🛡️</span>
          <div>
            <h2>Admin Panel</h2>
            <p>Administrador</p>
          </div>
        </div>

        <nav className="admin-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${tabActiva === tab.id ? "active" : ""}`}
              onClick={() => setTabActiva(tab.id)}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
          <a href="/" className="admin-view-site" target="_blank" rel="noreferrer">
            🌐 Ver sitio
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* TOPBAR */}
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <h1>{TABS.find((t) => t.id === tabActiva)?.icon}{" "}{TABS.find((t) => t.id === tabActiva)?.label}</h1>
          </div>
          <div className="admin-topbar-stats">
            <span className="admin-stat-pill">📚 {cursos.length} cursos</span>
            <span className="admin-stat-pill">🔥 {ofertas.length} ofertas</span>
            <span className="admin-stat-pill">📢 {publicaciones.length} publicaciones</span>
          </div>
        </div>

        {/* CONTENIDO SEGÚN TAB */}
        <div className="admin-content">
          {tabActiva === "resumen"       && <AdminResumen setTabActiva={setTabActiva} />}
          {tabActiva === "cursos"        && <AdminCursos />}
          {tabActiva === "ofertas"       && <AdminOfertas />}
          {tabActiva === "publicaciones" && <AdminPublicaciones />}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
