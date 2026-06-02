import { createContext, useContext, useState } from "react";
import cursosIniciales from "../data/cursos.js";

// ===== CREDENCIALES ADMIN =====
// Cambia estos valores si quieres otro usuario/contraseña
const ADMIN_USER = "admin@zipxstore.com";
const ADMIN_PASS = "Admin123";

// ===== PUBLICACIONES INICIALES =====
const publicacionesIniciales = [
  {
    id: 1,
    titulo: "¡Nuevos cursos de Power BI disponibles!",
    descripcion: "Aprende a crear dashboards profesionales desde cero con nuestro nuevo curso de Power BI.",
    fecha: "2025-06-01",
    activo: true,
  },
  {
    id: 2,
    titulo: "Descuentos de temporada",
    descripcion: "Aprovecha los descuentos de hasta 50% en todos los cursos de Ofimática este mes.",
    fecha: "2025-05-28",
    activo: true,
  },
];

// ===== OFERTAS INICIALES =====
const ofertasIniciales = [
  {
    id: "pack-excel",
    titulo: "Pack Excel Profesional",
    descripcion: "Excel básico, intermedio y avanzado",
    precioOriginal: 180,
    precioOferta: 89,
    descuento: 50,
    categoria: "Ofimática",
    imagen: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
    activo: true,
  },
  {
    id: "pack-diseno",
    titulo: "Pack Diseño Creativo",
    descripcion: "Canva + herramientas de diseño",
    precioOriginal: 220,
    precioOferta: 109,
    descuento: 40,
    categoria: "Diseño",
    imagen: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    activo: true,
  },
];

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // ===== SESIÓN ADMIN =====
  const [adminLogueado, setAdminLogueado] = useState(() => {
    return localStorage.getItem("adminSesion") === "true";
  });

  const loginAdmin = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("adminSesion", "true");
      setAdminLogueado(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminSesion");
    setAdminLogueado(false);
  };

  // ===== CURSOS =====
  const [cursos, setCursos] = useState(() => {
    try {
      const guardados = localStorage.getItem("adminCursos");
      return guardados ? JSON.parse(guardados) : cursosIniciales;
    } catch {
      return cursosIniciales;
    }
  });

  const guardarCursos = (nuevosCursos) => {
    setCursos(nuevosCursos);
    localStorage.setItem("adminCursos", JSON.stringify(nuevosCursos));
  };

  const agregarCurso = (curso) => {
    const nuevoCurso = { ...curso, id: Date.now() };
    const lista = [...cursos, nuevoCurso];
    guardarCursos(lista);
  };

  const editarCurso = (id, datos) => {
    const lista = cursos.map((c) => (c.id === id ? { ...c, ...datos } : c));
    guardarCursos(lista);
  };

  const eliminarCurso = (id) => {
    const lista = cursos.filter((c) => c.id !== id);
    guardarCursos(lista);
  };

  // ===== PUBLICACIONES =====
  const [publicaciones, setPublicaciones] = useState(() => {
    try {
      const guardadas = localStorage.getItem("adminPublicaciones");
      return guardadas ? JSON.parse(guardadas) : publicacionesIniciales;
    } catch {
      return publicacionesIniciales;
    }
  });

  const guardarPublicaciones = (nuevas) => {
    setPublicaciones(nuevas);
    localStorage.setItem("adminPublicaciones", JSON.stringify(nuevas));
  };

  const agregarPublicacion = (pub) => {
    const nueva = { ...pub, id: Date.now() };
    guardarPublicaciones([...publicaciones, nueva]);
  };

  const editarPublicacion = (id, datos) => {
    const lista = publicaciones.map((p) => (p.id === id ? { ...p, ...datos } : p));
    guardarPublicaciones(lista);
  };

  const eliminarPublicacion = (id) => {
    guardarPublicaciones(publicaciones.filter((p) => p.id !== id));
  };

  // ===== OFERTAS =====
  const [ofertas, setOfertas] = useState(() => {
    try {
      const guardadas = localStorage.getItem("adminOfertas");
      return guardadas ? JSON.parse(guardadas) : ofertasIniciales;
    } catch {
      return ofertasIniciales;
    }
  });

  const guardarOfertas = (nuevas) => {
    setOfertas(nuevas);
    localStorage.setItem("adminOfertas", JSON.stringify(nuevas));
  };

  const agregarOferta = (oferta) => {
    const nueva = { ...oferta, id: `oferta-${Date.now()}` };
    guardarOfertas([...ofertas, nueva]);
  };

  const editarOferta = (id, datos) => {
    const lista = ofertas.map((o) => (o.id === id ? { ...o, ...datos } : o));
    guardarOfertas(lista);
  };

  const eliminarOferta = (id) => {
    guardarOfertas(ofertas.filter((o) => o.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        adminLogueado,
        loginAdmin,
        logoutAdmin,
        cursos,
        agregarCurso,
        editarCurso,
        eliminarCurso,
        publicaciones,
        agregarPublicacion,
        editarPublicacion,
        eliminarPublicacion,
        ofertas,
        agregarOferta,
        editarOferta,
        eliminarOferta,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
