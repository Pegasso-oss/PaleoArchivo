import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { allAnimals } from "../data/allData";
import { useFavorites } from "../context/FavoritesContext";
import axios from "axios";
import {
  Ruler,
  Utensils,
  Info,
  FileText,
  Skull,
  ArrowsUpFromLine,
  Star,
  ShieldCheck,
  Pickaxe,
  Box,
} from "lucide-react";

// Componente de chispas optimizado
const Sparkles = ({ isFav }) => {
  const sparkles = [
    { x: -35, y: -35, d: 0 },
    { x: 35, y: -35, d: 0.1 },
    { x: -35, y: 35, d: 0.2 },
    { x: 35, y: 35, d: 0.15 },
    { x: 0, y: -45, d: 0.05 },
  ];

  return (
    <AnimatePresence>
      {isFav && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: s.x,
                y: s.y,
                opacity: [0, 1, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: s.d }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DinoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, setFavorites } = useFavorites(); 
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains("light-theme"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light-theme"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const dino = allAnimals.find((d) => d.nombre.toLowerCase() === id.toLowerCase());
  const isFav = dino ? isFavorite(dino.id) : false;

  const handleToggleFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("IDENTIFICACIÓN REQUERIDA");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/favorites/add", {
        userId: userId,
        dinoId: String(dino.id)
      });
      setFavorites(response.data); 
    } catch (err) {
      console.error("Error en la conexión");
    }
  };

  const getTheme = (dieta) => {
    const themes = {
      Carnívoro: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50" },
      Herbívoro: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50" },
      Omnívoro: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/50" },
      Insectívoro: { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/50" },
      Piscívoro: { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/50" },
      Carroñero: { text: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/50" },
    };
    return themes[dieta] || { text: "text-stone-400", bg: "bg-stone-400/10", border: "border-stone-400/50" };
  };

  const recommendations = useMemo(() => {
    if (!dino) return [];
    return allAnimals
      .filter((a) => a.nombre.toLowerCase() !== id.toLowerCase())
      .filter((a) => a.dieta === dino.dieta || a.era === dino.era)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [id, dino]);

  if (!dino) return <div className="min-h-screen flex items-center justify-center font-mono text-amber-600">Buscando...</div>;

  const theme = getTheme(dino.dieta);
  const statusColor = dino.estado?.toUpperCase() === "VIVO" ? "text-cyan-400" : "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen pb-20 relative transition-colors duration-500 ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#141210] text-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 lg:pt-6">
        <button onClick={() => navigate(-1)} className="text-amber-600/80 hover:text-amber-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A REGISTROS
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-0 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">
        <motion.div className="order-first lg:order-last w-full relative">
          <div className={`relative w-full aspect-video overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] border-2 lg:border-4 shadow-2xl ${theme.border}`}>
            <img src={dino.imagen} alt={dino.nombre} className="w-full h-full object-cover object-center" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-8 pt-8 lg:pt-0">
          <header className="px-4 lg:px-0 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter break-words">
                {dino.nombre}
              </h1>
              <div className={`mt-4 font-mono text-[11px] tracking-[0.4em] uppercase ${theme.text}`}>
                // {dino.subName}
              </div>
            </div>

            {/* BOTÓN CON ANIMACIÓN REFORZADA */}
            <button
              onClick={handleToggleFavorite}
              className="p-3 relative shrink-0 outline-none group"
            >
              <Sparkles isFav={isFav} />
              <motion.div
                key={isFav ? "active" : "inactive"} // Forzar re-montaje para disparar animaciones
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}
                animate={{ 
                  scale: isFav ? [1, 1.5, 1] : 1,
                  rotate: isFav ? [0, 15, -15, 0] : 0 
                }}
                transition={{ duration: 0.4, ease: "backOut" }}
              >
                <Star
                  size={36}
                  fill={isFav ? "#facc15" : "none"}
                  stroke={isFav ? "#facc15" : "currentColor"}
                  className={`transition-colors duration-300 ${isFav ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "opacity-30 hover:opacity-100"}`}
                />
              </motion.div>
            </button>
          </header>

          <p className={`px-4 lg:px-0 text-base leading-relaxed font-light italic ${isLight ? "text-stone-700/80" : "text-stone-300"}`}>
            <Info size={16} className={`inline mr-2 mb-1 ${theme.text} opacity-60`} />
            {dino.descripcion}
          </p>

          <div className="grid grid-cols-2 gap-2 lg:gap-4 px-2 lg:px-0">
            {[
              { label: "Longitud", val: dino.longitud, icon: <Ruler size={14} /> },
              { label: "Altura", val: dino.altura, icon: <ArrowsUpFromLine size={14} /> },
              { label: "Dieta", val: dino.dieta, icon: <Utensils size={14} />, color: theme.text },
              { label: "Estado", val: dino.estado || "EXTINTO", icon: <Skull size={14} />, color: statusColor },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${isLight ? "bg-white border-stone-200 shadow-sm" : "bg-white/[0.03] border-white/5"}`}>
                <div className="flex items-center gap-2 text-stone-500 uppercase text-[9px] font-bold tracking-widest mb-4">
                  {item.icon} {item.label}
                </div>
                <div className={`text-xl lg:text-2xl font-mono font-bold ${item.color || (isLight ? "text-stone-900" : "text-white")}`}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <div className={`mx-2 lg:mx-0 p-6 lg:p-8 rounded-[2.5rem] border ${isLight ? "bg-white border-stone-200 shadow-sm" : "bg-white/[0.02] border-white/5"}`}>
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2 ${theme.text}`}>
              <ShieldCheck size={18} /> Registro de Conservación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${theme.bg}`}>
                  <Box size={20} className={theme.text} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-stone-500 font-black tracking-widest mb-1">Preservación</p>
                  <p className="text-lg font-bold italic uppercase leading-none mb-1">
                    {Number(dino.conservacion) > 80 ? "Esqueleto Casi Completo" : "Esqueleto Parcial"}
                  </p>
                  <p className="text-sm text-stone-400 italic">
                    Integridad: <span className={isLight ? "text-stone-700" : "text-stone-200"}>{dino.conservacion}%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${theme.bg}`}>
                  <Pickaxe size={20} className={theme.text} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-stone-500 font-black tracking-widest mb-1">Fosilización</p>
                  <p className="text-lg font-bold italic uppercase leading-none mb-1">{dino.metodo} {dino.material}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SECCIÓN RELACIONADOS (Simplificada para el ejemplo) */}
      <div className="max-w-7xl mx-auto px-4 mt-20 border-t border-white/10 pt-10">
          <h3 className="text-2xl font-black uppercase italic mb-8 text-amber-600">Especies Relacionadas</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.map(rec => (
              <Link key={rec.id} to={`/animal/${rec.nombre.toLowerCase()}`} className="group">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 mb-2">
                  <img src={rec.imagen} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={rec.nombre} />
                </div>
                <p className="font-bold uppercase italic text-xs">{rec.nombre}</p>
              </Link>
            ))}
          </div>
      </div>
    </motion.div>
  );
};

export default DinoDetailPage;