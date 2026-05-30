import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function Users({
  usuario,
  setUsuario,
  carrito,
  setCarrito,
  favoritos,
}) {

  const navigate =
    useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [editando, setEditando] =
    useState(false);

  // ===== SINCRONIZA =====

  useEffect(() => {

    if (usuario) {

      setNombre(
        usuario.nombre || ""
      );

      setEmail(
        usuario.email || ""
      );

      setEditando(false);

    }

  }, [usuario]);

  // ===== SIN LOGIN =====

  if (!usuario) {

    return (

      <div className="simple-page">

        <h1>
          🔒 No has iniciado sesión
        </h1>

        <p>
          Debes iniciar sesión
          para ver tu cuenta
        </p>

        <button
          className="course-btn"
          onClick={() =>
            navigate("/")
          }
        >

          Ir al inicio

        </button>

      </div>

    );

  }

  // ===== GUARDAR =====

  const guardarCambios = () => {

    setUsuario({

      ...usuario,

      nombre,

      email,

    });

    setEditando(false);

  };

  // ===== LOGOUT =====

  const cerrarSesion = () => {

    setUsuario(null);

    setCarrito([]);

    navigate("/");

  };

  return (

    <div className="user-page">

      <div className="user-card">

        {/* BOTÓN CERRAR */}

        <button
          className="close-btn"
          onClick={() =>
            navigate("/")
          }
        >

          ✕

        </button>

        <h1 className="user-title">

          👤 Mi cuenta

        </h1>

        <div className="user-info">

          <label>
            Nombre
          </label>

          <input
            type="text"
            value={nombre}
            disabled={!editando}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
          />

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            disabled={!editando}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div className="user-stats">

            <p>

              🛒 Carrito:{" "}

              <b>
                {carrito.length}
              </b>

            </p>

            <p>

              ⭐ Favoritos:{" "}

              <b>
                {favoritos.length}
              </b>

            </p>

          </div>

        </div>

        <div className="user-buttons">

          {!editando ? (

            <button
              className="course-btn"
              onClick={() =>
                setEditando(true)
              }
            >

              Editar perfil

            </button>

          ) : (

            <button
              className="course-btn"
              onClick={
                guardarCambios
              }
            >

              Guardar cambios

            </button>

          )}

          <button
            className="logout-btn"
            onClick={
              cerrarSesion
            }
          >

            Cerrar sesión

          </button>

        </div>

      </div>

    </div>

  );
}

export default Users;