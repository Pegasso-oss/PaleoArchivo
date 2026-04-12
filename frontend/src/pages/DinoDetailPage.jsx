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
  Skull,
  ArrowsUpFromLine,
  Star,
  Pickaxe,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- COMPONENTE TOAST ---
const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className={`fixed top-10 right-6 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
            type === "success"
              ? "bg-amber-500/90 border-amber-400 text-black"
              : "bg-red-600/90 border-red-500 text-white"
          }`}
        >
          {type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span className="font-bold uppercase tracking-tighter text-sm italic">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- COMPONENTE DE CHISPAS ---
const Sparkles = ({ isFav, colorClass }) => {
  const sparkles = [
    { x: -35, y: -35, d: 0 }, { x: 35, y: -35, d: 0.1 },
    { x: -35, y: 35, d: 0.2 }, { x: 35, y: 35, d: 0.15 },
    { x: 0, y: -45, d: 0.05 },
  ];
  return (
    <AnimatePresence>
      {isFav && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${colorClass.replace('text', 'bg')}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: s.x, y: s.y, opacity: [0, 1, 0], scale: [0, 1.8, 0] }}
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
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

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

  const getTheme = (dieta) => {
    const themes = {
      Carnívoro: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", fill: "#ef4444" },
      Herbívoro: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50", fill: "#22c55e" },
      Omnívoro: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/50", fill: "#f59e0b" },
      Filtrador: { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/50", fill: "#06b6d4" },
    };
    return themes[dieta] || { text: "text-stone-400", bg: "bg-stone-400/10", border: "border-stone-400/50", fill: "#a8a29e" };
  };

  const theme = useMemo(() => getTheme(dino?.dieta), [dino]);

  const recommendations = useMemo(() => {
    if (!dino) return [];
    return allAnimals
      .filter((a) => a.nombre.toLowerCase() !== id.toLowerCase())
      .filter((a) => a.dieta === dino.dieta || a.era === dino.era)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [id, dino]);

  const handleToggleFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setToast({ show: true, msg: "IDENTIFICACIÓN REQUERIDA", type: "error" });
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/favorites/add", {
        userId, dinoId: dino.id, nombre: dino.nombre,
      });
      if (setFavorites) setFavorites(response.data.map((fav) => String(fav.id)));
      setToast({ 
        show: true, 
        msg: isFav ? "ELIMINADO DE FAVORITOS" : "AÑADIDO A FAVORITOS", 
        type: "success" 
      });
    } catch (err) {
      setToast({ show: true, msg: "ERROR DE CONEXIÓN", type: "error" });
    }
  };

  if (!dino) return <div className="min-h-screen bg-[#141210] flex items-center justify-center font-mono text-amber-600 italic tracking-[0.5em]">ACCEDIENDO...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`min-h-screen pb-20 relative transition-colors duration-500 ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#141210] text-white"}`}>
      
      <Toast isVisible={toast.show} message={toast.msg} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />

      <div className="max-w-7xl mx-auto px-4 py-4 lg:pt-6">
        <button onClick={() => navigate(-1)} className={`${theme.text} opacity-80 hover:opacity-100 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2 group transition-all`}>
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A REGISTROS
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-0 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">
        <motion.div className="order-first lg:order-last w-full relative">
          <div className={`relative w-auto aspect-square md:aspect-video overflow-hidden lg:rounded-[2.5rem] border-b-2 lg:border-4 shadow-2xl transition-colors duration-500 ${theme.border}`}>
            <img src={dino.imagen} alt={dino.nombre} className="w-full h-full object-cover object-center" />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden`} />
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-8 pt-8 lg:pt-0 px-4 lg:px-0">
          <header className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-black italic uppercase leading-[0.8] tracking-tighter">{dino.nombre}</h1>
              <div className={`mt-4 font-mono text-[11px] tracking-[0.4em] uppercase ${theme.text}`}>// {dino.subName}</div>
            </div>

            <button onClick={handleToggleFavorite} className="p-3 relative shrink-0 outline-none group">
              <Sparkles isFav={isFav} colorClass={theme.text} />
              <motion.div animate={{ scale: isFav ? [1, 1.4, 1] : 1, rotate: isFav ? [0, 10, -10, 0] : 0 }}>
                <Star size={42} fill={isFav ? theme.fill : "none"} stroke={isFav ? theme.fill : "currentColor"} className={`transition-all duration-300 ${isFav ? "drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]" : "opacity-20 hover:opacity-100"}`} />
              </motion.div>
            </button>
          </header>

          <p className={`text-lg leading-relaxed font-light italic ${isLight ? "text-stone-700/80" : "text-stone-300"}`}>
            <Info size={18} className={`inline mr-2 mb-1 ${theme.text} opacity-60`} />
            {dino.descripcion}
          </p>

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {[
              { label: "Longitud", val: dino.longitud, icon: <Ruler size={14} /> },
              { label: "Altura", val: dino.altura, icon: <ArrowsUpFromLine size={14} /> },
              { label: "Dieta", val: dino.dieta, icon: <Utensils size={14} />, color: theme.text },
              { label: "Estado", val: dino.estado || "EXTINTO", icon: <Skull size={14} />, color: dino.estado === "VIVO" ? "text-cyan-400" : "text-red-500" },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-[2rem] border transition-all ${isLight ? "bg-white border-stone-200 shadow-sm" : "bg-white/[0.03] border-white/5"}`}>
                <div className="flex items-center gap-2 text-stone-500 uppercase text-[9px] font-bold tracking-widest mb-4">{item.icon} {item.label}</div>
                <div className={`text-2xl lg:text-3xl font-mono font-bold ${item.color || (isLight ? "text-stone-900" : "text-white")}`}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE RECOMENDADOS --- */}
      <div className={`max-w-7xl mx-auto px-4 md:px-6 mt-24 border-t pt-16 ${isLight ? 'border-stone-200' : 'border-white/5'}`}>
        <div className="flex items-center justify-between mb-10">
          <h3 className={`text-2xl md:text-4xl font-black italic uppercase tracking-tighter ${isLight ? 'text-stone-900' : 'text-white'}`}>
            Especies <span className={theme.text}>Relacionadas</span>
          </h3>
          <Pickaxe className={`${theme.text} opacity-20`} size={32} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => {
            const recTheme = getTheme(rec.dieta); // Cada recomendado mantiene su propio color de dieta
            return (
              <Link 
                key={rec.id} 
                to={`/animal/${rec.nombre.toLowerCase()}`}
                className={`group border rounded-3xl overflow-hidden transition-all duration-500 ${isLight ? 'bg-white border-stone-200 hover:border-stone-400' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={rec.imagen} alt={rec.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60`} />
                </div>
                <div className="p-5">
                  <h4 className={`text-lg font-black italic uppercase leading-none group-hover:tracking-wider transition-all ${isLight ? 'text-stone-900' : 'text-white'}`}>
                    {rec.nombre}
                  </h4>
                  <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] mt-2 mb-4 line-clamp-1">
                    {rec.subName}
                  </p>
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full border transition-colors ${recTheme.bg} ${recTheme.text} ${recTheme.border} uppercase`}>
                    {rec.dieta}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default DinoDetailPage;