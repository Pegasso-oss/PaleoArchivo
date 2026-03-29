import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MesozoicoPage, JurasicoPage, PaleozoicoPage, CambricoPage,
  LandingPage, CenozoicoPage, PaleogenoPage, PaleocenoPage, DinoDetailPage,
} from "./pages/pages.js";

import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[#1d1914] text-white flex flex-col">
      <Header />
      <main className="flex-grow">
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
      <footer className="text-center text-slate-500 text-xs border-t border-slate-800 py-10 opacity-50 font-mono tracking-widest uppercase">
        <p>&copy; 2026 PaleoArchivo Project</p>
      </footer>
    </div>
  );
}

export default App;