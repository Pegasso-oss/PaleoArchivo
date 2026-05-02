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

const SIZE_THEMES = {
  pequeño: { text: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/40"  },
  mediano: { text: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/40"   },
  grande:  { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/40" },
  gigante: { text: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/40"    },
};

const SIZE_LABELS = {
  pequeño: { es: "Pequeño", en: "Small",  fr: "Petit", it: "Piccolo" },
  mediano: { es: "Mediano", en: "Medium", fr: "Moyen", it: "Medio"   },
  grande:  { es: "Grande",  en: "Large",  fr: "Grand", it: "Grande"  },
  gigante: { es: "Gigante", en: "Giant",  fr: "Géant", it: "Gigante" },
};

const SIZE_EMOJIS = {
  pequeño: "🔬",
  mediano: "📏",
  grande:  "📐",
  gigante: "🦕",
};

const SIZE_RANGES = {
  pequeño: { min: 0,   max: 1        },
  mediano: { min: 1,   max: 5        },
  grande:  { min: 5,   max: 12       },
  gigante: { min: 12,  max: Infinity },
};

const parseLongitudMetros = (longitud) => {
  if (!longitud) return null;
  const str = String(longitud).toLowerCase();
  const cmMatch = str.match(/([\d.]+)\s*cm/);
  if (cmMatch) return parseFloat(cmMatch[1]) / 100;
  const rangeMatch = str.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
  if (rangeMatch) return parseFloat(rangeMatch[2]);
  const numMatch = str.match(/([\d.]+)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return null;
};

const matchesSize = (longitud, sizeId) => {
  const metros = parseLongitudMetros(longitud);
  if (metros === null) return false;
  const range = SIZE_RANGES[sizeId];
  if (!range) return false;
  return metros >= range.min && metros < range.max;
};

const ArchivoPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { theme, language } = useUser();
  const { tSection } = useTranslation();
  const typeLabels = tSection("typeLabels");
  const archivo = tSection("archivo");
  const isLight = theme === "light";

  const diet = params.get("diet") || "";
  const tipo = params.get("tipo") || "";
  const size = params.get("size") || "";

  const filteredAnimals = useMemo(() => {
    return Array.from(
      new Map(allAnimals.map(a => [a.nombre.toLowerCase(), a])).values()
    ).filter(a => {
      if (diet) return a.dieta === diet;
      if (tipo) return a.tipo === tipo;
      if (size) return matchesSize(a.longitud, size);
      return true;
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [diet, tipo, size]);

  const isDiet = !!diet;
  const isTipo = !!tipo;
  const isSize = !!size;

  const dietCfg   = diet ? getDietConfig(diet) : null;
  const typeCfg   = tipo ? (TYPE_THEMES[tipo] || { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40" }) : null;
  const sizeCfg   = size ? (SIZE_THEMES[size] || { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40" }) : null;

  const activeColor = dietCfg ? dietCfg.color : isTipo ? typeCfg : sizeCfg;
  const activeEmoji = dietCfg ? dietCfg.emoji : isTipo ? "🦕" : (SIZE_EMOJIS[size] || "📏");
  const activeLabel = diet
    ? getDietLabel(diet, language)
    : isTipo
      ? (typeLabels[tipo] || tipo)
      : (SIZE_LABELS[size]?.[language] || SIZE_LABELS[size]?.es || size);

  const filterLabel = isDiet ? "Dieta" : isTipo ? "Tipo" : { es: "Tamaño", en: "Size", fr: "Taille", it: "Dimensione" }[language] || "Tamaño";
  const sectionLabel = isDiet ? "Sobre esta dieta" : isTipo ? "Sobre este grupo" : { es: "Sobre este tamaño", en: "About this size", fr: "Sur cette taille", it: "Su questa dimensione" }[language] || "Sobre este tamaño";

  // Descripción desde translations
  const description = isDiet
    ? archivo?.diets?.[diet]
    : isTipo
      ? archivo?.types?.[tipo]
      : archivo?.sizes?.[size];

  return (
    <div className={`min-h-screen px-4 pt-10 pb-20 font-mono transition-colors duration-500
      ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#141210] text-white"}`}>
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors
            ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          <ArrowLeft size={14} /> Volver
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[11px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-lg border
              ${activeColor?.bg} ${activeColor?.text} ${activeColor?.border}`}>
              {filterLabel}
            </span>
            <span className={`text-[11px] uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}>
              {filteredAnimals.length} registro{filteredAnimals.length !== 1 ? "s" : ""}
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none mb-6
            ${isLight ? "text-stone-900" : "text-[#fef3c7]"}`}>
            <span className="mr-4">{activeEmoji}</span>
            {activeLabel}
          </h1>

          {/* Descripción */}
          {description && (
            <div className={`max-w-3xl rounded-2xl border px-6 py-5 mb-6
              ${isLight ? "bg-white border-stone-200" : "bg-white/5 border-white/10"}`}>
              <p className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-2 ${activeColor?.text}`}>
                {sectionLabel}
              </p>
              <p className={`text-sm leading-relaxed ${isLight ? "text-stone-600" : "text-stone-300"}`}>
                {description}
              </p>
            </div>
          )}

          <div className={`h-px ${isLight ? "bg-stone-200" : "bg-white/5"}`} />
        </div>

        {/* Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAnimals.map(dino => (
              <DinoCard key={dino.id} dino={dino} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-24 text-sm uppercase tracking-widest
            ${isLight ? "text-stone-400" : "text-stone-600"}`}>
            No hay registros para este filtro
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivoPage;