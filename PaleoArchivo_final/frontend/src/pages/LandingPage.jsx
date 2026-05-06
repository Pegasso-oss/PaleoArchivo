// src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EraCard from "../components/EraCard";
import { allAnimals } from "../data/allData";
import { DIET_CONFIG, getDietConfig, getDietLabel } from "../data/dietConfig";
import {
  Search, X, ShieldCheck, ChevronDown, Lightbulb, RefreshCw, ArrowRight,
} from "lucide-react";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import apiClient from "../api/apiClient";
import BrachioSkull from "../assets/CBrachio.png";

const TYPE_THEMES = {
  Theropod:        { text: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/40",     hoverBg: "hover:bg-red-400/10",     hoverText: "hover:text-red-300",     hoverBorder: "hover:border-red-400/40"     },
  Sauropod:        { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/40", hoverBg: "hover:bg-emerald-400/10", hoverText: "hover:text-emerald-300", hoverBorder: "hover:border-emerald-400/40" },
  Avialae:         { text: "text-sky-400",     bg: "bg-sky-400/10",     border: "border-sky-400/40",     hoverBg: "hover:bg-sky-400/10",     hoverText: "hover:text-sky-300",     hoverBorder: "hover:border-sky-400/40"     },
  Thyreophoran:    { text: "text-lime-400",    bg: "bg-lime-400/10",    border: "border-lime-400/40",    hoverBg: "hover:bg-lime-400/10",    hoverText: "hover:text-lime-300",    hoverBorder: "hover:border-lime-400/40"    },
  Plesiosaur:      { text: "text-teal-400",    bg: "bg-teal-400/10",    border: "border-teal-400/40",    hoverBg: "hover:bg-teal-400/10",    hoverText: "hover:text-teal-300",    hoverBorder: "hover:border-teal-400/40"    },
  Chondrichthyes:  { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/40",    hoverBg: "hover:bg-cyan-400/10",    hoverText: "hover:text-cyan-300",    hoverBorder: "hover:border-cyan-400/40"    },
  Basal_arthropod: { text: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/40",  hoverBg: "hover:bg-orange-400/10",  hoverText: "hover:text-orange-300",  hoverBorder: "hover:border-orange-400/40"  },
  Basal_chordate:  { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/40",  hoverBg: "hover:bg-violet-400/10",  hoverText: "hover:text-violet-300",  hoverBorder: "hover:border-violet-400/40"  },
  Mollusca:        { text: "text-pink-400",    bg: "bg-pink-400/10",    border: "border-pink-400/40",    hoverBg: "hover:bg-pink-400/10",    hoverText: "hover:text-pink-300",    hoverBorder: "hover:border-pink-400/40"    },
  Arthropoda:      { text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/40",   hoverBg: "hover:bg-amber-400/10",   hoverText: "hover:text-amber-300",   hoverBorder: "hover:border-amber-400/40"   },
  Agnatha:         { text: "text-stone-400",   bg: "bg-stone-400/10",   border: "border-stone-400/40",   hoverBg: "hover:bg-stone-400/10",   hoverText: "hover:text-stone-300",   hoverBorder: "hover:border-stone-400/40"   },
  Saurischia:      { text: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/40",    hoverBg: "hover:bg-rose-400/10",    hoverText: "hover:text-rose-300",    hoverBorder: "hover:border-rose-400/40"    },
  Abelisauridae:   { text: "text-red-300",     bg: "bg-red-300/10",     border: "border-red-300/40",     hoverBg: "hover:bg-red-300/10",     hoverText: "hover:text-red-200",     hoverBorder: "hover:border-red-300/40"     },
  Squamata:        { text: "text-yellow-400",  bg: "bg-yellow-400/10",  border: "border-yellow-400/40",  hoverBg: "hover:bg-yellow-400/10",  hoverText: "hover:text-yellow-300",  hoverBorder: "hover:border-yellow-400/40"  },
  Mammalia:        { text: "text-indigo-400",  bg: "bg-indigo-400/10",  border: "border-indigo-400/40",  hoverBg: "hover:bg-indigo-400/10",  hoverText: "hover:text-indigo-300",  hoverBorder: "hover:border-indigo-400/40"  },
  Crocodylomorpha: { text: "text-green-400",   bg: "bg-green-400/10",   border: "border-green-400/40",   hoverBg: "hover:bg-green-400/10",   hoverText: "hover:text-green-300",   hoverBorder: "hover:border-green-400/40"   },
};

const SIZE_CATEGORIES = [
  { id: "pequeño", label: { es: "Pequeño", en: "Small",  fr: "Petit", it: "Piccolo" }, emoji: "🔬", theme: { text: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/40",  hoverBg: "hover:bg-green-400/10",  hoverText: "hover:text-green-300",  hoverBorder: "hover:border-green-400/40"  } },
  { id: "mediano", label: { es: "Mediano", en: "Medium", fr: "Moyen", it: "Medio"   }, emoji: "📏", theme: { text: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/40",   hoverBg: "hover:bg-blue-400/10",   hoverText: "hover:text-blue-300",   hoverBorder: "hover:border-blue-400/40"   } },
  { id: "grande",  label: { es: "Grande",  en: "Large",  fr: "Grand", it: "Grande"  }, emoji: "📐", theme: { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/40", hoverBg: "hover:bg-orange-400/10", hoverText: "hover:text-orange-300", hoverBorder: "hover:border-orange-400/40" } },
  { id: "gigante", label: { es: "Gigante", en: "Giant",  fr: "Giant", it: "Gigante" }, emoji: "🦕", theme: { text: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/40",    hoverBg: "hover:bg-red-400/10",    hoverText: "hover:text-red-300",    hoverBorder: "hover:border-red-400/40"    } },
];

const parseLongitudMetros = (longitud) => {
  if (!longitud) return null;
  const str = String(longitud).toLowerCase();
  const cmMatch = str.match(/([\d.]+)\s*cm/);
  if (cmMatch) return parseFloat(cmMatch[1]) / 100;
  const rangeMatch = str.match(/([\d.]+)\s*[-]\s*([\d.]+)/);
  if (rangeMatch) return parseFloat(rangeMatch[2]);
  const numMatch = str.match(/([\d.]+)/);
  if (numMatch) return parseFloat(numMatch[1]);
  return null;
};

const getSizeCategory = (longitud) => {
  const metros = parseLongitudMetros(longitud);
  if (metros === null) return null;
  if (metros < 1)  return "pequeño";
  if (metros < 5)  return "mediano";
  if (metros < 12) return "grande";
  return "gigante";
};

const getRandomFact = (list, exclude = -1) => {
  let idx;
  do { idx = Math.floor(Math.random() * list.length); } while (idx === exclude && list.length > 1);
  return { ...list[idx], idx };
};

// ── Cronología del sidebar ─────────────────────────────────────────────────
const TIMELINE_ERAS = [
  {
    era: { es: "Paleozoico", en: "Paleozoic", fr: "Paléozoïque", it: "Paleozoico" },
    periodos: [
      { name: { es: "Cámbrico",    en: "Cambrian",    fr: "Cambrien",    it: "Cambriano"    }, ma: "538", color: "bg-cyan-500"   },
      { name: { es: "Ordovícico",  en: "Ordovician",  fr: "Ordovicien",  it: "Ordoviciano"  }, ma: "485", color: "bg-sky-500"    },
      { name: { es: "Silúrico",    en: "Silurian",    fr: "Silurien",    it: "Siluriano"    }, ma: "444", color: "bg-teal-500"   },
      { name: { es: "Devónico",    en: "Devonian",    fr: "Dévonien",    it: "Devoniano"    }, ma: "419", color: "bg-green-500"  },
      { name: { es: "Carbonífero", en: "Carboniferous",fr:"Carbonifère", it: "Carbonifero"  }, ma: "359", color: "bg-lime-500"   },
      { name: { es: "Pérmico",     en: "Permian",     fr: "Permien",     it: "Permiano"     }, ma: "299", color: "bg-yellow-500" },
    ],
  },
  {
    era: { es: "Mesozoico", en: "Mesozoic", fr: "Mésozoïque", it: "Mesozoico" },
    periodos: [
      { name: { es: "Triásico",   en: "Triassic",   fr: "Trias",      it: "Triassico"  }, ma: "252", color: "bg-orange-500" },
      { name: { es: "Jurásico",   en: "Jurassic",   fr: "Jurassique", it: "Giurassico" }, ma: "201", color: "bg-amber-500"  },
      { name: { es: "Cretácico",  en: "Cretaceous", fr: "Crétacé",    it: "Cretaceo"   }, ma: "145", color: "bg-red-500"    },
    ],
  },
  {
    era: { es: "Cenozoico", en: "Cenozoic", fr: "Cénozoïque", it: "Cenozoico" },
    periodos: [
      { name: { es: "Paleógeno",   en: "Paleogene",   fr: "Paléogène",   it: "Paleogene"   }, ma: "66",  color: "bg-violet-500" },
      { name: { es: "Neógeno",     en: "Neogene",     fr: "Néogène",     it: "Neogene"     }, ma: "23",  color: "bg-indigo-500" },
      { name: { es: "Cuaternario", en: "Quaternary",  fr: "Quaternaire", it: "Quaternario" }, ma: "2.6", color: "bg-blue-500"   },
    ],
  },
];

const SidebarCronologia = ({ isLight, lang }) => {
  const label = { es: "Escala temporal", en: "Time scale", fr: "Échelle temporelle", it: "Scala temporale" }[lang] || "Escala temporal";

  return (
    <div className={"rounded-xl border overflow-hidden " + (isLight ? "border-stone-200 bg-white/50" : "border-[#2a2520] bg-[#0c0b0a]/50")}>
      {/* cabecera */}
      <div className={"px-4 py-3 border-b " + (isLight ? "border-stone-200" : "border-[#2a2520]")}>
        <p className={"text-[10px] uppercase tracking-[0.2em] " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{label}</p>
      </div>

      {/* eras */}
      <div className="flex flex-col">
        {TIMELINE_ERAS.map((bloque, bi) => (
          <div key={bi}>
            {/* separador de era */}
            <div className={"px-4 pt-3 pb-1.5 flex items-center gap-2 " + (bi > 0 ? "border-t " + (isLight ? "border-stone-100" : "border-[#1a1814]") : "")}>
              <span className={"text-[9px] uppercase tracking-[0.18em] font-bold " + (isLight ? "text-stone-300" : "text-[#3a3028]")}>
                {bloque.era[lang] || bloque.era.es}
              </span>
              <div className={"flex-1 h-px " + (isLight ? "bg-stone-100" : "bg-[#2a2520]")} />
            </div>

            {/* periodos */}
            <div className="px-4 pb-2 flex flex-col gap-0.5">
              {bloque.periodos.map(({ name, ma, color }) => (
                <div key={ma}
                  className={"flex items-center justify-between gap-3 px-2 py-2 rounded-lg transition-all group/tl cursor-default " + (isLight ? "hover:bg-stone-50" : "hover:bg-white/[0.03]")}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={"w-2 h-2 rounded-full shrink-0 transition-transform group-hover/tl:scale-125 " + color} />
                    <span className={"text-[11px] font-bold uppercase tracking-wide truncate transition-colors group-hover/tl:text-amber-500 " + (isLight ? "text-stone-600" : "text-[#6b5e4e]")}>
                      {name[lang] || name.es}
                    </span>
                  </div>
                  <span className={"text-[11px] font-mono font-bold shrink-0 tabular-nums " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>
                    {ma}<span className={"text-[9px] font-normal " + (isLight ? "text-stone-300" : "text-[#3a3028]")}>Ma</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* pie */}
      <div className={"px-4 py-2.5 border-t flex items-center justify-between " + (isLight ? "border-stone-100" : "border-[#1a1814]")}>
        <span className={"text-[9px] uppercase tracking-widest " + (isLight ? "text-stone-300" : "text-[#3a3028]")}>
          538 Ma — presente
        </span>
        <div className="flex gap-1">
          {["bg-cyan-500","bg-amber-500","bg-blue-500"].map(c => (
            <div key={c} className={"w-1.5 h-1.5 rounded-full " + c} />
          ))}
        </div>
      </div>
    </div>
  );
};

// DatoCurioso
const DatoCurioso = ({ isLight, lang }) => {
  const { tSection } = useTranslation();
  const facts = tSection("datosCuriosos") || [];
  const [fact, setFact] = useState(() => facts.length ? getRandomFact(facts) : { emoji: "🦕", texto: "...", idx: 0 });
  const [animating, setAnimating] = useState(false);
  useEffect(() => { if (facts.length) setFact(getRandomFact(facts)); }, [lang]);
  const nextFact = () => {
    setAnimating(true);
    setTimeout(() => { setFact(getRandomFact(facts, fact.idx)); setAnimating(false); }, 250);
  };
  return (
    <div className={"w-full rounded-xl border px-5 py-4 flex items-center gap-4 transition-all duration-300 " + (isLight ? "bg-stone-50 border-stone-200" : "bg-[#0f0e0d] border-[#2a2520]")}>
      <div className={"shrink-0 w-9 h-9 rounded-xl flex items-center justify-center " + (isLight ? "bg-amber-50" : "bg-amber-500/10")}>
        <Lightbulb size={17} className="text-amber-500" />
      </div>
      <div className={"flex-1 text-left transition-opacity duration-200 " + (animating ? "opacity-0" : "opacity-100")}>
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-amber-600 mb-0.5">
          {{ es: "Dato curioso", en: "Fun fact", fr: "Le saviez-vous", it: "Lo sapevi" }[lang] || "Dato curioso"}
        </p>
        <p className={"text-sm font-mono leading-snug " + (isLight ? "text-stone-700" : "text-[#a89880]")}>
          <span className="mr-1.5">{fact.emoji}</span>{fact.texto}
        </p>
      </div>
      <button onClick={nextFact}
        className={"shrink-0 p-2 rounded-xl transition-all hover:scale-110 active:scale-95 " + (isLight ? "text-stone-400 hover:text-amber-600 hover:bg-amber-50" : "text-[#4a3f32] hover:text-amber-500 hover:bg-amber-500/10")}>
        <RefreshCw size={15} className={animating ? "animate-spin" : ""} />
      </button>
    </div>
  );
};

// ArchivoShortcut
const ArchivoShortcut = ({ activeDiet, activeType, activeSize, isLight, lang, typeLabels }) => {
  if (!activeDiet && !activeType && !activeSize) return null;
  const isDiet = !!activeDiet;
  const isTipo = !!activeType;
  const dietCfg = activeDiet ? getDietConfig(activeDiet) : null;
  const typeCfg = activeType ? (TYPE_THEMES[activeType] || { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40" }) : null;
  const sizeCfgFull = activeSize ? SIZE_CATEGORIES.find(s => s.id === activeSize) : null;
  const color = isDiet ? dietCfg.color : isTipo ? typeCfg : sizeCfgFull?.theme;
  const emoji = isDiet ? dietCfg.emoji : isTipo ? "🦕" : (sizeCfgFull?.emoji || "📏");
  const label = isDiet ? getDietLabel(activeDiet, lang) : isTipo ? (typeLabels[activeType] || activeType) : (sizeCfgFull?.label[lang] || sizeCfgFull?.label.es || activeSize);
  const href = isDiet ? `/archivo?diet=${encodeURIComponent(activeDiet)}` : isTipo ? `/archivo?tipo=${encodeURIComponent(activeType)}` : `/archivo?size=${encodeURIComponent(activeSize)}`;
  const filterType = isDiet ? "Dieta" : isTipo ? "Tipo" : ({ es: "Tamaño", en: "Size", fr: "Taille", it: "Dimensione" }[lang] || "Tamaño");
  const count = allAnimals.filter(a => {
    if (isDiet) return a.dieta === activeDiet;
    if (isTipo) return a.tipo === activeType;
    return getSizeCategory(a.longitud) === activeSize;
  }).length;
  return (
    <Link to={href} className={"w-full rounded-xl border px-4 py-3 flex flex-col gap-1.5 transition-all hover:scale-[1.01] group justify-center " + (isLight ? "bg-stone-50 border-stone-200 hover:border-amber-400/40" : "bg-[#0f0e0d] border-[#2a2520] hover:border-amber-600/30")}>
      <div className="flex items-center gap-2">
        <span className={"w-6 h-6 rounded-md flex items-center justify-center text-sm border " + (color?.bg || "") + " " + (color?.border || "")}>{emoji}</span>
        <p className={"text-[10px] uppercase tracking-[0.1em] font-bold " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{filterType} · {count} registros</p>
      </div>
      <div className="flex items-center justify-between gap-1">
        <p className={"text-xs font-black uppercase tracking-wide leading-tight " + (color?.text || "")}>{({ es: "Ver archivo de", en: "Browse", fr: "Voir", it: "Vedi" }[lang] || "Ver archivo de")} {label}</p>
        <ArrowRight size={14} className={"shrink-0 transition-transform group-hover:translate-x-0.5 " + (color?.text || "")} />
      </div>
    </Link>
  );
};

// FilterDropdown
const FilterDropdown = ({ label, emoji, active, activeLabel, onClear, isOpen, onToggle, isLight, children }) => {
  const th = active;
  const listRef = useRef(null);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const check = () => setHasMore(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [isOpen]);
  return (
    <div className="relative">
      <button onClick={onToggle}
        className={"flex items-center gap-2 px-4 py-2.5 rounded-xl border font-black text-xs uppercase tracking-widest transition-all " + (th ? (th.bg + " " + th.border + " " + th.text + " border") : isLight ? "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 border" : "bg-[#0f0e0d] border-[#2a2520] text-[#6b5e4e] hover:border-[#3a3028] border")}>
        <span className="text-sm">{emoji}</span>
        <span>{th ? activeLabel : label}</span>
        {th && (
          <span onClick={(e) => { e.stopPropagation(); onClear(); }} className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity">
            <X size={12} />
          </span>
        )}
        <ChevronDown size={13} className={"transition-transform duration-200 " + (isOpen ? "rotate-180" : "")} />
      </button>
      {isOpen && (
        <div className={"absolute top-full left-0 mt-2 w-64 rounded-xl border shadow-2xl z-[25] overflow-hidden " + (isLight ? "bg-white border-stone-200" : "bg-[#0f0e0d] border-[#2a2520]")}>
          <div ref={listRef} className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto hide-scrollbar">
            {children}
          </div>
          {hasMore && (
            <div className={"absolute bottom-0 left-0 right-0 flex justify-center pb-1.5 pt-4 pointer-events-none " + (isLight ? "bg-gradient-to-t from-white to-transparent" : "bg-gradient-to-t from-[#0f0e0d] to-transparent")}>
              <div className={"flex items-center justify-center w-6 h-6 rounded-full shadow-lg border " + (isLight ? "bg-white border-stone-200 text-stone-400" : "bg-[#1a1614] border-[#2a2520] text-[#4a3f32]")}>
                <ChevronDown size={12} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// SidebarAnimalSorpresa
const SidebarAnimalSorpresa = ({ isLight, lang }) => {
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const pickRandom = (exclude) => {
    const pool = allAnimals.filter(a => a !== exclude);
    return pool[Math.floor(Math.random() * pool.length)];
  };
  useEffect(() => { setAnimal(pickRandom(null)); }, []);
  const handleSurprise = () => {
    setFlipping(true);
    setTimeout(() => { setAnimal(pickRandom(animal)); setFlipping(false); }, 300);
  };
  const labels = { es: ["Aleatorio", "Descubrir", "Otra vez"], en: ["Random", "Discover", "Again"], fr: ["Aléatoire", "Découvrir", "Encore"], it: ["Casuale", "Scopri", "Di nuovo"] };
  const l = labels[lang] || labels.es;
  if (!animal) return null;
  return (
    <div className={"rounded-xl border " + (isLight ? "border-stone-200 bg-white/50" : "border-[#2a2520] bg-[#0c0b0a]/50")}>
      <p className={"text-[9px] uppercase tracking-[0.2em] px-3 pt-3 pb-2 " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{l[0]}</p>
      <div className="relative h-24 overflow-hidden mx-3 rounded-lg mb-2">
        <img src={animal.imagen} alt={animal.nombre}
          className={"w-full h-full object-cover transition-all duration-300 " + (flipping ? "opacity-0 scale-95" : "opacity-100 scale-100")} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className={"absolute bottom-2 left-3 text-[10px] font-black uppercase italic tracking-wide text-white leading-none " + (flipping ? "opacity-0" : "opacity-100 transition-opacity duration-300")}>
          {animal.nombre}
        </p>
      </div>
      <div className={"px-3 pb-1 " + (flipping ? "opacity-0" : "opacity-100 transition-opacity duration-200")}>
        <p className={"text-[9px] uppercase tracking-widest mb-1 " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{animal.era} · {animal.dieta}</p>
      </div>
      <div className="px-3 pb-3 flex gap-2 mt-1">
        <button onClick={() => navigate("/animal/" + encodeURIComponent(animal.nombre.toLowerCase()))}
          className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors">
          {l[1]}
        </button>
        <button onClick={handleSurprise}
          className={"py-2 px-3 text-[10px] rounded-lg border transition-all hover:scale-105 active:scale-95 " + (isLight ? "border-stone-200 text-stone-500 hover:border-amber-400 hover:text-amber-600" : "border-[#2a2520] text-[#6b5e4e] hover:border-amber-600/40 hover:text-amber-500")}>
          <RefreshCw size={13} className={flipping ? "animate-spin" : ""} />
        </button>
      </div>
    </div>
  );
};

// SidebarTopFavoritos
const SidebarTopFavoritos = ({ isLight, lang }) => {
  const [topList, setTopList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await apiClient.get("/top-favorites?limit=4");
        const enriched = res.data.map(({ id, nombre, count }) => {
          const animal = allAnimals.find(a => String(a.id) === String(id));
          return animal ? { ...animal, count } : null;
        }).filter(Boolean);
        setTopList(enriched);
      } catch { setTopList([]); }
      finally { setLoading(false); }
    };
    fetch_();
  }, []);
  const labels = {
    title:   { es: "Top favoritos", en: "Top favorites", fr: "Top favoris", it: "Top preferiti" },
    empty:   { es: "Sin datos aún", en: "No data yet", fr: "Pas encore de données", it: "Nessun dato ancora" },
    viewAll: { es: "Ver todos", en: "View all", fr: "Voir tout", it: "Vedi tutti" },
    users:   { es: "usuarios", en: "users", fr: "utilisateurs", it: "utenti" },
  };
  return (
    <div className={"rounded-xl border " + (isLight ? "border-stone-200 bg-white/50" : "border-[#2a2520] bg-[#0c0b0a]/50")}>
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <p className={"text-[12px] uppercase tracking-[0.2em] " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{labels.title[lang] || labels.title.es}</p>
        {topList.length > 0 && (
          <Link to="/archivo" className="text-[9px] uppercase tracking-widest font-bold text-amber-600 hover:text-amber-500 transition-colors">
            {labels.viewAll[lang] || labels.viewAll.es} →
          </Link>
        )}
      </div>
      {loading ? (
        <div className="px-4 pb-4 flex gap-1.5">
          {[1,2,3,4].map(i => <div key={i} className={"h-10 flex-1 rounded-lg animate-pulse " + (isLight ? "bg-stone-100" : "bg-white/5")} />)}
        </div>
      ) : topList.length === 0 ? (
        <p className={"px-4 pb-4 text-[10px] " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{labels.empty[lang] || labels.empty.es}</p>
      ) : (
        <div className="px-3 pb-3 flex flex-col gap-1.5">
          {topList.map((a, i) => (
            <Link key={a.id} to={"/animal/" + encodeURIComponent(a.nombre.toLowerCase())}
              className={"flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all group/fav " + (isLight ? "hover:bg-amber-50" : "hover:bg-amber-600/5")}>
              <span className={"text-[12px] font-black font-mono w-4 shrink-0 " + (i === 0 ? "text-amber-500" : isLight ? "text-stone-300" : "text-[#3a3028]")}>{i + 1}</span>
              <img src={a.imagen} alt={a.nombre} className={"w-8 h-8 rounded-lg object-cover border shrink-0 " + (isLight ? "border-stone-200" : "border-[#2a2520]")} />
              <div className="min-w-0 flex-1">
                <p className={"text-[12px] font-black uppercase italic truncate group-hover/fav:text-amber-500 transition-colors " + (isLight ? "text-stone-800" : "text-[#f5e6c8]")}>{a.nombre}</p>
                <p className={"text-[11px] uppercase tracking-wide " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{a.count} {labels.users[lang] || labels.users.es}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// LandingPage
const LandingPage = () => {
  const [activeDiet, setActiveDiet] = useState("");
  const [activeType, setActiveType] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dietOpen, setDietOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const filtersRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const { theme, language: lang } = useUser();
  const isLight = theme === "light";
  const { t, tSection } = useTranslation();
  const lnd = tSection("landing");
  const typeLabels = tSection("typeLabels");

  const [headerHeight, setHeaderHeight] = useState(112);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      if (header) setHeaderHeight(header.getBoundingClientRect().height);
      if (footer) setFooterHeight(footer.getBoundingClientRect().height);
    };
    measure();
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(timer); window.removeEventListener("resize", measure); };
  }, []);

  const usedDiets = Object.keys(DIET_CONFIG).filter((diet) => allAnimals.some((a) => a.dieta === diet));
  const activeSizeCfg = SIZE_CATEGORIES.find(s => s.id === activeSize);

  useEffect(() => {
    if (searchTerm || activeDiet || activeType || activeSize) setShowDropdown(true);
  }, [searchTerm, activeDiet, activeType, activeSize]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) { setDietOpen(false); setTypeOpen(false); setSizeOpen(false); }
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") { setSearchTerm(""); setActiveDiet(""); setActiveType(""); setActiveSize(""); setDietOpen(false); setTypeOpen(false); setSizeOpen(false); setShowDropdown(false); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("mousedown", handleClickOutside); document.removeEventListener("keydown", handleKeyDown); };
  }, []);

  useEffect(() => {
    if (location.state?.logoutSuccess) {
      setShowLogoutMsg(true);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowLogoutMsg(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const eras = [
    { id: "paleozoico", name: "PALEOZOICO", age: "541 - 252 m.a.", image: "https://media.istockphoto.com/id/1144091536/es/foto/criaturas-del-período-cámbrico-escena-submarina-con-anomalocaris-opabinia-hallucigenia-pirania.jpg?s=612x612&w=0&k=20&c=XD683S0yCOb2WhXsT3iRx5XGVS7jCNjS3EN4SK0e7uA=", desc: lnd.eras?.paleozoico?.desc },
    { id: "mesozoico",  name: "MESOZOICO",  age: "252 - 66 m.a.",  image: "https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg", desc: lnd.eras?.mesozoico?.desc },
    { id: "cenozoico",  name: "CENOZOICO",  age: "66 m.a. - " + t("landing.today", {}), image: "https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg", desc: lnd.eras?.cenozoico?.desc },
  ];

  const availableTypes = [...new Set(allAnimals.map((a) => a.tipo).filter(Boolean))].sort();

  const filteredDinos = Array.from(
    new Map(allAnimals.map((dino) => [dino.nombre.toLowerCase(), dino])).values()
  ).filter((dino) => {
    const search = searchTerm.toLowerCase().trim();
    const matchSearch = !search || dino.nombre.toLowerCase().startsWith(search);
    const matchDiet = !activeDiet || dino.dieta === activeDiet;
    const matchType = !activeType || dino.tipo === activeType;
    const matchSize = !activeSize || getSizeCategory(dino.longitud) === activeSize;
    return matchSearch && matchDiet && matchType && matchSize;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 8);

  const showResults = showDropdown && (searchTerm || activeDiet || activeType || activeSize);
  const hasFilter = !!(activeDiet || activeType || activeSize);
  const anyFilter = hasFilter;

  return (
    <div className={"min-h-screen font-mono transition-colors duration-500 " + (isLight ? "bg-[#f7f3ee] text-stone-900" : "bg-[#0c0b0a] text-[#f5e6c8]")}>

      {/* Logout toast */}
      <div className={"fixed left-0 right-0 z-[40] mx-auto w-full max-w-md px-4 transition-all duration-700 pointer-events-none " + (showLogoutMsg ? "top-32 opacity-100 scale-100" : "top-0 opacity-0 scale-95")}>
        <div className={"border border-amber-600/40 backdrop-blur-md rounded-xl shadow-2xl pointer-events-auto overflow-hidden " + (isLight ? "bg-white/95" : "bg-[#1a1614]/95")}>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-amber-500" size={18} />
              <div>
                <p className={"font-bold text-[11px] uppercase tracking-wider " + (isLight ? "text-stone-900" : "text-[#f5e6c8]")}>{lnd.logoutTitle}</p>
                <p className={"text-[9px] uppercase tracking-widest " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{lnd.logoutSub}</p>
              </div>
            </div>
            <button onClick={() => setShowLogoutMsg(false)} className={"transition-colors " + (isLight ? "text-stone-400 hover:text-amber-600" : "text-[#4a3f32] hover:text-amber-500")}><X size={16} /></button>
          </div>
          <div className="h-[2px] w-full bg-stone-800">
            <div className={"h-full bg-amber-600 transition-all ease-linear " + (showLogoutMsg ? "w-0 duration-[5000ms]" : "w-full duration-0")} />
          </div>
        </div>
      </div>

      {/* Layout: dos columnas independientes */}
      <div className={"flex overflow-hidden " + (isLight ? "bg-[#f0ebe3]" : "bg-[#0f0e0c]")}
        style={{ height: `calc(120vh - ${headerHeight}px - ${footerHeight}px + 53.2px)` }}>

        {/* ── Sidebar ── */}
        <aside className={"hidden lg:flex w-[300px] shrink-0 flex-col overflow-y-auto overflow-x-hidden hide-scrollbar border-r " + (isLight ? "bg-[#f0ebe3] border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]")}>
          <div className="flex flex-col gap-5 px-6 py-7 min-h-full">

            {/* Logo */}
            <div>
              <div className="w-9 h-[3px] bg-amber-600 mb-4" />
              <p className={"text-[10px] tracking-[0.2em] uppercase mb-1 " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>PaleoArchivo</p>
              <p className={"text-[11px] leading-relaxed " + (isLight ? "text-stone-500" : "text-[#4a3f32]")}>
                {{ es: "Registro digital de vida prehistórica", en: "Digital record of prehistoric life", fr: "Registre numérique de la vie préhistorique", it: "Registro digitale della vita preistorica" }[lang] || "Registro digital de vida prehistórica"}
              </p>
            </div>

            {/* Stats */}
            <div className={"rounded-xl border p-3.5 " + (isLight ? "border-stone-200 bg-white/50" : "border-[#2a2520] bg-[#0c0b0a]/50")}>
              <p className={"text-[9px] uppercase tracking-[0.2em] mb-2.5 " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>
                {{ es: "El archivo", en: "The archive", fr: "L'archive", it: "L'archivio" }[lang] || "El archivo"}
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { v: allAnimals.length, l: { es: "especies catalogadas", en: "catalogued species", fr: "espèces cataloguées", it: "specie catalogate" } },
                  { v: "16", l: { es: "periodos geológicos", en: "geological periods", fr: "périodes géologiques", it: "periodi geologici" } },
                  { v: Object.keys(DIET_CONFIG).length, l: { es: "tipos de dieta", en: "diet types", fr: "types de régime", it: "tipi di dieta" } },
                  { v: "4Ga", l: { es: "años de historia", en: "years of history", fr: "ans d'histoire", it: "anni di storia" } },
                ].map(({ v, l }) => (
                  <div key={String(v)} className="flex items-baseline justify-between gap-2">
                    <span className={"text-[10px] leading-snug " + (isLight ? "text-stone-500" : "text-[#6b5e4e]")}>{l[lang] || l.es}</span>
                    <span className="text-amber-600 font-black text-sm font-mono shrink-0">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <SidebarAnimalSorpresa isLight={isLight} lang={lang} />
            <SidebarTopFavoritos isLight={isLight} lang={lang} />

            {/* ── Cronología rediseñada ── */}
            <SidebarCronologia isLight={isLight} lang={lang} />

            {/* Dots */}
            <div className="flex gap-2 items-center">
              <div className="w-6 h-[3px] bg-amber-600 rounded-full" />
              {[1,2,3,4].map(i => (<div key={i} className={"w-2 h-[3px] rounded-full " + (isLight ? "bg-stone-200" : "bg-[#2a2520]")} />))}
            </div>

            {/* Cráneo */}
            <div className="flex justify-center pt-6 pb-2 pointer-events-none select-none">
              <img src={BrachioSkull} alt="" className={"w-40 h-40 object-contain grayscale " + (isLight ? "opacity-[0.06]" : "opacity-[0.08]")} />
            </div>

          </div>
        </aside>

        {/* Barra móvil/tablet */}
        <div className={"lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t px-4 py-3 flex items-center justify-between gap-4 " + (isLight ? "bg-[#f0ebe3]/95 border-stone-200 backdrop-blur-sm" : "bg-[#0f0e0c]/95 border-[#2a2520] backdrop-blur-sm")}>
          <div className="flex items-center gap-4">
            {[
              { v: allAnimals.length, l: { es: "spp.", en: "spp.", fr: "esp.", it: "spp." } },
              { v: "16",              l: { es: "per.", en: "per.", fr: "pér.", it: "per." } },
            ].map(({ v, l }) => (
              <div key={String(v)} className="flex items-baseline gap-1">
                <span className="text-amber-600 font-black text-sm font-mono">{v}</span>
                <span className={"text-[9px] uppercase tracking-wide " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{l[lang] || l.es}</span>
              </div>
            ))}
          </div>
          <div className={"w-px h-5 " + (isLight ? "bg-stone-200" : "bg-[#2a2520]")} />
          <Link to="/archivo" className={"flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors group " + (isLight ? "text-stone-500 hover:text-amber-600" : "text-[#6b5e4e] hover:text-amber-500")}>
            {{ es: "Archivo", en: "Archive", fr: "Archive", it: "Archivio" }[lang] || "Archivo"}
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Contenido principal */}
        <div className={"flex-1 overflow-y-auto overflow-x-hidden px-6 lg:px-6 pt-8 pb-20 min-w-0 " + (isLight ? "bg-[#f7f3ee]" : "bg-[#0c0b0a]")}>

          {/* Cabecera */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[3px] bg-amber-600" />
              <p className={"text-[10px] tracking-[0.2em] uppercase " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>
                Archivo Paleontológico
              </p>
            </div>
            <h1 className={"text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-3 uppercase " + (isLight ? "text-stone-900" : "text-[#f5e6c8]")}>
              {lnd.heroTitle}{" "}<span className="text-amber-600">{lnd.heroTitleAccent}</span>
            </h1>
            <p className={"text-sm leading-relaxed max-w-xl " + (isLight ? "text-stone-500" : "text-[#6b5e4e]")}>
              {lnd.heroSubtitle}
            </p>
          </div>

          <div className={"h-px w-full mb-8 " + (isLight ? "bg-stone-200" : "bg-[#2a2520]")} />

          {/* Buscador */}
          <div className="flex gap-3 items-stretch mb-3" ref={searchRef}>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className={"transition-colors " + (searchTerm ? "text-amber-500" : isLight ? "text-stone-400" : "text-[#4a3f32]")} size={20} />
              </div>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lnd.searchPlaceholder?.toUpperCase() || "BUSCAR EN EL ARCHIVO..."}
                className={"w-full border rounded-xl py-4 pl-14 pr-12 text-sm font-mono tracking-widest focus:outline-none focus:border-amber-600/50 transition-all uppercase " + (isLight ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300" : "bg-[#0f0e0d] border-[#2a2520] text-[#f5e6c8] placeholder:text-[#2a2520] focus:border-amber-600")}
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(""); if (!anyFilter) setShowDropdown(false); }}
                  className={"absolute inset-y-0 right-5 flex items-center transition-colors " + (isLight ? "text-stone-400 hover:text-amber-600" : "text-[#4a3f32] hover:text-amber-500")}>
                  <X size={18} />
                </button>
              )}
              {showResults && (
                <div className={"absolute top-full left-0 w-full mt-2 rounded-xl border shadow-2xl overflow-y-auto max-h-[380px] hide-scrollbar " + (isLight ? "bg-white border-stone-200" : "bg-[#0f0e0d] border-[#2a2520]")}
                  style={{ zIndex: 100 }}>
                  {filteredDinos.length > 0 ? filteredDinos.map((dino) => {
                    const th = getDietConfig(dino.dieta).color;
                    return (
                      <Link key={dino.id} to={"/animal/" + encodeURIComponent(dino.nombre.toLowerCase())}
                        className={"flex items-center justify-between p-4 transition-colors border-b last:border-none group/item " + (isLight ? "hover:bg-amber-50 border-stone-100" : "hover:bg-amber-600/5 border-[#1a1614]")}>
                        <div className="flex items-center gap-4">
                          <img src={dino.imagen} alt={dino.nombre} className={"w-11 h-11 object-cover rounded-xl border " + (isLight ? "border-stone-200" : "border-[#2a2520]")} />
                          <div className="text-left">
                            <p className={"font-black uppercase italic group-hover/item:text-amber-500 transition-colors text-sm " + (isLight ? "text-stone-900" : "text-[#f5e6c8]")}>{dino.nombre}</p>
                            <p className={"text-[10px] uppercase tracking-widest mt-0.5 " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{dino.subName}</p>
                          </div>
                        </div>
                        <span className={"text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-tighter shrink-0 " + th.bg + " " + th.text + " " + th.border}>{getDietLabel(dino.dieta, lang)}</span>
                      </Link>
                    );
                  }) : <div className={"p-5 text-sm uppercase tracking-[0.2em] " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>{lnd.noResults}</div>}
                </div>
              )}
            </div>
            {hasFilter && (
              <div className="shrink-0 w-52 hidden sm:block">
                <ArchivoShortcut activeDiet={activeDiet} activeType={activeType} activeSize={activeSize} isLight={isLight} lang={lang} typeLabels={typeLabels} />
              </div>
            )}
          </div>

          {/* Filtros */}
          <div className="mb-4" ref={filtersRef}>
            <div className="flex items-center gap-2 flex-wrap">
              <FilterDropdown label={lnd.filterDiets || "Dietas"} emoji="🦴" active={activeDiet ? getDietConfig(activeDiet).color : null} activeLabel={getDietLabel(activeDiet, lang)} onClear={() => setActiveDiet("")} isOpen={dietOpen} onToggle={() => { setDietOpen(d => !d); setTypeOpen(false); setSizeOpen(false); }} isLight={isLight}>
                {usedDiets.map((dieta) => {
                  const cfg = getDietConfig(dieta); const th = cfg.color; const isActive = activeDiet === dieta;
                  return (<button key={dieta} onClick={() => { setActiveDiet(isActive ? "" : dieta); setDietOpen(false); }} className={"flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide " + (isActive ? th.bg + " " + th.border + " " + th.text : "border-transparent " + th.hoverBg + " " + th.hoverText + " " + th.hoverBorder + " " + (isLight ? "text-stone-600" : "text-[#6b5e4e]"))}><span className="text-base shrink-0">{cfg.emoji}</span><span>{getDietLabel(dieta, lang)}</span></button>);
                })}
              </FilterDropdown>
              <FilterDropdown label={lnd.filterTypes || "Tipos"} emoji="🦕" active={activeType ? TYPE_THEMES[activeType] : null} activeLabel={typeLabels[activeType] || activeType} onClear={() => setActiveType("")} isOpen={typeOpen} onToggle={() => { setTypeOpen(t => !t); setDietOpen(false); setSizeOpen(false); }} isLight={isLight}>
                {availableTypes.map((tipo) => {
                  const th = TYPE_THEMES[tipo] || { text: "text-stone-400", bg: "bg-stone-400/10", border: "border-stone-400/40", hoverBg: "hover:bg-stone-400/10", hoverText: "hover:text-stone-300", hoverBorder: "hover:border-stone-400/40" }; const isActive = activeType === tipo;
                  return (<button key={tipo} onClick={() => { setActiveType(isActive ? "" : tipo); setTypeOpen(false); }} className={"flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide " + (isActive ? th.bg + " " + th.border + " " + th.text : "border-transparent " + th.hoverBg + " " + th.hoverText + " " + th.hoverBorder + " " + (isLight ? "text-stone-600" : "text-[#6b5e4e]"))}><span className={"w-2 h-2 rounded-full shrink-0 border " + th.bg + " " + th.border} /><span>{typeLabels[tipo] || tipo}</span></button>);
                })}
              </FilterDropdown>
              <FilterDropdown label={({ es: "Tamaño", en: "Size", fr: "Taille", it: "Dimensione" }[lang] || "Tamaño")} emoji="📏" active={activeSizeCfg ? activeSizeCfg.theme : null} activeLabel={activeSizeCfg ? (activeSizeCfg.label[lang] || activeSizeCfg.label.es) : ""} onClear={() => setActiveSize("")} isOpen={sizeOpen} onToggle={() => { setSizeOpen(s => !s); setDietOpen(false); setTypeOpen(false); }} isLight={isLight}>
                {SIZE_CATEGORIES.map((size) => {
                  const th = size.theme; const isActive = activeSize === size.id; const label = size.label[lang] || size.label.es;
                  return (<button key={size.id} onClick={() => { setActiveSize(isActive ? "" : size.id); setSizeOpen(false); }} className={"flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide " + (isActive ? th.bg + " " + th.border + " " + th.text : "border-transparent " + th.hoverBg + " " + th.hoverText + " " + th.hoverBorder + " " + (isLight ? "text-stone-600" : "text-[#6b5e4e]"))}><span className="text-base shrink-0">{size.emoji}</span><span>{label}</span></button>);
                })}
              </FilterDropdown>
              {anyFilter && (
                <button onClick={() => { setActiveDiet(""); setActiveType(""); setActiveSize(""); if (!searchTerm) setShowDropdown(false); }}
                  className={"flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all " + (isLight ? "text-stone-400 hover:text-stone-600" : "text-[#4a3f32] hover:text-[#6b5e4e]")}>
                  <X size={14} /> {lnd.clearFilters || "Limpiar"}
                </button>
              )}
            </div>
          </div>

          {/* ArchivoShortcut móvil */}
          {hasFilter && (
            <div className="sm:hidden mb-6">
              <ArchivoShortcut activeDiet={activeDiet} activeType={activeType} activeSize={activeSize} isLight={isLight} lang={lang} typeLabels={typeLabels} />
            </div>
          )}

          {/* Dato curioso */}
          <div className="mb-8 max-w-2xl">
            <DatoCurioso isLight={isLight} lang={lang} />
          </div>

          {/* Divisor con label */}
          <div className="flex items-center gap-3 mb-6">
            <div className={"flex-1 h-px " + (isLight ? "bg-stone-200" : "bg-[#2a2520]")} />
            <span className={"text-[10px] tracking-[0.2em] uppercase " + (isLight ? "text-stone-400" : "text-[#4a3f32]")}>
              {{ es: "Selecciona una era", en: "Select an era", fr: "Sélectionnez une ère", it: "Seleziona un'era" }[lang] || "Selecciona una era"}
            </span>
            <div className={"flex-1 h-px " + (isLight ? "bg-stone-200" : "bg-[#2a2520]")} />
          </div>

          {/* Era Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
            {eras.map((era) => (
              <EraCard key={era.id} id={era.id} name={era.name} age={era.age} image={era.image}>{era.desc}</EraCard>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
