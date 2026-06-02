import { useNavigate } from "react-router-dom";

function CourseCard({ curso, favoritos, toggleFavorito, agregarCarrito, setCursoSeleccionado, carrito = [] }) {

  const navigate = useNavigate();

  const estaEnCarrito = carrito.some(
    (item) => (curso.id && item.id === curso.id) || item.titulo === curso.titulo
  );

  return (
    <div className="card">

      <div className="card-image">
        <span className="tag">{curso.categoria}</span>
        <button className="fav-btn" onClick={() => toggleFavorito(curso.id)}>
          {favoritos.includes(curso.id) ? "❤️" : "🤍"}
        </button>
        <img src={curso.imagen} alt={curso.titulo} />
      </div>

      <div className="card-body">
        <h3>{curso.titulo}</h3>
        <p className="rating">⭐ {curso.rating}</p>
        <p className="students">{curso.alumnos}</p>
        <p className="nivel">{curso.nivel}</p>
        <h2>S/ {curso.precio}</h2>

        <div className="card-buttons">
          <button className="course-btn" onClick={() => { setCursoSeleccionado(curso); navigate("/detalle"); }}>
            Ver detalle
          </button>
          <button
            className="cart-btn"
            onClick={() => agregarCarrito(curso)}
            disabled={estaEnCarrito}
            style={estaEnCarrito ? { opacity: 0.6, cursor: "default" } : {}}
          >
            {estaEnCarrito ? "✓ Agregado" : "🛒 Comprar"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default CourseCard;