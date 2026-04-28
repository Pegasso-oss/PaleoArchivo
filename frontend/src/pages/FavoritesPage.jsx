// src/pages/FavoritesPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { allAnimals } from "../data/allData";
import { useFavorites } from "../context/FavoritesContext";
import { getDietConfig, getDietLabel } from "../data/dietConfig";
import { FolderHeart, Search, X } from "lucide-react";
import apiClient from "../api/apiClient";
import { useTranslation } from "../hooks/useTranslation";
import { useUser } from "../context/useUser";

const FavoritesPage = () => {
  const { favorites, setFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const { tSection } = useTranslation();
  const { theme, lang } = useUser();
  const fav = tSection("favorites");
  const isLight = theme === "light";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const auth = localStorage.getItem("auth");
    if (!auth || auth !== "true" || !userId || userId === "undefined") {
      navigate("/login", { replace: true }); return;
    }
    const fetchFreshFavorites = async () => {
      try {
        const res = await apiClient.get(`/user/${userId}`);
        const data = res.data.favorites || [];
        setFavorites(data.map(item => String(item.id || item)));
      } catch (err) { console.error("Error al sincronizar:", err); }
      finally { setLoading(false); }
    };
    fetchFreshFavorites();
  }, []);

  const myFavs = allAnimals.filter(a => favorites.includes(String(a.id)));

  const stats = useMemo(() => {
    const diets = {};
    const eras = new Set();
    myFavs.forEach(a => {
      if (a.dieta) diets[a.dieta] = (diets[a.dieta] || 0) + 1;
      if (a.era) eras.add(a.era);
    });
    return { diets, eras: eras.size };
  }, [myFavs]);

  const dietFilters = useMemo(() =>
    Object.entries(stats.diets).sort((a, b) => b[1] - a[1]),
    [stats.diets]
  );

  const filtered = useMemo(() => {
    return myFavs.filter(a => {
      const matchSearch = !search || a.nombre.toLowerCase().includes(search.toLowerCase());
      const matchFilter = activeFilter === "all" || a.dieta === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [myFavs, search, activeFilter]);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono text-sm italic tracking-[0.4em] ${isLight ? "bg-[#f7f3ee] text-stone-400" : "bg-[#0c0b0a] text-amber-600"}`}>
      {fav.loading}
    </div>
  );

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${isLight ? "bg-[#f7f3ee]" : "bg-[#0c0b0a]"}`}>
      <div className="max-w-6xl mx-auto px-4 py-10 pb-24">

        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-10 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          ← Volver
        </button>

        {myFavs.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-40 border ${isLight ? "border-stone-200 bg-white" : "border-[#2a2520] bg-[#131211]"}`}>
            <FolderHeart size={64} className={`mb-8 ${isLight ? "text-stone-300" : "text-stone-700"}`} />
            <h3 className={`text-base font-black uppercase tracking-widest italic mb-10 ${isLight ? "text-stone-400" : "text-stone-600"}`}>
              {fav.emptyTitle}
            </h3>
            <Link to="/"
              className="bg-amber-600 text-white px-10 py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:opacity-90 transition-opacity flex items-center gap-3">
              <Search size={15} />{fav.startSearch}
            </Link>
          </div>
        ) : (
          <div className={`flex flex-col md:flex-row border ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>

            {/* Panel izquierdo */}
            <div className={`md:w-56 shrink-0 flex flex-col border-b md:border-b-0 md:border-r p-6
              ${isLight ? "bg-[#f0ebe3] border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>

              <div className="w-9 h-[3px] bg-amber-600 mb-6" />

              <p className={`text-[10px] tracking-[0.2em] uppercase mb-3 ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                {fav.title} {fav.titleAccent}
              </p>

              <p className="text-5xl font-black text-amber-600 leading-none">{myFavs.length}</p>
              <p className={`text-[10px] tracking-[0.16em] uppercase mt-1.5 mb-6 ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                Especímenes
              </p>

              {/* Mini stats */}
              <div className={`flex flex-col gap-3 pb-6 border-b ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
                {dietFilters.map(([diet, count]) => {
                  const cfg = getDietConfig(diet);
                  return (
                    <div key={diet} className="flex items-center justify-between">
                      <span className={`text-[10px] tracking-[0.1em] uppercase ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                        {cfg.emoji} {getDietLabel(diet, lang)}
                      </span>
                      <span className={`text-sm font-black ${cfg.color.text}`}>{count}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] tracking-[0.1em] uppercase ${isLight ? "text-stone-400" : "text-stone-600"}`}>Eras</span>
                  <span className={`text-sm font-black ${isLight ? "text-stone-700" : "text-stone-300"}`}>{stats.eras}</span>
                </div>
              </div>

              {/* Filtros */}
              <div className="mt-5 flex flex-col gap-1">
                <p className={`text-[10px] tracking-[0.16em] uppercase mb-3 ${isLight ? "text-stone-400" : "text-stone-600"}`}>Filtrar</p>
                <button onClick={() => setActiveFilter("all")}
                  className={`text-left px-2 py-2 text-[10px] tracking-[0.12em] uppercase border transition-all
                    ${activeFilter === "all"
                      ? "border-amber-600/40 bg-amber-600/10 text-amber-600"
                      : `border-transparent ${isLight ? "text-stone-500 hover:text-stone-700" : "text-stone-600 hover:text-stone-400"}`}`}>
                  Todos ({myFavs.length})
                </button>
                {dietFilters.map(([diet, count]) => {
                  const cfg = getDietConfig(diet);
                  const isActive = activeFilter === diet;
                  return (
                    <button key={diet} onClick={() => setActiveFilter(diet)}
                      className={`text-left px-2 py-2 text-[10px] tracking-[0.12em] uppercase border transition-all
                        ${isActive
                          ? `${cfg.color.border} ${cfg.color.bg} ${cfg.color.text}`
                          : `border-transparent ${isLight ? "text-stone-500 hover:text-stone-700" : "text-stone-600 hover:text-stone-400"}`}`}>
                      {cfg.emoji} {getDietLabel(diet, lang)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel derecho */}
            <div className={`flex-1 flex flex-col ${isLight ? "bg-white" : "bg-[#131211]"}`}>

              {/* Buscador */}
              <div className={`flex items-center border-b ${isLight ? "border-stone-100" : "border-[#2a2520]"}`}>
                <Search size={16} className={`ml-5 shrink-0 ${isLight ? "text-stone-300" : "text-stone-700"}`} />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="BUSCAR EN MIS REGISTROS..."
                  className={`flex-1 py-4 px-4 text-sm tracking-[0.08em] uppercase font-mono outline-none bg-transparent
                    ${isLight ? "text-stone-700 placeholder:text-stone-300" : "text-stone-300 placeholder:text-stone-700"}`}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="mr-5 text-stone-500 hover:text-amber-500 transition-colors">
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Lista */}
              <div className="flex-1">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? filtered.map(animal => {
                    const cfg = getDietConfig(animal.dieta);
                    return (
                      <motion.div key={animal.id} layout
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <Link to={`/animal/${animal.nombre.toLowerCase()}`}
                          className={`flex items-center gap-4 px-5 py-4 border-b group transition-colors
                            ${isLight ? "border-stone-50 hover:bg-stone-50" : "border-[#1a1816] hover:bg-white/[0.02]"}`}>

                          {/* Thumb */}
                          <div className={`w-14 h-10 shrink-0 overflow-hidden border ${isLight ? "border-stone-100" : "border-[#2a2520]"}`}>
                            <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-base font-black italic uppercase tracking-tight leading-tight group-hover:text-amber-500 transition-colors truncate
                              ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
                              {animal.nombre}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {animal.periodo && (
                                <span className={`text-[10px] tracking-[0.1em] uppercase ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                                  {animal.periodo}
                                </span>
                              )}
                              <span className={`text-[10px] tracking-[0.08em] uppercase px-2 py-px ${cfg.color.bg} ${cfg.color.text}`}>
                                {cfg.emoji} {getDietLabel(animal.dieta, lang)}
                              </span>
                            </div>
                          </div>

                          {/* Longitud */}
                          {animal.longitud && (
                            <span className={`text-sm shrink-0 font-mono ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                              {animal.longitud}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  }) : (
                    <div className={`text-center py-20 text-sm uppercase tracking-widest ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                      Sin resultados
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;