import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar({
  carrito,
  setBusqueda,
  usuario,
  setUsuario,
  logout,
}) {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // ===== LOGIN =====

  const [mostrarLogin, setMostrarLogin] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errorLogin, setErrorLogin] =
    useState("");

  // ===== CARRITO =====

  const [mostrarCarrito, setMostrarCarrito] =
    useState(false);

  // ===== BUSCADOR =====

  const buscarCurso = (e) => {

    setBusqueda(e.target.value);

    navigate("/cursos");

  };

  // ===== VALIDACIONES PASSWORD =====

  const tiene8 =
    password.length >= 8;

  const tieneMayus =
    /[A-Z]/.test(password);

  const tieneNumero =
    /\d/.test(password);

  const tieneSimbolo =
    /[!@#$%^&*]/.test(password);

  // ===== LOGIN =====

  const handleLogin = (e) => {

  e.preventDefault();

  if (!email || !password) {

    setErrorLogin(
      "Completa todos los campos"
    );

    return;
  }

  if (
    !tiene8 ||
    !tieneMayus ||
    !tieneNumero ||
    !tieneSimbolo
  ) {

    setErrorLogin(
      "La contraseña no cumple los requisitos"
    );

    return;
  }

  setUsuario({

    email,

    nombre:
      email.split("@")[0],

  });

  setErrorLogin("");

  setMostrarLogin(false);

  setEmail("");

  setPassword("");

};
const handleGoogleLogin = (credentialResponse) => {

  const userData =
    jwtDecode(
      credentialResponse.credential
    );

  setUsuario({

    nombre:
      userData.name,

    email:
      userData.email,

    foto:
      userData.picture,

  });

  setMostrarLogin(false);

};

  return (

    <>

      {/* ===== NAVBAR ===== */}

      <nav className="navbar">

        {/* ===== LOGO ===== */}

        <div
          className="logo"
          onClick={() =>
            navigate("/")
          }
        >

          <h1>
            ZIPX <span>STORE</span>
          </h1>

        </div>

        {/* ===== LINKS ===== */}

        <ul className="nav-links">

          <li
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
          >

            <Link to="/">
              Inicio
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/cursos"
                ? "active"
                : ""
            }
          >

            <Link to="/cursos">
              Cursos
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/categorias"
                ? "active"
                : ""
            }
          >

            <Link to="/categorias">
              Categorías
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/ofertas"
                ? "active"
                : ""
            }
          >

            <Link to="/ofertas">
              Ofertas
            </Link>

          </li>

          <li
            className={
              location.pathname ===
              "/contacto"
                ? "active"
                : ""
            }
          >

            <Link to="/contacto">
              Contacto
            </Link>

          </li>

          {usuario && (

            <li
              className={
                location.pathname ===
                "/users"
                  ? "active"
                  : ""
              }
            >

              <Link to="/users">
                Usuario
              </Link>

            </li>

          )}

        </ul>

        {/* ===== RIGHT ===== */}

        <div className="nav-right">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Buscar cursos..."
            className="nav-search"
            onChange={buscarCurso}
          />

          {/* USER */}

          <div
            className="user-circle"
            onClick={() =>

              usuario
                ? navigate("/users")
                : setMostrarLogin(true)

            }
          >

            {usuario
              ? usuario.nombre[0].toUpperCase()
              : "👤"}

          </div>

          {/* LOGIN / LOGOUT */}

          {!usuario ? (

            <button
              className="login-btn"
              onClick={() =>
                setMostrarLogin(true)
              }
            >
              Login
            </button>

          ) : (

            <button
              className="login-btn"
              onClick={logout}
            >
              Salir
            </button>

          )}

          {/* ===== CARRITO ===== */}

          <div
            className="cart"
            onClick={() =>

              usuario &&
              setMostrarCarrito(
                !mostrarCarrito
              )

            }
          >

            🛒

            <span className="cart-count">
              {carrito.length}
            </span>

          </div>

        </div>

      </nav>

      {/* ===== LOGIN ===== */}

      {mostrarLogin && (

        <div className="login-overlay">

          <form
            className="modern-login"
            onSubmit={handleLogin}
          >

            <button
              type="button"
              className="close-login"
              onClick={() =>
                setMostrarLogin(false)
              }
            >
              ✕
            </button>

            <div className="login-icon">
              🔰
            </div>

            <h1>
              Bienvenido
            </h1>

            <p className="login-subtitle">
              Inicia sesión para continuar
            </p>

            <label>
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <label>
              Contraseña
            </label>

            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {password.length > 0 && (

              <div className="password-rules">

                <p>
                  {tiene8
                    ? "✅"
                    : "⚪"}{" "}
                  Mínimo 8 caracteres
                </p>

                <p>
                  {tieneMayus
                    ? "✅"
                    : "⚪"}{" "}
                  1 mayúscula
                </p>

                <p>
                  {tieneNumero
                    ? "✅"
                    : "⚪"}{" "}
                  1 número
                </p>

                <p>
                  {tieneSimbolo
                    ? "✅"
                    : "⚪"}{" "}
                  1 símbolo
                </p>

              </div>

            )}

            <div className="login-options">

              <label>

                <input type="checkbox" />

                Recordarme

              </label>

              <span>
                ¿Olvidaste tu contraseña?
              </span>

            </div>

            {errorLogin && (

              <p className="login-error">
                {errorLogin}
              </p>

            )}

            <button
              type="submit"
              className="login-submit"
            >
              Iniciar sesión →
            </button>

            <div className="login-divider">

              <div></div>

              <p>
                o continúa con
              </p>

              <div></div>

            </div>

            <div className="google-login">

                   <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                     console.log(
                      "Error Login Google"
                     );
                  }}
                  />

              </div>

            <p className="register-text">

              ¿No tienes cuenta?{" "}

              <span>
                Regístrate
              </span>

            </p>

          </form>

        </div>

      )}

      {/* ===== CARRITO ===== */}

      {mostrarCarrito && (

        <div className="cart-panel">

          <h2>
            Carrito de compras
          </h2>

          {carrito.length === 0 ? (

            <p>
              No hay cursos agregados.
            </p>

          ) : (

            carrito.map(
              (curso, index) => (

                <div
                  className="cart-item"
                  key={index}
                >

                  <h3>
                    {curso.titulo}
                  </h3>

                  <p>
                    S/ {curso.precio}
                  </p>

                </div>

              )
            )

          )}

        </div>

      )}

    </>

  );
}

export default Navbar;