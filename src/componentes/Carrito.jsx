import { useNavigate } from "react-router-dom";

function Carrito({ carrito, setCarrito, usuario, eliminarDelCarrito, vaciarCarrito }) {

  const navigate = useNavigate();

  const handleEliminar = (index) => {
    if (eliminarDelCarrito) {
      eliminarDelCarrito(index);
    } else {
      setCarrito(carrito.filter((_, i) => i !== index));
    }
  };

  const handleVaciar = () => {
    if (vaciarCarrito) vaciarCarrito();
    else setCarrito([]);
  };

  const total = carrito.reduce((acc, curso) => acc + (curso.precio || 0), 0);

  const handlePago = () => {
    if (carrito.length === 0) return;
    const listaCursos = carrito.map((c) => `• ${c.titulo}`).join("\n");
    alert(`✅ ¡Pago exitoso!\n\nGracias ${usuario?.nombre || "usuario"}, tu compra por S/ ${total.toFixed(2)} fue procesada.\n\n${listaCursos}`);
    handleVaciar();
    navigate("/");
  };

  return (
    <section className="carrito-page">

      <div className="carrito-header">
        <div className="carrito-header-left">
          <button className="carrito-back-btn" onClick={() => navigate(-1)}>← Volver</button>
          <h1>🛒 Mi Carrito</h1>
          <p>{carrito.length === 0 ? "Tu carrito está vacío" : `${carrito.length} curso(s) agregado(s)`}</p>
        </div>
        {carrito.length > 0 && (
          <button className="carrito-vaciar-btn" onClick={handleVaciar}>🗑 Vaciar carrito</button>
        )}
      </div>

      {carrito.length === 0 ? (

        <div className="carrito-empty">
          <span>🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega cursos desde el catálogo para comenzar tu aprendizaje.</p>
          <button className="carrito-explorar-btn" onClick={() => navigate("/cursos")}>Explorar cursos</button>
        </div>

      ) : (

        <div className="carrito-grid">

          <div className="carrito-lista">
            {carrito.map((curso, index) => (
              <div className="carrito-item" key={index}>
                <div className="carrito-item-img">
                  <img src={curso.imagen || "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"} alt={curso.titulo} />
                </div>
                <div className="carrito-item-info">
                  <span className="carrito-item-cat">{curso.categoria}</span>
                  <h3>{curso.titulo}</h3>
                  <p className="carrito-item-nivel">Nivel: {curso.nivel || "General"}</p>
                </div>
                <div className="carrito-item-right">
                  <span className="carrito-item-precio">S/ {curso.precio?.toFixed(2)}</span>
                  <button className="carrito-item-remove" onClick={() => handleEliminar(index)} title="Eliminar">✕</button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h2>Resumen del pedido</h2>

            <div className="carrito-resumen-items">
              {carrito.map((curso, index) => (
                <div className="carrito-resumen-fila" key={index}>
                  <span>{curso.titulo}</span>
                  <span>S/ {curso.precio?.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="carrito-divider" />

            <div className="carrito-total-fila">
              <span>Total</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>

            <button className="carrito-pagar-btn" onClick={handlePago}>💳 Proceder al pago</button>

            <button className="carrito-explorar-btn" style={{ width: "100%", marginTop: "0.5rem" }} onClick={() => navigate("/cursos")}>
              ➕ Agregar más cursos
            </button>

            <p className="carrito-seguro">🔒 Pago 100% seguro y encriptado</p>
          </div>

        </div>

      )}

    </section>
  );
}

export default Carrito;