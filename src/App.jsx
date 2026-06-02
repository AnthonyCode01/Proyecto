import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";

import Navbar from "./componentes/Navbar.jsx";
import Home from "./componentes/Home.jsx";
import Sidebar from "./componentes/Sidebar.jsx";
import CourseCard from "./componentes/CourseCard.jsx";
import Footer from "./componentes/Footer.jsx";
import Category from "./componentes/Category.jsx";
import ProductDetail from "./componentes/ProductDetail.jsx";
import Users from "./componentes/Users.jsx";
import Carrito from "./componentes/Carrito.jsx";
import cursosData from "./data/cursos.js";

// ===== ADMIN =====
import { AdminProvider, useAdmin } from "./Context/AdminContext.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminGuard from "./Admin/AdminGuard.jsx";
import "./Admin/admin.css";

// ===== RUTAS ADMIN (necesitan el contexto adentro) =====
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }
      />
    </Routes>
  );
}

// ===== DETECTAR SI ESTAMOS EN RUTA ADMIN =====
function AppContent() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  // ===== SCROLL =====
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ===== FILTROS =====
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");
  const [precioMax, setPrecioMax] = useState(100);

  // ===== USUARIO =====
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // ===== CARRITO — persiste en localStorage =====
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem("carrito");
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // ===== CURSO =====
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  // ===== FAVORITOS =====
  const [favoritos, setFavoritos] = useState([]);

  // ===== TOGGLE FAVORITO =====
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((fav) => fav !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    setUsuario(null);
    setCarrito([]);
  };

  // ===== AGREGAR AL CARRITO =====
  const agregarCarrito = (curso) => {
    if (!usuario) {
      document.querySelector(".login-btn")?.click();
      return;
    }
    const yaEsta = carrito.some((c) => c.id === curso.id);
    if (yaEsta) {
      alert("Este curso ya está en tu carrito.");
      return;
    }
    setCarrito([...carrito, curso]);
  };

  // ===== CURSOS DESDE ADMIN CONTEXT =====
  const { cursos: cursosAdmin, ofertas } = useAdmin();
  const cursosActivos = cursosAdmin.length > 0 ? cursosAdmin : cursosData;

  // ===== FILTROS =====
  const cursosFiltrados = cursosActivos.filter((curso) => {
    const coincideBusqueda = curso.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "Todos" || curso.categoria === categoria;
    const coincideNivel = nivel === "Todos" || curso.nivel === nivel;
    const coincidePrecio = curso.precio <= precioMax;
    return (
      coincideBusqueda && coincideCategoria && coincideNivel && coincidePrecio
    );
  });

  // Si estamos en /admin, renderizamos solo las rutas admin (sin navbar/footer)
  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <div className="app">
      {/* ===== NAVBAR ===== */}
      <Navbar
        carrito={carrito}
        setBusqueda={setBusqueda}
        usuario={usuario}
        setUsuario={setUsuario}
        logout={logout}
      />

      {/* ===== RUTAS ===== */}
      <Routes>

        {/* ===== HOME ===== */}
        <Route
          path="/"
          element={
            <Home
              setCategoria={setCategoria}
              agregarCarrito={agregarCarrito}
            />
          }
        />

        {/* ===== CURSOS ===== */}
        <Route
          path="/cursos"
          element={
            <div className="container">
              <Sidebar
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                categoria={categoria}
                setCategoria={setCategoria}
                nivel={nivel}
                setNivel={setNivel}
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
              />
              <main className="main-content">
                <div className="top-info">
                  <h1>Cursos disponibles</h1>
                  <p>Mostrando {cursosFiltrados.length} cursos</p>
                </div>
                <div className="courses-grid">
                  {cursosFiltrados.length > 0 ? (
                    cursosFiltrados.map((curso) => (
                      <CourseCard
                        key={curso.id}
                        curso={curso}
                        favoritos={favoritos}
                        toggleFavorito={toggleFavorito}
                        agregarCarrito={agregarCarrito}
                        setCursoSeleccionado={setCursoSeleccionado}
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <h2>No se encontraron cursos</h2>
                    </div>
                  )}
                </div>
              </main>
            </div>
          }
        />

        {/* ===== CATEGORIAS ===== */}
        <Route
          path="/categorias"
          element={<Category setCategoria={setCategoria} />}
        />

        {/* ===== DETALLE ===== */}
        <Route
          path="/detalle"
          element={
            <ProductDetail
              curso={cursoSeleccionado}
              agregarCarrito={agregarCarrito}
              usuario={usuario}
            />
          }
        />

        {/* ===== CARRITO ===== */}
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              setCarrito={setCarrito}
              usuario={usuario}
            />
          }
        />

        {/* ===== OFERTAS ===== */}
        <Route
          path="/ofertas"
          element={
            <section className="offers-page">
              <div className="offers-header">
                <h1>🔥 Ofertas Especiales</h1>
                <p>Descuentos exclusivos por tiempo limitado</p>
              </div>
              <div className="offers-grid">
                {ofertas
                  .filter((o) => o.activo)
                  .map((o) => (
                    <div key={o.id} className="offer-card">
                      <span className="badge">-{o.descuento}%</span>
                      <h2>{o.titulo}</h2>
                      <p>{o.descripcion}</p>
                      <div className="price-box">
                        <span className="old-price">S/ {o.precioOriginal}</span>
                        <span className="new-price">S/ {o.precioOferta}</span>
                      </div>
                      <button
                        className="offer-btn"
                        onClick={() =>
                          agregarCarrito({
                            id: o.id,
                            titulo: o.titulo,
                            precio: o.precioOferta,
                            categoria: o.categoria,
                            imagen: o.imagen,
                          })
                        }
                      >
                        Comprar ahora
                      </button>
                    </div>
                  ))}
              </div>
              <div className="offers-banner">
                ⚡ Solo por esta semana - cupos limitados
              </div>
            </section>
          }
        />

        {/* ===== USERS ===== */}
        <Route
          path="/users"
          element={
            <Users
              usuario={usuario}
              setUsuario={setUsuario}
              carrito={carrito}
              setCarrito={setCarrito}
              favoritos={favoritos}
            />
          }
        />

        {/* ===== CONTACTO ===== */}
        <Route
          path="/contacto"
          element={
            <section className="simple-page">
              <h1>Contacto</h1>
              <div className="contact-box">
                <input type="text" placeholder="Nombre" />
                <input type="email" placeholder="Correo" />
                <textarea placeholder="Mensaje" rows="6"></textarea>
                <button className="course-btn">Enviar mensaje</button>
              </div>
            </section>
          }
        />

        {/* ===== REDIRECT ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
