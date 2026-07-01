import {
  useNavigate,
} from "react-router-dom";

function ProductDetail({
  curso,
  agregarCarrito,
  carrito = [],
}) {

  const navigate =
    useNavigate();

  if (!curso) {

    return (

      <div className="simple-page">

        <h1>
          Curso no encontrado
        </h1>

      </div>

    );

  }

  return (

    <section className="product-detail">

      <div className="product-left">

        <div className="product-image">

          <img
            src={curso.imagen}
            alt={curso.titulo}
          />

        </div>

      </div>

      <div className="product-right">

        <span className="product-category">
          {curso.categoria}
        </span>

        <h1>
          {curso.titulo}
        </h1>

        <div className="product-rating">

          ⭐ {curso.rating} •{" "}
          {curso.alumnos}

        </div>

        <p className="product-description">

          <p>
            {curso.descripcion
            ? curso.descripcion
            : `Desarrolla habilidades prácticas con el curso de ${curso.titulo}. Aprende mediante clases grabadas en alta calidad, ejercicios guiados, proyectos reales y recursos descargables diseñados para potenciar tu aprendizaje profesional.`}
          </p>

          <strong>
            {curso.titulo}
          </strong>.

          Aprende mediante clases
          grabadas en alta calidad,
          ejercicios guiados,
          proyectos reales y recursos
          descargables diseñados
          para potenciar tu
          aprendizaje profesional.

        </p>

        <div className="product-info">

          <div>

            📚 Nivel:

            <strong>
              {" "}
              {curso.nivel}
            </strong>

          </div>

          <div>

            ⏰ Duración:

            <strong>

              {" "}

              {curso.nivel ===
              "Básico"
                ? "12 horas"
                : curso.nivel ===
                  "Intermedio"
                ? "24 horas"
                : "40 horas"}

            </strong>

          </div>

          <div>

            🎓 Certificado:

            <strong>
              {" "}
              Incluido
            </strong>

          </div>

          <div>

            🌎 Modalidad:

            <strong>
              {" "}
              100% Online
            </strong>

          </div>

          <div>

            📂 Recursos:

            <strong>
              {" "}
              Material descargable
            </strong>

          </div>

          <div>

            📱 Acceso:

            <strong>
              {" "}
              Ilimitado
            </strong>

          </div>

        </div>

        <div className="product-extra">

          <h3>
            ¿Qué aprenderás?
          </h3>

          <ul>

            {curso.categoria ===
              "Ofimática" && (
              <>
                <li>
                  ✔ Manejo profesional
                  de herramientas Office
                </li>

                <li>
                  ✔ Creación de reportes
                  y tablas dinámicas
                </li>

                <li>
                  ✔ Automatización y
                  productividad
                </li>
              </>
            )}

            {curso.categoria ===
              "Diseño" && (
              <>
                <li>
                  ✔ Diseño de contenido
                  visual moderno
                </li>

                <li>
                  ✔ Creación de
                  publicaciones para
                  redes sociales
                </li>

                <li>
                  ✔ Uso profesional de
                  herramientas creativas
                </li>
              </>
            )}

            {curso.categoria ===
              "Análisis de Datos" && (
              <>
                <li>
                  ✔ Interpretación y
                  visualización de datos
                </li>

                <li>
                  ✔ Creación de
                  dashboards y gráficos
                </li>

                <li>
                  ✔ Análisis estadístico
                  aplicado
                </li>
              </>
            )}

            {curso.categoria ===
              "Marketing" && (
              <>
                <li>
                  ✔ Estrategias de
                  marketing digital
                </li>

                <li>
                  ✔ Gestión de campañas
                  en redes sociales
                </li>

                <li>
                  ✔ Creación de
                  contenido atractivo
                </li>
              </>
            )}

            {(curso.categoria ===
              "Programación" ||
              curso.categoria ===
                "Desarrollo Web") && (
              <>
                <li>
                  ✔ Desarrollo de
                  proyectos reales
                </li>

                <li>
                  ✔ Fundamentos de
                  programación moderna
                </li>

                <li>
                  ✔ Buenas prácticas y
                  lógica de desarrollo
                </li>
              </>
            )}

            {curso.categoria ===
              "Productividad" && (
              <>
                <li>
                  ✔ Organización y
                  gestión eficiente del
                  tiempo
                </li>

                <li>
                  ✔ Uso de herramientas
                  digitales modernas
                </li>

                <li>
                  ✔ Mejora del
                  rendimiento profesional
                </li>
              </>
            )}

          </ul>

        </div>

        <h2 className="product-price">

          S/ {curso.precio}

        </h2>

        <div className="product-buttons">

          <button
            className="course-btn"
            onClick={() => agregarCarrito(curso)}
            disabled={carrito.some((item) => (curso.id && item.id === curso.id) || item.titulo === curso.titulo)}
            style={carrito.some((item) => (curso.id && item.id === curso.id) || item.titulo === curso.titulo) ? { opacity: 0.6, cursor: "default" } : {}}
          >
            {carrito.some((item) => (curso.id && item.id === curso.id) || item.titulo === curso.titulo)
              ? "✓ Ya está en el carrito"
              : "🛒 Agregar al carrito"}
          </button>

          <button
            className="secondary-product-btn"
            onClick={() =>
              navigate("/cursos")
            }
          >

            Volver

          </button>

        </div>

      </div>

    </section>

  );
}

export default ProductDetail;