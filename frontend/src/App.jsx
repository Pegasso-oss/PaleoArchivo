import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MesozoicoPage, JurasicoPage, PaleozoicoPage, CambricoPage, LandingPage } from "./pages/pages.js";
import paleoLogo from "./assets/logo.png";

function App() {
  const location = useLocation();

  const getSubtitle = () => {
    switch (location.pathname) {

      case "/era/paleozoico":
        return "Paleozoico";
      case "/era/paleozoico/cambrico":
        return "Cámbrico";

      case "/era/mesozoico":
        return "Mesozoico";
      case "/era/mesozoico/jurasico":
        return "Jurásico";

      case "/era/cenozoico":
        return "Cenozoico";
      default:
        return "todo sobre el pasado, en tu mano";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1614] text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#1a1614]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-row items-center justify-start gap-6">
          <img
            src={paleoLogo}
            alt="PaleoArchivo Logo"
            className="h-16 md:h-20 w-auto shrink-0"
          />

          {/* TITULO */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">
              Paleo<span className="text-amber-600">Archivo</span>
            </h1>

            {/* Las rayitas y el subtitle */}
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px w-8 bg-amber-500/40"></div>
              <span className="text-white text-[10px] md:text-xs font-light tracking-[0.3em] uppercase opacity-90 transition-all duration-300">
                {getSubtitle()}
              </span>
              <div className="h-px w-8 bg-amber-500/40"></div>
            </div>
            
          </div>
        </div>
      </header>

      {/* Rutas */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>

          {/*Paleozoico*/}
          <Route path="/era/paleozoico" element={<PaleozoicoPage/>}/>
          <Route path="/era/paleozoico/cambrico" element={<CambricoPage/>}/>

          {/*Mesozoico*/}
          <Route path="/era/mesozoico" element={<MesozoicoPage/>}/>
          <Route path="/era/mesozoico/jurasico" element={<JurasicoPage/>}/>
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-slate-500 text-sm border-t border-slate-800 pt-10 pb-10">
        <p>&copy; 2026 PaleoArchivo Project - Tu Enciclopedia de la Prehistoria</p>
      </footer>
    </div>
  );
}

export default App;