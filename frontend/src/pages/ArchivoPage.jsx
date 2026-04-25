// src/pages/ArchivoPage.jsx
import React, { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { allAnimals } from "../data/allData";
import { getDietConfig, getDietLabel, DIET_CONFIG } from "../data/dietConfig";
import DinoCard from "../components/DinoCard";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";

const TYPE_THEMES = {
  Theropod:        { text: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/40"     },
  Sauropod:        { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/40" },
  Avialae:         { text: "text-sky-400",     bg: "bg-sky-400/10",     border: "border-sky-400/40"     },
  Thyreophoran:    { text: "text-lime-400",    bg: "bg-lime-400/10",    border: "border-lime-400/40"    },
  Plesiosaur:      { text: "text-teal-400",    bg: "bg-teal-400/10",    border: "border-teal-400/40"    },
  Chondrichthyes:  { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/40"    },
  Basal_arthropod: { text: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/40"  },
  Basal_chordate:  { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/40"  },
  Mollusca:        { text: "text-pink-400",    bg: "bg-pink-400/10",    border: "border-pink-400/40"    },
  Arthropoda:      { text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/40"   },
  Agnatha:         { text: "text-stone-400",   bg: "bg-stone-400/10",   border: "border-stone-400/40"   },
  Saurischia:      { text: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/40"    },
  Abelisauridae:   { text: "text-red-300",     bg: "bg-red-300/10",     border: "border-red-300/40"     },
  Squamata:        { text: "text-yellow-400",  bg: "bg-yellow-400/10",  border: "border-yellow-400/40"  },
  Mammalia:        { text: "text-indigo-400",  bg: "bg-indigo-400/10",  border: "border-indigo-400/40"  },
  Crocodylomorpha: { text: "text-green-400",   bg: "bg-green-400/10",   border: "border-green-400/40"   },
};

const ArchivoPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { theme, language } = useUser();
  const { tSection } = useTranslation();
  const typeLabels = tSection('typeLabels');
  const isLight = theme === "light";

  const diet = params.get("diet") || "";
  const tipo = params.get("tipo") || "";

  const filteredAnimals = useMemo(() => {
    return Array.from(
      new Map(allAnimals.map(a => [a.nombre.toLowerCase(), a])).values()
    ).filter(a => {
      if (diet) return a.dieta === diet;
      if (tipo) return a.tipo === tipo;
      return true;
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [diet, tipo]);

  // Determinar tema de color del filtro activo
  const isDiet = !!diet;
  const activeKey = diet || tipo;
  const dietCfg = diet ? getDietConfig(diet) : null;
  const typeCfg = tipo ? (TYPE_THEMES[tipo] || { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40" }) : null;
  const activeColor = dietCfg ? dietCfg.color : typeCfg;
  const activeEmoji = dietCfg ? dietCfg.emoji : "🦕";
  const activeLabel = diet
    ? getDietLabel(diet, language)
    : (typeLabels[tipo] || tipo);

  return (
    <div className={`min-h-screen px-4 pt-10 pb-20 font-mono transition-colors duration-500 ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#141210] text-white"}`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}
          >
            <ArrowLeft size={14} /> Volver
          </button>

          <div className="flex items-center gap-4 mb-3">
            <span className={`text-[11px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-lg border ${activeColor?.bg} ${activeColor?.text} ${activeColor?.border}`}>
              {isDiet ? "Dieta" : "Tipo"}
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none mb-3 ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}>
            <span className="mr-4">{activeEmoji}</span>
            {activeLabel}
          </h1>
          <p className={`text-sm ${isLight ? "text-stone-500" : "text-stone-500"}`}>
            {filteredAnimals.length} registro{filteredAnimals.length !== 1 ? "s" : ""} encontrado{filteredAnimals.length !== 1 ? "s" : ""} en el archivo
          </p>

          {/* Divider */}
          <div className={`mt-6 h-px ${isLight ? "bg-stone-200" : "bg-white/5"}`} />
        </div>

        {/* Grid de cards */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAnimals.map(dino => (
              <DinoCard key={dino.id} dino={dino} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-24 text-sm uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}>
            No hay registros para este filtro
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivoPage;