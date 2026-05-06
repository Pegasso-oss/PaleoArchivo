// src/pages/TopFavoritosPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Users, RefreshCw } from "lucide-react";
import { useUser } from "../context/useUser";
import { useTranslation } from "../hooks/useTranslation";
import { allAnimals } from "../data/allData";
import { getDietConfig, getDietLabel } from "../data/dietConfig";
import apiClient from "../api/apiClient";

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

const ERA_COLOR = {
  Paleozoico: "text-cyan-400",
  Mesozoico:  "text-amber-400",
  Cenozoico:  "text-violet-400",
};

const i18n = {
  title:    { es: "Top Favoritos",          en: "Top Favorites",         fr: "Top Favoris",          it: "Top Preferiti"        },
  subtitle: { es: "Ranking global de especies más guardadas por los investigadores del archivo", en: "Global ranking of species most saved by archive researchers", fr: "Classement mondial des espèces les plus sauvegardées", it: "Classifica globale delle specie più salvate" },
  back:     { es: "Volver",                 en: "Back",                  fr: "Retour",                it: "Indietro"             },
  rank:     { es: "Rango",                  en: "Rank",                  fr: "Rang",                  it: "Posizione"            },
  species:  { es: "Especie",                en: "Species",               fr: "Espèce",                it: "Specie"               },
  diet:     { es: "Dieta",                  en: "Diet",                  fr: "Régime",                it: "Dieta"                },
  era:      { es: "Era",                    en: "Era",                   fr: "Ère",                   it: "Era"                  },
  users:    { es: "investigadores",         en: "researchers",           fr: "chercheurs",            it: "ricercatori"          },
  loading:  { es: "Cargando ranking...",    en: "Loading ranking...",    fr: "Chargement...",         it: "Caricamento..."       },
  empty:    { es: "Sin datos aún",          en: "No data yet",           fr: "Aucune donnée",         it: "Nessun dato"          },
  goSheet:  { es: "Ver ficha",              en: "View record",           fr: "Voir la fiche",         it: "Vedi scheda"          },
  total:    { es: "especies en el ranking", en: "species in ranking",    fr: "espèces au classement", it: "specie in classifica" },
};
const s = (key, lang) => i18n[key]?.[lang] ?? i18n[key]?.es ?? key;

export default function TopFavoritosPage() {
  const navigate = useNavigate();
  const { theme, language } = useUser();
  const { tSection } = useTranslation();
  const typeLabels = tSection("typeLabels");
  const isLight = theme === "light";

  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRanking = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await apiClient.get("/top-favorites?limit=100");
      const enriched = res.data
        .map(({ id, nombre, count }) => {
          const animal = allAnimals.find(a => String(a.id) === String(id));
          return animal ? { ...animal, count } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.count - a.count || a.nombre.localeCompare(b.nombre));
      setRanking(enriched);
    } catch {
      setRanking([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchRanking(); }, []);

  const bg      = isLight ? "bg-[#f5f2ed]"   : "bg-[#0c0b0a]";
  const bgCard  = isLight ? "bg-white"        : "bg-[#131211]";
  const bgRow   = isLight ? "bg-stone-50"     : "bg-[#0f0e0c]";
  const bgHover = isLight ? "hover:bg-amber-50/60" : "hover:bg-amber-600/5";
  const border  = isLight ? "border-stone-200": "border-[#2a2520]";
  const borderDiv = isLight ? "divide-stone-100" : "divide-[#1a1816]";
  const textPrimary   = isLight ? "text-stone-900"  : "text-[#f5e6c8]";
  const textSecondary = isLight ? "text-stone-400"  : "text-[#6b5e4e]";
  const textMuted     = isLight ? "text-stone-300"  : "text-[#3a3028]";
  const thBg    = isLight ? "bg-stone-100"    : "bg-[#0f0e0c]";
  const thText  = isLight ? "text-stone-500"  : "text-[#4a3f32]";

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono text-sm italic tracking-[0.4em] ${isLight ? "bg-[#f5f2ed] text-stone-400" : "bg-[#0c0b0a] text-amber-600"}`}>
      {s("loading", language)}
    </div>
  );

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${bg}`}>
      <div className="max-w-5xl mx-auto px-4 py-8 pb-20">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          <ArrowLeft size={13} /> {s("back", language)}
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[3px] bg-amber-600" />
                <span className={`text-[10px] uppercase tracking-[0.2em] ${textSecondary}`}>
                  PaleoArchivo · {s("title", language)}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase italic leading-none mb-2 ${textPrimary}`}>
                Top <span className="text-amber-600">Favoritos</span>
              </h1>
              <p className={`text-[11px] leading-relaxed max-w-lg ${textSecondary}`}>
                {s("subtitle", language)}
              </p>
            </div>
            <button
              onClick={() => fetchRanking(true)}
              disabled={refreshing}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border text-[10px] uppercase tracking-widest font-bold transition-all mt-1
                ${isLight ? "border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-600" : "border-[#2a2520] text-[#6b5e4e] hover:border-amber-600/40 hover:text-amber-500"}`}
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              {!refreshing && <span className="hidden sm:inline">Actualizar</span>}
            </button>
          </div>

          {/* Stats rápidas */}
          <div className="flex items-center gap-4 mt-5">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isLight ? "border-stone-200 bg-stone-50" : "border-[#2a2520] bg-[#0f0e0c]"}`}>
              <Trophy size={12} className="text-amber-500" />
              <span className={`text-[10px] uppercase tracking-widest font-bold ${textSecondary}`}>
                {ranking.length} {s("total", language)}
              </span>
            </div>
            {ranking[0] && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isLight ? "border-amber-200 bg-amber-50" : "border-amber-600/20 bg-amber-600/5"}`}>
                <span className="text-[11px]">🥇</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-600">
                  {ranking[0].nombre} · {ranking[0].count} {s("users", language)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabla */}
        {ranking.length === 0 ? (
          <div className={`text-center py-24 text-sm uppercase tracking-widest ${textSecondary}`}>
            {s("empty", language)}
          </div>
        ) : (
          <div className={`rounded-2xl border overflow-hidden ${border}`}>

            {/* Cabecera de tabla */}
            <div className={`grid grid-cols-[48px_1fr_auto] sm:grid-cols-[48px_1fr_120px_80px_100px] items-center px-4 py-2.5 border-b ${border} ${thBg}`}>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${thText}`}>{s("rank", language)}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${thText}`}>{s("species", language)}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${thText} hidden sm:block`}>{s("diet", language)}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${thText} hidden sm:block`}>{s("era", language)}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${thText} text-right`}>
                <Users size={10} className="inline mr-1" />{s("users", language)}
              </span>
            </div>

            {/* Filas */}
            <div className={`divide-y ${borderDiv} ${bgCard}`}>
              {ranking.map((animal, i) => {
                const rank = i + 1;
                const cfg = getDietConfig(animal.dieta);
                const eraColor = ERA_COLOR[animal.era] || textSecondary;
                const isTop3 = rank <= 3;

                return (
                  <Link
                    key={animal.id}
                    to={`/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`}
                    className={`grid grid-cols-[48px_1fr_auto] sm:grid-cols-[48px_1fr_120px_80px_100px] items-center px-4 py-3 transition-all group ${bgHover}`}
                  >
                    {/* Rango */}
                    <div className="flex items-center justify-center">
                      {isTop3 ? (
                        <span className="text-lg leading-none">{MEDAL[rank]}</span>
                      ) : (
                        <span className={`text-[12px] font-black font-mono tabular-nums ${rank <= 10 ? "text-amber-500/70" : textMuted}`}>
                          {rank}
                        </span>
                      )}
                    </div>

                    {/* Especie */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 shrink-0 rounded-xl overflow-hidden border ${isLight ? "border-stone-100" : "border-[#2a2520]"}`}>
                        <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[13px] font-black uppercase italic truncate transition-colors group-hover:text-amber-500 ${textPrimary}`}>
                          {animal.nombre}
                        </p>
                        <p className={`text-[10px] truncate ${textSecondary}`}>
                          {animal.subName}
                        </p>
                      </div>
                    </div>

                    {/* Dieta — solo desktop */}
                    <div className="hidden sm:flex items-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide
                        ${cfg.color.bg} ${cfg.color.text} ${cfg.color.border}`}>
                        {cfg.emoji} {getDietLabel(animal.dieta, language)}
                      </span>
                    </div>

                    {/* Era — solo desktop */}
                    <div className="hidden sm:flex items-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${eraColor}`}>
                        {animal.era}
                      </span>
                    </div>

                    {/* Conteo */}
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`text-[13px] font-black font-mono tabular-nums ${isTop3 ? "text-amber-500" : textPrimary}`}>
                        {animal.count}
                      </span>
                      <Users size={10} className={textMuted} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}