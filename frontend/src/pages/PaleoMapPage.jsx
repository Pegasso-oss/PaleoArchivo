// src/pages/PaleoMapPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUser } from "../context/useUser";
import PaleoMap from "../components/PaleoMap";

export default function PaleoMapPage() {
  const navigate = useNavigate();
  const { theme } = useUser();
  const isLight = theme === "light";

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${isLight ? "bg-[#f5f2ed]" : "bg-[#0c0b0a]"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 pb-20">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          <ArrowLeft size={13} /> Volver
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[3px] bg-amber-600" />
            <span className={`text-[10px] uppercase tracking-[0.2em] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
              PaleoArchivo · Paleogeografía
            </span>
          </div>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase italic leading-none mb-3 ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
            La Tierra <span className="text-amber-600">Prehistórica</span>
          </h1>
          <p className={`text-[11px] font-mono leading-relaxed max-w-xl ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>
            Todos los animales del archivo sobre el mapa global. Usa las tarjetas de era para filtrar qué especies se muestran. Haz clic en un punto para ver la ficha del animal.
          </p>
        </div>

        {/* Mapa */}
        <PaleoMap />

      </div>
    </div>
  );
}