import { useState } from "react";

function Cuenta({ usuario, setUsuario }) {
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const [email, setEmail] = useState(usuario?.email || "");

  const guardarCambios = () => {
    setUsuario({
      ...usuario,
      nombre,
      email,
    });

    alert("Datos actualizados");
  };

  return (
    <div className="account-page">

      <h1>Mi cuenta</h1>

      <div className="account-card">

        <div className="account-avatar">
          {email.charAt(0).toUpperCase()}
        </div>

        <label>Nombre</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
        />

        <div className="account-info">
          <p><b>Estado:</b> Activo</p>
          <p><b>Rol:</b> Cliente</p>
        </div>

        <button className="course-btn" onClick={guardarCambios}>
          Guardar cambios
        </button>

      </div>

    </div>
  );
}

export default Cuenta;