import { useNavigate } from "react-router-dom";

function Carrito({ carrito, setCarrito, usuario }) {

  const navigate = useNavigate();

  // ===== ELIMINAR UN ITEM =====

  const eliminarItem = (index) => {

    const nuevoCarrito = carrito.filter(
      (_, i) => i !== index
    );

    setCarrito(nuevoCarrito);

  };

  // ===== VACIAR CARRITO =====

  const vaciarCarrito = () => {

    setCarrito([]);

  };

  // ===== TOTAL =====

  const total = carrito.reduce(
    (acc, curso) => acc + curso.precio,
    0
  );

  // ===== PAGO SIMULADO =====

  const handlePago = () => {

    if (carrito.length === 0) return;

    alert(
      `✅ ¡Pago exitoso!\n\nGracias ${usuario?.nombre || "usuario"}, tu compra por S/ ${total.toFixed(2)} fue procesada correctamente.\n\n${carrito.length} curso(s) adquirido(s).`
    );

    setCarrito([]);

    navigate("/");

  };

  // ===== RENDER =====

  return (

    <section className="carrito-page">

      {/* ===== HEADER ===== */}

      <div className="carrito-header">

        <div className="carrito-header-left">

          <button
            className="carrito-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>

          <h1>
            🛒 Mi Carrito
          </h1>

          <p>
            {carrito.length === 0
              ? "Tu carrito está vacío"
              : `${carrito.length} curso(s) agregado(s)`}
          </p>

        </div>

        {carrito.length > 0 && (

          <button
            className="carrito-vaciar-btn"
            onClick={vaciarCarrito}
          >
            🗑 Vaciar carrito
          </button>

        )}

      </div>

      {/* ===== CONTENIDO ===== */}

      {carrito.length === 0 ? (

        /* ===== EMPTY STATE ===== */

        <div className="carrito-empty">

          <span>🛒</span>

          <h2>Tu carrito está vacío</h2>

          <p>
            Agrega cursos desde el catálogo
            para comenzar tu aprendizaje.
          </p>

          <button
            className="carrito-explorar-btn"
            onClick={() => navigate("/cursos")}
          >
            Explorar cursos
          </button>

        </div>

      ) : (

        /* ===== GRID CARRITO + RESUMEN ===== */

        <div className="carrito-grid">

          {/* ===== LISTA DE ITEMS ===== */}

          <div className="carrito-lista">

            {carrito.map((curso, index) => (

              <div
                className="carrito-item"
                key={index}
              >

                {/* IMAGEN */}

                <div className="carrito-item-img">
                  <img
                    src={curso.imagen || "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"}
                    alt={curso.titulo}
                  />
                </div>

                {/* INFO */}

                <div className="carrito-item-info">

                  <span className="carrito-item-cat">
                    {curso.categoria}
                  </span>

                  <h3>{curso.titulo}</h3>

                  <p className="carrito-item-nivel">
                    Nivel: {curso.nivel || "General"}
                  </p>

                </div>

                {/* PRECIO + ELIMINAR */}

                <div className="carrito-item-right">

                  <span className="carrito-item-precio">
                    S/ {curso.precio?.toFixed(2)}
                  </span>

                  <button
                    className="carrito-item-remove"
                    onClick={() => eliminarItem(index)}
                    title="Eliminar"
                  >
                    ✕
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ===== RESUMEN / CHECKOUT ===== */}

          <div className="carrito-resumen">

            <h2>Resumen del pedido</h2>

            {/* ITEMS */}

            <div className="carrito-resumen-items">

              {carrito.map((curso, index) => (

                <div
                  className="carrito-resumen-fila"
                  key={index}
                >

                  <span>{curso.titulo}</span>

                  <span>S/ {curso.precio?.toFixed(2)}</span>

                </div>

              ))}

            </div>

            {/* SEPARADOR */}

            <div className="carrito-divider" />

            {/* TOTAL */}

            <div className="carrito-total-fila">

              <span>Total</span>

              <strong>S/ {total.toFixed(2)}</strong>

            </div>

            {/* BOTON PAGAR */}

            <button
              className="carrito-pagar-btn"
              onClick={handlePago}
            >
              💳 Proceder al pago
            </button>

            {/* SEGURIDAD */}

            <p className="carrito-seguro">
              🔒 Pago 100% seguro y encriptado
            </p>

          </div>

        </div>

      )}

    </section>

  );

}

export default Carrito;
