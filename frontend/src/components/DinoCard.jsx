import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; 
import { useFavorites } from "../context/FavoritesContext"; 

const DinoCard = ({ dino }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(dino.id);

  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const dietStyles = {
    Carnívoro: isLight ? "bg-red-100 text-red-700 border-red-200" : "bg-red-900/40 text-red-300 border-red-500/50",
    Herbívoro: isLight ? "bg-green-100 text-green-700 border-green-200" : "bg-green-900/40 text-green-300 border-green-500/50",
    Omnívoro: isLight ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-amber-900/40 text-amber-300 border-amber-500/50",
    Insectívoro: isLight ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-orange-900/40 text-orange-300 border-orange-500/50",
    Piscívoro: isLight ? "bg-cyan-100 text-cyan-700 border-cyan-200" : "bg-cyan-900/40 text-cyan-300 border-cyan-500/50",
    Carroñero: isLight ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-purple-900/40 text-purple-300 border-purple-500/50",
    Filtrador: isLight ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-blue-900/40 text-blue-300 border-blue-500/50",
    Detritívoro: isLight ? "bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-700/40 text-slate-300 border-slate-500/50",
  };

  const colorDieta = dietStyles[dino.dieta] || "bg-stone-800 text-stone-400 border-stone-700";

  return (
    <div className="relative group mx-auto w-full max-w-[380px]">
      {/* BOTÓN DE FAVORITO */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Evita que el click active el Link inferior
          toggleFavorite(dino.id);
        }}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 active:scale-90 border ${
          isLight 
            ? 'bg-white/70 border-stone-200 text-stone-400 hover:bg-white' 
            : 'bg-black/40 border-white/10 text-stone-500 hover:bg-black/60'
        }`}
      >
        <Star 
          size={18} 
          fill={isFav ? "#facc15" : "none"} 
          stroke={isFav ? "#facc15" : "currentColor"} 
          className={`transition-colors duration-300 ${isFav ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : ''}`}
        />
      </button>

      <Link to={`/animal/${dino.nombre.toLowerCase()}`} className="block">
        <div className={`w-full h-[550px] rounded-[2rem] overflow-hidden flex flex-col border transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/40 shadow-none ${
          isLight ? 'bg-white border-stone-200 hover:bg-stone-50' : 'bg-[#1a1816] border-[#3f3833] hover:bg-[#1f1d1b]'
        }`}>
          
          <div className={`h-52 w-full border-b overflow-hidden relative ${isLight ? 'border-stone-200' : 'border-[#3f3833]'}`}>
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={dino.imagen}
              alt={dino.nombre}
            />
            <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-60 ${isLight ? 'from-white' : 'from-[#1a1816]'}`}></div>
          </div>

          <div className="p-7 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1 gap-2">
              <div className="flex-1 min-w-0">
                <h2 className={`text-xl font-black tracking-tighter uppercase italic leading-none group-hover:text-amber-500 transition-colors break-words ${isLight ? 'text-stone-900' : 'text-[#fef3c7]'}`}>
                  {dino.nombre}
                </h2>
                <span className={`font-bold text-amber-500 text-[13px] tracking-tighter uppercase leading-none transition-colors break-words ${isLight ? 'group-hover:text-stone-700' : 'group-hover:text-[#fef3c7]'}`}>
                  "{dino.subName}" 
                </span>
              </div>

              <div className={`text-center shrink-0 px-3 py-2 rounded-xl border ${isLight ? 'bg-stone-100 border-stone-200' : 'bg-black/40 border-white/5'}`}>
                <p className="text-[#b0a8a0] text-[7px] uppercase tracking-[0.2em] mb-0.5">ID</p>
                <p className="text-sm font-bold text-amber-500 font-mono">
                  #{String(dino.id).padStart(3, "0")}
                </p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed line-clamp-4 mt-6 font-light transition-colors ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
              {dino.descripcion}
            </p>

            <div className="mt-auto">
              <div className="mb-5">
                <span className={`inline-block text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-lg border backdrop-blur-sm transition-all ${colorDieta}`}>
                  {dino.dieta}
                </span>
              </div>

              <div className={`border-t pt-5 ${isLight ? 'border-stone-200' : 'border-[#3f3833]'}`}>
                <div className="flex justify-between items-center px-2">
                  <div className="flex-1 text-center">
                    <span className="text-[#b0a8a0] text-[8px] uppercase tracking-[0.2em] mb-1.5 block opacity-60">Longitud</span>
                    <span className={`text-sm font-bold font-mono tracking-tight ${isLight ? 'text-stone-900' : 'text-white'}`}>{dino.longitud}</span>
                  </div>
                  <div className={`w-px h-8 ${isLight ? 'bg-stone-200' : 'bg-[#3f3833]'}`}></div>
                  <div className="flex-1 text-center">
                    <span className="text-[#b0a8a0] text-[8px] uppercase tracking-[0.2em] mb-1.5 block opacity-60">Altura</span>
                    <span className={`text-sm font-bold font-mono tracking-tight ${isLight ? 'text-stone-900' : 'text-white'}`}>{dino.altura}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DinoCard;