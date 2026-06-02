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
  
  const [mostrarPassword, setMostrarPassword] =
  useState(false);

  const [errorLogin, setErrorLogin] =
    useState("");

 /* ====REGISTRO==== */
  const [mostrarRegistro, setMostrarRegistro] =
  useState(false);

  const [nombreRegistro, setNombreRegistro] =
  useState("");

  const [apellidoRegistro, setApellidoRegistro] =
  useState("");

  const [emailRegistro, setEmailRegistro] =
  useState("");

  const [passwordRegistro, setPasswordRegistro] =
  useState("");

  const [
  mostrarPasswordRegistro,setMostrarPasswordRegistro
] = useState(false);

 const [
  mostrarConfirmarPassword,setMostrarConfirmarPassword
] = useState(false);

  const [errorRegistro, setErrorRegistro] =
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

// ===== VALIDACIONES PASSWORD REGISTRO =====

const registroTiene8 =
  passwordRegistro.length >= 8;

const registroTieneMayus =
  /[A-Z]/.test(passwordRegistro);

const registroTieneNumero =
  /\d/.test(passwordRegistro);

const registroTieneSimbolo =
  /[!@#$%^&*]/.test(passwordRegistro);

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
    email === "admin@zipx.com" &&
    password === "Admin123@!"
  )   
  {
    console.log("Entró al admin");

    const adminUser = {
      nombre: "Administrador",
      email: "admin@zipx.com",
      rol: "admin",
    };

    setUsuario(adminUser);

    localStorage.setItem(
      "usuario",
      JSON.stringify(adminUser)
    );

    setErrorLogin("");

    setMostrarLogin(false);

    setEmail("");

    setPassword("");

    return;

  }

  const usuariosGuardados =
    JSON.parse(
      localStorage.getItem(
        "usuarios"
      )
    ) || [];

  const usuarioEncontrado =
    usuariosGuardados.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

  if (!usuarioEncontrado) {

    setErrorLogin(
      "Correo o contraseña incorrectos"
    );

    return;

  }

  setUsuario(
  usuarioEncontrado
);

localStorage.setItem(
  "usuario",
  JSON.stringify(
    usuarioEncontrado
  )
);

  setErrorLogin("");

  setMostrarLogin(false);

  setEmail("");

  setPassword("");

};

const handleRegistro = () => {

  if (
    !nombreRegistro ||
    !apellidoRegistro ||
    !emailRegistro ||
    !passwordRegistro
  ) {

    setErrorRegistro(
      "Completa todos los campos"
    );

    return;

  }
  if (
    !registroTiene8 ||
    !registroTieneMayus ||
    !registroTieneNumero ||
    !registroTieneSimbolo
  ) {

    setErrorRegistro(
      "La contraseña no cumple los requisitos"
    );

    return;

}

  

  const usuariosGuardados =
    JSON.parse(
      localStorage.getItem(
        "usuarios"
      )
    ) || [];

  const existeUsuario =
    usuariosGuardados.find(
      (user) =>
        user.email ===
        emailRegistro
    );

  if (existeUsuario) {

    setErrorRegistro(
      "Ese correo ya está registrado"
    );

    return;

  }

  const nuevoUsuario = {

    nombre:
      nombreRegistro,

    apellido:
      apellidoRegistro,

    email:
      emailRegistro,

    password:
      passwordRegistro,

  };

  usuariosGuardados.push(
    nuevoUsuario
  );

  localStorage.setItem(
    "usuarios",
    JSON.stringify(
      usuariosGuardados
    )
  );

  setErrorRegistro("");

  alert(
    "Cuenta creada correctamente"
  );

  setMostrarRegistro(false);

};

const handleGoogleLogin = (
  credentialResponse
) => {

  const userData =
    jwtDecode(
      credentialResponse.credential
    );

  const user = {

    nombre:
      userData.name,

    email:
      userData.email,

    foto:
      userData.picture,

  };

  localStorage.setItem(
    "usuario",
    JSON.stringify(user)
  );

  setUsuario(user);

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
          {usuario?.rol === "admin" && (

          <li
            className={
            location.pathname ===
            "/admin"
              ? "active"
              : ""
             }
          >

          <Link to="/admin">
           Admin
          </Link>

          </li>

         )}

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
              type={mostrarPassword? "text": "password"}
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
            <button
              type="button"
              onClick={() =>
                setMostrarPassword(
              !mostrarPassword
               )
              }
            >
              {mostrarPassword
               ? "Ocultar"
               : "Mostrar"}
            </button>

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

           <span
              onClick={() => {

                setMostrarLogin(false);

                setMostrarRegistro(true);

              }}
                style={{
               cursor: "pointer",
               fontWeight: "bold",
              }}
            >

             Regístrate

            </span>

             </p>

          </form>

        </div>

      )}

      {/* ===== REGISTRO ===== */}

{mostrarRegistro && (

  <div className="login-overlay">

    <div className="modern-login">

      <button
        type="button"
        className="close-login"
        onClick={() =>
          setMostrarRegistro(false)
        }
      >
        ✕
      </button>

      <div className="login-icon">
        📝
      </div>

      <h1>
        Crear cuenta
      </h1>

      <p className="login-subtitle">
        Regístrate para continuar
      </p>

      <input
        type="text"
        placeholder="Nombre"
        value={nombreRegistro}
        onChange={(e) =>
          setNombreRegistro(
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Apellido"
        value={apellidoRegistro}
        onChange={(e) =>
          setApellidoRegistro(
            e.target.value
          )
        }
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={emailRegistro}
        onChange={(e) =>
          setEmailRegistro(
            e.target.value
          )
        }
      />

      <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }}
>

  <input
    type={
      mostrarPasswordRegistro
        ? "text"
        : "password"
    }
    placeholder="Contraseña"
    value={passwordRegistro}
    onChange={(e) =>
      setPasswordRegistro(
        e.target.value
      )
    }
    style={{
      flex: 1,
    }}
  />

  <button
    type="button"
    onClick={() =>
      setMostrarPasswordRegistro(
        !mostrarPasswordRegistro
      )
    }
  >

    {mostrarPasswordRegistro
      ? "Mostrar"
      : "Ocultar"}

  </button>

  {passwordRegistro.length > 0 && (

  <div className="password-rules">

    <p>
      {registroTiene8
        ? "✅"
        : "⚪"}{" "}
      Mínimo 8 caracteres
    </p>

    <p>
      {registroTieneMayus
        ? "✅"
        : "⚪"}{" "}
      1 mayúscula
    </p>

    <p>
      {registroTieneNumero
        ? "✅"
        : "⚪"}{" "}
      1 número
    </p>

    <p>
      {registroTieneSimbolo
        ? "✅"
        : "⚪"}{" "}
      1 símbolo
    </p>

  </div>

)}

</div>
      {errorRegistro && (

        <p className="login-error">
          {errorRegistro}
        </p>

      )}

      <button
  className="login-submit"
  type="button"
  onClick={handleRegistro}
>
  Crear cuenta
</button>

    </div>

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