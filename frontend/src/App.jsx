import React, { useEffect, useState } from "react"; // Añadimos useState
import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/useUser";
import {
  MesozoicoPage,
  JurasicoPage,
  TriasicoPage,
  CretacicoPage,
  PaleozoicoPage,
  CambricoPage,
  LandingPage,
  CenozoicoPage,
  PaleogenoPage,
  PaleocenoPage,
  DinoDetailPage,
  OrdovicicoPage,
  FavoritesPage,
} from "./pages/pages.js";

import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Toast from "./components/Toast.jsx"; // Importamos tu componente Toast

function App() {
  const location = useLocation();
  const { theme } = useUser();
  const isLight = theme === "light";

  // ESTADO GLOBAL DEL TOAST
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Función para disparar el toast desde cualquier parte si fuera necesario
  // Aunque normalmente lo dispararás desde los componentes hijos mediante contexto o props
  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? "#f8f6f2" : "#1d1914";
    document.body.style.transition = "background-color 0.4s ease";
  }, [isLight]);

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-amber-500/30 transition-all duration-500 ${
        isLight
          ? "light-theme bg-[#f8f6f2] text-stone-900"
          : "bg-[#1d1914] text-white"
      }`}
    >
      {!hideHeader && <Header />}

      <div style={{ position: "relative", zIndex: 99999 }}>
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:username/favorites" element={<FavoritesPage />} />
          
          <Route path="/era/paleozoico" element={<PaleozoicoPage />} />
          <Route path="/era/paleozoico/cambrico" element={<CambricoPage />} />
          <Route
            path="/era/paleozoico/ordovicico"
            element={<OrdovicicoPage />}
          />
          <Route path="/era/mesozoico" element={<MesozoicoPage />} />
          <Route path="/era/mesozoico/triasico" element={<TriasicoPage />} />
          <Route path="/era/mesozoico/jurasico" element={<JurasicoPage />} />
          <Route path="/era/mesozoico/cretacico" element={<CretacicoPage />} />

          <Route path="/era/cenozoico" element={<CenozoicoPage />} />
          <Route path="/era/cenozoico/paleogeno" element={<PaleogenoPage />} />
          <Route
            path="/era/cenozoico/paleogeno/paleoceno"
            element={<PaleocenoPage />}
          />
          <Route path="/animal/:id" element={<DinoDetailPage />} />
        </Routes>
      </main>

      {!hideHeader && (
        <footer
          className={`py-10 font-mono tracking-[0.3em] uppercase text-[10px] transition-colors duration-500 ${
            isLight
              ? "bg-[#e5e2dd] text-stone-500 border-t border-black/5"
              : "bg-[#0d0a09] text-stone-500 border-t border-white/5 opacity-60"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>
              &copy; 2026 PaleoArchivo Project — Registros Digitales de la
              Biosfera
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
