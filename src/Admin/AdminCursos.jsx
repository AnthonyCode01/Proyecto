import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";

const CATEGORIAS = ["Ofimática", "Diseño", "Análisis de Datos", "Marketing", "Productividad"];
const NIVELES = ["Básico", "Intermedio", "Avanzado"];

const cursoVacio = {
  titulo: "",
  categoria: "Ofimática",
  precio: "",
  nivel: "Básico",
  alumnos: "0 estudiantes",
  rating: "4.5",
  color: "#16a34a",
  imagen: "",
};

function AdminCursos() {
  const { cursos, agregarCurso, editarCurso, eliminarCurso } = useAdmin();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null); // id del curso en edición
  const [form, setForm] = useState(cursoVacio);
  const [busqueda, setBusqueda] = useState("");
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  const cursosFiltrados = cursos.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNuevo = () => {
    setForm(cursoVacio);
    setEditando(null);
    setMostrarForm(true);
  };

  const handleEditar = (curso) => {
    setForm({
      titulo: curso.titulo,
      categoria: curso.categoria,
      precio: curso.precio,
      nivel: curso.nivel,
      alumnos: curso.alumnos,
      rating: curso.rating,
      color: curso.color,
      imagen: curso.imagen,
    });
    setEditando(curso.id);
    setMostrarForm(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.precio) return;

    const datos = {
      ...form,
      precio: parseFloat(form.precio),
      rating: parseFloat(form.rating),
    };

    if (editando !== null) {
      editarCurso(editando, datos);
    } else {
      agregarCurso(datos);
    }
    setMostrarForm(false);
    setEditando(null);
    setForm(cursoVacio);
  };

  const handleEliminar = (id) => {
    eliminarCurso(id);
    setConfirmEliminar(null);
  };

  return (
    <div className="admin-section">
      {/* TOOLBAR */}
      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="text"
          placeholder="🔍 Buscar curso..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="admin-btn-primary" onClick={handleNuevo}>
          ➕ Nuevo curso
        </button>
      </div>

      {/* MODAL FORMULARIO */}
      {mostrarForm && (
        <div className="admin-modal-overlay" onClick={() => setMostrarForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editando !== null ? "✏️ Editar curso" : "➕ Nuevo curso"}</h2>
              <button className="admin-modal-close" onClick={() => setMostrarForm(false)}>✕</button>
            </div>
            <form onSubmit={handleGuardar} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Título del curso *</label>
                  <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej: Excel Avanzado" required />
                </div>
                <div className="admin-field">
                  <label>Precio (S/) *</label>
                  <input name="precio" type="number" min="0" step="0.1" value={form.precio} onChange={handleChange} placeholder="Ej: 49.9" required />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Categoría</label>
                  <select name="categoria" value={form.categoria} onChange={handleChange}>
                    {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Nivel</label>
                  <select name="nivel" value={form.nivel} onChange={handleChange}>
                    {NIVELES.map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Alumnos</label>
                  <input name="alumnos" value={form.alumnos} onChange={handleChange} placeholder="Ej: 1.2k estudiantes" />
                </div>
                <div className="admin-field">
                  <label>Rating (1-5)</label>
                  <input name="rating" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={handleChange} />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>URL de imagen</label>
                  <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="admin-field">
                  <label>Color de tarjeta</label>
                  <div className="admin-color-pick">
                    <input type="color" name="color" value={form.color} onChange={handleChange} />
                    <span>{form.color}</span>
                  </div>
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="admin-btn-primary">
                  {editando !== null ? "Guardar cambios" : "Crear curso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR */}
      {confirmEliminar !== null && (
        <div className="admin-modal-overlay" onClick={() => setConfirmEliminar(null)}>
          <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>⚠️ Eliminar curso</h2>
              <button className="admin-modal-close" onClick={() => setConfirmEliminar(null)}>✕</button>
            </div>
            <p style={{ marginBottom: "1.5rem", color: "var(--admin-text-secondary)" }}>
              ¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.
            </p>
            <div className="admin-form-actions">
              <button className="admin-btn-secondary" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
              <button className="admin-btn-danger" onClick={() => handleEliminar(confirmEliminar)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* TABLA DE CURSOS */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Nivel</th>
              <th>Precio</th>
              <th>Rating</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="admin-empty">No se encontraron cursos</td>
              </tr>
            ) : (
              cursosFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>
                    <img
                      src={c.imagen}
                      alt={c.titulo}
                      className="admin-course-thumb"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </td>
                  <td className="admin-course-title">{c.titulo}</td>
                  <td><span className="cat-badge">{c.categoria}</span></td>
                  <td>{c.nivel}</td>
                  <td><strong>S/ {c.precio}</strong></td>
                  <td>⭐ {c.rating}</td>
                  <td className="admin-actions-cell">
                    <button className="admin-btn-edit" onClick={() => handleEditar(c)}>✏️</button>
                    <button className="admin-btn-del" onClick={() => setConfirmEliminar(c.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="admin-count">Total: {cursosFiltrados.length} cursos</p>
    </div>
  );
}

export default AdminCursos;
