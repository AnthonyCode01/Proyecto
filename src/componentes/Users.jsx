import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import cursosData from "../data/cursos.js";

function Users({
  usuario,
  setUsuario,
  carrito,
  setCarrito,
  favoritos,
}) {

  const navigate = useNavigate();

  const [tabActiva, setTabActiva] =
    useState("perfil");

  // ===== PERFIL =====

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [editando, setEditando] =
    useState(false);

  const [guardado, setGuardado] =
    useState(false);

  // ===== SEGURIDAD =====

  const [passActual, setPassActual] =
    useState("");

  const [passNueva, setPassNueva] =
    useState("");

  const [passConfirm, setPassConfirm] =
    useState("");

  const [msgSeguridad, setMsgSeguridad] =
    useState("");

  // ===== SINCRONIZA =====

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setApellido(usuario.apellido || "");
      setEmail(usuario.email || "");
      setTelefono(usuario.telefono || "");
    }
  }, [usuario]);

  // ===== SIN LOGIN =====

  if (!usuario) {
    return (
      <div className="simple-page">
        <h1>🔒 No has iniciado sesión</h1>
        <p>Debes iniciar sesión para ver tu cuenta</p>
        <button
          className="course-btn"
          onClick={() => navigate("/")}
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  // ===== DATOS =====

  const cursosComprados = carrito.filter(
    (item, index, self) =>
      index === self.findIndex(
        (c) => c.titulo === item.titulo
      )
  );

  const totalGastado = carrito.reduce(
    (acc, cur) => acc + cur.precio, 0
  );

  const cursosFavoritos = cursosData.filter(
    (c) => favoritos.includes(c.id)
  );

  const iniciales = (nombre + " " + apellido)
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "??";

  // ===== GUARDAR PERFIL =====

  const guardarCambios = () => {
    const actualizado = {
      ...usuario,
      nombre,
      apellido,
      email,
      telefono,
    };
    setUsuario(actualizado);
    localStorage.setItem(
      "usuario",
      JSON.stringify(actualizado)
    );
    setEditando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  // ===== CAMBIAR CONTRASEÑA =====

  const cambiarPassword = () => {
    if (!passActual || !passNueva || !passConfirm) {
      setMsgSeguridad("error:Completa todos los campos");
      return;
    }
    if (passActual !== usuario.password) {
      setMsgSeguridad("error:La contraseña actual es incorrecta");
      return;
    }
    if (passNueva !== passConfirm) {
      setMsgSeguridad("error:Las contraseñas no coinciden");
      return;
    }
    if (passNueva.length < 8) {
      setMsgSeguridad("error:Mínimo 8 caracteres");
      return;
    }
    const actualizado = { ...usuario, password: passNueva };
    setUsuario(actualizado);
    localStorage.setItem("usuario", JSON.stringify(actualizado));

    // Actualiza también en la lista de usuarios
    const usuarios = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );
    const idx = usuarios.findIndex(
      (u) => u.email === usuario.email
    );
    if (idx !== -1) {
      usuarios[idx].password = passNueva;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    setPassActual("");
    setPassNueva("");
    setPassConfirm("");
    setMsgSeguridad("ok:Contraseña actualizada correctamente");
    setTimeout(() => setMsgSeguridad(""), 3000);
  };

  // ===== QUITAR DEL CARRITO =====

  const quitarDelCarrito = (titulo) => {
    setCarrito(
      carrito.filter((c) => c.titulo !== titulo)
    );
  };

  // ===== LOGOUT =====

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setCarrito([]);
    navigate("/");
  };

  const fechaRegistro = new Date().toLocaleDateString(
    "es-PE",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="account-page">

      {/* ===== SIDEBAR ===== */}

      <aside className="account-sidebar">

        <div className="account-avatar-big">
          {usuario.foto ? (
            <img
              src={usuario.foto}
              alt="avatar"
              className="avatar-img"
            />
          ) : (
            <div className="avatar-circle-big">
              {iniciales}
            </div>
          )}
          <h2 className="account-sidebar-name">
            {nombre} {apellido}
          </h2>
          <p className="account-sidebar-email">
            {email}
          </p>
          <span className="account-badge">
            ✅ Cuenta activa
          </span>
        </div>

        <div className="account-quick-stats">
          <div className="qs-item">
            <span className="qs-num">
              {cursosComprados.length}
            </span>
            <span className="qs-label">Cursos</span>
          </div>
          <div className="qs-divider" />
          <div className="qs-item">
            <span className="qs-num">
              {favoritos.length}
            </span>
            <span className="qs-label">Favoritos</span>
          </div>
          <div className="qs-divider" />
          <div className="qs-item">
            <span className="qs-num">
              S/{totalGastado.toFixed(0)}
            </span>
            <span className="qs-label">Invertido</span>
          </div>
        </div>

        <nav className="account-nav">
          {[
            { id: "perfil",    icon: "👤", label: "Mi perfil" },
            { id: "cursos",    icon: "📚", label: "Mis cursos" },
            { id: "favoritos", icon: "❤️",  label: "Favoritos" },
            { id: "carrito",   icon: "🛒", label: "Carrito" },
            { id: "seguridad", icon: "🔒", label: "Seguridad" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={
                "account-nav-btn" +
                (tabActiva === tab.id ? " active" : "")
              }
              onClick={() => setTabActiva(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          className="account-logout-btn"
          onClick={cerrarSesion}
        >
          🚪 Cerrar sesión
        </button>

      </aside>

      {/* ===== CONTENIDO ===== */}

      <main className="account-main">

        {/* ===== PERFIL ===== */}

        {tabActiva === "perfil" && (
          <div className="account-section">

            <div className="account-section-header">
              <h2>👤 Mi perfil</h2>
              <p>Gestiona tu información personal</p>
            </div>

            {guardado && (
              <div className="account-alert success">
                ✅ Cambios guardados correctamente
              </div>
            )}

            <div className="account-form-grid">

              <div className="account-field">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  disabled={!editando}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="account-field">
                <label>Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  disabled={!editando}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Tu apellido"
                />
              </div>

              <div className="account-field">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  disabled={!editando}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="account-field">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  disabled={!editando}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+51 999 999 999"
                />
              </div>

              <div className="account-field">
                <label>Miembro desde</label>
                <input
                  type="text"
                  value={fechaRegistro}
                  disabled
                />
              </div>

            </div>

            <div className="account-form-actions">
              {!editando ? (
                <button
                  className="account-btn primary"
                  onClick={() => setEditando(true)}
                >
                  ✏️ Editar perfil
                </button>
              ) : (
                <>
                  <button
                    className="account-btn primary"
                    onClick={guardarCambios}
                  >
                    💾 Guardar cambios
                  </button>
                  <button
                    className="account-btn secondary"
                    onClick={() => setEditando(false)}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>

          </div>
        )}

        {/* ===== MIS CURSOS ===== */}

        {tabActiva === "cursos" && (
          <div className="account-section">

            <div className="account-section-header">
              <h2>📚 Mis cursos</h2>
              <p>Cursos que has adquirido</p>
            </div>

            {cursosComprados.length === 0 ? (

              <div className="account-empty">
                <span>📭</span>
                <h3>Aún no tienes cursos</h3>
                <p>Explora el catálogo y empieza a aprender</p>
                <button
                  className="account-btn primary"
                  onClick={() => navigate("/cursos")}
                >
                  Explorar cursos
                </button>
              </div>

            ) : (

              <div className="account-courses-list">

                {cursosComprados.map((curso, i) => (
                  <div className="account-course-item" key={i}>
                    <div className="aci-icon">📖</div>
                    <div className="aci-info">
                      <h3>{curso.titulo}</h3>
                      <span className="aci-cat">
                        {curso.categoria}
                      </span>
                    </div>
                    <div className="aci-right">
                      <span className="aci-price">
                        S/ {curso.precio}
                      </span>
                      <span className="aci-status">
                        ✅ Activo
                      </span>
                    </div>
                  </div>
                ))}

                <div className="account-total-box">
                  <span>Total invertido</span>
                  <strong>S/ {totalGastado.toFixed(2)}</strong>
                </div>

              </div>

            )}

          </div>
        )}

        {/* ===== FAVORITOS ===== */}

        {tabActiva === "favoritos" && (
          <div className="account-section">

            <div className="account-section-header">
              <h2>❤️ Favoritos</h2>
              <p>Cursos que marcaste como favoritos</p>
            </div>

            {cursosFavoritos.length === 0 ? (

              <div className="account-empty">
                <span>💔</span>
                <h3>No tienes favoritos aún</h3>
                <p>Marca cursos con el corazón para guardarlos aquí</p>
                <button
                  className="account-btn primary"
                  onClick={() => navigate("/cursos")}
                >
                  Ir a cursos
                </button>
              </div>

            ) : (

              <div className="account-fav-grid">
                {cursosFavoritos.map((curso) => (
                  <div className="account-fav-card" key={curso.id}>
                    <img src={curso.imagen} alt={curso.titulo} />
                    <div className="afc-info">
                      <h3>{curso.titulo}</h3>
                      <p>{curso.categoria} · {curso.nivel}</p>
                      <div className="afc-bottom">
                        <span>⭐ {curso.rating}</span>
                        <strong>S/ {curso.precio}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            )}

          </div>
        )}

        {/* ===== CARRITO ===== */}

        {tabActiva === "carrito" && (
          <div className="account-section">

            <div className="account-section-header">
              <h2>🛒 Mi carrito</h2>
              <p>Cursos pendientes de pago</p>
            </div>

            {carrito.length === 0 ? (

              <div className="account-empty">
                <span>🛒</span>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega cursos desde el catálogo</p>
                <button
                  className="account-btn primary"
                  onClick={() => navigate("/cursos")}
                >
                  Ver cursos
                </button>
              </div>

            ) : (

              <div className="account-cart-list">

                {carrito.map((curso, i) => (
                  <div className="account-cart-item" key={i}>
                    <div className="acart-info">
                      <h3>{curso.titulo}</h3>
                      <span>{curso.categoria}</span>
                    </div>
                    <div className="acart-right">
                      <strong>S/ {curso.precio}</strong>
                      <button
                        className="acart-remove"
                        onClick={() => quitarDelCarrito(curso.titulo)}
                        title="Quitar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                <div className="account-total-box">
                  <span>Total ({carrito.length} cursos)</span>
                  <strong>S/ {totalGastado.toFixed(2)}</strong>
                </div>

                <button className="account-btn primary checkout-btn">
                  💳 Proceder al pago
                </button>

              </div>

            )}

          </div>
        )}

        {/* ===== SEGURIDAD ===== */}

        {tabActiva === "seguridad" && (
          <div className="account-section">

            <div className="account-section-header">
              <h2>🔒 Seguridad</h2>
              <p>Gestiona tu contraseña y acceso</p>
            </div>

            {msgSeguridad && (
              <div className={
                "account-alert " +
                (msgSeguridad.startsWith("ok") ? "success" : "error")
              }>
                {msgSeguridad.startsWith("ok") ? "✅ " : "⚠️ "}
                {msgSeguridad.split(":")[1]}
              </div>
            )}

            <div className="account-security-box">

              <h3>Cambiar contraseña</h3>

              <div className="account-field">
                <label>Contraseña actual</label>
                <input
                  type="password"
                  value={passActual}
                  onChange={(e) => setPassActual(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="account-field">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  value={passNueva}
                  onChange={(e) => setPassNueva(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="account-field">
                <label>Confirmar nueva contraseña</label>
                <input
                  type="password"
                  value={passConfirm}
                  onChange={(e) => setPassConfirm(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button
                className="account-btn primary"
                onClick={cambiarPassword}
              >
                🔑 Actualizar contraseña
              </button>

            </div>

            <div className="account-danger-zone">
              <h3>⚠️ Zona de peligro</h3>
              <p>Al cerrar sesión perderás el acceso hasta volver a iniciar.</p>
              <button
                className="account-btn danger"
                onClick={cerrarSesion}
              >
                🚪 Cerrar sesión
              </button>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}

export default Users;
