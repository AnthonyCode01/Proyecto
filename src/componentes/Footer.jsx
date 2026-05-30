import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-grid">

        <div>

          <h2>
            ZIPX STORE
          </h2>

          <p>
            Plataforma moderna de cursos
            online para potenciar tus
            habilidades.
          </p>

        </div>

        <div>

          <h2>
            Enlaces
          </h2>

          <ul>

            <li className="footer-link">

              <Link to="/">
                Inicio
              </Link>

            </li>

            <li className="footer-link">

              <Link to="/cursos">
                Cursos
              </Link>

            </li>

            <li className="footer-link">

              <Link to="/categorias">
                Categorías
              </Link>

            </li>

            <li className="footer-link">

              <Link to="/ofertas">
                Ofertas
              </Link>

            </li>

            <li className="footer-link">

              <Link to="/contacto">
                Contacto
              </Link>

            </li>

          </ul>

        </div>

        <div>

          <h2>
            Contacto
          </h2>

          <ul>

            <li>
              zipxstore@gmail.com
            </li>

            <li>
              +51 999 999 999
            </li>

            <li>
              Lima - Perú
            </li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 ZIPX STORE -
          Todos los derechos reservados
        </p>

      </div>

    </footer>

  );
}

export default Footer;