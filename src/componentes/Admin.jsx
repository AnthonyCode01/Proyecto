import { useNavigate } from "react-router-dom";
import cursosData from "../data/cursos.js";

function Admin({ usuario, carrito }) {

  const navigate = useNavigate();

  // ===== SIN ACCESO =====

  if (!usuario || usuario.rol !== "admin") {
    return (
      <div className="simple-page">
        <h1>🚫 Acceso denegado</h1>
        <p>No tienes permisos para ver esta página</p>
        <button
          className="course-btn"
          onClick={() => navigate("/")}
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  // ===== STATS =====

  const totalCursos = cursosData.length;

  const totalVentas = carrito.length;

  const ingresoTotal = carrito.reduce(
    (acc, c) => acc + c.precio, 0
  );

  const categorias = [
    ...new Set(cursosData.map((c) => c.categoria))
  ];

  return (
    <div className="admin-page">

      {/* ===== HEADER ===== */}

      <div className="admin-header">
        <div>
          <h1>⚙️ Panel de administración</h1>
          <p>Bienvenido, <strong>{usuario.nombre}</strong> — cuenta admin</p>
        </div>
        <span className="admin-badge">🔴 Admin</span>
      </div>

      {/* ===== STATS ===== */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span className="asc-icon">📚</span>
          <div>
            <p className="asc-label">Total cursos</p>
            <h2 className="asc-num">{totalCursos}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="asc-icon">🛒</span>
          <div>
            <p className="asc-label">Ventas registradas</p>
            <h2 className="asc-num">{totalVentas}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="asc-icon">💰</span>
          <div>
            <p className="asc-label">Ingresos totales</p>
            <h2 className="asc-num">S/ {ingresoTotal.toFixed(2)}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="asc-icon">🗂️</span>
          <div>
            <p className="asc-label">Categorías</p>
            <h2 className="asc-num">{categorias.length}</h2>
          </div>
        </div>

      </div>

      {/* ===== TABLA CURSOS ===== */}

      <div className="admin-section">

        <div className="admin-section-header">
          <h2>📋 Lista de cursos</h2>
          <span>{totalCursos} cursos registrados</span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Nivel</th>
                <th>Precio</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {cursosData.map((curso, i) => (
                <tr key={curso.id}>
                  <td>{i + 1}</td>
                  <td>{curso.titulo}</td>
                  <td>
                    <span className="admin-tag">
                      {curso.categoria}
                    </span>
                  </td>
                  <td>{curso.nivel}</td>
                  <td><strong>S/ {curso.precio}</strong></td>
                  <td>⭐ {curso.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ===== VENTAS ===== */}

      <div className="admin-section">

        <div className="admin-section-header">
          <h2>🛒 Ventas recientes</h2>
          <span>{totalVentas} ventas</span>
        </div>

        {carrito.length === 0 ? (
          <div className="admin-empty">
            <p>No hay ventas registradas aún</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Curso</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((curso, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{curso.titulo}</td>
                    <td>
                      <span className="admin-tag">
                        {curso.categoria}
                      </span>
                    </td>
                    <td><strong>S/ {curso.precio}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default Admin;
