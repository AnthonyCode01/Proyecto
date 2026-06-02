import { useAdmin } from "../Context/AdminContext.jsx";

function AdminResumen({ setTabActiva }) {
  const { cursos, ofertas, publicaciones } = useAdmin();

  const totalCursos = cursos.length;
  const ofertasActivas = ofertas.filter((o) => o.activo).length;
  const pubActivas = publicaciones.filter((p) => p.activo).length;

  const categorias = [...new Set(cursos.map((c) => c.categoria))];

  return (
    <div className="admin-resumen">
      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card green">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{totalCursos}</h3>
            <p>Cursos totales</p>
          </div>
        </div>
        <div className="admin-stat-card orange">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <h3>{ofertasActivas}</h3>
            <p>Ofertas activas</p>
          </div>
        </div>
        <div className="admin-stat-card blue">
          <div className="stat-icon">📢</div>
          <div className="stat-info">
            <h3>{pubActivas}</h3>
            <p>Publicaciones activas</p>
          </div>
        </div>
        <div className="admin-stat-card purple">
          <div className="stat-icon">🗂️</div>
          <div className="stat-info">
            <h3>{categorias.length}</h3>
            <p>Categorías</p>
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS */}
      <div className="admin-quick-actions">
        <h2>Accesos rápidos</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-btn" onClick={() => setTabActiva("cursos")}>
            <span>➕</span>
            <p>Agregar curso</p>
          </button>
          <button className="quick-action-btn" onClick={() => setTabActiva("ofertas")}>
            <span>🏷️</span>
            <p>Crear oferta</p>
          </button>
          <button className="quick-action-btn" onClick={() => setTabActiva("publicaciones")}>
            <span>📝</span>
            <p>Nueva publicación</p>
          </button>
        </div>
      </div>

      {/* ÚLTIMOS CURSOS */}
      <div className="admin-recent">
        <h2>Cursos recientes</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Precio</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {cursos.slice(0, 5).map((c) => (
              <tr key={c.id}>
                <td>{c.titulo}</td>
                <td><span className="cat-badge">{c.categoria}</span></td>
                <td>{c.nivel}</td>
                <td>S/ {c.precio}</td>
                <td>⭐ {c.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminResumen;
