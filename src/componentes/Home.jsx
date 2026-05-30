import { useNavigate } from "react-router-dom";

function Home({
  setCategoria,
  agregarCarrito,
}) {

  const navigate =
    useNavigate();

  return (

    <>

      {/* ================= HOME ================= */}

      <section className="home">

        {/* LEFT */}

        <div className="home-left">

          <span className="home-badge">
            🚀 Plataforma #1 en cursos online
          </span>

          <h1>
            Aprende nuevas
            <span> habilidades</span>
            <br />
            y acelera tu futuro
          </h1>

          <p>
            Cursos modernos de programación,
            diseño, marketing, productividad
            y análisis de datos con acceso
            ilimitado y certificados digitales.
          </p>

          {/* BUTTONS */}

          <div className="home-buttons">

            <button
              className="home-btn primary-btn"
              onClick={() =>
                navigate("/cursos")
              }
            >
              Explorar cursos →
            </button>

            <button
              className="home-btn secondary-btn"
              onClick={() =>
                navigate("/ofertas")
              }
            >
              🔥 Ver ofertas
            </button>

          </div>

          {/* STATS */}

          <div className="home-stats">

            <div className="stat-box">
              <h2>+15K</h2>
              <p>Estudiantes</p>
            </div>

            <div className="stat-box">
              <h2>+250</h2>
              <p>Cursos</p>
            </div>

            <div className="stat-box">
              <h2>4.9★</h2>
              <p>Valoración</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="home-right">

          <div className="home-image-box">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="home"
            />

            {/* CARD TOP */}

            <div className="home-card card-top">

              <div className="home-card-icon">
                ⚡
              </div>

              <div>

                <h3>
                  Acceso inmediato
                </h3>

                <p>
                  Después de tu compra
                </p>

              </div>

            </div>

            {/* CARD BOTTOM */}

            <div className="home-card card-bottom">

              <div className="home-card-icon">
                🏅
              </div>

              <div>

                <h3>
                  Certificado incluido
                </h3>

                <p>
                  Al finalizar el curso
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="home-features">

        <div className="feature-item">

          <div className="feature-icon">
            ⚡
          </div>

          <div className="feature-text">

            <h3>
              Acceso inmediato
            </h3>

            <p>
              Obtén acceso automático
              inmediatamente después
              de realizar tu compra.
            </p>

          </div>

        </div>

        <div className="feature-item">

          <div className="feature-icon">
            🏅
          </div>

          <div className="feature-text">

            <h3>
              Certificado incluido
            </h3>

            <p>
              Obtén certificados digitales
              al finalizar cada curso.
            </p>

          </div>

        </div>

        <div className="feature-item">

          <div className="feature-icon">
            🔒
          </div>

          <div className="feature-text">

            <h3>
              Pago seguro
            </h3>

            <p>
              Tus datos protegidos
              con sistemas seguros.
            </p>

          </div>

        </div>

        <div className="feature-item">

          <div className="feature-icon">
            🎧
          </div>

          <div className="feature-text">

            <h3>
              Soporte 24/7
            </h3>

            <p>
              Nuestro equipo está listo
              para ayudarte siempre.
            </p>

          </div>

        </div>

      </section>

      {/* ================= POPULAR CATEGORIES ================= */}

      <section className="popular-section">

        <div className="section-top">

          <h2>
            Categorías populares
          </h2>

          <button
            onClick={() =>
              navigate("/cursos")
            }
          >
            Ver todas →
          </button>

        </div>

        <div className="popular-grid">

          {/* OFIMATICA */}

          <div
            className="popular-card"
            onClick={() => {

              setCategoria(
                "Ofimática"
              );

              navigate("/cursos");

            }}
          >

            <div className="popular-icon">
              📗
            </div>

            <h3>Ofimática</h3>

            <p>12 cursos</p>

          </div>

          {/* DISEÑO */}

          <div
            className="popular-card"
            onClick={() => {

              setCategoria(
                "Diseño"
              );

              navigate("/cursos");

            }}
          >

            <div className="popular-icon">
              🎨
            </div>

            <h3>Diseño</h3>

            <p>8 cursos</p>

          </div>

          {/* DATA */}

          <div
            className="popular-card"
            onClick={() => {

              setCategoria(
                "Análisis de Datos"
              );

              navigate("/cursos");

            }}
          >

            <div className="popular-icon">
              📊
            </div>

            <h3>
              Análisis de Datos
            </h3>

            <p>7 cursos</p>

          </div>

          {/* PRODUCTIVIDAD */}

          <div
            className="popular-card"
            onClick={() => {

              setCategoria(
                "Productividad"
              );

              navigate("/cursos");

            }}
          >

            <div className="popular-icon">
              🚀
            </div>

            <h3>
              Productividad
            </h3>

            <p>4 cursos</p>

          </div>

          {/* MARKETING */}

          <div
            className="popular-card"
            onClick={() => {

              setCategoria(
                "Marketing"
              );

              navigate("/cursos");

            }}
          >

            <div className="popular-icon">
              📢
            </div>

            <h3>Marketing</h3>

            <p>5 cursos</p>

          </div>

        </div>

      </section>

      {/* ================= FEATURED COURSES ================= */}

      <section className="featured-section">

        <div className="section-top">

          <h2>
            Cursos destacados
          </h2>

          <button
            onClick={() =>
              navigate("/cursos")
            }
          >
            Ver todos →
          </button>

        </div>

        <div className="featured-grid">

          {/* CARD 1 */}

          <div className="featured-card">

            <img
              src="://images.unsplash.com/photo-1542744173-8e7e534https15bb0?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />

            <div className="featured-content">

              <h3>
                Excel Básico a Avanzado
              </h3>

              <p>
                ⭐ 4.9 | 240 alumnos
              </p>

              <div className="featured-bottom">

                <span>
                  S/ 49.90
                </span>

                <button
                  onClick={() =>
                    agregarCarrito({
                      titulo:
                        "Excel Básico a Avanzado",

                      precio: 49.9,

                      categoria:
                        "Ofimática",
                    })
                  }
                >
                  Agregar
                </button>

              </div>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />

            <div className="featured-content">

              <h3>
                Canva para Principiantes
              </h3>

              <p>
                ⭐ 4.8 | 180 alumnos
              </p>

              <div className="featured-bottom">

                <span>
                  S/ 39.90
                </span>

                <button
                  onClick={() =>
                    agregarCarrito({
                      titulo:
                        "Canva para Principiantes",

                      precio: 39.9,

                      categoria:
                        "Diseño",
                    })
                  }
                >
                  Agregar
                </button>

              </div>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />

            <div className="featured-content">

              <h3>
                Minitab para Estadística
              </h3>

              <p>
                ⭐ 4.9 | 95 alumnos
              </p>

              <div className="featured-bottom">

                <span>
                  S/ 59.90
                </span>

                <button
                  onClick={() =>
                    agregarCarrito({
                      titulo:
                        "Minitab para Estadística",

                      precio: 59.9,

                      categoria:
                        "Análisis de Datos",
                    })
                  }
                >
                  Agregar
                </button>

              </div>

            </div>

          </div>

          {/* CARD 4 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />

            <div className="featured-content">

              <h3>
                Productividad Personal
              </h3>

              <p>
                ⭐ 4.8 | 70 alumnos
              </p>

              <div className="featured-bottom">

                <span>
                  S/ 29.90
                </span>

                <button
                  onClick={() =>
                    agregarCarrito({
                      titulo:
                        "Productividad Personal",

                      precio: 29.9,

                      categoria:
                        "Productividad",
                    })
                  }
                >
                  Agregar
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>

  );
}

export default Home;