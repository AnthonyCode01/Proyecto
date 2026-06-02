import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";

const ofertaVacia = {
  titulo: "",
  descripcion: "",
  precioOriginal: "",
  precioOferta: "",
  descuento: "",
  categoria: "Ofimática",
  imagen: "",
  activo: true,
};

const CATEGORIAS = ["Ofimática", "Diseño", "Análisis de Datos", "Marketing", "Productividad"];

function AdminOfertas() {
  const { ofertas, agregarOferta, editarOferta, eliminarOferta } = useAdmin();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(ofertaVacia);
  const [confirmEliminar, setConfirmEliminar] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleNueva = () => {
    setForm(ofertaVacia);
    setEditando(null);
    setMostrarForm(true);
  };

  const handleEditar = (oferta) => {
    setForm({ ...oferta });
    setEditando(oferta.id);
    setMostrarForm(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const datos = {
      ...form,
      precioOriginal: parseFloat(form.precioOriginal),
      precioOferta: parseFloat(form.precioOferta),
      descuento: parseInt(form.descuento),
    };
    if (editando !== null) {
      editarOferta(editando, datos);
    } else {
      agregarOferta(datos);
    }
    setMostrarForm(false);
    setEditando(null);
    setForm(ofertaVacia);
  };

  const toggleActivo = (id, activo) => {
    editarOferta(id, { activo: !activo });
  };

  return (
    <div className="admin-section">
      {/* TOOLBAR */}
      <div className="admin-toolbar">
        <p className="admin-toolbar-info">
          Gestiona las ofertas que aparecen en la sección de <strong>Ofertas</strong> del sitio.
        </p>
        <button className="admin-btn-primary" onClick={handleNueva}>
          ➕ Nueva oferta
        </button>
      </div>

      {/* MODAL FORMULARIO */}
      {mostrarForm && (
        <div className="admin-modal-overlay" onClick={() => setMostrarForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editando !== null ? "✏️ Editar oferta" : "➕ Nueva oferta"}</h2>
              <button className="admin-modal-close" onClick={() => setMostrarForm(false)}>✕</button>
            </div>
            <form onSubmit={handleGuardar} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Título *</label>
                  <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej: Pack Excel Pro" required />
                </div>
                <div className="admin-field">
                  <label>Categoría</label>
                  <select name="categoria" value={form.categoria} onChange={handleChange}>
                    {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="admin-field">
                <label>Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="2" placeholder="Descripción de la oferta..." />
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>Precio original (S/)</label>
                  <input name="precioOriginal" type="number" min="0" step="0.1" value={form.precioOriginal} onChange={handleChange} required />
                </div>
                <div className="admin-field">
                  <label>Precio oferta (S/)</label>
                  <input name="precioOferta" type="number" min="0" step="0.1" value={form.precioOferta} onChange={handleChange} required />
                </div>
                <div className="admin-field">
                  <label>Descuento (%)</label>
                  <input name="descuento" type="number" min="0" max="100" value={form.descuento} onChange={handleChange} required />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-field">
                  <label>URL de imagen</label>
                  <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
                </div>
                <div className="admin-field admin-field-check">
                  <label>
                    <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
                    Oferta activa (visible en el sitio)
                  </label>
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="admin-btn-primary">
                  {editando !== null ? "Guardar cambios" : "Crear oferta"}
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
              <h2>⚠️ Eliminar oferta</h2>
              <button className="admin-modal-close" onClick={() => setConfirmEliminar(null)}>✕</button>
            </div>
            <p style={{ marginBottom: "1.5rem", color: "var(--admin-text-secondary)" }}>
              ¿Estás seguro de que deseas eliminar esta oferta?
            </p>
            <div className="admin-form-actions">
              <button className="admin-btn-secondary" onClick={() => setConfirmEliminar(null)}>Cancelar</button>
              <button className="admin-btn-danger" onClick={() => { eliminarOferta(confirmEliminar); setConfirmEliminar(null); }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* GRID DE OFERTAS */}
      <div className="admin-offers-grid">
        {ofertas.length === 0 && (
          <div className="admin-empty-state">No hay ofertas creadas aún.</div>
        )}
        {ofertas.map((o) => (
          <div key={o.id} className={`admin-offer-card ${!o.activo ? "inactive" : ""}`}>
            <div className="admin-offer-badge">-{o.descuento}%</div>
            <img src={o.imagen} alt={o.titulo} onError={(e) => { e.target.style.display = "none"; }} />
            <h3>{o.titulo}</h3>
            <p>{o.descripcion}</p>
            <div className="admin-offer-prices">
              <span className="old-p">S/ {o.precioOriginal}</span>
              <span className="new-p">S/ {o.precioOferta}</span>
            </div>
            <div className="admin-offer-actions">
              <button
                className={`admin-toggle-btn ${o.activo ? "active" : ""}`}
                onClick={() => toggleActivo(o.id, o.activo)}
              >
                {o.activo ? "✅ Activa" : "⛔ Inactiva"}
              </button>
              <button className="admin-btn-edit" onClick={() => handleEditar(o)}>✏️</button>
              <button className="admin-btn-del" onClick={() => setConfirmEliminar(o.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOfertas;
