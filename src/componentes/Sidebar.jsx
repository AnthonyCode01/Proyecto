function Sidebar({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  nivel,
  setNivel,
  precioMax,
  setPrecioMax,
}) {

  return (

    <aside className="sidebar">

      <h2>
        Buscar cursos
      </h2>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
        className="input-search"
      />

      <h2>
        Categorías
      </h2>

      <div className="categorias">

        {[
          "Todos",
          "Ofimática",
          "Diseño",
          "Análisis de Datos",
          "Marketing",
          "Productividad",
        ].map((cat) => (

          <button
            key={cat}
            className={
              categoria === cat
                ? "categoria-btn active-cat"
                : "categoria-btn"
            }
            onClick={() =>
              setCategoria(cat)
            }
          >
            {cat}
          </button>

        ))}

      </div>

      <h2>
        Precio máximo
      </h2>

      <input
        type="range"
        min="20"
        max="100"
        value={precioMax}
        onChange={(e) =>
          setPrecioMax(Number(e.target.value))
        }
        className="range"
      />

      <p className="price-value">
        Hasta S/ {precioMax}
      </p>

      <h2>
        Nivel
      </h2>

      <div className="niveles">

        {[
          "Todos",
          "Básico",
          "Intermedio",
          "Avanzado",
        ].map((item) => (

          <button
            key={item}
            className={
              nivel === item
                ? "nivel-btn active-cat"
                : "nivel-btn"
            }
            onClick={() =>
              setNivel(item)
            }
          >
            {item}
          </button>

        ))}

      </div>

    </aside>

  );
}

export default Sidebar;