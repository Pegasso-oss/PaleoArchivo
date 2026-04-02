import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  MesozoicoPage, JurasicoPage, PaleozoicoPage, CambricoPage,
  LandingPage, CenozoicoPage, PaleogenoPage, PaleocenoPage, DinoDetailPage,
  OrdovicicoPage,
} from "./pages/pages.js";

import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  const location = useLocation();
  
  // Determinamos si ocultar el Header (en Login y Register)
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-[#1d1914] text-white flex flex-col selection:bg-amber-500/30">
      
      {/* Solo renderizamos el Header si NO estamos en login/register */}
      {!hideHeader && <Header />}

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/era/paleozoico" element={<PaleozoicoPage />} />
          <Route path="/era/paleozoico/cambrico" element={<CambricoPage />} />
          <Route path="/era/paleozoico/ordovicico" element={<OrdovicicoPage />} />
          <Route path="/era/mesozoico" element={<MesozoicoPage />} />
          <Route path="/era/mesozoico/jurasico" element={<JurasicoPage />} />
          <Route path="/era/cenozoico" element={<CenozoicoPage />} />
          <Route path="/era/cenozoico/paleogeno" element={<PaleogenoPage />} />
          <Route path="/era/cenozoico/paleogeno/paleoceno" element={<PaleocenoPage />}/>
          <Route path="/animal/:id" element={<DinoDetailPage />} />
        </Routes>
      </main>

      {/* Footer condicional: usualmente también se oculta en auth pages para evitar distracciones */}
      {!hideHeader && (
        <footer className="bg-[#0d0a09] text-stone-500 text-[10px] border-t border-white/5 py-10 opacity-60 font-mono tracking-[0.3em] uppercase">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2026 PaleoArchivo Project — Registros Digitales de la Biosfera</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;