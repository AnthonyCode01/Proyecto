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
import Carrito from "./componentes/Carrito.jsx";
import Users from "./componentes/Users.jsx";
import cursosData from "./data/cursos.js";

function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");
  const [precioMax, setPrecioMax] = useState(100);

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // Carrito con persistencia
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

  useEffect(() => {
    if (!usuario) {
      setCarrito([]);
      localStorage.removeItem("carrito");
    }
  }, [usuario]);

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const agregarCarrito = (curso) => {
    if (!usuario) {
      document.querySelector(".login-btn")?.click();
      return;
    }
    const yaEsta = carrito.some(
      (item) => (curso.id && item.id === curso.id) || item.titulo === curso.titulo
    );
    if (yaEsta) {
      alert(`"${curso.titulo}" ya está en tu carrito.`);
      return;
    }
    setCarrito((prev) => [...prev, curso]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cursosFiltrados = cursosData.filter((curso) => {
    const coincideBusqueda = curso.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "Todos" || curso.categoria === categoria;
    const coincideNivel = nivel === "Todos" || curso.nivel === nivel;
    const coincidePrecio = curso.precio <= precioMax;
    return coincideBusqueda && coincideCategoria && coincideNivel && coincidePrecio;
  });

  return (
    <BrowserRouter>
      <div className="app">

        <Navbar
          carrito={carrito}
          setBusqueda={setBusqueda}
          usuario={usuario}
          setUsuario={setUsuario}
          logout={logout}
          eliminarDelCarrito={eliminarDelCarrito}
          vaciarCarrito={vaciarCarrito}
        />

        <Routes>

          <Route path="/" element={<Home setCategoria={setCategoria} agregarCarrito={agregarCarrito} />} />

          <Route
            path="/cursos"
            element={
              <div className="container">
                <Sidebar busqueda={busqueda} setBusqueda={setBusqueda} categoria={categoria} setCategoria={setCategoria} nivel={nivel} setNivel={setNivel} precioMax={precioMax} setPrecioMax={setPrecioMax} />
                <main className="main-content">
                  <div className="top-info">
                    <h1>Cursos disponibles</h1>
                    <p>Mostrando {cursosFiltrados.length} cursos</p>
                  </div>
                  <div className="courses-grid">
                    {cursosFiltrados.length > 0 ? (
                      cursosFiltrados.map((curso) => (
                        <CourseCard key={curso.id} curso={curso} favoritos={favoritos} toggleFavorito={toggleFavorito} agregarCarrito={agregarCarrito} setCursoSeleccionado={setCursoSeleccionado} carrito={carrito} />
                      ))
                    ) : (
                      <div className="empty-state"><h2>No se encontraron cursos</h2></div>
                    )}
                  </div>
                </main>
              </div>
            }
          />

          <Route path="/categorias" element={<Category setCategoria={setCategoria} />} />

          <Route path="/detalle" element={<ProductDetail curso={cursoSeleccionado} agregarCarrito={agregarCarrito} usuario={usuario} carrito={carrito} />} />

          {/* ===== RUTA CARRITO ===== */}
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} usuario={usuario} eliminarDelCarrito={eliminarDelCarrito} vaciarCarrito={vaciarCarrito} />} />

          <Route
            path="/ofertas"
            element={
              <section className="offers-page">
                <div className="offers-header">
                  <h1>🔥 Ofertas Especiales</h1>
                  <p>Descuentos exclusivos por tiempo limitado</p>
                </div>
                <div className="offers-grid">
                  <div className="offer-card">
                    <span className="badge">-50%</span>
                    <h2>Pack Excel Profesional</h2>
                    <p>Excel básico, intermedio y avanzado</p>
                    <div className="price-box">
                      <span className="old-price">S/ 180</span>
                      <span className="new-price">S/ 89</span>
                    </div>
                    <button className="offer-btn" onClick={() => agregarCarrito({ titulo: "Pack Excel Profesional", precio: 89, categoria: "Ofimática" })}>Comprar ahora</button>
                  </div>
                  <div className="offer-card">
                    <span className="badge">-40%</span>
                    <h2>Pack Diseño Creativo</h2>
                    <p>Canva + herramientas de diseño</p>
                    <div className="price-box">
                      <span className="old-price">S/ 220</span>
                      <span className="new-price">S/ 109</span>
                    </div>
                    <button className="offer-btn" onClick={() => agregarCarrito({ titulo: "Pack Diseño Creativo", precio: 109, categoria: "Diseño" })}>Comprar ahora</button>
                  </div>
                </div>
                <div className="offers-banner">⚡ Solo por esta semana - cupos limitados</div>
              </section>
            }
          />

          <Route path="/users" element={<Users usuario={usuario} setUsuario={setUsuario} carrito={carrito} setCarrito={setCarrito} favoritos={favoritos} />} />

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

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;