// src/hooks/useAchievementToast.js
import { useCallback } from "react";

// Config mínima para mostrar nombre e imagen
const ACHIEVEMENT_NAMES = {
  first_visit:       { es: "Primera visita",    en: "First visit",      fr: "Première visite",   it: "Prima visita"    },
  first_fav:         { es: "Primer favorito",   en: "First favorite",   fr: "Premier favori",    it: "Primo preferito" },
  first_note:        { es: "Primera nota",      en: "First note",       fr: "Première note",     it: "Prima nota"      },
  time_traveler:     { es: "Viajero del tiempo",en: "Time traveler",    fr: "Voyageur du temps", it: "Viaggiatore"     },
  carnivore_fan:     { es: "Fan carnívoros",    en: "Carnivore fan",    fr: "Fan carnivores",    it: "Fan carnivori"   },
  herbivore_fan:     { es: "Fan herbívoros",    en: "Herbivore fan",    fr: "Fan herbivores",    it: "Fan erbivori"    },
  contributor:       { es: "Contribuidor",      en: "Contributor",      fr: "Contributeur",      it: "Contributore"    },
  explorer_bronze:   { es: "Explorador",        en: "Explorer",         fr: "Explorateur",       it: "Esploratore"     },
  explorer_silver:   { es: "Explorador",        en: "Explorer",         fr: "Explorateur",       it: "Esploratore"     },
  explorer_gold:     { es: "Explorador",        en: "Explorer",         fr: "Explorateur",       it: "Esploratore"     },
  collector_bronze:  { es: "Coleccionista",     en: "Collector",        fr: "Collectionneur",    it: "Collezionista"   },
  collector_silver:  { es: "Coleccionista",     en: "Collector",        fr: "Collectionneur",    it: "Collezionista"   },
  collector_gold:    { es: "Coleccionista",     en: "Collector",        fr: "Collectionneur",    it: "Collezionista"   },
  notes_bronze:      { es: "Anotador",          en: "Annotator",        fr: "Annotateur",        it: "Annotatore"      },
  notes_silver:      { es: "Anotador",          en: "Annotator",        fr: "Annotateur",        it: "Annotatore"      },
  notes_gold:        { es: "Anotador",          en: "Annotator",        fr: "Annotateur",        it: "Annotatore"      },
};

const UNLOCKED_LABEL = {
  es: "¡Logro desbloqueado!",
  en: "Achievement unlocked!",
  fr: "Succès débloqué !",
  it: "Obiettivo sbloccato!",
};

export function useAchievementToast(language = "es") {
  const show = useCallback((newAchievements) => {
    if (!newAchievements?.length) return;

    newAchievements.forEach((id, i) => {
      setTimeout(() => {
        const name = ACHIEVEMENT_NAMES[id]?.[language] || ACHIEVEMENT_NAMES[id]?.es || id;
        const label = UNLOCKED_LABEL[language] || UNLOCKED_LABEL.es;

        // Crear toast DOM directamente para no depender del estado de ningún componente
        const toast = document.createElement("div");
        toast.style.cssText = `
          position: fixed;
          bottom: ${80 + i * 80}px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: #1a1614;
          border: 1px solid rgba(251,191,36,0.4);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          font-family: monospace;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          min-width: 220px;
          max-width: 320px;
        `;

        const img = document.createElement("img");
        img.src = `/achievements/${id}.png`;
        img.style.cssText = "width:40px;height:40px;object-fit:contain;flex-shrink:0;";
        img.onerror = () => { img.style.display = "none"; };

        const text = document.createElement("div");
        text.innerHTML = `
          <p style="font-size:9px;text-transform:uppercase;letter-spacing:0.15em;color:#f59e0b;margin:0 0 3px;">${label}</p>
          <p style="font-size:13px;font-weight:900;text-transform:uppercase;color:#fef3c7;margin:0;">${name}</p>
        `;

        toast.appendChild(img);
        toast.appendChild(text);
        document.body.appendChild(toast);

        // Animar entrada
        requestAnimationFrame(() => {
          toast.style.opacity = "1";
          toast.style.transform = "translateX(-50%) translateY(0)";
        });

        // Eliminar tras 3.5s
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transform = "translateX(-50%) translateY(20px)";
          setTimeout(() => toast.remove(), 300);
        }, 3500);
      }, i * 400);
    });
  }, [language]);

  return show;
}