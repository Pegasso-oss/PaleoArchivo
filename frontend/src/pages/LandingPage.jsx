import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import EraCard from "../components/EraCard";
import { allAnimals } from "../data/allData";
import { Search, X, ShieldCheck } from "lucide-react";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  useEffect(() => {
    if (location.state?.logoutSuccess) {
      setShowLogoutMsg(true);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowLogoutMsg(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

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

  const dietaEmojis = {
    Carnívoro: "🥩", Herbívoro: "🌿", Omnívoro: "🍲", Insectívoro: "🐛",
    Piscívoro: "🐟", Carroñero: "🦴", Filtrador: "🌊", Detritívoro: "🍂",
  };

  const eras = [
    { id: "paleozoico", name: "PALEOZOICO", age: "541 - 252 m.a.", image: "https://media.istockphoto.com/id/1144091536/es/foto/criaturas-del-período-cámbrico-escena-submarina-con-anomalocaris-opabinia-hallucigenia-pirania.jpg?s=612x612&w=0&k=20&c=XD683S0yCOb2WhXsT3iRx5XGVS7jCNjS3EN4SK0e7uA=", desc: "El origen de la vida compleja. Trilobites, bosques de helechos gigantes y los primeros anfibios." },
    { id: "mesozoico", name: "MESOZOICO", age: "252 - 66 m.a.", image: "https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg", desc: "La era de los dinosaurios. Triásico, Jurásico y Cretácico. El reinado de los reptiles gigantes." },
    { id: "cenozoico", name: "CENOZOICO", age: "66 m.a. - Actualidad", image: "https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg", desc: "El ascenso de los mamíferos. Megafauna, glaciaciones y la evolución de los primates." },
  ];

  const filteredDinos = Array.from(new Map(allAnimals.map((dino) => [dino.nombre.toLowerCase(), dino])).values())
    .filter((dino) => {
      if (!searchTerm) return false;
      const search = searchTerm.toLowerCase().trim();
      return dino.nombre.toLowerCase().startsWith(search) || dino.dieta.toLowerCase() === search;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#1d1914] px-4 pt-4 pb-20 relative text-white overflow-x-hidden">
      {/* MENSAJE LOGOUT */}
      <div className={`fixed left-0 right-0 z-[100] mx-auto w-full max-w-md px-4 transition-all duration-700 pointer-events-none ${showLogoutMsg ? "top-32 opacity-100 scale-100" : "top-0 opacity-0 scale-95"}`}>
        <div className="bg-[#1a1614]/95 border border-amber-600/40 backdrop-blur-md rounded-xl shadow-2xl pointer-events-auto overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-amber-500" size={18} />
              <div>
                <p className="text-white font-bold text-[11px] uppercase tracking-wider">Sesión Cerrada</p>
                <p className="text-stone-500 font-mono text-[9px] uppercase tracking-widest">Acceso restringido</p>
              </div>
            </div>
            <button onClick={() => setShowLogoutMsg(false)} className="text-stone-600 hover:text-white transition-colors"><X size={16} /></button>
          </div>
          <div className="h-[2px] w-full bg-stone-800">
            <div className={`h-full bg-amber-600 transition-all ease-linear ${showLogoutMsg ? "w-0 duration-[5000ms]" : "w-full duration-0"}`} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center w-full relative z-10">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 italic leading-none uppercase">
          Explora <span className="text-amber-600">el pasado</span>
        </h1>
        <p className="max-w-2xl mx-auto text-white/60 text-base md:text-lg mb-10">
          Selecciona una era geológica para acceder a los registros fósiles y reconstrucciones biológicas.
        </p>

        {/* BUSCADOR */}
        <div className="max-w-3xl mx-auto relative z-50 mb-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className={`transition-colors ${searchTerm ? "text-amber-500" : "text-stone-600"}`} size={22} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BUSCAR EN EL ARCHIVO..."
              className="w-full bg-[#2a2420]/40 border border-stone-800 py-5 md:py-6 pl-16 pr-14 rounded-2xl text-sm md:text-base font-mono tracking-widest focus:outline-none focus:border-amber-600/50 focus:bg-[#2a2420]/80 transition-all text-white uppercase shadow-2xl"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-6 flex items-center text-stone-500 hover:text-white"><X size={22} /></button>
            )}
          </div>

          {/* DROP-DOWN DE RESULTADOS CORREGIDO */}
          {searchTerm && (
            <div 
              className="absolute top-full left-0 w-full mt-2 bg-stone-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-[100] overflow-y-auto max-h-[390px] hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredDinos.length > 0 ? (
                filteredDinos.map((dino) => {
                  const theme = themes[dino.dieta] || { text: "text-white", bg: "bg-white/10", border: "border-white/20" };
                  return (
                    <Link key={dino.id} to={`/animal/${dino.nombre.toLowerCase()}`} className="flex items-center justify-between p-5 hover:bg-amber-600/10 transition-colors border-b border-white/5 last:border-none group/item">
                      <div className="flex items-center gap-5">
                        <img src={dino.imagen} alt={dino.nombre} className="w-12 h-12 object-cover rounded-xl border border-white/10" />
                        <div className="text-left">
                          <p className="font-black uppercase italic text-white group-hover/item:text-amber-500 transition-colors text-base">{dino.nombre}</p>
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1.5">{dino.subName}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${theme.bg} ${theme.text} ${theme.border} uppercase tracking-tighter`}>{dino.dieta}</span>
                    </Link>
                  );
                })
              ) : (
                <div className="p-6 text-stone-600 font-mono text-sm uppercase tracking-[0.2em]">Sin registros</div>
              )}
            </div>
          )}
        </div>

        {/* FILTROS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-16 max-w-5xl mx-auto w-full px-3">
          {Object.keys(themes).map((dieta) => {
            const theme = themes[dieta];
            const isActive = searchTerm.toLowerCase() === dieta.toLowerCase();
            return (
              <button
                key={dieta}
                onClick={() => setSearchTerm(isActive ? "" : dieta)}
                className={`w-full px-2 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 ${theme.bg} ${theme.border} ${theme.text} ${isActive ? "ring-2 ring-amber-500 scale-105 opacity-100 shadow-lg" : "opacity-60 hover:opacity-100 hover:scale-102"}`}
              >
                <span className="text-2xl shrink-0">{dietaEmojis[dieta]}</span>
                <span className="font-black text-[10px] md:text-sm uppercase tracking-widest truncate">{dieta}</span>
              </button>
            );
          })}
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