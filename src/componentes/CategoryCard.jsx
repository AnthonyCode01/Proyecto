function CategoryCard({
  icono,
  titulo,
  descripcion,
  onClick,
}) {

  return (

    <div className="category-card">

      <div className="category-icon">
        {icono}
      </div>

      <h2>
        {titulo}
      </h2>

      <p>
        {descripcion}
      </p>

      <button
        className="category-btn-main"
        onClick={onClick}
      >

        Ver cursos

      </button>

    </div>

  );
}

export default CategoryCard;