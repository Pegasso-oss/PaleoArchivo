import React, { useState, useEffect, useMemo } from "react"; // Añadido useState
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { allAnimals } from "../data/allData";
import {
  Ruler,
  Utensils,
  Info,
  FileText,
  Skull,
  ArrowsUpFromLine,
} from "lucide-react";

const DinoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- LÓGICA DE TEMA REACTIVO ---
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  // -------------------------------

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const dino = allAnimals.find(
    (d) => d.nombre.toLowerCase() === id.toLowerCase(),
  );

  const getTheme = (dieta) => {
    const themes = {
      Carnívoro: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50" },
      Herbívoro: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50" },
      Omnívoro: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/50" },
      Insectívoro: { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/50" },
      Piscívoro: { text: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/50" },
      Carroñero: { text: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/50" },
      Filtrador: { text: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/50" },
      Detritívoro: { text: "text-slate-400", bg: "bg-slate-400/10", border: "border-slate-400/50" },
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

  if (!dino) return (
    <div className={`min-h-screen font-mono text-xs uppercase tracking-widest flex items-center justify-center ${isLight ? 'bg-[#f5f2ed] text-stone-900' : 'bg-[#141210] text-white'}`}>
      Cargando archivo...
    </div>
  );

  const theme = getTheme(dino.dieta);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pb-20 relative transition-colors duration-500 ${isLight ? 'bg-[#f5f2ed] text-stone-900' : 'bg-[#141210] text-white'}`}
    >
      {/* HEADER DE NAVEGACIÓN */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:pt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-amber-500/80 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> VOLVER A REGISTROS
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* IMAGEN */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="order-first lg:order-last relative w-full"
        >
          <div className={`absolute -inset-10 ${theme.bg} rounded-full blur-[120px] opacity-30`}></div>
          <div className={`relative aspect-video lg:aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border-4 shadow-none transition-colors duration-500 ${theme.border}`}>
            <img
              src={dino.imagen}
              alt={dino.nombre}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* INFO */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <header>
            <h1 className={`text-4xl md:text-5xl lg:text-5xl font-black italic uppercase leading-[0.85] mt-4 tracking-tighter break-words transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
              {dino.nombre}
            </h1>
            <span className={`font-mono text-[13px] lg:text-xs tracking-[0.4em] uppercase ${theme.text}`}>
              // {dino.subName}
            </span>
          </header>

          <p className={`text-base leading-relaxed font-light italic transition-colors ${isLight ? 'text-stone-600' : 'text-stone-300'}`}>
            <Info size={16} className={`inline mr-2.5 mb-1 ${theme.text} opacity-60`} />
            {dino.descripcion}
          </p>

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {[
              { label: "Longitud", val: dino.longitud, icon: <Ruler size={14} /> },
              { label: "Altura", val: dino.altura, icon: <ArrowsUpFromLine size={14} /> },
              { label: "Dieta", val: dino.dieta, icon: <Utensils size={14} />, color: theme.text, isDiet: true },
              { label: "Estado", icon: <Skull size={14} />, val: (
                <div className="flex flex-col">
                  <span className={dino.estado !== "EXTINTO" ? "text-cyan-400" : "text-red-600 uppercase"}>
                    {dino.estado || "EXTINTO"}
                  </span>
                  <span className="text-[12px] text-stone-500 font-normal">||{dino.extincion}||</span>
                </div>
              )},
            ].map((item, idx) => (
              <div key={idx} className={`border p-5 rounded-2xl flex flex-col justify-between h-28 transition-all hover:bg-white/[0.06] ${isLight ? 'bg-white border-stone-200 shadow-sm' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center gap-2 text-stone-500 mb-1.5 shrink-0">
                  {item.icon}
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{item.label}</span>
                </div>
                <div className={`text-2xl lg:text-3xl font-mono font-bold ${item.color || (isLight ? "text-stone-900" : "text-white")} ${item.isDiet ? "uppercase" : ""}`}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className={`w-full border px-8 py-5 rounded-2xl font-mono text-[14px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-8 shadow-2xl ${isLight ? 'bg-white border-stone-200 text-amber-600 hover:bg-stone-50' : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-amber-500'}`}>
              <FileText size={20} />
              <span>Consultar papers cientificos</span>
            </button>
          </div>
        </div>
      </div>

      {/* RECOMENDADOS */}
      <div className={`max-w-7xl mx-auto px-4 md:px-6 mt-24 border-t pt-16 ${isLight ? 'border-stone-200' : 'border-white/5'}`}>
        <h3 className={`text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-10 ${isLight ? 'text-stone-900' : 'text-white'}`}>
          Especies <span className="text-amber-600">Relacionadas</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => {
            const recTheme = getTheme(rec.dieta);
            return (
              <Link 
                key={rec.id} 
                to={`/animal/${rec.nombre.toLowerCase()}`}
                className={`group border rounded-3xl overflow-hidden transition-all duration-500 ${isLight ? 'bg-white border-stone-200 hover:border-amber-500' : 'bg-white/[0.02] border-white/5 hover:border-amber-600/40'}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={rec.imagen} alt={rec.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h4 className={`text-lg font-black italic uppercase leading-none group-hover:text-amber-500 transition-colors ${isLight ? 'text-stone-900' : 'text-white'}`}>
                    {rec.nombre}
                  </h4>
                  <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] mt-2 mb-4">
                    {rec.subName}
                  </p>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-md border ${recTheme.bg} ${recTheme.text} ${recTheme.border} uppercase`}>
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