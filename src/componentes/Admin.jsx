import { useState, useEffect } from "react";

function Admin({setCursosAdmin,}) 
{

  const [titulo, setTitulo] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [imagen, setImagen] =
  useState("");

  const [cursos, setCursos] =
    useState([]);

  const [cursoEditando, setCursoEditando] =
    useState(null);

    useEffect(() => {

    const cursosGuardados =
      JSON.parse(
        localStorage.getItem(
          "cursosAdmin"
        )
      ) || [];

    setCursos(
      cursosGuardados
    );

  }, []);

  const agregarCurso = () => {

  if (
    !titulo ||
    !precio ||
    !descripcion
  ) {

    alert(
      "Completa todos los campos"
    );

    return;

  }

  if (cursoEditando) {

    const cursosActualizados =
      cursos.map((curso) =>
        curso.id === cursoEditando
          ? {
               ...curso,
               titulo,
               precio,
               descripcion,
               imagen:
                 imagen ||
                "https://via.placeholder.com/400x250?text=Curso",
  }
          : curso
      );

    setCursos(
      cursosActualizados
    );

    setCursosAdmin(
  cursosActualizados
);

    localStorage.setItem(
      "cursosAdmin",
      JSON.stringify(
        cursosActualizados
      )
    );

    setCursoEditando(null);

    setTitulo("");

    setPrecio("");

    setDescripcion("");

    setImagen("");

    return;

  }

  const nuevoCurso = {

  id: Date.now(),

  titulo,

  precio,

  descripcion,

  imagen:
    imagen ||
    "https://via.placeholder.com/400x250?text=Curso",

  categoria: "General",

  rating: 5.0,

  alumnos: "Nuevo curso",

  nivel: "Básico",

 };

  const nuevosCursos = [

    ...cursos,

    nuevoCurso,

  ];

  setCursos(
    nuevosCursos
  );

 setCursosAdmin(
  nuevosCursos
);

  localStorage.setItem(
    "cursosAdmin",
    JSON.stringify(
      nuevosCursos
    )
  );

  setTitulo("");

  setPrecio("");

  setDescripcion("");

  setImagen("");

};

  const editarCurso = (curso) => {

    setCursoEditando(
      curso.id
    );

    setTitulo(
      curso.titulo
    );

    setPrecio(
      curso.precio
    );

    setDescripcion(
      curso.descripcion
    );
    
    setImagen(
      curso.imagen || ""
    );


};

const eliminarCurso = (id) => {

  const cursosActualizados =
    cursos.filter(
      (curso) =>
        curso.id !== id
    );

  setCursos(
    cursosActualizados
  );

 setCursosAdmin(
  cursosActualizados
);

  localStorage.setItem(
    "cursosAdmin",
    JSON.stringify(
      cursosActualizados
    )
  );

};

  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1>
        Panel de Administración
      </h1>

      <p>
        Crear nuevo curso
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
        }}
      >

        <input
          type="text"
          placeholder="Título del curso"
          value={titulo}
          onChange={(e) =>
            setTitulo(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) =>
            setPrecio(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Descripción"
          rows="4"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(
              e.target.value
            )
          }
        />

        <input
         type="text"
         placeholder="URL de la imagen del curso"
         value={imagen}
         onChange={(e) =>
          setImagen(
         e.target.value
        )
        }
        />

        <button
          onClick={
            agregarCurso
          }
        >
          {cursoEditando
           ? "Guardar Cambios"
           : "Agregar Curso"}
        </button>

      </div>

      <hr
        style={{
          margin:
            "30px 0",
        }}
      />

      <h2>
        Cursos creados
      </h2>

      {cursos.length === 0 ? (

        <p>
          No hay cursos creados.
        </p>

      ) : (

        cursos.map(
          (curso) => (

            <div
              key={curso.id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "15px",
                marginBottom:
                  "15px",
                borderRadius:
                  "10px",
              }}
            >

              <h3>
                {curso.titulo}
              </h3>

              <p>
                S/ {curso.precio}
              </p>

              <p>
                {
                  curso.descripcion
                }
              </p>
              
              <button
                onClick={() =>
                editarCurso(curso)
              }
              >
                 Editar
              </button>


              <button
                onClick={() =>
                eliminarCurso(
                curso.id
              )
              }
              >
                Eliminar
              </button>

            </div>

          )
        )

      )}

    </div>

  );

}

export default Admin;