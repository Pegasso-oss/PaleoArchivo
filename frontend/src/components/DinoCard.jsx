import React from "react";
import { Link } from "react-router-dom";

const DinoCard = ({ dino }) => {
  const dietStyles = {
    Carnívoro: "bg-red-900/40 text-red-300 border-red-500/50",
    Herbívoro: "bg-green-900/40 text-green-300 border-green-500/50",
    Omnívoro: "bg-amber-900/40 text-amber-300 border-amber-500/50",
    Insectívoro: "bg-orange-900/40 text-orange-300 border-orange-500/50",
    Piscívoro: "bg-cyan-900/40 text-cyan-300 border-cyan-500/50",
    Carroñero: "bg-purple-900/40 text-purple-300 border-purple-500/50",
    Filtrador: "bg-blue-900/40 text-blue-300 border-blue-500/50",
    Detritívoro: "bg-slate-700/40 text-slate-300 border-slate-500/50",
  };

  const colorDieta = dietStyles[dino.dieta] || "bg-stone-800 text-stone-400 border-stone-700";

  return (
    <Link to={`/animal/${dino.nombre.toLowerCase()}`} className="block">
      {/* EL ARREGLO DE LAS SOMBRAS:
          1. Quitamos cualquier clase 'shadow'.
          2. Usamos un solo borde base (#3f3833) muy sutil.
          3. En hover, el borde se ilumina suavemente.
      */}
      <div className="w-[380px] h-[550px] rounded-[2rem] bg-[#1a1816] overflow-hidden flex flex-col border border-[#3f3833] transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/40 hover:bg-[#1f1d1b] group shadow-none">
        
        {/* Imagen con separador */}
        <div className="h-52 w-full border-b border-[#3f3833] overflow-hidden relative">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={dino.imagen}
            alt={dino.nombre}
          />
          {/* Overlay sutil para integrar la imagen con el color de la tarjeta */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816] to-transparent opacity-60"></div>
        </div>

        {/* Contenido principal */}
        <div className="p-7 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1 gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black text-[#fef3c7] tracking-tighter uppercase italic leading-none group-hover:text-amber-500 transition-colors break-words">
                {dino.nombre}
              </h2>
              <span className="font-black text-amber-500 text-[13px] tracking-tighter uppercase italic leading-none group-hover:text-[#fef3c7] transition-colors break-words">
                "{dino.subName}" 
              </span>
            </div>

            <div className="text-center shrink-0 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
              <p className="text-[#b0a8a0] text-[7px] uppercase tracking-[0.2em] mb-0.5">ARCHIVO</p>
              <p className="text-sm font-bold text-amber-500 font-mono">
                #{String(dino.id).padStart(3, "0")}
              </p>
            </div>
          </div>

          <p className="text-stone-400 text-sm leading-relaxed line-clamp-4 mt-6 font-light">
            {dino.descripcion}
          </p>

          {/* SECCIÓN INFERIOR */}
          <div className="mt-auto">
            <div className="mb-5">
              <span className={`inline-block text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-lg border ${colorDieta} backdrop-blur-sm transition-colors`}>
                {dino.dieta}
              </span>
            </div>

            <div className="border-t border-[#3f3833] pt-5">
              <div className="flex justify-between items-center px-2">
                <div className="flex-1 text-center">
                  <span className="text-[#b0a8a0] text-[8px] uppercase tracking-[0.2em] mb-1.5 block opacity-60">Longitud</span>
                  <span className="text-sm font-bold text-white font-mono tracking-tight">{dino.longitud}</span>
                </div>
                <div className="w-px h-8 bg-[#3f3833]"></div>
                <div className="flex-1 text-center">
                  <span className="text-[#b0a8a0] text-[8px] uppercase tracking-[0.2em] mb-1.5 block opacity-60">Altura</span>
                  <span className="text-sm font-bold text-white font-mono tracking-tight">{dino.altura}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DinoCard;