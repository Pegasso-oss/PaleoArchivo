// src/components/DinoCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import { getDietConfig, getDietLabel } from "../data/dietConfig";
import { allAnimals } from "../data/allData";
import Toast from "./Toast";
import apiClient from "../api/apiClient";

// ── Color de borde según el rol del rival en la relación ──────────────────
// rol = cómo me relaciono YO con ese rival
// "presa"      → yo soy la presa, el rival es mi depredador → borde rojo (peligro)
// "depredador" → yo soy el depredador, el rival es mi presa → borde azul (dominio)
// "competidor" → rivalidad sin jerarquía clara              → borde ámbar
const RIVAL_BORDER = {
  depredador:       { border: "border-red-500/80",   hover: "group-hover/rival:border-red-400",   bg: "bg-red-500/10"   },
  presa:  { border: "border-blue-500/80",  hover: "group-hover/rival:border-blue-400",  bg: "bg-blue-500/10"  },
  competidor:  { border: "border-amber-500/70", hover: "group-hover/rival:border-amber-400", bg: "bg-amber-500/10" },
};

const DinoCard = ({ dino }) => {
  const { isFavorite, setFavorites } = useFavorites();
  const isFav = isFavorite(dino.id);
  const { theme, language } = useUser();
  const { tSection } = useTranslation();
  const dc = tSection("dinoCard");
  const isLight = theme === "light";
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // ── Rivales ───────────────────────────────────────────────────────────
  const rivals = dino.rival
    ? dino.rival
        .map(r => {
          const animal = allAnimals.find(a => a.id === r.id);
          return animal ? { ...animal, rol: r.rol } : null;
        })
        .filter(Boolean)
    : [];

  const handleFavoriteClick = async (e) => {
    e.preventDefault(); e.stopPropagation();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setToast({ show: true, msg: dc.authRequired, type: "error" });
      return;
    }
    try {
      const response = await apiClient.post("/favorites/add", {
        userId, dinoId: dino.id, nombre: dino.nombre,
      });
      if (setFavorites) setFavorites(response.data.map(fav => String(fav.id)));
      setToast({
        show: true,
        msg: isFav ? `${dino.nombre} ${dc.removedFav}` : `${dino.nombre} ${dc.addedFav}`,
        type: "success",
      });
    } catch {
      setToast({ show: true, msg: dc.systemError, type: "error" });
    }
  };

  const dietCfg = getDietConfig(dino.dieta);
  const dietClass = `${dietCfg.color.bg} ${dietCfg.color.text} ${dietCfg.color.border}`;

  return (
    <div className="relative group w-full">
      <Toast isVisible={toast.show} message={toast.msg} type={toast.type}
        onClose={() => setToast(t => ({ ...t, show: false }))} />

      {/* ── Badges de rivales — esquina superior izquierda ── */}
      {rivals.length > 0 && (
        <div className="absolute top-3 left-3 z-20 flex gap-1.5">
          {rivals.map(rival => {
            const colors = RIVAL_BORDER[rival.rol] || RIVAL_BORDER.competidor;
            return (
              <div key={rival.id} className="relative group/rival">
                {/* Avatar foto en escala de grises */}
                <div className={`w-9 h-9 rounded-full overflow-hidden border-2 shadow-lg
                  backdrop-blur-md transition-all duration-200
                  group-hover/rival:scale-110
                  ${colors.border} ${colors.hover} ${colors.bg}`}>
                  <img
                    src={rival.imagen}
                    alt={rival.nombre}
                    className="w-full h-full object-cover grayscale group-hover/rival:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Tooltip */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1
                  rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap z-30
                  pointer-events-none opacity-0 group-hover/rival:opacity-100
                  transition-opacity duration-200 shadow-xl
                  ${isLight ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}>
                  {rival.nombre}
                  <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
                    ${isLight ? "bg-stone-900" : "bg-white"}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Botón favorito ── */}
      <button onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md shadow-lg
          transition-all active:scale-90 border
          ${isLight
            ? "bg-white/70 border-stone-200 text-stone-400 hover:bg-white"
            : "bg-black/40 border-white/10 text-stone-500 hover:bg-black/60"}`}>
        <Star size={16}
          fill={isFav ? "#facc15" : "none"}
          stroke={isFav ? "#facc15" : "currentColor"}
          className={isFav ? "drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : ""} />
      </button>

      <Link to={`/animal/${dino.nombre.toLowerCase()}`} className="block h-full">
        <div className={`w-full rounded-[1.25rem] overflow-hidden flex flex-col border
          transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/40
          ${isLight
            ? "bg-white border-stone-200 hover:bg-stone-50"
            : "bg-[#1a1816] border-[#3f3833] hover:bg-[#1f1d1b]"}`}>

          <div className={`aspect-[4/3] w-full border-b overflow-hidden relative shrink-0
            ${isLight ? "border-stone-200" : "border-[#3f3833]"}`}>
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={dino.imagen} alt={dino.nombre} />
            <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-50
              ${isLight ? "from-white/50" : "from-[#1a1816]"}`} />
          </div>

          <div className="p-5 flex flex-col flex-1 gap-3">

            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h2 className={`text-lg font-black tracking-tighter uppercase italic leading-tight
                  group-hover:text-amber-500 transition-colors break-words
                  ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}>
                  {dino.nombre}
                </h2>
                <span className={`text-[12px] font-bold text-amber-500 tracking-tight uppercase break-words
                  ${isLight ? "group-hover:text-stone-700" : "group-hover:text-[#fef3c7]"}`}>
                  "{dino.subName}"
                </span>
              </div>
              <div className={`shrink-0 px-2.5 py-1.5 rounded-xl border text-center
                ${isLight ? "bg-stone-100 border-stone-200" : "bg-black/40 border-white/5"}`}>
                <p className="text-[7px] text-stone-500 uppercase tracking-[0.2em] mb-0.5">ID</p>
                <p className="text-xs font-bold text-amber-500 font-mono">
                  #{String(dino.id).padStart(3, "0")}
                </p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed line-clamp-3 font-light
              ${isLight ? "text-stone-600" : "text-stone-400"}`}>
              {dino.descripcion}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <span className={`self-start text-[9px] uppercase tracking-[0.2em] font-black
                px-3 py-1.5 rounded-lg border ${dietClass}`}>
                {getDietLabel(dino.dieta, language)}
              </span>

              <div className={`border-t pt-3 ${isLight ? "border-stone-200" : "border-[#3f3833]"}`}>
                <div className="flex justify-between items-center">
                  <div className="flex-1 text-center">
                    <span className="text-[8px] text-stone-500 uppercase tracking-[0.2em] mb-1 block">
                      {dc.length}
                    </span>
                    <span className={`text-sm font-bold font-mono
                      ${isLight ? "text-stone-900" : "text-white"}`}>
                      {dino.longitud}
                    </span>
                  </div>
                  <div className={`w-px h-7 ${isLight ? "bg-stone-200" : "bg-[#3f3833]"}`} />
                  <div className="flex-1 text-center">
                    <span className="text-[8px] text-stone-500 uppercase tracking-[0.2em] mb-1 block">
                      {dc.height}
                    </span>
                    <span className={`text-sm font-bold font-mono
                      ${isLight ? "text-stone-900" : "text-white"}`}>
                      {dino.altura}
                    </span>
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