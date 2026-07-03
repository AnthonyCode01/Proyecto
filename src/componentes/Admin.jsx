import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ setCursosAdmin }) {
  const navigate = useNavigate();

  const usuarioActual = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [nivel, setNivel] = useState("Básico");

  const [cursos, setCursos] = useState([]);
  const [cursoEditando, setCursoEditando] = useState(null);

  useEffect(() => {
    const cursosGuardados =
      JSON.parse(localStorage.getItem("cursosAdmin")) || [];

    setCursos(cursosGuardados);
  }, []);

  const guardarCursos = (listaCursos) => {
    setCursos(listaCursos);
    setCursosAdmin(listaCursos);

    localStorage.setItem(
      "cursosAdmin",
      JSON.stringify(listaCursos)
    );
  };

  const limpiarFormulario = () => {
    setTitulo("");
    setPrecio("");
    setDescripcion("");
    setImagen("");
    setCategoria("General");
    setNivel("Básico");
    setCursoEditando(null);
  };

  const agregarCurso = () => {
    if (!titulo || !precio || !descripcion) {
      alert("Completa título, precio y descripción");
      return;
    }

    const datosCurso = {
      titulo: titulo.trim(),
      precio: Number(precio),
      descripcion: descripcion.trim(),
      imagen:
        imagen.trim() ||
        "https://via.placeholder.com/400x250?text=ZIPX+Curso",
      categoria,
      nivel,
      rating: 5.0,
      alumnos: "Nuevo curso",
    };

    if (cursoEditando) {
      const cursosActualizados = cursos.map((curso) =>
        curso.id === cursoEditando
          ? {
              ...curso,
              ...datosCurso,
            }
          : curso
      );

      guardarCursos(cursosActualizados);
      limpiarFormulario();
      return;
    }

    const nuevoCurso = {
      id: Date.now(),
      ...datosCurso,
    };

    const nuevosCursos = [...cursos, nuevoCurso];

    guardarCursos(nuevosCursos);
    limpiarFormulario();
  };

  const editarCurso = (curso) => {
    setCursoEditando(curso.id);
    setTitulo(curso.titulo || "");
    setPrecio(curso.precio || "");
    setDescripcion(curso.descripcion || "");
    setImagen(curso.imagen || "");
    setCategoria(curso.categoria || "General");
    setNivel(curso.nivel || "Básico");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const eliminarCurso = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este curso?"
    );

    if (!confirmar) return;

    const cursosActualizados = cursos.filter(
      (curso) => curso.id !== id
    );

    guardarCursos(cursosActualizados);
  };

  const totalValor = cursos.reduce(
    (acc, curso) => acc + Number(curso.precio || 0),
    0
  );

  if (usuarioActual?.rol !== "admin") {
    return (
      <div className="simple-page">
        <h1>🔒 Acceso restringido</h1>
        <p>Solo el administrador puede ingresar a esta sección.</p>

        <button
          className="course-btn"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-hero">
        <div>
          <span className="admin-badge">
            ⚙️ Panel interno ZIPX
          </span>

          <h1>
            Panel de Administración
          </h1>

          <p>
            Crea, edita y administra los cursos que aparecerán en el catálogo.
          </p>
        </div>

        <div className="admin-hero-stats">
          <div className="admin-stat-card">
            <span>{cursos.length}</span>
            <p>Cursos creados</p>
          </div>

          <div className="admin-stat-card">
            <span>S/ {totalValor.toFixed(0)}</span>
            <p>Valor total</p>
          </div>
        </div>
      </div>

      <div className="admin-layout">

        <div className="admin-form-card">
          <div className="admin-card-header">
            <h2>
              {cursoEditando
                ? "✏️ Editar curso"
                : "➕ Crear nuevo curso"}
            </h2>

            <p>
              Completa la información del curso para publicarlo.
            </p>
          </div>

          <div className="admin-form">

            <div className="admin-field">
              <label>Título del curso</label>
              <input
                type="text"
                placeholder="Ej: Excel Avanzado"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>Precio</label>
              <input
                type="number"
                placeholder="Ej: 89"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Programación">Programación</option>
                <option value="Diseño">Diseño</option>
                <option value="Ofimática">Ofimática</option>
                <option value="Marketing">Marketing</option>
                <option value="Datos">Datos</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Nivel</label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="admin-field">
              <label>URL de imagen</label>
              <input
                type="text"
                placeholder="Pega aquí el link de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>Descripción</label>
              <textarea
                placeholder="Describe qué aprenderá el estudiante"
                rows="5"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {imagen && (
              <div className="admin-image-preview">
                <img src={imagen} alt="Vista previa" />
              </div>
            )}

            <div className="admin-form-actions">
              <button
                className="admin-btn primary"
                onClick={agregarCurso}
              >
                {cursoEditando
                  ? "Guardar cambios"
                  : "Agregar curso"}
              </button>

              {cursoEditando && (
                <button
                  className="admin-btn secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
              )}
            </div>

          </div>
        </div>

        <div className="admin-list-card">
          <div className="admin-card-header">
            <h2>📚 Cursos creados</h2>
            <p>Lista de cursos agregados desde el panel admin.</p>
          </div>

          {cursos.length === 0 ? (
            <div className="admin-empty">
              <span>📭</span>
              <h3>No hay cursos creados</h3>
              <p>Cuando agregues cursos aparecerán aquí.</p>
            </div>
          ) : (
            <div className="admin-course-list">
              {cursos.map((curso) => (
                <div
                  className="admin-course-card"
                  key={curso.id}
                >
                  <img
                    src={
                      curso.imagen ||
                      "https://via.placeholder.com/400x250?text=ZIPX+Curso"
                    }
                    alt={curso.titulo}
                  />

                  <div className="admin-course-info">
                    <span className="admin-course-category">
                      {curso.categoria}
                    </span>

                    <h3>{curso.titulo}</h3>

                    <p>{curso.descripcion}</p>

                    <div className="admin-course-meta">
                      <span>📘 {curso.nivel}</span>
                      <strong>S/ {curso.precio}</strong>
                    </div>
                  </div>

                  <div className="admin-course-actions">
                    <button
                      className="admin-edit-btn"
                      onClick={() => editarCurso(curso)}
                    >
                      Editar
                    </button>

                    <button
                      className="admin-delete-btn"
                      onClick={() => eliminarCurso(curso.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </section>
  );
}

export default Admin;