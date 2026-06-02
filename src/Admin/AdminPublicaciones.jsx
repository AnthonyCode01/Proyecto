import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";

const pubVacia = {
  titulo: "",
  descripcion: "",
  fecha: new Date().toISOString().split("T")[0],
  activo: true,
};

function AdminPublicaciones() {
  const { publicaciones, agregarPublicacion, editarPublicacion, eliminarPublicacion } = useAdmin();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(pubVacia);
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleNueva = () => {
    setForm({ ...pubVacia, fecha: new Date().toISOString().split("T")[0] });
    setEditando(null);
    setMostrarForm(true);
  };

  const handleEditar = (pub) => {
    setForm({ ...pub });
    setEditando(pub.id);
    setMostrarForm(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    if (editando !== null) {
      editarPublicacion(editando, form);
    } else {
      agregarPublicacion(form);
    }
    setMostrarForm(false);
    setEditando(null);
    setForm(pubVacia);
  };

  const toggleActivo = (id, activo) => {
    editarPublicacion(id, { activo: !activo });
  };

  return (
    <div className="admin-section">
      {/* TOOLBAR */}
      <div className="admin-toolbar">
        <p className="admin-toolbar-info">
          Las publicaciones activas aparecen como anuncios o novedades en el sitio.
        </p>
        <button className="admin-btn-primary" onClick={handleNueva}>
          ➕ Nueva publicación
        </button>
      </div>

      {/* MODAL FORMULARIO */}
      {mostrarForm && (
        <div className="admin-modal-overlay" onClick={() => setMostrarForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editando !== null ? "✏️ Editar publicación" : "➕ Nueva publicación"}</h2>
              <button className="admin-modal-close" onClick={() => setMostrarForm(false)}>✕</button>
            </div>
            <form onSubmit={handleGuardar} className="admin-form">
              <div className="admin-field">
                <label>Título *</label>
                <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título del anuncio..." required />
              </div>

              <div className="admin-field">
                <label>Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="4" placeholder="Contenido del anuncio..." />
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Fecha</label>
                  <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
                </div>
                <div className="admin-field admin-field-check">
                  <label>
                    <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
                    Publicación activa (visible en el sitio)
                  </label>
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="admin-btn-primary">
                  {editando !== null ? "Guardar cambios" : "Publicar"}
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
              <h2>⚠️ Eliminar publicación</h2>
              <button className="admin-modal-close" onClick={() => setConfirmEliminar(null)}>✕</button>
            </div>
            <p style={{ marginBottom: "1.5rem", color: "var(--admin-text-secondary)" }}>
              ¿Eliminar esta publicación? Esta acción no se puede deshacer.
            </p>
            <div className="admin-form-actions">
              <button className="admin-btn-secondary" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
              <button className="admin-btn-danger" onClick={() => { eliminarPublicacion(confirmEliminar); setConfirmEliminar(null); }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* LISTA DE PUBLICACIONES */}
      <div className="admin-pub-list">
        {publicaciones.length === 0 && (
          <div className="admin-empty-state">No hay publicaciones creadas aún.</div>
        )}
        {publicaciones.map((p) => (
          <div key={p.id} className={`admin-pub-card ${!p.activo ? "inactive" : ""}`}>
            <div className="admin-pub-content">
              <div className="admin-pub-meta">
                <span className={`admin-pub-status ${p.activo ? "active" : ""}`}>
                  {p.activo ? "● Activa" : "● Inactiva"}
                </span>
                <span className="admin-pub-date">📅 {p.fecha}</span>
              </div>
              <h3>{p.titulo}</h3>
              <p>{p.descripcion}</p>
            </div>
            <div className="admin-pub-actions">
              <button
                className={`admin-toggle-btn ${p.activo ? "active" : ""}`}
                onClick={() => toggleActivo(p.id, p.activo)}
              >
                {p.activo ? "Desactivar" : "Activar"}
              </button>
              <button className="admin-btn-edit" onClick={() => handleEditar(p)}>✏️ Editar</button>
              <button className="admin-btn-del" onClick={() => setConfirmEliminar(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPublicaciones;
