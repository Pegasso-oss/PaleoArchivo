import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import EraCard from "../components/EraCard";
import { allAnimals } from "../data/allData";
import { Search, X, ShieldCheck, ChevronDown } from "lucide-react";
import { useUser } from '../context/useUser';

// ── Paletas de colores ────────────────────────────────────────────────────

const DIET_THEMES = {
  Carnívoro:   { text: "text-red-500",    bg: "bg-red-500/10",    border: "border-red-500/40",    hoverBg: "hover:bg-red-500/10",    hoverText: "hover:text-red-400",    hoverBorder: "hover:border-red-500/40"    },
  Herbívoro:   { text: "text-green-500",  bg: "bg-green-500/10",  border: "border-green-500/40",  hoverBg: "hover:bg-green-500/10",  hoverText: "hover:text-green-400",  hoverBorder: "hover:border-green-500/40"  },
  Omnívoro:    { text: "text-amber-500",  bg: "bg-amber-500/10",  border: "border-amber-500/40",  hoverBg: "hover:bg-amber-500/10",  hoverText: "hover:text-amber-400",  hoverBorder: "hover:border-amber-500/40"  },
  Insectívoro: { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/40", hoverBg: "hover:bg-orange-500/10", hoverText: "hover:text-orange-400", hoverBorder: "hover:border-orange-500/40" },
  Piscívoro:   { text: "text-cyan-500",   bg: "bg-cyan-500/10",   border: "border-cyan-500/40",   hoverBg: "hover:bg-cyan-500/10",   hoverText: "hover:text-cyan-400",   hoverBorder: "hover:border-cyan-500/40"   },
  Carroñero:   { text: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/40", hoverBg: "hover:bg-purple-500/10", hoverText: "hover:text-purple-400", hoverBorder: "hover:border-purple-500/40" },
  Filtrador:   { text: "text-blue-500",   bg: "bg-blue-500/10",   border: "border-blue-500/40",   hoverBg: "hover:bg-blue-500/10",   hoverText: "hover:text-blue-400",   hoverBorder: "hover:border-blue-500/40"   },
  Detritívoro: { text: "text-slate-400",  bg: "bg-slate-400/10",  border: "border-slate-400/40",  hoverBg: "hover:bg-slate-400/10",  hoverText: "hover:text-slate-300",  hoverBorder: "hover:border-slate-400/40"  },
};

const DIET_EMOJIS = {
  Carnívoro: "🥩", Herbívoro: "🌿", Omnívoro: "🍲", Insectívoro: "🐛",
  Piscívoro: "🐟", Carroñero: "🦴", Filtrador: "🌊", Detritívoro: "🍂",
};

const TYPE_THEMES = {
  Theropod:          { text: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/40",    hoverBg: "hover:bg-red-400/10",    hoverText: "hover:text-red-300",    hoverBorder: "hover:border-red-400/40"    },
  Sauropod:          { text: "text-emerald-400",bg: "bg-emerald-400/10",border: "border-emerald-400/40",hoverBg: "hover:bg-emerald-400/10",hoverText: "hover:text-emerald-300",hoverBorder: "hover:border-emerald-400/40"},
  Avialae:           { text: "text-sky-400",    bg: "bg-sky-400/10",    border: "border-sky-400/40",    hoverBg: "hover:bg-sky-400/10",    hoverText: "hover:text-sky-300",    hoverBorder: "hover:border-sky-400/40"    },
  Thyreophoran:      { text: "text-lime-400",   bg: "bg-lime-400/10",   border: "border-lime-400/40",   hoverBg: "hover:bg-lime-400/10",   hoverText: "hover:text-lime-300",   hoverBorder: "hover:border-lime-400/40"   },
  Plesiosaur:        { text: "text-teal-400",   bg: "bg-teal-400/10",   border: "border-teal-400/40",   hoverBg: "hover:bg-teal-400/10",   hoverText: "hover:text-teal-300",   hoverBorder: "hover:border-teal-400/40"   },
  Chondrichthyes:    { text: "text-cyan-400",   bg: "bg-cyan-400/10",   border: "border-cyan-400/40",   hoverBg: "hover:bg-cyan-400/10",   hoverText: "hover:text-cyan-300",   hoverBorder: "hover:border-cyan-400/40"   },
  Basal_arthropod:   { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/40", hoverBg: "hover:bg-orange-400/10", hoverText: "hover:text-orange-300", hoverBorder: "hover:border-orange-400/40" },
  Basal_chordate:    { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/40", hoverBg: "hover:bg-violet-400/10", hoverText: "hover:text-violet-300", hoverBorder: "hover:border-violet-400/40" },
  Mollusca:          { text: "text-pink-400",   bg: "bg-pink-400/10",   border: "border-pink-400/40",   hoverBg: "hover:bg-pink-400/10",   hoverText: "hover:text-pink-300",   hoverBorder: "hover:border-pink-400/40"   },
  Arthropoda:        { text: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/40",  hoverBg: "hover:bg-amber-400/10",  hoverText: "hover:text-amber-300",  hoverBorder: "hover:border-amber-400/40"  },
  Agnatha:           { text: "text-stone-400",  bg: "bg-stone-400/10",  border: "border-stone-400/40",  hoverBg: "hover:bg-stone-400/10",  hoverText: "hover:text-stone-300",  hoverBorder: "hover:border-stone-400/40"  },
  Saurischia:        { text: "text-rose-400",   bg: "bg-rose-400/10",   border: "border-rose-400/40",   hoverBg: "hover:bg-rose-400/10",   hoverText: "hover:text-rose-300",   hoverBorder: "hover:border-rose-400/40"   },
  Abelisauridae:     { text: "text-red-300",    bg: "bg-red-300/10",    border: "border-red-300/40",    hoverBg: "hover:bg-red-300/10",    hoverText: "hover:text-red-200",    hoverBorder: "hover:border-red-300/40"    },
  Squamata:          { text: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/40", hoverBg: "hover:bg-yellow-400/10", hoverText: "hover:text-yellow-300", hoverBorder: "hover:border-yellow-400/40" },
  Mammalia:          { text: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/40", hoverBg: "hover:bg-indigo-400/10", hoverText: "hover:text-indigo-300", hoverBorder: "hover:border-indigo-400/40" },
  Crocodylomorpha:   { text: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/40",  hoverBg: "hover:bg-green-400/10",  hoverText: "hover:text-green-300",  hoverBorder: "hover:border-green-400/40"  },
};

// Etiquetas bonitas para los tipos
const TYPE_LABELS = {
  Theropod: "Terópodo", Sauropod: "Saurópodo", Avialae: "Ave primitiva",
  Thyreophoran: "Tireoforo", Plesiosaur: "Plesiosaurio", Chondrichthyes: "Condrictio",
  Basal_arthropod: "Artrópodo", Basal_chordate: "Cordado", Mollusca: "Molusco",
  Arthropoda: "Artrópodo", Agnatha: "Agnato", Saurischia: "Saurisquio",
  Abelisauridae: "Abelisáurido", Squamata: "Escamoso", Mammalia: "Mamífero",
  Crocodylomorpha: "Crocodilomorfo",
};

// ── Componente Dropdown ───────────────────────────────────────────────────
const FilterDropdown = ({ label, emoji, active, activeLabel, onClear, isOpen, onToggle, isLight, children }) => {
  const th = active;
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
          <div className="p-2 grid grid-cols-2 gap-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Página ────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const [activeDiet, setActiveDiet] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [dietOpen, setDietOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const filtersRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const { theme } = useUser();
  const isLight = theme === 'light';

  // Abrir dropdown cuando hay algo activo
  useEffect(() => {
    if (searchTerm || activeDiet || activeType) setShowDropdown(true);
  }, [searchTerm, activeDiet, activeType]);

  // Cierre al hacer clic fuera y Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) {
        setDietOpen(false);
        setTypeOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchTerm("");
        setActiveDiet("");
        setActiveType("");
        setDietOpen(false);
        setTypeOpen(false);
        setShowDropdown(false);
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
    { id: "paleozoico", name: "PALEOZOICO", age: "541 - 252 m.a.", image: "https://media.istockphoto.com/id/1144091536/es/foto/criaturas-del-período-cámbrico-escena-submarina-con-anomalocaris-opabinia-hallucigenia-pirania.jpg?s=612x612&w=0&k=20&c=XD683S0yCOb2WhXsT3iRx5XGVS7jCNjS3EN4SK0e7uA=", desc: "El origen de la vida compleja. Trilobites, bosques de helechos gigantes y los primeros anfibios." },
    { id: "mesozoico", name: "MESOZOICO", age: "252 - 66 m.a.", image: "https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg", desc: "La era de los dinosaurios. Triásico, Jurásico y Cretácico. El reinado de los reptiles gigantes." },
    { id: "cenozoico", name: "CENOZOICO", age: "66 m.a. - Actualidad", image: "https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg", desc: "El ascenso de los mamíferos. Megafauna, glaciaciones y la evolución de los primates." },
  ];

  // Tipos únicos presentes en los datos
  const availableTypes = [...new Set(allAnimals.map(a => a.tipo).filter(Boolean))].sort();

  const filteredDinos = Array.from(
    new Map(allAnimals.map((dino) => [dino.nombre.toLowerCase(), dino])).values()
  ).filter((dino) => {
    const search = searchTerm.toLowerCase().trim();
    const matchSearch = !search || dino.nombre.toLowerCase().startsWith(search);
    const matchDiet = !activeDiet || dino.dieta === activeDiet;
    const matchType = !activeType || dino.tipo === activeType;
    return matchSearch && matchDiet && matchType;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 8);

  const showResults = showDropdown && (searchTerm || activeDiet || activeType);

  return (
    <div className={`min-h-screen flex flex-col px-4 pt-4 pb-20 relative isolate transition-colors duration-500 ${isLight ? 'bg-[#f5f2ed] text-stone-900' : 'bg-[#141210] text-white'}`}>

      {/* Mensaje logout */}
      <div className={`fixed left-0 right-0 z-[40] mx-auto w-full max-w-md px-4 transition-all duration-700 pointer-events-none ${showLogoutMsg ? "top-32 opacity-100 scale-100" : "top-0 opacity-0 scale-95"}`}>
        <div className={`border border-amber-600/40 backdrop-blur-md rounded-xl shadow-2xl pointer-events-auto overflow-hidden ${isLight ? 'bg-white/95' : 'bg-[#1a1614]/95'}`}>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-amber-500" size={18} />
              <div>
                <p className={`font-bold text-[11px] uppercase tracking-wider ${isLight ? 'text-stone-900' : 'text-white'}`}>Sesión Cerrada</p>
                <p className="text-stone-500 font-mono text-[9px] uppercase tracking-widest">Acceso restringido</p>
              </div>
            </div>
            <button onClick={() => setShowLogoutMsg(false)} className="text-stone-600 hover:text-amber-500 transition-colors"><X size={16} /></button>
          </div>
          <div className="h-[2px] w-full bg-stone-800">
            <div className={`h-full bg-amber-600 transition-all ease-linear ${showLogoutMsg ? "w-0 duration-[5000ms]" : "w-full duration-0"}`} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center w-full relative z-10">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 italic leading-none uppercase">
          Explora <span className="text-amber-600">el pasado</span>
        </h1>
        <p className={`max-w-2xl mx-auto text-base md:text-lg mb-10 transition-colors ${isLight ? 'text-stone-600' : 'text-white/60'}`}>
          Selecciona una era geológica para acceder a los registros fósiles y reconstrucciones biológicas.
        </p>

        {/* BUSCADOR */}
        <div className="max-w-3xl mx-auto relative z-[30] mb-4" ref={searchRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className={`transition-colors ${searchTerm ? "text-amber-500" : "text-stone-600"}`} size={22} />
            </div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BUSCAR EN EL ARCHIVO..."
              className={`w-full border py-5 md:py-6 pl-16 pr-14 rounded-2xl text-sm md:text-base font-mono tracking-widest focus:outline-none focus:border-amber-600/50 transition-all uppercase shadow-2xl
                ${isLight ? 'bg-white border-stone-200 text-stone-900' : 'bg-[#2a2420]/40 border-stone-800 text-white'}`}
            />
            {searchTerm && (
              <button onClick={() => { setSearchTerm(""); if (!activeDiet && !activeType) setShowDropdown(false); }}
                className="absolute inset-y-0 right-6 flex items-center text-stone-500 hover:text-amber-500">
                <X size={22} />
              </button>
            )}
          </div>

          {/* Resultados */}
          {showResults && (
            <div className={`absolute top-full left-0 w-full mt-2 backdrop-blur-xl rounded-2xl border shadow-2xl z-[30] overflow-y-auto max-h-[390px] hide-scrollbar
              ${isLight ? 'bg-white/90 border-stone-200' : 'bg-stone-900/95 border-white/10'}`}>
              {filteredDinos.length > 0 ? (
                filteredDinos.map((dino) => {
                  const th = DIET_THEMES[dino.dieta] || { text: "text-white", bg: "bg-white/10", border: "border-white/20" };
                  return (
                    <Link key={dino.id} to={`/animal/${dino.nombre.toLowerCase()}`}
                      className="flex items-center justify-between p-5 hover:bg-amber-600/10 transition-colors border-b border-white/5 last:border-none group/item">
                      <div className="flex items-center gap-5">
                        <img src={dino.imagen} alt={dino.nombre} className="w-12 h-12 object-cover rounded-xl border border-white/10" />
                        <div className="text-left">
                          <p className={`font-black uppercase italic group-hover/item:text-amber-500 transition-colors text-base ${isLight ? 'text-stone-900' : 'text-white'}`}>{dino.nombre}</p>
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">{dino.subName}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${th.bg} ${th.text} ${th.border} uppercase tracking-tighter shrink-0`}>{dino.dieta}</span>
                    </Link>
                  );
                })
              ) : (
                <div className="p-6 text-stone-500 font-mono text-sm uppercase tracking-[0.2em]">Sin registros</div>
              )}
            </div>
          )}
        </div>

        {/* FILTROS */}
        <div className="max-w-3xl mx-auto mb-16 w-full" ref={filtersRef}>
          <div className="flex items-center gap-2 justify-start px-1">

            {/* Dropdown Dietas */}
            <FilterDropdown
              label="Dietas" emoji="🦴"
              active={activeDiet ? DIET_THEMES[activeDiet] : null}
              activeLabel={activeDiet}
              onClear={() => setActiveDiet("")}
              isOpen={dietOpen}
              onToggle={() => { setDietOpen(d => !d); setTypeOpen(false); }}
              isLight={isLight}
            >
              {Object.entries(DIET_THEMES).map(([dieta, th]) => {
                const isActive = activeDiet === dieta;
                return (
                  <button key={dieta}
                    onClick={() => { setActiveDiet(isActive ? "" : dieta); setDietOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide
                      ${isActive
                        ? `${th.bg} ${th.border} ${th.text}`
                        : `border-transparent ${th.hoverBg} ${th.hoverText} ${th.hoverBorder} ${isLight ? "text-stone-600" : "text-stone-400"}`
                      }`}>
                    <span className="text-base shrink-0">{DIET_EMOJIS[dieta]}</span>
                    <span>{dieta}</span>
                  </button>
                );
              })}
            </FilterDropdown>

            {/* Dropdown Tipos */}
            <FilterDropdown
              label="Tipos" emoji="🦕"
              active={activeType ? TYPE_THEMES[activeType] : null}
              activeLabel={TYPE_LABELS[activeType] || activeType}
              onClear={() => setActiveType("")}
              isOpen={typeOpen}
              onToggle={() => { setTypeOpen(t => !t); setDietOpen(false); }}
              isLight={isLight}
            >
              {availableTypes.map((tipo) => {
                const th = TYPE_THEMES[tipo] || { text: "text-stone-400", bg: "bg-stone-400/10", border: "border-stone-400/40", hoverBg: "hover:bg-stone-400/10", hoverText: "hover:text-stone-300", hoverBorder: "hover:border-stone-400/40" };
                const isActive = activeType === tipo;
                return (
                  <button key={tipo}
                    onClick={() => { setActiveType(isActive ? "" : tipo); setTypeOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left font-black text-[10px] uppercase tracking-wide
                      ${isActive
                        ? `${th.bg} ${th.border} ${th.text}`
                        : `border-transparent ${th.hoverBg} ${th.hoverText} ${th.hoverBorder} ${isLight ? "text-stone-600" : "text-stone-400"}`
                      }`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${th.bg} ${th.border} border`} />
                    <span>{TYPE_LABELS[tipo] || tipo}</span>
                  </button>
                );
              })}
            </FilterDropdown>

            {/* Limpiar filtros */}
            {(activeDiet || activeType) && (
              <button onClick={() => { setActiveDiet(""); setActiveType(""); if (!searchTerm) setShowDropdown(false); }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${isLight ? "text-stone-400 hover:text-stone-600" : "text-stone-600 hover:text-stone-400"}`}>
                <X size={12} /> Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {eras.map((era) => (
          <EraCard key={era.id} id={era.id} name={era.name} age={era.age} image={era.image}>{era.desc}</EraCard>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;