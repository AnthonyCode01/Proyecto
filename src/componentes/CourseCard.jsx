import {
  useNavigate,
} from "react-router-dom";

function CourseCard({
  curso,
  favoritos,
  toggleFavorito,
  agregarCarrito,
  setCursoSeleccionado,
}) {

  const navigate =
    useNavigate();

  return (

    <div className="card">

      <div className="card-image">

        <span className="tag">
          {curso.categoria}
        </span>

        <button
          className="fav-btn"
          onClick={() =>
            toggleFavorito(
              curso.id
            )
          }
        >

          {favoritos.includes(
            curso.id
          )
            ? "❤️"
            : "🤍"}

        </button>

        <img
          src={curso.imagen}
          alt={curso.titulo}
        />

      </div>

      <div className="card-body">

        <h3>
          {curso.titulo}
        </h3>

        <p className="rating">
          ⭐ {curso.rating}
        </p>

        <p className="students">
          {curso.alumnos}
        </p>

        <p className="nivel">
          {curso.nivel}
        </p>

        <h2>
          S/ {curso.precio}
        </h2>

        <div className="card-buttons">

          {/* VER DETALLE */}

          <button
            className="course-btn"
            onClick={() => {

              setCursoSeleccionado(
                curso
              );

              navigate(
                "/detalle"
              );

            }}
          >

            Ver detalle

          </button>

          {/* AGREGAR AL CARRITO */}

          <button
            className="cart-btn"
            onClick={() =>
              agregarCarrito(
                curso
              )
            }
          >

            🛒 Comprar

          </button>

        </div>

      </div>

    </div>

  );
}

export default CourseCard;