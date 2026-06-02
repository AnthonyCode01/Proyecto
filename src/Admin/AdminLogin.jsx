import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    setTimeout(() => {
      const ok = loginAdmin(usuario.trim(), password);
      if (ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
      setCargando(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* LOGO / HEADER */}
        <div className="admin-login-header">
          <div className="admin-shield">🛡️</div>
          <h1>Panel Administrativo</h1>
          <p>Acceso restringido — solo personal autorizado</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-field">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-field">
            <label>Contraseña</label>
            <div className="admin-pass-wrap">
              <input
                type={mostrarPass ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-pass-toggle"
                onClick={() => setMostrarPass(!mostrarPass)}
              >
                {mostrarPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={cargando}
          >
            {cargando ? "Verificando..." : "Ingresar al panel"}
          </button>
        </form>

        <p className="admin-back-link">
          <a href="/">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
