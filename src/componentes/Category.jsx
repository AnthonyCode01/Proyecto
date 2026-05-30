import {
  useNavigate,
} from "react-router-dom";

import CategoryCard from "./CategoryCard";

function Category({
  setCategoria,
}) {

  const navigate =
    useNavigate();

  const categorias = [

    {
      nombre: "Ofimática",
      icono: "📑",
      descripcion:
        "Excel, Word y PowerPoint.",
      filtro: "Ofimática",
    },

    {
      nombre: "Diseño",
      icono: "🎨",
      descripcion:
        "Canva y diseño digital.",
      filtro: "Diseño",
    },

    {
      nombre:
        "Análisis de Datos",
      icono: "📊",
      descripcion:
        "Excel, Power BI y estadísticas.",
      filtro:
        "Análisis de Datos",
    },

    {
      nombre: "Marketing",
      icono: "📱",
      descripcion:
        "Redes sociales y publicidad digital.",
      filtro: "Marketing",
    },

    {
      nombre:
        "Productividad",
      icono: "🧠",
      descripcion:
        "Gestión del tiempo y herramientas digitales.",
      filtro:
        "Productividad",
    },

  ];

  return (

    <section className="categories-page">

      <div className="categories-header">

        <h1>
          Explora nuestras categorías
        </h1>

        <p>
          Aprende habilidades digitales
          con cursos profesionales.
        </p>

      </div>

      <div className="categories-grid">

        {categorias.map(
          (categoria, index) => (

            <CategoryCard
              key={index}
              icono={
                categoria.icono
              }
              titulo={
                categoria.nombre
              }
              descripcion={
                categoria.descripcion
              }
              filtro={
                categoria.filtro
              }
              onClick={() => {

                setCategoria(
                  categoria.filtro
                );

                navigate(
                  "/cursos"
                );

              }}
            />

          )
        )}

      </div>

    </section>

  );
}

export default Category;