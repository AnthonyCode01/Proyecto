import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Carrito({
  carrito,
  setCarrito,
  usuario,
}) {

  const navigate = useNavigate();

  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [msgCupon, setMsgCupon] = useState("");
  const [checkout, setCheckout] = useState(false);

  const CUPONES = {
    "ZIPX10": 10,
    "PROMO20": 20,
    "BIENVENIDO": 15,
  };

  // ===== SIN LOGIN =====

  if (!usuario) {
    return (
      <div className="simple-page">
        <h1>🔒 Debes iniciar sesión</h1>
        <p>Para ver tu carrito necesitas una cuenta activa</p>
        <button
          className="course-btn"
          onClick={() => navigate("/")}
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  // ===== QUITAR ITEM =====

  const quitarItem = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  // ===== VACIAR =====

  const vaciarCarrito = () => {
    setCarrito([]);
    setDescuento(0);
    setCupon("");
    setMsgCupon("");
  };

  // ===== CUPÓN =====

  const aplicarCupon = () => {
    const codigo = cupon.trim().toUpperCase();
    if (CUPONES[codigo]) {
      setDescuento(CUPONES[codigo]);
      setMsgCupon("ok:Cupón aplicado: " + CUPONES[codigo] + "% de descuento");
    } else {
      setDescuento(0);
      setMsgCupon("error:Cupón inválido");
    }
    setTimeout(() => setMsgCupon(""), 3000);
  };

  // ===== TOTALES =====

  const subtotal = carrito.reduce(
    (acc, c) => acc + c.precio, 0
  );
  const ahorros = (subtotal * descuento) / 100;
  const total = subtotal - ahorros;

  // ===== CHECKOUT =====

  if (checkout) {
    return (
      <div className="carrito-page">
        <div className="checkout-success">
          <div className="checkout-icon">✅</div>
          <h1>¡Compra realizada!</h1>
          <p>
            Gracias <strong>{usuario.nombre}</strong>, tus
            cursos ya están disponibles en tu cuenta.
          </p>
          <div className="checkout-resumen">
            {carrito.map((c, i) => (
              <div className="checkout-item" key={i}>
                <span>📖 {c.titulo}</span>
                <span>S/ {c.precio}</span>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total pagado</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>
          </div>
          <div className="checkout-btns">
            <button
              className="carrito-btn primary"
              onClick={() => {
                setCarrito([]);
                navigate("/users");
              }}
            >
              Ver mis cursos
            </button>
            <button
              className="carrito-btn secondary"
              onClick={() => {
                setCarrito([]);
                navigate("/cursos");
              }}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">

      {/* ===== HEADER ===== */}

      <div className="carrito-header">
        <h1>🛒 Mi carrito</h1>
        <p>
          {carrito.length === 0
            ? "Tu carrito está vacío"
            : carrito.length +
              " curso" +
              (carrito.length > 1 ? "s" : "") +
              " agregado" +
              (carrito.length > 1 ? "s" : "")}
        </p>
      </div>

      {/* ===== VACÍO ===== */}

      {carrito.length === 0 ? (

        <div className="carrito-vacio">
          <div className="carrito-vacio-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestros cursos y empieza a aprender hoy</p>
          <button
            className="carrito-btn primary"
            onClick={() => navigate("/cursos")}
          >
            Ver catálogo de cursos
          </button>
          <button
            className="carrito-btn secondary"
            onClick={() => navigate("/ofertas")}
          >
            🔥 Ver ofertas especiales
          </button>
        </div>

      ) : (

        <div className="carrito-layout">

          {/* ===== LISTA ===== */}

          <div className="carrito-items">

            <div className="carrito-items-header">
              <span>Curso</span>
              <button
                className="vaciar-btn"
                onClick={vaciarCarrito}
              >
                🗑️ Vaciar carrito
              </button>
            </div>

            {carrito.map((curso, index) => (

              <div className="carrito-item" key={index}>

                <div className="ci-thumb">
                  {curso.imagen ? (
                    <img
                      src={curso.imagen}
                      alt={curso.titulo}
                    />
                  ) : (
                    <div className="ci-thumb-placeholder">
                      📖
                    </div>
                  )}
                </div>

                <div className="ci-data">
                  <h3>{curso.titulo}</h3>
                  <div className="ci-tags">
                    {curso.categoria && (
                      <span className="ci-tag">
                        {curso.categoria}
                      </span>
                    )}
                    {curso.nivel && (
                      <span className="ci-tag">
                        {curso.nivel}
                      </span>
                    )}
                  </div>
                  {curso.rating && (
                    <span className="ci-rating">
                      ⭐ {curso.rating}
                    </span>
                  )}
                </div>

                <div className="ci-acciones">
                  <span className="ci-precio">
                    S/ {curso.precio}
                  </span>
                  <button
                    className="ci-quitar"
                    onClick={() => quitarItem(index)}
                    title="Quitar del carrito"
                  >
                    🗑️
                  </button>
                </div>

              </div>

            ))}

          </div>

          {/* ===== RESUMEN ===== */}

          <aside className="carrito-resumen">

            <h2>Resumen del pedido</h2>

            {/* CUPÓN */}

            <div className="cupon-area">
              <label>¿Tienes un cupón?</label>
              <div className="cupon-row">
                <input
                  type="text"
                  placeholder="Ej: ZIPX10"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && aplicarCupon()
                  }
                />
                <button
                  className="cupon-btn"
                  onClick={aplicarCupon}
                >
                  Aplicar
                </button>
              </div>
              {msgCupon && (
                <p className={
                  "cupon-msg " +
                  (msgCupon.startsWith("ok") ? "ok" : "error")
                }>
                  {msgCupon.startsWith("ok") ? "✅" : "⚠️"}{" "}
                  {msgCupon.split(":")[1]}
                </p>
              )}
              <p className="cupon-hint">
                Prueba: ZIPX10 · PROMO20 · BIENVENIDO
              </p>
            </div>

            {/* TOTALES */}

            <div className="resumen-totales">

              <div className="resumen-row">
                <span>Subtotal ({carrito.length} cursos)</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>

              {descuento > 0 && (
                <div className="resumen-row descuento">
                  <span>Descuento ({descuento}%)</span>
                  <span>- S/ {ahorros.toFixed(2)}</span>
                </div>
              )}

              <div className="resumen-divider" />

              <div className="resumen-row total">
                <span>Total</span>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>

            </div>

            {descuento > 0 && (
              <div className="ahorro-badge">
                🎉 Ahorras S/ {ahorros.toFixed(2)} con este cupón
              </div>
            )}

            <button
              className="carrito-btn primary checkout-btn-big"
              onClick={() => setCheckout(true)}
            >
              💳 Finalizar compra
            </button>

            <button
              className="carrito-btn secondary"
              onClick={() => navigate("/cursos")}
            >
              ← Seguir comprando
            </button>

            <div className="garantia-box">
              <p>🔒 Pago 100% seguro</p>
              <p>✅ Garantía de 30 días</p>
              <p>📱 Acceso de por vida</p>
            </div>

          </aside>

        </div>

      )}

    </div>
  );
}

export default Carrito;
