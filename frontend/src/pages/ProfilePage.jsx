// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/useUser";
import { useFavorites } from "../context/FavoritesContext";
import { useTranslation } from "../hooks/useTranslation";
import { allAnimals } from "../data/allData";
import apiClient from "../api/apiClient";
import Toast from "../components/Toast";
import {
  Trash2, Eye, EyeOff, AlertTriangle, Pencil, Check, X, ImagePlus,
  Clock, BarChart2, Star, BookOpen,
} from "lucide-react";

const AVATARS = [
  { id: "av1", url: "https://i.ytimg.com/vi/7j8krOd0-KA/maxresdefault.jpg", label: "Eoraptor" },
  { id: "av2", url: "https://images.dinosaurpictures.org/Allosaurus/Allosaurus_f614bc6d.jpg", label: "Allosaurus" },
  { id: "av3", url: "https://www.mundoprehistorico.com/wp-content/uploads/Archaeopteryx-01.jpg", label: "Archaeopteryx" },
  { id: "av4", url: "https://www.mundoprehistorico.com/wp-content/uploads/Stegosaurus-01.jpg", label: "Estegosaurus" },
  { id: "av5", url: "https://www.mundoprehistorico.com/wp-content/uploads/Diplodocus-01.jpg", label: "Diplodocus" },
  { id: "av6", url: "https://images.newscientist.com/wp-content/uploads/2023/09/27132703/SEI_173479939.jpg", label: "Trilobite" },
  { id: "av7", url: "https://static.wikia.nocookie.net/life-on-our-planet/images/a/a0/Cameroceras.jpg", label: "Cameroceras" },
  { id: "av8", url: "https://www.mundoprehistorico.com/wp-content/uploads/Compsognathus-01.jpg", label: "Compsognathus" },
];

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const ERA_MAP = {
  "Cámbrico": "Paleozoico", "Ordovícico": "Paleozoico", "Silúrico": "Paleozoico",
  "Devónico": "Paleozoico", "Carbonífero": "Paleozoico", "Pérmico": "Paleozoico",
  "Triásico": "Mesozoico",  "Jurásico": "Mesozoico",    "Cretácico": "Mesozoico",
  "Paleoceno": "Cenozoico", "Eoceno": "Cenozoico",      "Oligoceno": "Cenozoico",
  "Mioceno": "Cenozoico",   "Plioceno": "Cenozoico",    "Pleistoceno": "Cenozoico",
  "Holoceno": "Cenozoico",
};

const ERA_COLORS = {
  Paleozoico: { color: "#6aafc5", bg: "rgba(106,175,197,0.12)", border: "rgba(106,175,197,0.3)" },
  Mesozoico:  { color: "#6abf6a", bg: "rgba(106,191,106,0.12)", border: "rgba(106,191,106,0.3)" },
  Cenozoico:  { color: "#cf9a5a", bg: "rgba(207,154,90,0.12)",  border: "rgba(207,154,90,0.3)"  },
};

