// src/data/dietConfig.js
// ─────────────────────────────────────────────────────────────────────────────
// FUENTE ÚNICA DE VERDAD para dietas.
//
// Para añadir una dieta nueva:
//   1. Añade una entrada aquí con emoji, colores y traducciones.
//   2. Listo. El dropdown, el buscador y las tarjetas se actualizan solos.
//
// Colores disponibles de Tailwind (clases completas para que el compilador
// no las purgue): red, orange, amber, yellow, lime, green, emerald, teal,
// cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, stone, slate.
// ─────────────────────────────────────────────────────────────────────────────

export const DIET_CONFIG = {
  Carnívoro: {
    emoji: "🥩",
    fill: "#ef4444",
    color: {
      text:        "text-red-500",
      bg:          "bg-red-500/10",
      border:      "border-red-500/40",
      hoverBg:     "hover:bg-red-500/10",
      hoverText:   "hover:text-red-400",
      hoverBorder: "hover:border-red-500/40",
    },
    labels: {
      es: "Carnívoro",
      en: "Carnivore",
      fr: "Carnivore",
      it: "Carnivoro",
    },
  },

  Herbívoro: {
    emoji: "🌿",
    fill: "#22c55e",
    color: {
      text:        "text-green-500",
      bg:          "bg-green-500/10",
      border:      "border-green-500/40",
      hoverBg:     "hover:bg-green-500/10",
      hoverText:   "hover:text-green-400",
      hoverBorder: "hover:border-green-500/40",
    },
    labels: {
      es: "Herbívoro",
      en: "Herbivore",
      fr: "Herbivore",
      it: "Erbivoro",
    },
  },

  Omnívoro: {
    emoji: "🍲",
    fill: "#f59e0b",
    color: {
      text:        "text-amber-500",
      bg:          "bg-amber-500/10",
      border:      "border-amber-500/40",
      hoverBg:     "hover:bg-amber-500/10",
      hoverText:   "hover:text-amber-400",
      hoverBorder: "hover:border-amber-500/40",
    },
    labels: {
      es: "Omnívoro",
      en: "Omnivore",
      fr: "Omnivore",
      it: "Onnivoro",
    },
  },

  Insectívoro: {
    emoji: "🐛",
    fill: "#fb923c",
    color: {
      text:        "text-orange-500",
      bg:          "bg-orange-500/10",
      border:      "border-orange-500/40",
      hoverBg:     "hover:bg-orange-500/10",
      hoverText:   "hover:text-orange-400",
      hoverBorder: "hover:border-orange-500/40",
    },
    labels: {
      es: "Insectívoro",
      en: "Insectivore",
      fr: "Insectivore",
      it: "Insettivoro",
    },
  },

  Piscívoro: {
    emoji: "🐟",
    fill: "#60a5fa",
    color: {
      text:        "text-cyan-500",
      bg:          "bg-cyan-500/10",
      border:      "border-cyan-500/40",
      hoverBg:     "hover:bg-cyan-500/10",
      hoverText:   "hover:text-cyan-400",
      hoverBorder: "hover:border-cyan-500/40",
    },
    labels: {
      es: "Piscívoro",
      en: "Piscivore",
      fr: "Piscivore",
      it: "Piscivoro",
    },
  },

  Carroñero: {
    emoji: "🦴",
    fill: "#c084fc",
    color: {
      text:        "text-purple-500",
      bg:          "bg-purple-500/10",
      border:      "border-purple-500/40",
      hoverBg:     "hover:bg-purple-500/10",
      hoverText:   "hover:text-purple-400",
      hoverBorder: "hover:border-purple-500/40",
    },
    labels: {
      es: "Carroñero",
      en: "Scavenger",
      fr: "Charognard",
      it: "Spazzino",
    },
  },

  Filtrador: {
    emoji: "🌊",
    fill: "#06b6d4",
    color: {
      text:        "text-blue-500",
      bg:          "bg-blue-500/10",
      border:      "border-blue-500/40",
      hoverBg:     "hover:bg-blue-500/10",
      hoverText:   "hover:text-blue-400",
      hoverBorder: "hover:border-blue-500/40",
    },
    labels: {
      es: "Filtrador",
      en: "Filter feeder",
      fr: "Filtreur",
      it: "Filtratore",
    },
  },

  Detritívoro: {
    emoji: "🍂",
    fill: "#94a3b8",
    color: {
      text:        "text-slate-400",
      bg:          "bg-slate-400/10",
      border:      "border-slate-400/40",
      hoverBg:     "hover:bg-slate-400/10",
      hoverText:   "hover:text-slate-300",
      hoverBorder: "hover:border-slate-400/40",
    },
    labels: {
      es: "Detritívoro",
      en: "Detritivore",
      fr: "Détrivore",
      it: "Detritofago",
    },
  },

  Fotosintético: {
    emoji: "☀️",
    fill: "#facc15",
    color: {
      text:        "text-yellow-400",
      bg:          "bg-yellow-400/10",
      border:      "border-yellow-400/40",
      hoverBg:     "hover:bg-yellow-400/10",
      hoverText:   "hover:text-yellow-300",
      hoverBorder: "hover:border-yellow-400/40",
    },
    labels: {
      es: "Fotosintético",
      en: "Photosynthetic",
      fr: "Photosynthétique",
      it: "Fotosintetico",
    },
  },
};

// ─── Fallback para dietas desconocidas ───────────────────────────────────────
export const DIET_FALLBACK = {
  emoji: "❓",
  fill: "#78716c",
  color: {
    text:        "text-stone-400",
    bg:          "bg-stone-400/10",
    border:      "border-stone-400/40",
    hoverBg:     "hover:bg-stone-400/10",
    hoverText:   "hover:text-stone-300",
    hoverBorder: "hover:border-stone-400/40",
  },
  labels: {
    es: null, // mostrará la clave original
    en: null,
    fr: null,
    it: null,
  },
};

// ─── Helper: obtener config de una dieta (con fallback seguro) ────────────────
export function getDietConfig(diet) {
  return DIET_CONFIG[diet] ?? DIET_FALLBACK;
}

// ─── Helper: obtener la label traducida de una dieta ─────────────────────────
export function getDietLabel(diet, lang = "es") {
  const cfg = getDietConfig(diet);
  return cfg.labels[lang] ?? cfg.labels.es ?? diet;
}
