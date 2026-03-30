import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Importamos useLocation
import {
  MesozoicoPage, JurasicoPage, PaleozoicoPage, CambricoPage,
  LandingPage, CenozoicoPage, PaleogenoPage, PaleocenoPage, DinoDetailPage,
} from "./pages/pages.js";

import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  // Hook para saber en qué página estamos
  const location = useLocation();
  
  // Comprobamos si la ruta actual es login o registro
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-[#1d1914] text-white flex flex-col">
      <Header />
      <main className={`flex-grow`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/era/paleozoico" element={<PaleozoicoPage />} />
          <Route path="/era/paleozoico/cambrico" element={<CambricoPage />} />
          <Route path="/era/mesozoico" element={<MesozoicoPage />} />
          <Route path="/era/mesozoico/jurasico" element={<JurasicoPage />} />
          <Route path="/era/cenozoico" element={<CenozoicoPage />} />
          <Route path="/era/cenozoico/paleogeno" element={<PaleogenoPage />} />
          <Route path="/era/cenozoico/paleogeno/paleoceno" element={<PaleocenoPage />}/>
          <Route path="/animal/:id" element={<DinoDetailPage />} />
        </Routes>
      </main>

      <footer className="bg-[#0d0a09] text-stone-500 text-xs border-t border-white/5 py-12 opacity-80 font-mono tracking-widest uppercase">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <p>&copy; 2026 PaleoArchivo Project</p>
  </div>
</footer>
    </div>
  );
}

export default App;