const Divider = ({ label, isLight }) => (
  <div className="flex items-center gap-3 my-6">
    <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
    <span className={`text-[10px] tracking-[0.2em] uppercase ${isLight ? "text-stone-400" : "text-stone-500"}`}>{label}</span>
    <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder, isLight, maxLength }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label className={`block text-[11px] tracking-[0.16em] uppercase mb-2 font-bold ${isLight ? "text-stone-400" : "text-stone-500"}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && !show ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full font-mono text-base px-4 py-3.5 rounded-xl border outline-none transition-all focus:border-amber-500/60
            ${isLight
              ? "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-300"
              : "bg-black/20 border-white/[0.08] text-white placeholder:text-stone-700"}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-500 transition-colors">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {maxLength && (
        <p className={`text-[10px] text-right font-mono mt-1 ${isLight ? "text-stone-300" : "text-stone-700"}`}>
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

function EraBar({ label, counts, total, isLight }) {
  const eras = ["Paleozoico", "Mesozoico", "Cenozoico"];
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className={`font-mono text-[12px] font-bold uppercase tracking-widest ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>{label}</span>
        <span className={`font-mono text-[13px] font-black ${isLight ? "text-stone-700" : "text-[#f5e6c8]"}`}>{total}</span>
      </div>
      {total === 0 ? (
        <div className={`h-3 rounded-full ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
      ) : (
        <div className="flex h-3 rounded-full overflow-hidden gap-px">
          {eras.map(era => {
            const pct = (counts[era] || 0) / total * 100;
            if (pct === 0) return null;
            return (
              <motion.div key={era} initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ backgroundColor: ERA_COLORS[era].color }} className="h-full"
                title={`${era}: ${counts[era] || 0}`} />
            );
          })}
        </div>
      )}
      {total > 0 && (
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {eras.map(era => {
            const n = counts[era] || 0;
            if (n === 0) return null;
            return (
              <div key={era} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ERA_COLORS[era].color }} />
                <span className={`font-mono text-[11px] ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>{era} · {n}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatsSection({ user, favAnimals, isLight, pr }) {
  const history = user?.history || [];
  const notes   = user?.notes   || [];

  const favByEra = useMemo(() => {
    const counts = { Paleozoico: 0, Mesozoico: 0, Cenozoico: 0 };
    favAnimals.forEach(a => { const era = ERA_MAP[a.era]; if (era) counts[era]++; });
    return counts;
  }, [favAnimals]);

  const histByEra = useMemo(() => {
    const counts = { Paleozoico: 0, Mesozoico: 0, Cenozoico: 0 };
    history.forEach(h => {
      const animal = allAnimals.find(a => String(a.id) === String(h.animalId));
      if (!animal) return;
      const era = ERA_MAP[animal.era];
      if (era) counts[era]++;
    });
    return counts;
  }, [history]);

  const eraFavorita = useMemo(() => {
    const totals = {
      Paleozoico: (favByEra.Paleozoico || 0) + (histByEra.Paleozoico || 0),
      Mesozoico:  (favByEra.Mesozoico  || 0) + (histByEra.Mesozoico  || 0),
      Cenozoico:  (favByEra.Cenozoico  || 0) + (histByEra.Cenozoico  || 0),
    };
    const max = Math.max(...Object.values(totals));
    if (max === 0) return null;
    return Object.entries(totals).find(([, v]) => v === max)?.[0] || null;
  }, [favByEra, histByEra]);

  const hasData = favAnimals.length > 0 || history.length > 0;
  const cards = [
    { icon: <Star size={14} />,     label: pr.section?.favorites_label || "Favoritos", value: favAnimals.length, color: "#cf9a5a" },
    { icon: <Clock size={14} />,    label: pr.section?.visited         || "Visitadas",  value: history.length,    color: "#6aafc5" },
    { icon: <BookOpen size={14} />, label: pr.section?.notes           || "Notas",      value: notes.length,      color: "#6abf6a" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        {cards.map(({ icon, label, value, color }) => (
          <div key={label} className={`relative flex flex-col items-start gap-1.5 p-4 rounded-xl border overflow-hidden
            ${isLight ? "bg-stone-50 border-stone-100" : "bg-black/20 border-white/[0.06]"}`}>
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: color }} />
            <div className="flex items-center gap-1.5 mt-1" style={{ color }}>
              {icon}
              <span className={`font-mono text-[11px] uppercase tracking-widest ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{label}</span>
            </div>
            <p className="font-mono text-3xl font-black" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>
      {eraFavorita && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl border"
          style={{ borderColor: ERA_COLORS[eraFavorita].border, background: ERA_COLORS[eraFavorita].bg }}>
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ERA_COLORS[eraFavorita].color }} />
          <span className={`font-mono text-[11px] uppercase tracking-widest ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>
            {pr.section?.eraFavorite || "Era favorita"}
          </span>
          <span className="font-mono text-[14px] font-black uppercase tracking-wide ml-auto" style={{ color: ERA_COLORS[eraFavorita].color }}>
            {eraFavorita}
          </span>
        </div>
      )}
      {hasData ? (
        <div className={`flex flex-col gap-5 p-4 rounded-xl border ${isLight ? "bg-stone-50 border-stone-100" : "bg-black/20 border-white/[0.06]"}`}>
          <EraBar label={pr.section?.favsByEra    || "Favoritos por era"} counts={favByEra}  total={favAnimals.length} isLight={isLight} />
          <div className={`h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
          <EraBar label={pr.section?.visitedByEra || "Visitadas por era"} counts={histByEra} total={history.length}    isLight={isLight} />
        </div>
      ) : (
        <p className={`font-mono text-[11px] uppercase tracking-widest ${isLight ? "text-stone-300" : "text-stone-700"}`}>
          {pr.section?.emptyStats || "Explora el archivo para ver tus estadísticas."}
        </p>
      )}
    </div>
  );
}

function HistorySection({ history, isLight, pr }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(8);

  if (!history || history.length === 0) {
    return (
      <p className={`font-mono text-[12px] uppercase tracking-widest ${isLight ? "text-stone-300" : "text-stone-700"}`}>
        {pr.section?.emptyHistory || "Aún no has visitado ninguna ficha."}
      </p>
    );
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs  = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    const diffH   = Math.floor(diffMs / 3600000);
    const diffD   = Math.floor(diffMs / 86400000);
    if (diffMin < 1)  return "Ahora";
    if (diffMin < 60) return `Hace ${diffMin}m`;
    if (diffH < 24)   return `Hace ${diffH}h`;
    if (diffD < 7)    return `Hace ${diffD}d`;
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  const shown = history.slice(0, visible);
  return (
    <div>
      <div className={`rounded-xl border overflow-hidden ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
        {shown.map((entry, i) => {
          const animal = allAnimals.find(a => String(a.id) === String(entry.animalId));
          if (!animal) return null;
          return (
            <button key={`${entry.animalId}-${i}`}
              onClick={() => navigate(`/animal/${encodeURIComponent(animal.nombre.toLowerCase())}`)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all
                ${i < shown.length - 1 ? isLight ? "border-b border-stone-100" : "border-b border-[#1a1816]" : ""}
                ${isLight ? "hover:bg-amber-50" : "hover:bg-amber-600/5"}`}>
              {animal.imagen && (
                <div className={`w-14 h-14 shrink-0 rounded-xl overflow-hidden border ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
                  <img src={animal.imagen} alt={animal.nombre} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-mono text-sm font-bold uppercase tracking-wide truncate leading-tight mb-1 ${isLight ? "text-stone-800" : "text-[#f5e6c8]"}`}>
                  {animal.nombre}
                </p>
                <p className={`font-mono text-[11px] truncate ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>{animal.era}</p>
              </div>
              <span className={`font-mono text-[11px] shrink-0 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
                {formatDate(entry.visitedAt)}
              </span>
            </button>
          );
        })}
      </div>
      {visible < history.length && (
        <button onClick={() => setVisible(v => v + 8)}
          className={`mt-3 w-full py-3 rounded-xl border font-mono text-[11px] uppercase tracking-widest transition-all
            ${isLight ? "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600"
                      : "border-[#2a2520] text-[#4a3f32] hover:border-[#3a3028] hover:text-[#6b5e4e]"}`}>
          {Math.min(8, history.length - visible)} {pr.section?.showMore || "más"} · {history.length - visible - Math.min(8, history.length - visible)} restantes
        </button>
      )}
    </div>
  );
}

// ── Config logros ──────────────────────────────────────────────────────────
// Únicos: un solo tier. Lineales: serie de bronce→plata→oro con mismo icono.
const ACHIEVEMENTS_CONFIG = [
  // ── Únicos ──
  { id: "first_visit",      emoji: "🦶", tier: null, name: { es: "Primera visita",     en: "First visit",       fr: "Première visite",    it: "Prima visita"      }, desc: { es: "Abre tu primera ficha",           en: "Open your first record",        fr: "Ouvre ta première fiche",         it: "Apri la tua prima scheda"        }, total: 1,  field: "history"    },
  { id: "first_fav",        emoji: "⭐", tier: null, name: { es: "Primer favorito",    en: "First favorite",    fr: "Premier favori",     it: "Primo preferito"   }, desc: { es: "Añade tu primer favorito",        en: "Add your first favorite",       fr: "Ajoute ton premier favori",       it: "Aggiungi il tuo primo preferito" }, total: 1,  field: "favorites"  },
  { id: "first_note",       emoji: "✍️", tier: null, name: { es: "Primera nota",       en: "First note",        fr: "Première note",      it: "Prima nota"        }, desc: { es: "Escribe tu primera nota",         en: "Write your first note",         fr: "Écris ta première note",          it: "Scrivi la tua prima nota"        }, total: 1,  field: "notes"      },
  { id: "time_traveler",    emoji: "⏳", tier: null, name: { es: "Viajero del tiempo", en: "Time traveler",     fr: "Voyageur du temps",  it: "Viaggiatore"       }, desc: { es: "Visita animales de las 3 eras",   en: "Visit animals from all 3 eras", fr: "Visite des animaux des 3 ères",   it: "Visita animali delle 3 ere"      }, total: 3,  field: "eras"       },
  { id: "carnivore_fan",    emoji: "🦷", tier: null, name: { es: "Fan carnívoros",     en: "Carnivore fan",     fr: "Fan carnivores",     it: "Fan carnivori"     }, desc: { es: "5 carnívoros en favoritos",       en: "5 carnivores in favorites",     fr: "5 carnivores en favoris",         it: "5 carnivori nei preferiti"       }, total: 5,  field: "carnivores" },
  { id: "herbivore_fan",    emoji: "🌿", tier: null, name: { es: "Fan herbívoros",     en: "Herbivore fan",     fr: "Fan herbivores",     it: "Fan erbivori"      }, desc: { es: "5 herbívoros en favoritos",       en: "5 herbivores in favorites",     fr: "5 herbivores en favoris",         it: "5 herbivori nei preferiti"       }, total: 5,  field: "herbivores" },
  { id: "contributor",      emoji: "💡", tier: null, name: { es: "Contribuidor",       en: "Contributor",       fr: "Contributeur",       it: "Contributore"      }, desc: { es: "Envía una sugerencia de especie", en: "Send a species suggestion",     fr: "Envoie une suggestion d'espèce",  it: "Invia un suggerimento di specie" }, total: 1,  field: "suggestions"},

  // ── Exploración lineal ──
  { id: "explorer_bronze",  emoji: "🧭", tier: "bronze", group: "explorer", name: { es: "Explorador",   en: "Explorer",   fr: "Explorateur",    it: "Esploratore"  }, desc: { es: "Visita 10 fichas",  en: "Visit 10 records",  fr: "Visite 10 fiches",  it: "Visita 10 schede"  }, total: 10, field: "history"   },
  { id: "explorer_silver",  emoji: "🧭", tier: "silver", group: "explorer", name: { es: "Explorador",   en: "Explorer",   fr: "Explorateur",    it: "Esploratore"  }, desc: { es: "Visita 25 fichas",  en: "Visit 25 records",  fr: "Visite 25 fiches",  it: "Visita 25 schede"  }, total: 25, field: "history"   },
  { id: "explorer_gold",    emoji: "🧭", tier: "gold",   group: "explorer", name: { es: "Explorador",   en: "Explorer",   fr: "Explorateur",    it: "Esploratore"  }, desc: { es: "Visita 50 fichas",  en: "Visit 50 records",  fr: "Visite 50 fiches",  it: "Visita 50 schede"  }, total: 50, field: "history"   },

  // ── Favoritos lineal ──
  { id: "collector_bronze", emoji: "📦", tier: "bronze", group: "collector", name: { es: "Coleccionista", en: "Collector",  fr: "Collectionneur", it: "Collezionista"}, desc: { es: "10 favoritos",      en: "10 favorites",      fr: "10 favoris",        it: "10 preferiti"      }, total: 10, field: "favorites" },
  { id: "collector_silver", emoji: "📦", tier: "silver", group: "collector", name: { es: "Coleccionista", en: "Collector",  fr: "Collectionneur", it: "Collezionista"}, desc: { es: "25 favoritos",      en: "25 favorites",      fr: "25 favoris",        it: "25 preferiti"      }, total: 25, field: "favorites" },
  { id: "collector_gold",   emoji: "📦", tier: "gold",   group: "collector", name: { es: "Coleccionista", en: "Collector",  fr: "Collectionneur", it: "Collezionista"}, desc: { es: "50 favoritos",      en: "50 favorites",      fr: "50 favoris",        it: "50 preferiti"      }, total: 50, field: "favorites" },

  // ── Notas lineal ──
  { id: "notes_bronze",     emoji: "📝", tier: "bronze", group: "notes", name: { es: "Anotador",      en: "Annotator",  fr: "Annotateur",     it: "Annotatore"   }, desc: { es: "3 notas escritas",  en: "3 notes written",   fr: "3 notes écrites",   it: "3 note scritte"    }, total: 3,  field: "notes"     },
  { id: "notes_silver",     emoji: "📝", tier: "silver", group: "notes", name: { es: "Anotador",      en: "Annotator",  fr: "Annotateur",     it: "Annotatore"   }, desc: { es: "10 notas escritas", en: "10 notes written",  fr: "10 notes écrites",  it: "10 note scritte"   }, total: 10, field: "notes"     },
  { id: "notes_gold",       emoji: "📝", tier: "gold",   group: "notes", name: { es: "Anotador",      en: "Annotator",  fr: "Annotateur",     it: "Annotatore"   }, desc: { es: "25 notas escritas", en: "25 notes written",  fr: "25 notes écrites",  it: "25 note scritte"   }, total: 25, field: "notes"     },
];

// Para los grupos lineales, mostrar solo el tier más alto desbloqueado (o el bronce si ninguno)
function getDisplayAchievements(unlockedIds) {
  const groups = ["explorer", "collector", "notes"];
  const tiers  = ["gold", "silver", "bronze"];
  const shown  = new Set();

  // Únicos — siempre se muestran
  ACHIEVEMENTS_CONFIG.filter(a => !a.group).forEach(a => shown.add(a.id));

  // Lineales — mostrar el tier más alto desbloqueado, o el bronce si ninguno
  groups.forEach(group => {
    const serie = ACHIEVEMENTS_CONFIG.filter(a => a.group === group);
    const best  = tiers.find(t => unlockedIds.has(`${group}_${t}`));
    shown.add(best ? `${group}_${best}` : `${group}_bronze`);
  });

  return ACHIEVEMENTS_CONFIG.filter(a => shown.has(a.id));
}

function getProgress(achievement, user, favAnimals) {
  const h = user?.history   || [];
  const f = user?.favorites || [];
  const n = user?.notes     || [];
  switch (achievement.field) {
    case "history":     return Math.min(h.length, achievement.total);
    case "favorites":   return Math.min(f.length, achievement.total);
    case "notes":       return Math.min(n.length, achievement.total);
    case "suggestions": return 0; // no tenemos contador en frontend
    case "eras": {
      const eras = new Set(h.map(x => ERA_MAP[x.animalEra]).filter(Boolean));
      return Math.min(eras.size, 3);
    }
    case "carnivores": return Math.min(favAnimals.filter(a => a.dieta === "Carnívoro").length, achievement.total);
    case "herbivores": return Math.min(favAnimals.filter(a => a.dieta === "Herbívoro").length, achievement.total);
    default: return 0;
  }
}



// ── Grid de medallas ──────────────────────────────────────────────────────
function MedallasGrid({ user, favAnimals, isLight, language }) {
  const [open, setOpen] = useState(false);
  const unlockedCount = (user?.achievements || []).length;

  const unlockedIds = new Set((user?.achievements || []).map(a => a.id));
  const displayList = getDisplayAchievements(unlockedIds);
  const items = displayList.map(ach => {
    const unlocked = unlockedIds.has(ach.id);
    const progress = getProgress(ach, user, favAnimals);
    return (
      <div key={ach.id} className="relative group/medal flex justify-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all
          ${unlocked ? "opacity-100" : "opacity-30 grayscale"}`}>
          {unlocked ? (
            <img src={`/achievements/${ach.id}.png`} alt={ach.name.es}
              className="w-14 h-14 object-contain " />
          ) : (
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
              ${isLight ? "bg-stone-200" : "bg-white/5"}`}>
              {ach.emoji}
            </div>
          )}

        </div>
        {/* Tooltip */}
        <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50
          pointer-events-none opacity-0 group-hover/medal:opacity-100 transition-opacity duration-200
          w-44 rounded-xl border p-3 shadow-xl
          ${isLight ? "bg-white border-stone-200" : "bg-[#1a1816] border-[#2a2520]"}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`font-mono text-[11px] font-black uppercase tracking-wide
              ${unlocked ? "text-amber-500" : isLight ? "text-stone-500" : "text-stone-400"}`}>
              {ach.name[language] || ach.name.es}
            </p>
            {ach.tier && (
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ml-2 shrink-0
                ${ach.tier === "bronze" ? "bg-amber-800/40 text-amber-600" : ach.tier === "silver" ? "bg-stone-500/30 text-stone-300" : "bg-yellow-500/30 text-yellow-400"}`}>
                {{"es":"Nivel","en":"Level","fr":"Niveau","it":"Livello"}[language] || "Nivel"} {ach.tier === "bronze" ? "1" : ach.tier === "silver" ? "2" : "3"}
              </span>
            )}
          </div>
          <p className={`font-mono text-[10px] mb-1.5 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
            {ach.desc[language] || ach.desc.es}
          </p>
          <p className={`font-mono text-[10px] font-bold ${unlocked ? "text-amber-500" : isLight ? "text-stone-500" : "text-stone-500"}`}>
            {unlocked ? "✓ Desbloqueado" : `${progress} / ${ach.total}`}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* Botón acordeón — solo móvil */}
      <button
        className={`md:hidden w-full flex items-center justify-between px-3 py-2 rounded-xl border mb-2 transition-all
          ${isLight ? "border-stone-200 text-stone-500" : "border-[#2a2520] text-[#6b5e4e]"}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          🏅 Logros · {unlockedCount}/{ACHIEVEMENTS_CONFIG.length}
        </span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* Lista con progreso — solo móvil, colapsable */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 mb-4">
          {displayList.map(ach => {
            const unlocked = unlockedIds.has(ach.id);
            const progress = getProgress(ach, user, favAnimals);
            const pct      = Math.round((progress / ach.total) * 100);
            return (
              <div key={ach.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border
                  ${unlocked
                    ? isLight ? "bg-amber-50 border-amber-200" : "bg-amber-600/10 border-amber-600/30"
                    : isLight ? "bg-stone-50 border-stone-100 opacity-60" : "bg-black/20 border-white/[0.05] opacity-50"}`}>
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center transition-all
                  ${unlocked ? "opacity-100" : "opacity-40 grayscale"}`}>
                  {unlocked ? (
                    <img src={`/achievements/${ach.id}.png`} alt={ach.name.es}
                      className="w-10 h-10 object-contain drop-shadow-lg" />
                  ) : (
                    <span className="text-xl">{ach.emoji}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-[11px] font-black uppercase tracking-wide
                    ${unlocked ? isLight ? "text-amber-700" : "text-amber-500" : isLight ? "text-stone-500" : "text-stone-400"}`}>
                    {ach.name[language] || ach.name.es}
                  </p>
                  {!unlocked && (
                    <>
                      <div className={`mt-1 h-1.5 rounded-full overflow-hidden ${isLight ? "bg-stone-200" : "bg-white/10"}`}>
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <p className={`font-mono text-[10px] mt-0.5 ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
                        {progress} / {ach.total}
                      </p>
                    </>
                  )}
                </div>
                {unlocked && (
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0
                    ${isLight ? "bg-amber-100 text-amber-700" : "bg-amber-600/20 text-amber-400"}`}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Grid — solo desktop, siempre visible */}
      <div className="hidden md:grid grid-cols-2 gap-3 mb-6">
        {items}
      </div>
    </>
  );
}

// ── Página principal ──────────────────────────────────────────────────────
const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme: colorTheme, language, setLanguage } = useUser();
  const { favorites, clearFavorites } = useFavorites();
  const { tSection } = useTranslation();
  const pr = tSection("profile");
  const isLight = colorTheme === "light";

  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState({ show: false, msg: "", type: "success" });
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [bio, setBio]           = useState("");
  const [selectedAvatar, setSelectedAvatar]     = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const fileInputRef = useRef(null);
  const [uploadError, setUploadError]     = useState("");
  const [uploadPreview, setUploadPreview] = useState(null);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass]         = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showHistory, setShowHistory]             = useState(false);
  const [showDeleteModal, setShowDeleteModal]     = useState(false);
  const [deletePass, setDeletePass]               = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const userId       = localStorage.getItem("userId");
  const myFavAnimals = allAnimals.filter(a => favorites.includes(String(a.id)));

  useEffect(() => {
    if (!userId || localStorage.getItem("auth") !== "true") {
      navigate("/login", { replace: true }); return;
    }
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`/user/${userId}`);
        setUser(res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setBio(res.data.bio || "");
        setSelectedAvatar(res.data.avatar || "");
        localStorage.setItem("avatar", res.data.avatar || "");
      } catch { navigate("/login", { replace: true }); }
      finally { setLoading(false); }
    };
    fetchUser();
  }, []);

  const showToast = (msg, type = "success") => setToast({ show: true, msg, type });

  const handleFileChange = (e) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("El archivo debe ser una imagen."); return; }
    if (file.size > MAX_FILE_SIZE) { setUploadError("La imagen no puede superar los 3 MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleConfirmUpload = () => {
    if (!uploadPreview) return;
    setSelectedAvatar(uploadPreview);
    setUploadPreview(null); setUploadError("");
    setShowAvatarPicker(false);
  };

  const handleCancelUpload = () => {
    setUploadPreview(null); setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveProfile = async () => {
    try {
      const res = await apiClient.put(`/user/${userId}`, { username, email, bio, avatar: selectedAvatar });
      setUser(res.data);
      localStorage.setItem("username", res.data.username.toUpperCase());
      localStorage.setItem("avatar", res.data.avatar || "");
      showToast(pr.toast?.profileUpdated);
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.saveError, "error"); }
  };

  const handleChangePassword = async () => {
    if (newPass !== confirmPass) return showToast(pr.toast?.passwordMismatch, "error");
    if (newPass.length < 6) return showToast(pr.toast?.passwordTooShort, "error");
    try {
      await apiClient.put(`/user/${userId}/password`, { currentPassword: currentPass, newPassword: newPass });
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      showToast(pr.toast?.passwordUpdated);
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.passwordError, "error"); }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== user?.username) return showToast(pr.toast?.nameMismatch, "error");
    try {
      await apiClient.delete(`/user/${userId}`, { data: { password: deletePass } });
      clearFavorites(); localStorage.clear();
      navigate("/", { replace: true }); window.location.reload();
    } catch (err) { showToast(err.response?.data?.msg || pr.toast?.deleteError, "error"); }
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono text-sm italic tracking-[0.4em]
      ${isLight ? "bg-[#f7f3ee] text-stone-400" : "bg-[#0c0b0a] text-amber-600"}`}>
      {pr.loading}
    </div>
  );

  const avatarSrc = selectedAvatar || AVATARS[0].url;
  const joinDate  = new Date(user?.createdAt).toLocaleDateString(
    language === "en" ? "en-US" : language === "fr" ? "fr-FR" : language === "it" ? "it-IT" : "es-ES",
    { month: "long", year: "numeric" }
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className={`min-h-screen font-mono transition-colors duration-500 ${isLight ? "bg-[#f7f3ee]" : "bg-[#0c0b0a]"}`}>
      <Toast isVisible={toast.show} message={toast.msg} type={toast.type}
        onClose={() => setToast(t => ({ ...t, show: false }))} />

      <div className="max-w-5xl mx-auto px-4 py-8 pb-20">

        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-[11px] uppercase tracking-widest mb-8 transition-colors
            ${isLight ? "text-stone-400 hover:text-stone-700" : "text-stone-600 hover:text-stone-300"}`}>
          ← {pr.back}
        </button>

        <div className={`flex flex-col md:flex-row rounded-2xl overflow-hidden border
          ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>

          {/* ── PANEL IZQUIERDO ── */}
          <div className={`md:w-56 shrink-0 flex flex-col p-6 md:border-r
            ${isLight ? "bg-[#f0ebe3] border-stone-200" : "bg-[#0f0e0c] border-[#2a2520]"}`}>
            <div className="w-9 h-[3px] bg-amber-600 mb-6" />
            <div className="relative w-28 h-28 mb-5 cursor-pointer" onClick={() => setShowAvatarPicker(true)}>
              <img src={avatarSrc} alt="avatar" className="w-full h-full rounded-full object-cover border-2 border-amber-600/30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Pencil size={11} className="text-black" />
              </div>
            </div>
            <p className={`text-xl font-black italic uppercase tracking-tight leading-tight mb-1
              ${isLight ? "text-stone-900" : "text-[#f5e6c8]"}`}>
              {user?.username}
            </p>
            {user?.bio && (
              <p className={`text-sm leading-relaxed mb-3 ${isLight ? "text-stone-500" : "text-stone-500"}`}>{user.bio}</p>
            )}

            {/* Medallas */}
            <MedallasGrid
              user={user} favAnimals={myFavAnimals}
              isLight={isLight} language={language}
            />
            <div className={`mt-auto pt-5 border-t flex flex-col gap-4 ${isLight ? "border-stone-200" : "border-[#2a2520]"}`}>
              <div>
                <p className="text-2xl font-black text-amber-600">{myFavAnimals.length}</p>
                <p className={`text-[12px] tracking-[0.16em] uppercase mt-0.5 ${isLight ? "text-stone-400" : "text-stone-600"}`}>{pr.section?.favorites}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-600">{user?.history?.length || 0}</p>
                <p className={`text-[12px] tracking-[0.16em] uppercase mt-0.5 ${isLight ? "text-stone-400" : "text-stone-600"}`}>{pr.section?.visited || "Visitadas"}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-600">{user?.notes?.length || 0}</p>
                <p className={`text-[12px] tracking-[0.16em] uppercase mt-0.5 ${isLight ? "text-stone-400" : "text-stone-600"}`}>{pr.section?.notes || "Notas"}</p>
              </div>
              <p className={`text-[12px] tracking-[0.1em] uppercase leading-relaxed ${isLight ? "text-stone-400" : "text-stone-600"}`}>
                {pr.memberSince}<br />{joinDate}
              </p>
            </div>
          </div>

          {/* ── PANEL DERECHO ── */}
          <div className={`flex-1 p-6 md:p-8 ${isLight ? "bg-white" : "bg-[#131211]"}`}>

            {/* Perfil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label={pr.field?.username} value={username} onChange={setUsername} placeholder={pr.field?.usernamePlaceholder} isLight={isLight} />
              <Field label={pr.field?.email}    value={email}    onChange={setEmail}    placeholder="tu@email.com" isLight={isLight} />
            </div>
            <div className="mb-4">
              <Field label={pr.field?.bio} value={bio} onChange={setBio} placeholder={pr.field?.bioPlaceholder} isLight={isLight} maxLength={300} />
            </div>
            <button onClick={handleSaveProfile}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] tracking-[0.16em] uppercase font-black rounded-xl transition-all">
              {pr.saveChanges}
            </button>

            {/* Contraseña */}
            <Divider label={pr.section?.changePassword} isLight={isLight} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Field label={pr.field?.currentPassword} value={currentPass} onChange={setCurrentPass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
              <Field label={pr.field?.newPassword}     value={newPass}     onChange={setNewPass}     type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
              <Field label={pr.field?.confirmPassword} value={confirmPass} onChange={setConfirmPass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
            </div>
            <button onClick={handleChangePassword}
              className={`w-full py-3.5 text-[11px] tracking-[0.16em] uppercase font-black rounded-xl transition-all border-2
                ${isLight ? "border-stone-200 text-stone-600 hover:border-amber-500 hover:text-amber-600"
                          : "border-[#2a2520] text-stone-400 hover:border-amber-600 hover:text-amber-500"}`}>
              {pr.updatePassword}
            </button>
            
            {/* Estadísticas */}
            <Divider label={pr.section?.stats || "Estadísticas"} isLight={isLight} />
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={14} className="text-amber-600" />
              <span className={`font-mono text-[12px] uppercase tracking-widest font-bold ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>
                {pr.section?.statsSubtitle || "Tu actividad en el archivo"}
              </span>
            </div>
            <StatsSection user={user} favAnimals={myFavAnimals} isLight={isLight} pr={pr} />

            {/* Historial */}
            <Divider label={pr.section?.history || "Historial de visitados"} isLight={isLight} />
            <button
              onClick={() => setShowHistory(h => !h)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border mb-4 transition-all
                ${isLight ? "border-stone-200 hover:border-stone-300" : "border-[#2a2520] hover:border-[#3a3028]"}`}>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-600" />
                <span className={`font-mono text-[12px] uppercase tracking-widest font-bold ${isLight ? "text-stone-500" : "text-[#6b5e4e]"}`}>
                  {showHistory
                    ? (pr.section?.historyHide || "Ocultar historial")
                    : (pr.section?.historyShow || "Mostrar historial")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {user?.history?.length > 0 && (
                  <span className={`font-mono text-[11px] ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>
                    {user.history.length} / 50
                  </span>
                )}
                <span className={`transition-transform duration-200 text-sm ${showHistory ? "rotate-180" : ""} ${isLight ? "text-stone-400" : "text-[#4a3f32]"}`}>▾</span>
              </div>
            </button>
            {showHistory && <HistorySection history={user?.history || []} isLight={isLight} pr={pr} />}

            {/* Zona de peligro */}
            <Divider label={pr.section?.dangerZone} isLight={isLight} />
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border-l-4 border-red-500
              ${isLight ? "bg-red-50" : "bg-red-950/10"}`}>
              <p className={`text-sm leading-relaxed ${isLight ? "text-stone-600" : "text-stone-400"}`}>{pr.dangerDesc}</p>
              <button onClick={() => setShowDeleteModal(true)}
                className="shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-red-500/40 text-red-500 text-[11px] tracking-[0.12em] uppercase font-black bg-red-500/10 hover:bg-red-500/20 transition-all">
                <Trash2 size={14} /> {pr.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal avatar */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => { setShowAvatarPicker(false); handleCancelUpload(); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`w-full max-w-lg rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#131211] border-[#2a2520]"}`}>
              <div className={`px-5 py-4 flex items-center justify-between border-b ${isLight ? "border-stone-100" : "border-[#2a2520]"}`}>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">{pr.chooseAvatar}</span>
                <button onClick={() => { setShowAvatarPicker(false); handleCancelUpload(); }} className="text-stone-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 flex flex-col gap-5">
                <div>
                  <p className={`text-[10px] tracking-[0.2em] uppercase mb-3 font-bold ${isLight ? "text-stone-400" : "text-stone-600"}`}>Tu foto</p>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  {uploadPreview ? (
                    <div className="flex items-center gap-4">
                      <img src={uploadPreview} alt="preview" className="w-16 h-16 rounded-full object-cover border-2 border-amber-500" />
                      <div className="flex flex-col gap-2 flex-1">
                        <p className={`text-xs ${isLight ? "text-stone-500" : "text-stone-400"}`}>Vista previa — ¿usar esta foto?</p>
                        <div className="flex gap-2">
                          <button onClick={handleConfirmUpload}
                            className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-[10px] uppercase tracking-widest font-black rounded-lg transition-all">
                            <Check size={12} /> Usar
                          </button>
                          <button onClick={handleCancelUpload}
                            className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest font-black rounded-lg border transition-all
                              ${isLight ? "border-stone-200 text-stone-500" : "border-[#2a2520] text-stone-500"}`}>
                            <X size={12} /> Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => fileInputRef.current?.click()}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-dashed transition-all
                        ${isLight ? "border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50"
                                  : "border-[#2a2520] text-stone-600 hover:border-amber-600/50 hover:text-amber-500 hover:bg-amber-600/5"}`}>
                      <ImagePlus size={18} />
                      <span className="text-[11px] uppercase tracking-[0.15em] font-bold">Subir imagen · máx. 3 MB</span>
                    </button>
                  )}
                  {uploadError && <p className="text-[11px] text-red-500 font-mono mt-2">{uploadError}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
                  <span className={`text-[10px] tracking-[0.2em] uppercase ${isLight ? "text-stone-300" : "text-stone-700"}`}>o elige uno</span>
                  <div className={`flex-1 h-px ${isLight ? "bg-stone-100" : "bg-white/5"}`} />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {AVATARS.map(av => (
                    <button key={av.id} onClick={() => { setSelectedAvatar(av.url); setUploadPreview(null); setShowAvatarPicker(false); }}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all
                        ${selectedAvatar === av.url ? "border-amber-500 scale-95" : "border-transparent hover:border-amber-500/40"}`}>
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                      {selectedAvatar === av.url && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Check size={20} className="text-amber-500" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                        <p className="text-[8px] font-mono text-white text-center truncate">{av.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal borrar cuenta */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-2xl border overflow-hidden ${isLight ? "bg-white border-stone-200" : "bg-[#131211] border-[#2a2520]"}`}>
              <div className="px-5 py-4 bg-red-600/10 border-b border-red-600/20 flex items-center gap-3">
                <AlertTriangle size={15} className="text-red-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500">{pr.deleteModal?.title}</span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className={`text-sm leading-relaxed ${isLight ? "text-stone-600" : "text-stone-400"}`}>
                  {pr.deleteModal?.warning} <span className="font-mono font-bold text-red-500">{user?.username}</span> {pr.deleteModal?.warningEnd}
                </p>
                <Field label={pr.deleteModal?.writeUsername} value={deleteConfirmText} onChange={setDeleteConfirmText} placeholder={user?.username} isLight={isLight} />
                <Field label={pr.deleteModal?.writePassword} value={deletePass} onChange={setDeletePass} type="password" placeholder={pr.field?.passwordPlaceholder} isLight={isLight} />
                <div className="flex gap-3 mt-1">
                  <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== user?.username}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all">
                    {pr.deleteModal?.confirm}
                  </button>
                  <button onClick={() => { setShowDeleteModal(false); setDeletePass(""); setDeleteConfirmText(""); }}
                    className={`flex-1 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all border-2
                      ${isLight ? "border-stone-200 text-stone-600" : "border-[#2a2520] text-stone-400"}`}>
                    {pr.deleteModal?.cancel}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfilePage;