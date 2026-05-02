// src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import EraCard from "../components/EraCard";
import { allAnimals } from "../data/allData";
import { DIET_CONFIG, getDietConfig, getDietLabel } from "../data/dietConfig";
import {
  Search, X, ShieldCheck, ChevronDown, Lightbulb, RefreshCw, ArrowRight,
} from "lucide-react";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";

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

// ── Tamaños ───────────────────────────────────────────────────────────────
const SIZE_CATEGORIES = [
  { id: "pequeño", label: { es: "Pequeño", en: "Small",  fr: "Petit", it: "Piccolo" }, emoji: "🔬", theme: { text: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/40",  hoverBg: "hover:bg-green-400/10",  hoverText: "hover:text-green-300",  hoverBorder: "hover:border-green-400/40"  } },
  { id: "mediano", label: { es: "Mediano", en: "Medium", fr: "Moyen", it: "Medio"   }, emoji: "📏", theme: { text: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/40",   hoverBg: "hover:bg-blue-400/10",   hoverText: "hover:text-blue-300",   hoverBorder: "hover:border-blue-400/40"   } },
  { id: "grande",  label: { es: "Grande",  en: "Large",  fr: "Grand", it: "Grande"  }, emoji: "📐", theme: { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/40", hoverBg: "hover:bg-orange-400/10", hoverText: "hover:text-orange-300", hoverBorder: "hover:border-orange-400/40" } },
  { id: "gigante", label: { es: "Gigante", en: "Giant",  fr: "Géant", it: "Gigante" }, emoji: "🦕", theme: { text: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/40",    hoverBg: "hover:bg-red-400/10",    hoverText: "hover:text-red-300",    hoverBorder: "hover:border-red-400/40"    } },
];

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

const getSizeCategory = (longitud) => {
  const metros = parseLongitudMetros(longitud);
  if (metros === null) return null;
  if (metros < 1)  return "pequeño";
  if (metros < 5)  return "mediano";
  if (metros < 12) return "grande";
  return "gigante";
};

const DATOS_CURIOSOS = [
  { emoji: "🦕", texto: "El Argentinosaurus pesaba más de 70 toneladas — más que 10 elefantes africanos juntos." },
  { emoji: "🦴", texto: "Los huesos de los dinosaurios tenían cavidades de aire, igual que los pájaros modernos." },
  { emoji: "🌋", texto: "La extinción del Cretácico-Paleógeno fue causada por un asteroide de ~10 km de diámetro." },
  { emoji: "🐦", texto: "Las aves son dinosaurios. Técnicamente, los dinosaurios no se extinguieron del todo." },
  { emoji: "🦷", texto: "El T. rex renovaba sus dientes cada 1-2 años. Tenía hasta 60 dientes a la vez." },
  { emoji: "🧠", texto: "El Estegosaurio tenía un cerebro del tamaño de una nuez pese a medir 9 metros." },
  { emoji: "⚡", texto: "El Velocirraptor era en realidad del tamaño de un pavo, no como en Jurassic Park." },
  { emoji: "🌊", texto: "El Mosasaurio podía nadar a más de 30 km/h y alcanzar los 17 metros de longitud." },
  { emoji: "🕰️", texto: "El período entre T. rex y el Estegosaurio es mayor que entre T. rex y nosotros." },
  { emoji: "🪨", texto: "El primer fósil de dinosaurio reconocido oficialmente fue descrito en 1824 por William Buckland." },
  { emoji: "🌡️", texto: "El Mesozoico era tan cálido que no había casquetes polares. Los cocodrilos vivían en el Ártico." },
  { emoji: "🥚", texto: "Se han encontrado huevos de dinosaurio con embriones perfectamente conservados en Mongolia." },
  { emoji: "🔵", texto: "El Anomalocaris del Cámbrico era el depredador apex de su era, hace 520 millones de años." },
  { emoji: "💨", texto: "El Pterosaurio Quetzalcoatlus tenía una envergadura de hasta 10-11 metros — como una avioneta." },
  { emoji: "🧬", texto: "El ADN no sobrevive más de 1,5 millones de años. Clonar dinosaurios como en JP es imposible." },
  { emoji: "🐠", texto: "El Coelacanthe, un pez que se creía extinto hace 65 Ma, fue redescubierto vivo en 1938." },
  { emoji: "🏔️", texto: "Los Himalayas aún no existían cuando caminaban los últimos dinosaurios no aviares." },
  { emoji: "🦂", texto: "Los escorpiones llevan prácticamente sin cambiar más de 430 millones de años en la Tierra." },
  { emoji: "🌿", texto: "El oxígeno atmosférico llegó al 35% en el Carbonífero. Por eso existían libélulas de 70 cm de envergadura." },
  { emoji: "🦈", texto: "El Megalodon tenía dientes de 18 cm. Se extinguió hace apenas 3,6 millones de años, no en la era de los dinosaurios." },
  { emoji: "🐘", texto: "El Paraceratherium, pariente del rinoceronte, es el mamífero terrestre más grande conocido: 5 metros de alto." },
  { emoji: "🧊", texto: "Durante el Pleistoceno hubo al menos 5 glaciaciones mayores. El último máximo glacial fue hace solo 20.000 años." },
  { emoji: "🐍", texto: "La serpiente Titanoboa del Paleoceno medía hasta 13 metros y pesaba más de 1.100 kg." },
  { emoji: "👁️", texto: "El Anomalocaris tenía ojos compuestos con hasta 16.000 lentes — una de las visiones más complejas del Cámbrico." },
  { emoji: "🌍", texto: "Hace 250 millones de años toda la tierra emergida estaba unida en un solo supercontinente: Pangea." },
  { emoji: "💀", texto: "La Gran Mortandad del Pérmico eliminó el 96% de las especies marinas y el 70% de las terrestres." },
  { emoji: "🐊", texto: "Los cocodrilos han sobrevivido 5 extinciones masivas. Su morfología lleva 80 millones de años casi sin cambios." },
  { emoji: "🔭", texto: "El cráter de Chicxulub, causante de la extinción del Cretácico, mide 180 km de diámetro y está en México." },
  { emoji: "🦣", texto: "Los mamuts lanudos convivieron con las pirámides de Egipto. Los últimos vivieron en la isla Wrangel hace 4.000 años." },
  { emoji: "🐋", texto: "Las ballenas descienden de un mamífero terrestre de 4 patas llamado Pakicetus que vivió hace 50 millones de años." },
  { emoji: "🌱", texto: "Las plantas con flores (angiospermas) no aparecieron hasta el Cretácico. Los dinosaurios nunca vieron una manzana." },
  { emoji: "⚗️", texto: "Los trilobites tenían ojos de calcita cristalina — los primeros ojos complejos de la historia evolutiva." },
  { emoji: "🦅", texto: "El Argentavis magnificens del Mioceno tenía 7 metros de envergadura. Es el ave voladora más grande conocida." },
  { emoji: "🌙", texto: "La Luna era más cercana en el Precámbrico. Los días duraban solo 18 horas hace 1.400 millones de años." },
  { emoji: "🐢", texto: "Las tortugas llevan 220 millones de años con el mismo diseño de caparazón. Sobrevivieron a los dinosaurios." },
  { emoji: "🔬", texto: "El 99,9% de todas las especies que han existido en la Tierra ya están extintas. Los actuales somos la excepción." },
];

const getRandomFact = (exclude = -1) => {
  let idx;
  do { idx = Math.floor(Math.random() * DATOS_CURIOSOS.length); } while (idx === exclude && DATOS_CURIOSOS.length > 1);
  return { ...DATOS_CURIOSOS[idx], idx };
};

// ── DatoCurioso ───────────────────────────────────────────────────────────
const DatoCurioso = ({ isLight }) => {
  const [fact, setFact] = useState(() => getRandomFact());
  const [animating, setAnimating] = useState(false);

  const nextFact = () => {
    setAnimating(true);
    setTimeout(() => { setFact(getRandomFact(fact.idx)); setAnimating(false); }, 250);
  };

  return (
    <div className={`w-full rounded-2xl border px-5 py-4 flex items-center gap-4 transition-all duration-300
      ${isLight ? "bg-white border-stone-200" : "bg-white/5 border-white/10"}`}>
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
        ${isLight ? "bg-amber-50" : "bg-amber-500/10"}`}>
        <Lightbulb size={17} className="text-amber-500" />
      </div>
      <div className={`flex-1 text-left transition-opacity duration-250 ${animating ? "opacity-0" : "opacity-100"}`}>
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-amber-600 mb-0.5">Dato curioso</p>
        <p className={`text-sm font-mono leading-snug ${isLight ? "text-stone-700" : "text-stone-300"}`}>
          <span className="mr-1.5">{fact.emoji}</span>{fact.texto}
        </p>
      </div>
      <button onClick={nextFact}
        className={`shrink-0 p-2 rounded-xl transition-all hover:scale-110 active:scale-95
          ${isLight ? "text-stone-400 hover:text-amber-600 hover:bg-amber-50" : "text-stone-600 hover:text-amber-500 hover:bg-amber-500/10"}`}
        title="Otro dato">
        <RefreshCw size={15} className={animating ? "animate-spin" : ""} />
      </button>
    </div>
  );
};

// ── ArchivoShortcut ───────────────────────────────────────────────────────
const ArchivoShortcut = ({ activeDiet, activeType, activeSize, isLight, lang, typeLabels }) => {
  if (!activeDiet && !activeType && !activeSize) return null;

  const isDiet = !!activeDiet;
  const isTipo = !!activeType;
  const isSize = !!activeSize;

  const dietCfg   = activeDiet ? getDietConfig(activeDiet) : null;
  const typeCfg   = activeType ? (TYPE_THEMES[activeType] || { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40" }) : null;
  const sizeCfgFull = activeSize ? SIZE_CATEGORIES.find(s => s.id === activeSize) : null;
  const sizeCfg   = sizeCfgFull?.theme;

  const color = isDiet ? dietCfg.color : isTipo ? typeCfg : sizeCfg;
  const emoji = isDiet ? dietCfg.emoji : isTipo ? "🦕" : (sizeCfgFull?.emoji || "📏");
  const label = isDiet
    ? getDietLabel(activeDiet, lang)
    : isTipo
      ? (typeLabels[activeType] || activeType)
      : (sizeCfgFull?.label[lang] || sizeCfgFull?.label.es || activeSize);
  const href = isDiet
    ? `/archivo?diet=${encodeURIComponent(activeDiet)}`
    : isTipo
      ? `/archivo?tipo=${encodeURIComponent(activeType)}`
      : `/archivo?size=${encodeURIComponent(activeSize)}`;
  const filterType = isDiet ? "Dieta" : isTipo ? "Tipo" : { es: "Tamaño", en: "Size", fr: "Taille", it: "Dimensione" }[lang] || "Tamaño";
  const count = allAnimals.filter(a => {
    if (isDiet) return a.dieta === activeDiet;
    if (isTipo) return a.tipo === activeType;
    return getSizeCategory(a.longitud) === activeSize;
  }).length;

  return (
    <Link to={href}
      className={`w-full rounded-2xl border px-4 py-3 flex flex-col gap-1.5 transition-all hover:scale-[1.01] group justify-center
        ${isLight ? "bg-white border-stone-200 hover:border-amber-400/40" : "bg-white/5 border-white/10 hover:border-amber-500/30"}`}>
      <div className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-sm ${color?.bg} ${color?.border} border`}>
          {emoji}
        </span>
        <p className={`text-[10px] uppercase tracking-[0.1em] font-bold ${isLight ? "text-stone-400" : "text-stone-500"}`}>
          {filterType} · {count} registros
        </p>
      </div>
      <div className="flex items-center justify-between gap-1">
        <p className={`text-xs font-black uppercase tracking-wide leading-tight ${color?.text}`}>
          Ver archivo de {label}
        </p>
        <ArrowRight size={14} className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${color?.text}`} />
      </div>
    </Link>
  );
};

// ── FilterDropdown ────────────────────────────────────────────────────────
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
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-all
          ${th
            ? `${th.bg} ${th.border} ${th.text}`
            : isLight
              ? "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
              : "bg-white/5 border-white/10 text-stone-400 hover:border-white/25"
          }`}>
        <span className="text-sm">{emoji}</span>
        <span>{th ? activeLabel : label}</span>
        {th && (
          <span onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity">
            <X size={12} />
          </span>
        )}
        <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl border-2 shadow-2xl z-[25] overflow-hidden
          ${isLight ? "bg-white border-stone-200" : "bg-[#1a1614] border-white/10"}`}>
          <div ref={listRef} className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto hide-scrollbar">
            {children}
          </div>
          {hasMore && (
            <div className={`absolute bottom-0 left-0 right-0 flex justify-center pb-1.5 pt-4 pointer-events-none
              ${isLight ? "bg-gradient-to-t from-white to-transparent" : "bg-gradient-to-t from-[#1a1614] to-transparent"}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded-full shadow-lg border
                ${isLight ? "bg-white border-stone-200 text-stone-400" : "bg-[#2a2520] border-white/10 text-stone-400"}`}>
                <ChevronDown size={12} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── LandingPage ───────────────────────────────────────────────────────────
const LandingPage = () => {
  const [activeDiet, setActiveDiet]     = useState("");
  const [activeType, setActiveType]     = useState("");
  const [activeSize, setActiveSize]     = useState("");
  const [searchTerm, setSearchTerm]     = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dietOpen, setDietOpen]         = useState(false);
  const [typeOpen, setTypeOpen]         = useState(false);
  const [sizeOpen, setSizeOpen]         = useState(false);
  const filtersRef = useRef(null);
  const searchRef  = useRef(null);
  const location   = useLocation();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const { theme, lang } = useUser();
  const isLight = theme === "light";
  const { t, tSection } = useTranslation();
  const lnd        = tSection("landing");
  const typeLabels = tSection("typeLabels");

  const usedDiets = Object.keys(DIET_CONFIG).filter((diet) =>
    allAnimals.some((a) => a.dieta === diet)
  );

  const activeSizeCfg = SIZE_CATEGORIES.find(s => s.id === activeSize);

  useEffect(() => {
    if (searchTerm || activeDiet || activeType || activeSize) setShowDropdown(true);
  }, [searchTerm, activeDiet, activeType, activeSize]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) {
        setDietOpen(false); setTypeOpen(false); setSizeOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchTerm(""); setActiveDiet(""); setActiveType(""); setActiveSize("");
        setDietOpen(false); setTypeOpen(false); setSizeOpen(false); setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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
    { id: "mesozoico",  name: "MESOZOICO",  age: "252 - 66 m.a.",  image: "https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg", desc: lnd.eras?.mesozoico?.desc  },
    { id: "cenozoico",  name: "CENOZOICO",  age: "66 m.a. - " + t("landing.today", {}), image: "https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg", desc: lnd.eras?.cenozoico?.desc  },
  ];

  const availableTypes = [...new Set(allAnimals.map((a) => a.tipo).filter(Boolean))].sort();

  const filteredDinos = Array.from(
    new Map(allAnimals.map((dino) => [dino.nombre.toLowerCase(), dino])).values()
  ).filter((dino) => {
    const search = searchTerm.toLowerCase().trim();
    const matchSearch = !search || dino.nombre.toLowerCase().startsWith(search);
    const matchDiet   = !activeDiet || dino.dieta === activeDiet;
    const matchType   = !activeType || dino.tipo === activeType;
    const matchSize   = !activeSize || getSizeCategory(dino.longitud) === activeSize;
    return matchSearch && matchDiet && matchType && matchSize;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 8);

  const showResults = showDropdown && (searchTerm || activeDiet || activeType || activeSize);
  const hasFilter   = !!(activeDiet || activeType || activeSize);
  const anyFilter   = hasFilter;

  return (
    <div className={`min-h-screen flex flex-col px-4 pt-4 pb-20 relative isolate transition-colors duration-500
      ${isLight ? "bg-[#f5f2ed] text-stone-900" : "bg-[#141210] text-white"}`}>

      {/* Mensaje logout */}
      <div className={`fixed left-0 right-0 z-[40] mx-auto w-full max-w-md px-4 transition-all duration-700 pointer-events-none
        ${showLogoutMsg ? "top-32 opacity-100 scale-100" : "top-0 opacity-0 scale-95"}`}>
        <div className={`border border-amber-600/40 backdrop-blur-md rounded-xl shadow-2xl pointer-events-auto overflow-hidden
          ${isLight ? "bg-white/95" : "bg-[#1a1614]/95"}`}>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-amber-500" size={18} />
              <div>
                <p className={`font-bold text-[11px] uppercase tracking-wider ${isLight ? "text-stone-900" : "text-white"}`}>{lnd.logoutTitle}</p>
                <p className="text-stone-500 font-mono text-[9px] uppercase tracking-widest">{lnd.logoutSub}</p>
              </div>
            </div>
            <button onClick={() => setShowLogoutMsg(false)} className="text-stone-600 hover:text-amber-500 transition-colors"><X size={16} /></button>
          </div>
          <div className="h-[2px] w-full bg-stone-800">
            <div className={`h-full bg-amber-600 transition-all ease-linear ${showLogoutMsg ? "w-0 duration-[5000ms]" : "w-full duration-0"}`} />
          </div>
        </div>
      </div>

      {/* Contenido central */}
      <div className="max-w-3xl mx-auto w-full relative z-10">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 italic leading-none uppercase">
            {lnd.heroTitle} <span className="text-amber-600">{lnd.heroTitleAccent}</span>
          </h1>
          <p className={`text-base md:text-lg transition-colors ${isLight ? "text-stone-600" : "text-white/60"}`}>
            {lnd.heroSubtitle}
          </p>
        </div>

        {/* BUSCADOR */}
        <div className="relative z-[30] mb-2" ref={searchRef}>
          <div className="relative">
            {hasFilter && (
              <div className="hidden md:block absolute top-0 left-[calc(100%+12px)] w-52 h-full">
                <ArchivoShortcut
                  activeDiet={activeDiet} activeType={activeType} activeSize={activeSize}
                  isLight={isLight} lang={lang} typeLabels={typeLabels} />
              </div>
            )}
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className={`transition-colors ${searchTerm ? "text-amber-500" : "text-stone-600"}`} size={22} />
            </div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lnd.searchPlaceholder?.toUpperCase()}
              className={`w-full border py-5 md:py-6 pl-16 pr-14 rounded-2xl text-sm md:text-base font-mono tracking-widest
                focus:outline-none focus:border-amber-600/50 transition-all uppercase shadow-2xl
                ${isLight ? "bg-white border-stone-200 text-stone-900" : "bg-[#2a2420]/40 border-stone-800 text-white"}`}
            />
            {searchTerm && (
              <button onClick={() => { setSearchTerm(""); if (!anyFilter) setShowDropdown(false); }}
                className="absolute inset-y-0 right-6 flex items-center text-stone-500 hover:text-amber-500">
                <X size={22} />
              </button>
            )}
          </div>

          {/* Shortcut móvil */}
          {hasFilter && (
            <div className="md:hidden mt-3">
              <ArchivoShortcut
                activeDiet={activeDiet} activeType={activeType} activeSize={activeSize}
                isLight={isLight} lang={lang} typeLabels={typeLabels} />
            </div>
          )}

          {/* Resultados */}
          {showResults && (
            <div className={`absolute top-full left-0 w-full mt-2 backdrop-blur-xl rounded-2xl border shadow-2xl z-[30]
              overflow-y-auto max-h-[390px] hide-scrollbar
              ${isLight ? "bg-white/90 border-stone-200" : "bg-stone-900/95 border-white/10"}`}>
              {filteredDinos.length > 0 ? (
                filteredDinos.map((dino) => {
                  const th = getDietConfig(dino.dieta).color;
                  return (
                    <Link key={dino.id} to={`/animal/${encodeURIComponent(dino.nombre.toLowerCase())}`}
                      className="flex items-center justify-between p-5 hover:bg-amber-600/10 transition-colors border-b border-white/5 last:border-none group/item">
                      <div className="flex items-center gap-5">
                        <img src={dino.imagen} alt={dino.nombre} className="w-12 h-12 object-cover rounded-xl border border-white/10" />
                        <div className="text-left">
                          <p className={`font-black uppercase italic group-hover/item:text-amber-500 transition-colors text-base
                            ${isLight ? "text-stone-900" : "text-white"}`}>{dino.nombre}</p>
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">{dino.subName}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border
                        ${th.bg} ${th.text} ${th.border} uppercase tracking-tighter shrink-0`}>
                        {getDietLabel(dino.dieta, lang)}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="p-6 text-stone-500 font-mono text-sm uppercase tracking-[0.2em]">{lnd.noResults}</div>
              )}
            </div>
          )}
        </div>

        {/* FILTROS */}
        <div className="mb-6 w-full" ref={filtersRef}>
          <div className="flex items-center gap-2 justify-start px-1 flex-wrap">

            {/* Dieta */}
            <FilterDropdown
              label={lnd.filterDiets} emoji="🦴"
              active={activeDiet ? getDietConfig(activeDiet).color : null}
              activeLabel={getDietLabel(activeDiet, lang)}
              onClear={() => setActiveDiet("")}
              isOpen={dietOpen}
              onToggle={() => { setDietOpen(d => !d); setTypeOpen(false); setSizeOpen(false); }}
              isLight={isLight}>
              {usedDiets.map((dieta) => {
                const cfg = getDietConfig(dieta);
                const th = cfg.color;
                const isActive = activeDiet === dieta;
                return (
                  <button key={dieta}
                    onClick={() => { setActiveDiet(isActive ? "" : dieta); setDietOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide
                      ${isActive ? `${th.bg} ${th.border} ${th.text}` : `border-transparent ${th.hoverBg} ${th.hoverText} ${th.hoverBorder} ${isLight ? "text-stone-600" : "text-stone-400"}`}`}>
                    <span className="text-base shrink-0">{cfg.emoji}</span>
                    <span>{getDietLabel(dieta, lang)}</span>
                  </button>
                );
              })}
            </FilterDropdown>

            {/* Tipo */}
            <FilterDropdown
              label={lnd.filterTypes} emoji="🦕"
              active={activeType ? TYPE_THEMES[activeType] : null}
              activeLabel={typeLabels[activeType] || activeType}
              onClear={() => setActiveType("")}
              isOpen={typeOpen}
              onToggle={() => { setTypeOpen(t => !t); setDietOpen(false); setSizeOpen(false); }}
              isLight={isLight}>
              {availableTypes.map((tipo) => {
                const th = TYPE_THEMES[tipo] || { text: "text-stone-400", bg: "bg-stone-400/10", border: "border-stone-400/40", hoverBg: "hover:bg-stone-400/10", hoverText: "hover:text-stone-300", hoverBorder: "hover:border-stone-400/40" };
                const isActive = activeType === tipo;
                return (
                  <button key={tipo}
                    onClick={() => { setActiveType(isActive ? "" : tipo); setTypeOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide
                      ${isActive ? `${th.bg} ${th.border} ${th.text}` : `border-transparent ${th.hoverBg} ${th.hoverText} ${th.hoverBorder} ${isLight ? "text-stone-600" : "text-stone-400"}`}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${th.bg} ${th.border} border`} />
                    <span>{typeLabels[tipo] || tipo}</span>
                  </button>
                );
              })}
            </FilterDropdown>

            {/* Tamaño */}
            <FilterDropdown
              label={lnd.filterSizes || "Tamaño"} emoji="📏"
              active={activeSizeCfg ? activeSizeCfg.theme : null}
              activeLabel={activeSizeCfg ? (activeSizeCfg.label[lang] || activeSizeCfg.label.es) : ""}
              onClear={() => setActiveSize("")}
              isOpen={sizeOpen}
              onToggle={() => { setSizeOpen(s => !s); setDietOpen(false); setTypeOpen(false); }}
              isLight={isLight}>
              {SIZE_CATEGORIES.map((size) => {
                const th = size.theme;
                const isActive = activeSize === size.id;
                const label = size.label[lang] || size.label.es;
                return (
                  <button key={size.id}
                    onClick={() => { setActiveSize(isActive ? "" : size.id); setSizeOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide
                      ${isActive ? `${th.bg} ${th.border} ${th.text}` : `border-transparent ${th.hoverBg} ${th.hoverText} ${th.hoverBorder} ${isLight ? "text-stone-600" : "text-stone-400"}`}`}>
                    <span className="text-base shrink-0">{size.emoji}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </FilterDropdown>

            {/* Limpiar */}
            {anyFilter && (
              <button
                onClick={() => { setActiveDiet(""); setActiveType(""); setActiveSize(""); if (!searchTerm) setShowDropdown(false); }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all
                  ${isLight ? "text-stone-400 hover:text-stone-600" : "text-stone-600 hover:text-stone-400"}`}>
                <X size={24} /> {lnd.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* DATO CURIOSO */}
        <div className="mb-10">
          <DatoCurioso isLight={isLight} />
        </div>
      </div>

      {/* ERAS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {eras.map((era) => (
          <EraCard key={era.id} id={era.id} name={era.name} age={era.age} image={era.image}>{era.desc}</EraCard>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;