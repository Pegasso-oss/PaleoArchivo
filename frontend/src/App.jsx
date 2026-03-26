import React from "react";
// 1. Añadimos Link a los imports
import { Routes, Route, useLocation, Link } from "react-router-dom"; 
import { MesozoicoPage, JurasicoPage, PaleozoicoPage, CambricoPage, LandingPage, CenozoicoPage, PaleogenoPage, PaleocenoPage } from "./pages/pages.js";
import paleoLogo from "./assets/logo.png";

function App() {
  const location = useLocation();

  const getSubtitle = () => {
    switch (location.pathname) {
      case "/era/paleozoico": return "Paleozoico";
      case "/era/paleozoico/cambrico": return "Cámbrico";
      case "/era/mesozoico": return "Mesozoico";
      case "/era/mesozoico/jurasico": return "Jurásico";
      case "/era/cenozoico": return "Cenozoico";
      case "/era/cenozoico/paleogeno": return "Paleogeno";
      case "/era/cenozoico/paleogeno/paleoceno": return "Paleoceno";
      default: return "todo sobre el pasado, en tu mano";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1614] text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#1a1614]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          {/* 2. Envolvemos todo en un <Link to="/"> */}
          <Link 
            to="/" 
            className="flex flex-row items-center justify-start gap-6 w-fit group"
          >
            <img
              src={paleoLogo}
              alt="PaleoArchivo Logo"
              // 3. Añadimos efecto hover a la imagen (group-hover)
              className="h-16 md:h-20 w-auto shrink-0 group-hover:scale-105 transition-transform duration-300"
            />

            {/* TITULO */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white group-hover:text-amber-500 transition-colors duration-300">
                Paleo<span className="text-amber-600 group-hover:text-white transition-colors duration-300">Archivo</span>
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
          </Link>
          
        </div>
      </header>

      {/* Resto del código (Main, Routes, Footer) se queda igual... */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          {/* ... tus rutas ... */}
          <Route path="/era/paleozoico" element={<PaleozoicoPage/>}/>
          <Route path="/era/paleozoico/cambrico" element={<CambricoPage/>}/>
          <Route path="/era/mesozoico" element={<MesozoicoPage/>}/>
          <Route path="/era/mesozoico/jurasico" element={<JurasicoPage/>}/>
          <Route path="/era/cenozoico" element={<CenozoicoPage/>}/>
          <Route path="/era/cenozoico/paleogeno" element={<PaleogenoPage/>}/>
          <Route path="/era/cenozoico/paleogeno/paleoceno" element={<PaleocenoPage/>}/>
        </Routes>
      </main>

      <footer className="text-center text-slate-500 text-sm border-t border-slate-800 pt-10 pb-10">
        <p>&copy; 2026 PaleoArchivo Project - Tu Enciclopedia de la Prehistoria</p>
      </footer>
    </div>
  );
}

export default App;