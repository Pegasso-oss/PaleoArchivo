import { dinosaurios } from "./data/jurasico";
import DinoCard from "./components/DinoCard";
import paleoLogo from "./assets/logo.png";

function App() {
  return (
  <div className="min-h-screen bg-[#1a1614] text-white p-6 md:p-10">
      {/* Header Compacto y Minimalista */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-row items-center justify-start gap-6 border-b border-slate-800 pb-6">
        {/* Logo */}
        <img
          src={paleoLogo}
          alt="PaleoArchivo Logo"
          className="h-16 md:h-26 w-auto shrink-0"
        />

        {/* Texto del Título */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-black text-amber-500 tracking-tighter uppercase leading-none">
            PaleoArchivo
          </h1>

          {/* Subtítulo con las líneas que querías */}
          <div className="flex items-center gap-3 mt-2">
            {/* Línea Izquierda */}
            <div className="h-px w-8 bg-amber-500/40"></div>

            <span className="text-white text-sm md:text-base font-light tracking-[0.3em] uppercase opacity-90">
              Jurásico
            </span>

            {/* Línea Derecha */}
            <div className="h-px w-8 bg-amber-500/40"></div>
          </div>
        </div>
      </header>

      {/* Grid de Dinosaurios */}
      <main className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
        {dinosaurios.map((dino) => (
          <DinoCard key={dino.id} dino={dino} />
        ))}
      </main>

      <footer className="mt-20 text-center text-slate-500 text-sm border-t border-slate-800 pt-10 pb-5">
        <p>
          &copy; 2026 PaleoArchivo Project - Tu Enciclopedia de la Prehistoria
        </p>
      </footer>
    </div>
  );
}

export default App;
